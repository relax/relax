---
layout: default
id: installation/installation
title: Installing
---

## Dependencies

Relax uses [sharp](https://github.com/lovell/sharp) to resize images. If you're using OS X and have libvips installed globally, e.g. via brew, it may cause problems with sharp's compilation. You may need to uninstall via `brew remove libvips`. See https://github.com/lovell/sharp/issues/602 for more information.

You'll also need [`yarn`](https://yarnpkg.com) and [MongoDB](https://www.mongodb.org/).

## Install

Installation is pretty straightforward if you have all the needed dependencies. Start by cloning the Relax repo:

```bash
git clone git@github.com:relax/relax.git
cd relax
```

Then you just need to install the dependencies, build the project and run the application:

```bash
yarn
yarn build
yarn start
```

That's it! After these commands finish Relax will tell you it's running.

## Configuration

To configure the application you can use a `.relaxrc` file. You can place it next to the application, on any parent folder, in your `HOME` folder, etc.

You can find a sample with the default values [here](.relaxrc.sample).
