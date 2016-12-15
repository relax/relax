import actionTypes from 'actions';


import mediaReducer, {defaultState} from '../media';



describe('Media Reducer', () => {
  it('should return the initial state', () => {
    expect(mediaReducer(defaultState, {})).toBe(defaultState);
  });

  it('should handle ADD_MEDIA_FILES_TO_UPLOAD', () => {
    const action = {
      type: actionTypes.addFilesToUpload,
      files: [
        {id: 1, name: 'File One'},
        {id: 2, name: 'File Two'}
      ]
    };
    const result = mediaReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.uploads).toHaveLength(2);
    expect(result.uploads[0].id).toBe(1);
    expect(result.uploads[0].name).toBe(action.files[0].name);
    expect(result.uploads[1].id).toBe(2);
    expect(result.uploads[1].name).toBe(action.files[1].name);
    expect(result.uploads[1].states).toBe('queue');
  });

  it('should handle CHANGE_MEDIA_DISPLAY', () => {
    const action = {
      type: actionTypes.changeMediaDisplay,
      display: true
    };
    const result = mediaReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.display).toBe(action.display);
  });

  it('should handle UPLOADING_MEDIA', () => {
    const action = {
      type: actionTypes.uploadingMedia,
      fileId: 1
    };
    const localState = defaultState;
    defaultState.uploads = [{id: 1, name: 'File One'}, {id: 2, name: 'File Two'}];

    expect(mediaReducer(defaultState, action)).toBeInstanceOf(Object);
    expect(mediaReducer(localState, action).uploads[0].status).toBe('uploading');
  });

  it('should handle UPLOAD_MEDIA_SUCCESS', () => {
    const action = {
      type: actionTypes.mediaUploadSuccess,
      fileId: 1
    };
    const localState = defaultState;
    defaultState.uploads = [{id: 1, name: 'File One'}, {id: 2, name: 'File Two'}];

    expect(mediaReducer(defaultState, action)).toBeInstanceOf(Object);
    expect(mediaReducer(localState, action).uploads[0].status).toBe('success');
  });

  it('should handle UPLOAD_MEDIA_ERROR', () => {
    const action = {
      type: actionTypes.mediaUploadError,
      fileId: 1
    };
    const localState = defaultState;
    defaultState.uploads = [{id: 1, name: 'File One'}, {id: 2, name: 'File Two'}];

    expect(mediaReducer(defaultState, action)).toBeInstanceOf(Object);
    expect(mediaReducer(localState, action).uploads[0].status).toBe('error');
  });
});
