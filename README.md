**IMPORTANT NOTE:** This project is no longer maintained or active. In the meantime we've started a simillar but different project that we felt was lacking and should exist, a professional tool for web developers and designers, a Unity for the web. After more than 4 years in the making we've now launched on [ProductHunt](https://www.producthunt.com/posts/clutch-3). Clutch is low code tool that streamlines a professional team workflow and allows them to move together and faster. Go check it out and join us in our [community slack](https://join.slack.com/t/clutch-community/shared_invite/zt-s33mb7is-sC_8Ruk31n~bO~_PCTPa7Q), eager to hear everyone's feedback and thoughts. The tool is free to use!


What is Relax
-------

Relax is a powerful new generation CMS on top of
[React](https://facebook.github.io/react/) and [Node.js](https://nodejs.org/en/)
which aims for a better way of building websites.

It features a live page builder based on components and a smart and easy way of
binding dynamic data to them.

Our goal with Relax is to update the world with a new standard, having as the basic premise that anyone should be able to create a website without having to code.

We're currently working on releasing the beta version which should come up in December. If you want to collaborate in the meantime or just say anything join us at [Relax Slack](http://slack-relax.herokuapp.com/).

Relax isn't yet ready for production, stay tuned for releases, beta version will come soon. You can see what we're working on [here](https://github.com/relax/relax/projects/1) and what's missing in the [beta milestone](https://github.com/relax/relax/milestone/1).

Installation
-------

### Dependencies

Relax uses [sharp](https://github.com/lovell/sharp) to resize images.
If you're using OS X and have libvips installed globally, e.g. via brew,
it may cause problems with sharp's compilation. You may need to uninstall
via `brew remove libvips`. See https://github.com/lovell/sharp/issues/602
for more information.

You'll also need [`yarn`](https://yarnpkg.com) and [MongoDB](https://www.mongodb.org/).

### How to Relax

Since we are yet to tag our first release, git clone this repository and run the following commands:

```bash
yarn
yarn build
yarn start
```

By default the application runs at port `8080`. Go ahead and visit
`http://localhost:8080/admin/init`, here you can setup the first user and you're ready to relax.


### Configuration

To configure the application you can use a `.relaxrc` file. You can place it
next to the application, on any parent folder, in your `HOME` folder, etc.

You can find a sample with the default values [here](.relaxrc.sample).


Contributing
-------

### Build and start

#### Development

While in development it's convenient to keep your application running while
watching for changes, for that you can run `yarn dev`.

The application will automatically restart when needed and keep your bundles
up to date.

#### Production

To build your assets ready to go for production run `yarn build` and `yarn start` to start the application.

##### With Docker

To use our latest docker image you just have to have MongoDB running on a
different container and link it to Relax.

To start MongoDB in the background you can run  `docker run -d --name mongo mongo`.
Afterwards run `docker run -p 8080:8080 --link mongo -it relax/relax` to start
Relax on `http://localhost:8080`.

For more information about Docker please check their
[documentation](https://docs.docker.com/).

License
-------

Relax is [GPL-3 licensed](LICENSE).


Troubleshooting
---------------

Please create [an issue](https://github.com/relax/relax/issues/new).
