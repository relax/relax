---
layout: default
id: installation/addons
title: Addons
---

Relax supports adding custom elements developed by you, or the community, to the
page builder. To achieve this is must edit your Relax configuration file
(`.relaxrc`).

To install your custom elements through the configuration file, you must add the
following section to it:

```json
{
  "addons": [
    "element-"
  ]
}
```

All custom elements packages must have the prefix `relax-element-` in their
name. In the future we envision that we'll have other types of addons besides
elements. Keep in mind that inside the `addons` section on the configuration file
`relax-` is omitted from each addon name.

Now, next time you run `yarn` on your Relax root directory addons will be
installed in the application as well.
