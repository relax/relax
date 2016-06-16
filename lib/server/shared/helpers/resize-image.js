import sharp from 'sharp';
import {promisify} from 'bluebird';

const defaultOptions = {
  width: 100,
  height: 100,
  quality: 100
};

export default async function resizeImage (imagePath, destPath, options = defaultOptions) {
  const {quality, width, height} = options;

  const image = await promisify(sharp)(imagePath);
  image.quality(quality).resize(width, height);

  await image.toFile(destPath);
}
