export default function fileMimetype (file) {
  const fileData = file.file;
  return fileData.substring(fileData.indexOf(':') + 1, fileData.indexOf(';'));
}
