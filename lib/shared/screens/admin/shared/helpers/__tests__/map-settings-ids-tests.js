import {expect} from 'chai';
import mapSettingsIds from '../map-settings-ids';
import fixtures from './_fixtures/options';

describe('Map Settings IDS Suite: ', () => {
  it('should return empty array if options is not an array', () => {
    const ids = mapSettingsIds(null);
    expect(ids.length).to.equal(0);
  });
  it('should return empty array if options is an array of non plain objects', () => {
    const ids = mapSettingsIds(fixtures.nonObject);
    expect(ids.length).to.equal(0);
  });
  it('should return empty array if no ids found', () => {
    const ids = mapSettingsIds([fixtures.empty]);
    expect(ids.length).to.equal(0);
  });
  it('should return array of ids when found on top level objects in options list', () => {
    const expected = ['title', 'frontpage', 'favicon', 'webclip'];
    const ids = mapSettingsIds(fixtures.simple);
    expect(ids).to.eql(expected);
  });

  describe('When options property is present: ', () => {
    it('should return array of ids found in deep options list', () => {
      const expected = ['title', 'frontpage', 'favicon', 'webclip'];
      const ids = mapSettingsIds(fixtures.deepOptions);
      expect(ids).to.eql(expected);
    });
  });

  describe('When unlocks property is present: ', () => {
    it('should return array of ids found in deep unlocks list', () => {
      const expected = ['title', 'frontpage', 'favicon', 'webclip'];
      const ids = mapSettingsIds(fixtures.deepUnlocks);
      expect(ids).to.eql(expected);
    });
    it('should return array of non-duplicated ids found in deep unlocks list', () => {
      const expected = ['title', 'frontpage', 'favicon', 'webclip'];
      const ids = mapSettingsIds(fixtures.deepUnlocksDuplicateKey);
      expect(ids).to.eql(expected);
    });
    it('should return non-duplicated array of ids found list of depth 3', () => {
      const expected = ['title', 'frontpage', 'favicon', 'webclip'];
      const ids = mapSettingsIds(fixtures.deepUnlocksDuplicateKeyDepth3);
      expect(ids).to.eql(expected);
    });
  });
});
