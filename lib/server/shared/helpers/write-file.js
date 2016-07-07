import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import {promisify} from 'bluebird';

export default async function writeFile (file, _destPath) {
  let fileData = file.file;
  fileData = fileData.substring(fileData.indexOf(',') + 1);

  const destPath = path.join(_destPath, file.filename);

  try {
    await promisify(mkdirp)(_destPath);
    await promisify(fs.writeFile)(destPath, fileData, 'base64');
  } catch (ex) {
    throw ex;
  }

  return {
    filename: file.filename,
    size: fileData.length,
    destPath
  };
}
