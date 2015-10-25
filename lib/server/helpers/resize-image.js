import path from 'path';
import sharp from 'sharp';
import {fcall, ninvoke} from 'Q';

const defaultOptions = {
  width: 100,
  height: 100,
  quality: 100
};

export default async function resizeImage (imagePath, destPath, options = defaultOptions) {
  const {quality, width, height} = options;

  const image = await fcall(sharp, imagePath);
  const metadata = await ninvoke(image, 'metadata');
  const thumbnailPath = `thumbnail.${metadata.format}`;

  await ninvoke(
    image.quality(quality).resize(width, height),
    'toFile',
    path.join(destPath, thumbnailPath)
  );

  return {
    thumbnailPath,
    metadata
  };
}
