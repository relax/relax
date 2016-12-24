## Documentation

Documentation is generated using [Hexo](https://hexo.io/).

To run the documentation locally, clone the relax repo, if you haven't already, and `cd` into the docs folder:

```bash
git clone git@github.com:relax/relax.git
cd relax/docs
```

Install the dependencies with Yarn:

```bash
yarn
```

Now to start the documentation app just run:

```bash
yarn dev
```

After generating you can now open [http://localhost:4000/relax/](http://localhost:4000/relax/), when making changes you don't need to run anything or even refresh the browser window as it should reload on changes by itself :-)

### Deployment (relax members only)

```bash
yarn deploy
```
