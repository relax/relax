export default function getWebFontLoader (input) {
  const result = {};

  // Google
  if (input.googleValid) {
    const paramsSplit = input.googleInput.split('?');

    if (paramsSplit.length === 2) {
      const params = {};
      const re = /[?&]?([^=]+)=([^&]*)/g;
      let tokens = re.exec(paramsSplit[1]);

      while (tokens) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        tokens = re.exec(paramsSplit[1]);
      }

      if (params.family) {
        result.google = {
          families: []
        };

        // Object {family: "Lobster|Open+Sans:400,700", subset: "latin,cyrillic-ext,cyrillic"}
        const families = params.family.split('|');
        for (let i = 0; i < families.length; i++) {
          let googleFont = families[i];

          // Might not have multiple weights
          if (families[i].indexOf(':') === -1) {
            googleFont += ':';
          }

          if (params.subset) {
            googleFont += `:${params.subset}`;
          } else {
            googleFont += ':latin';
          }

          result.google.families.push(googleFont);
        }
      }
    }
  }

  // Typekit
  if (input.typekitValid) {
    result.typekit = {
      id: input.typekitInput
    };
  }

  // Fontdeck
  if (input.fontdeckValid) {
    result.fontdeck = {
      id: input.fontdeckInput
    };
  }

  // Monotype
  if (input.monotypeValid) {
    result.monotype = {
      projectId: input.monotypeInput
    };
  }

  // Custom fonts

  return result;
}
