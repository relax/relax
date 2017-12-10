<p align="center">
 <img src="http://relax.github.io/relax/images/logo_small.png" alt="Relax Logo">
</p>

[![Slack Status](http://slack-relax.herokuapp.com/badge.svg)](http://slack-relax.herokuapp.com/)
[![Build Status](https://travis-ci.org/relax/relax.png)](https://travis-ci.org/relax/relax)
[![OpenCollective](https://opencollective.com/relax/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/relax/sponsors/badge.svg)](#sponsors)


**IMPORTANT NOTE:** Relax isn't yet ready for production, stay tuned for releases, beta version will come soon. You can see what we're working on [here](https://github.com/relax/relax/projects/1) and what's missing in the [beta milestone](https://github.com/relax/relax/milestone/1).


What is Relax
-------

Relax is a powerful new generation CMS on top of
[React](https://facebook.github.io/react/) and [Node.js](https://nodejs.org/en/)
which aims for a better way of building websites.

It features a live page builder based on components and a smart and easy way of
binding dynamic data to them.

Our goal with Relax is to update the world with a new standard, having as the basic premise that anyone should be able to create a website without having to code.

We're currently working on releasing the beta version which should come up in December. If you want to collaborate in the meantime or just say anything join us at [Relax Slack](http://slack-relax.herokuapp.com/).


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


Support
-------

##### Backers
Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/relax#backer)]

<a href="https://opencollective.com/relax/backer/0/website" target="_blank"><img src="https://opencollective.com/relax/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/1/website" target="_blank"><img src="https://opencollective.com/relax/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/2/website" target="_blank"><img src="https://opencollective.com/relax/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/3/website" target="_blank"><img src="https://opencollective.com/relax/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/4/website" target="_blank"><img src="https://opencollective.com/relax/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/5/website" target="_blank"><img src="https://opencollective.com/relax/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/6/website" target="_blank"><img src="https://opencollective.com/relax/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/7/website" target="_blank"><img src="https://opencollective.com/relax/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/8/website" target="_blank"><img src="https://opencollective.com/relax/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/9/website" target="_blank"><img src="https://opencollective.com/relax/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/10/website" target="_blank"><img src="https://opencollective.com/relax/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/11/website" target="_blank"><img src="https://opencollective.com/relax/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/12/website" target="_blank"><img src="https://opencollective.com/relax/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/13/website" target="_blank"><img src="https://opencollective.com/relax/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/14/website" target="_blank"><img src="https://opencollective.com/relax/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/15/website" target="_blank"><img src="https://opencollective.com/relax/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/16/website" target="_blank"><img src="https://opencollective.com/relax/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/17/website" target="_blank"><img src="https://opencollective.com/relax/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/18/website" target="_blank"><img src="https://opencollective.com/relax/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/19/website" target="_blank"><img src="https://opencollective.com/relax/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/20/website" target="_blank"><img src="https://opencollective.com/relax/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/21/website" target="_blank"><img src="https://opencollective.com/relax/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/22/website" target="_blank"><img src="https://opencollective.com/relax/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/23/website" target="_blank"><img src="https://opencollective.com/relax/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/24/website" target="_blank"><img src="https://opencollective.com/relax/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/25/website" target="_blank"><img src="https://opencollective.com/relax/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/26/website" target="_blank"><img src="https://opencollective.com/relax/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/27/website" target="_blank"><img src="https://opencollective.com/relax/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/28/website" target="_blank"><img src="https://opencollective.com/relax/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/relax/backer/29/website" target="_blank"><img src="https://opencollective.com/relax/backer/29/avatar.svg"></a>


##### Sponsors
Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/relax#sponsor)]

<a href="https://opencollective.com/relax/sponsor/0/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/1/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/2/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/3/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/4/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/5/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/6/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/7/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/8/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/9/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/10/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/11/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/12/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/13/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/14/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/15/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/16/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/17/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/18/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/19/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/20/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/21/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/22/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/23/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/24/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/25/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/26/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/27/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/28/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/relax/sponsor/29/website" target="_blank"><img src="https://opencollective.com/relax/sponsor/29/avatar.svg"></a>

##### Subscription Sponsors

Thanks to these amazing companies for supporting open source projects including Relax:

<a href="https://www.digitalocean.com/" target="_blank"><img src="https://www.digitalocean.com/assets/media/logos-badges/png/DO_Logo_Horizontal_Blue-3db19536.png" height="30"></a>
<a href="https://www.browserstack.com" target="_blank"><img src="https://cdn.rawgit.com/relax/relax/gh-pages/assets/sponsors/browserstack.svg" width="150" height="70"></a>
<a href="https://www.sentry.io" target="_blank"><img src="https://a0wx592cvgzripj.global.ssl.fastly.net/_static/17a0b80a350f1c9da2119097b7bbb3fc/getsentry/images/branding/svg/sentry-horizontal-black.svg" width="150" height="70"></a>

License
-------

Relax is [GPL-3 licensed](LICENSE).


Troubleshooting
---------------

Please create [an issue](https://github.com/relax/relax/issues/new).
