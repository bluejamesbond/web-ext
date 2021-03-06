/* @flow */
import path from 'path';
import {createWriteStream} from 'fs';

import {fs} from 'mz';
import streamToPromise from 'stream-to-promise';
import parseJSON from 'parse-json';
import createIgnore from 'ignore';

import defaultSourceWatcher from '../watcher';
import {zipDir} from '../util/zip-dir';
import getValidatedManifest, {getManifestId} from '../util/manifest';
import {prepareArtifactsDir} from '../util/artifacts';
import {createLogger} from '../util/logger';
import {UsageError} from '../errors';
// Import flow types.
import type {OnSourceChangeFn} from '../watcher';
import type {ExtensionManifest} from '../util/manifest';

const log = createLogger(__filename);


export function safeFileName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\.-]+/g, '_');
}


// defaultPackageCreator types and implementation.

export type ExtensionBuildResult = {
  extensionPath: string,
};

export type PackageCreatorParams = {
  manifestData?: ExtensionManifest,
  sourceDir: string,
  fileFilter: FileFilter,
  artifactsDir: string,
  showReadyMessage: boolean
};

export type LocalizedNameParams = {
  messageFile: string,
  manifestData: ExtensionManifest,
}

// This defines the _locales/messages.json type. See:
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Internationalization#Providing_localized_strings_in__locales
type LocalizedMessageData = {
  [messageName: string]: {
    description: string,
    message: string,
  },
}

export async function getDefaultLocalizedName(
  {messageFile, manifestData}: LocalizedNameParams
): Promise<string> {

  let messageData: LocalizedMessageData;
  let messageContents: string | Buffer;
  let extensionName: string = manifestData.name;

  try {
    messageContents = await fs.readFile(messageFile);
  } catch (error) {
    throw new UsageError(
      `Error reading messages.json file at ${messageFile}: ${error}`);
  }

  try {
    messageData = parseJSON(messageContents, messageFile);
  } catch (error) {
    throw new UsageError(
      `Error parsing messages.json ${error}`);
  }

  extensionName = manifestData.name.replace(/__MSG_([A-Za-z0-9@_]+?)__/g,
    (match, messageName) => {
      if (!(messageData[messageName]
            && messageData[messageName].message)) {
        const error = new UsageError(
          `The locale file ${messageFile} ` +
            `is missing key: ${messageName}`);
        throw error;
      } else {
        return messageData[messageName].message;
      }
    });
  return Promise.resolve(extensionName);
}

export type PackageCreatorFn =
    (params: PackageCreatorParams) => Promise<ExtensionBuildResult>;

async function defaultPackageCreator({
  manifestData, sourceDir, fileFilter, artifactsDir, showReadyMessage,
}: PackageCreatorParams): Promise<ExtensionBuildResult> {
  let id;
  if (manifestData) {
    id = getManifestId(manifestData);
    log.debug(`Using manifest id=${id || '[not specified]'}`);
  } else {
    manifestData = await getValidatedManifest(sourceDir);
  }

  let buffer = await zipDir(sourceDir, {
    filter: (...args) => fileFilter.wantFile(...args),
  });

  let extensionName: string = manifestData.name;

  if (manifestData.default_locale) {
    let messageFile = path.join(sourceDir, '_locales',
      manifestData.default_locale, 'messages.json');
    log.debug('Manifest declared default_locale, localizing extension name');
    extensionName = await getDefaultLocalizedName(
      {messageFile, manifestData});
  }
  let packageName = safeFileName(
    `${extensionName}-${manifestData.version}.zip`);
  let extensionPath = path.join(artifactsDir, packageName);
  let stream = createWriteStream(extensionPath);

  stream.write(buffer, () => stream.end());

  await streamToPromise(stream);

  if (showReadyMessage) {
    log.info(`Your web extension is ready: ${extensionPath}`);
  }
  return {extensionPath};
}


// Build command types and implementation.

export type BuildCmdParams = {
  sourceDir: string,
  artifactsDir: string,
  asNeeded?: boolean,
};

export type BuildCmdOptions = {
  manifestData?: ExtensionManifest,
  fileFilter?: FileFilter,
  onSourceChange?: OnSourceChangeFn,
  packageCreator?: PackageCreatorFn,
  showReadyMessage?: boolean
};

export default async function build(
  {sourceDir, artifactsDir, asNeeded = false}: BuildCmdParams,
  {
    manifestData, fileFilter = new FileFilter({ sourceDir }),
    onSourceChange = defaultSourceWatcher,
    packageCreator = defaultPackageCreator,
    showReadyMessage = true,
  }: BuildCmdOptions = {}
): Promise<ExtensionBuildResult> {
  const rebuildAsNeeded = asNeeded; // alias for `build --as-needed`
  log.info(`Building web extension from ${sourceDir}`);

  const createPackage = () => packageCreator({
    manifestData, sourceDir, fileFilter, artifactsDir, showReadyMessage,
  });

  await prepareArtifactsDir(artifactsDir);
  let result = await createPackage();

  if (rebuildAsNeeded) {
    log.info('Rebuilding when files change...');
    onSourceChange({
      sourceDir,
      artifactsDir,
      onChange: () => {
        return createPackage().catch((error) => {
          log.error(error.stack);
          throw error;
        });
      },
      shouldWatchFile: (...args) => fileFilter.wantFile(...args),
    });
  }

  return result;
}


// FileFilter types and implementation.

export type FileFilterOptions = {
  filesToIgnore?: Array<string>,
  sourceDir?: string
};

/*
 * Allows or ignores files when creating a ZIP archive.
 */
export class FileFilter {
  _ignore: Object;

  constructor({filesToIgnore, sourceDir}: FileFilterOptions = {}) {
    this._ignore = createIgnore();

    // TODO if a xpiignore file is provided, then
    // are defaults required?
    this._ignore.add(filesToIgnore || [
      '*.xpi',
      '*.zip',
      '.*', // any hidden file
      'node_modules',
    ]);

    if (sourceDir) {
      const ignoreFilePath = path.join(sourceDir, '.xpiignore');

      if (fs.existsSync(ignoreFilePath)) {
        try {
          const text = fs.readFileSync(ignoreFilePath, 'utf8');
          const filesToIgnore = text.split('\n');
          this.add(filesToIgnore);
        } catch (e) {
          // ignore
        }
      }
    }
  }

  /*
   * Add a new path to ignore
   */
  add(path: string | Array<string>) {
    this._ignore.add(path);
  }

  /*
   * Returns true if the file is wanted for the ZIP archive.
   *
   * This is called by zipdir as wantFile(path, stat) for each
   * file in the folder that is being archived.
   */
  wantFile(path: string): boolean {
    if (this._ignore.ignores(path)) {
      log.debug(`FileFilter: ignoring file ${path}`);
      return false;
    }

    return true;
  }
}
