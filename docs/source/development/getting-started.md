---
layout: default
id: development/getting-started
title: Getting Started Into Development
---

To contribute or make your own custom page builder elements you'll need to run
Relax in development mode. First start by cloning Relax's repo if you haven't
already:

```bash
git clone git@github.com:relax/relax.git
cd relax
```

After this you just have to install the dependencies using Yarn:

```bash
yarn
```

And then you can run Relax in dev mode:

```bash
yarn dev
```

First build might take up to a minute or two but don't worry it has a fast hot
reloading build after. You know it's ready when you see the message
`debug: URL: http://localhost:8080`.

This means you can now open Relax at [http://localhost:8080](http://localhost:8080).
You might be redirected to the init route if you still don't have any users, if
this is the case create an user and login.
