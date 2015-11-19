import forEach from 'lodash.foreach';

export default function parseSettings (_settings) {
  var settings = {};

  forEach(_settings, (setting) => {
    settings[setting._id] = setting.value;
  });

  return settings;
}
