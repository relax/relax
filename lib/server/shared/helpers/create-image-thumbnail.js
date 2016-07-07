import path from 'path';
import sharp from 'sharp';

const defaultOptions = {
  width: 100,
  height: 100,
  quality: 100
};

export default async function createImageThumbnail (imagePath, destPath, options = defaultOptions) {
  const {quality, width, height} = options;

  const image = sharp(imagePath);
  const metadata = await image.metadata();
  const thumbnailPath = `thumbnail.${metadata.format}`;

  await image
    .quality(quality)
    .resize(width, height)
    .toFile(path.join(destPath, thumbnailPath));

  return {
    thumbnailPath,
    metadata
  };
}
