import actionTypes from 'actions';
import chai from 'chai';

import mediaReducer, {defaultState} from '../media';

const expect = chai.expect;

describe('Media Reducer', () => {
  it('should return the initial state', () => {
    expect(mediaReducer(defaultState, {})).to.equal(defaultState);
  });

  it('should handle ADD_MEDIA_FILES_TO_UPLOAD', () => {
    const action = {
      type: actionTypes.addFilesToUpload,
      files: [
        {id: 1, name: 'File One'},
        {id: 2, name: 'File Two'}
      ]
    };

    expect(mediaReducer(defaultState, action)).to.be.an('object');
    expect(mediaReducer(defaultState, action)).to.have.property('uploads').with.length(2);
    expect(mediaReducer(defaultState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[0]')
      .to.have.property('id').to.equal(1);
    expect(mediaReducer(defaultState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[0]')
      .to.have.property('name').to.equal(action.files[0].name);
    expect(mediaReducer(defaultState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[1]')
      .to.have.property('id').to.equal(2);
    expect(mediaReducer(defaultState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[1]')
      .to.have.property('name').to.equal(action.files[1].name);
    expect(mediaReducer(defaultState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[1]')
      .to.have.property('status').to.equal('queue');
  });

  it('should handle CHANGE_MEDIA_DISPLAY', () => {
    const action = {
      type: actionTypes.changeMediaDisplay,
      display: true
    };
    expect(mediaReducer(defaultState, action)).to.be.an('object');
    expect(mediaReducer(defaultState, action))
      .to.have.property('display')
      .to.equal(action.display);
  });

  it('should handle UPLOADING_MEDIA', () => {
    const action = {
      type: actionTypes.uploadingMedia,
      fileId: 1
    };
    const localState = defaultState;
    defaultState.uploads = [{id: 1, name: 'File One'}, {id: 2, name: 'File Two'}];

    expect(mediaReducer(defaultState, action)).to.be.an('object');
    expect(mediaReducer(localState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[0]')
      // without deep property it won't be able to find the key
      .to.have.property('status').to.equal('uploading');
  });

  it('should handle UPLOAD_MEDIA_SUCCESS', () => {
    const action = {
      type: actionTypes.mediaUploadSuccess,
      fileId: 1
    };
    const localState = defaultState;
    defaultState.uploads = [{id: 1, name: 'File One'}, {id: 2, name: 'File Two'}];

    expect(mediaReducer(defaultState, action)).to.be.an('object');
    expect(mediaReducer(localState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[0]')
      // without deep property it won't be able to find the key
      .to.have.property('status').to.equal('success');
  });

  it('should handle UPLOAD_MEDIA_ERROR', () => {
    const action = {
      type: actionTypes.mediaUploadError,
      fileId: 1
    };
    const localState = defaultState;
    defaultState.uploads = [{id: 1, name: 'File One'}, {id: 2, name: 'File Two'}];

    expect(mediaReducer(defaultState, action)).to.be.an('object');
    expect(mediaReducer(localState, action))
      .to.have.property('uploads')
      .that.is.an('array')
      .with.deep.property('[0]')
      // without deep property it won't be able to find the key
      .to.have.property('status').to.equal('error');
  });
});
