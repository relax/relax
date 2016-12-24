const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'image/gif',
  'image/vnd.microsoft.icon',
  'image/x-icon'
];
const ICON_MIME_TYPES = ['image/vnd.microsoft.icon', 'image/x-icon'];
const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const AUDIO_MIME_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/ogg', 'audio/wav'];

export function getMediaType (mimeType) {
  let result = '';
  if (ICON_MIME_TYPES.indexOf(mimeType) !== -1) {
    result = 'favicon';
  } else if (IMAGE_MIME_TYPES.indexOf(mimeType) !== -1) {
    result = 'image';
  } else if (VIDEO_MIME_TYPES.indexOf(mimeType) !== -1) {
    result = 'video';
  } else if (AUDIO_MIME_TYPES.indexOf(mimeType) !== -1) {
    result = 'audio';
  }
  return result;
}

export function getMimeTypes (type) {
  switch (type) {
    case 'favicon':
      return ICON_MIME_TYPES;
    case 'image':
      return IMAGE_MIME_TYPES;
    case 'video':
      return VIDEO_MIME_TYPES;
    case 'audio':
      return AUDIO_MIME_TYPES;
    default:
      return false;
  }
}
