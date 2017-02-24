export default function validateMailConfig (config, settingsIds) {
  let i;
  let allSetup = true;
  for (i = 0; i < settingsIds.length; i++) {
    if (!config[settingsIds[i]]) {
      allSetup = false;
      break;
    }
  }
  return (allSetup) ? config : false;
}
