import createImageThumbnail from 'helpers/create-image-thumbnail';
import fileMimetype from 'helpers/file-mimetype';
import filesize from 'file-size';
import mongoose from 'mongoose';
import path from 'path';
import writeFile from 'helpers/write-file';
import {
  GraphQLNonNull
} from 'graphql';
import {getMediaType} from 'helpers/mime-types';

import authorize from '../../authorize';
import mediaInputType from '../../types/media-input';
import mediaType from '../../types/media';
import MediaModel from '../../../models/media';

export default {
  type: mediaType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(mediaInputType)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const mediaModel = {};

    const id = mongoose.Types.ObjectId();
    const idStr = id.toString();

    let file = params.data.file;

    const mimetype = fileMimetype(file);
    const relativePath = path.join('media', idStr);
    const filePath = path.join('.', 'public', relativePath);
    file = await writeFile(file, filePath);

    // Image Upload
    if (getMediaType(mimetype) === 'image') {
      const {thumbnailPath, metadata} = await createImageThumbnail(
        file.destPath,
        filePath,
        {
          width: 100,
          height: 100,
          quality: 100
        }
      );

      Object.assign(mediaModel, {
        dimension: {
          width: metadata.width,
          height: metadata.height
        },
        thumbnail: path.join(relativePath, thumbnailPath)
      });
    }

    // Create and save a new `MediaModel`
    const media = new MediaModel(Object.assign(mediaModel, {
      _id: id,
      name: file.filename,
      fileName: file.filename,
      type: mimetype,
      size: filesize(file.size).human(),
      filesize: file.size,
      absoluteUrl: file.destPath,
      url: path.join(relativePath, file.filename)
    }));

    const newMedia = await media.save();

    if (!newMedia) {
      throw new Error('Error adding new media');
    }

    return newMedia;
  }
};
