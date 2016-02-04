import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import {nfcall} from 'q';

export default async function writeFile (file, _destPath) {
  var fileData = file.file;
  fileData = fileData.substring(fileData.indexOf(',') + 1);

  const destPath = path.join(_destPath, file.filename);

  try {
    await nfcall(mkdirp, _destPath);
    await nfcall(fs.writeFile, destPath, fileData, 'base64');
  } catch (ex) {
    throw ex;
  }

  return {
    filename: file.filename,
    size: fileData.length,
    destPath
  };
}
