import forEach from 'lodash/forEach';

export default function parseSettings (_settings) {
  const settings = {};

  forEach(_settings, (setting) => {
    settings[setting._id] = setting.value;
  });

  return settings;
}
