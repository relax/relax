import sharp from 'sharp';

const defaultOptions = {
  width: 100,
  height: 100,
  quality: 100
};

export default async function resizeImage (imagePath, destPath, options = defaultOptions) {
  const {quality, width, height} = options;

  await sharp(imagePath)
    .quality(quality)
    .resize(width, height)
    .toFile(destPath);
}
