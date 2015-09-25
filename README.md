![Relax CMS](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/logo_small.png "Relax logo")
====================================
[![Slack Status](http://slack-relax.herokuapp.com/badge.svg)](http://slack-relax.herokuapp.com/)

Relax is a powerful new generation CMS on top of
[React](https://facebook.github.io/react/) and [Node.js](https://nodejs.org/en/)
which aims for a better way of building websites.

It features a live page builder based on components and a smart and easy way of
binding dynamic data to them.

We're currently working on releasing the beta version which should come up early October. If you want to collaborate in the meantime or just say anything join us at [Relax Slack](http://slack-relax.herokuapp.com/)

![Relax Screenshot](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/screenshot.jpg "Relax screenshot")


Installation
------------

### Dependencies

You'll need `graphicsmagick` available on your system. Install it using `brew`
on Mac or from most of the package managers in Linux.

You'll also need [MongoDB](https://www.mongodb.org/).

### How to Relax

Since we are yet to tag our first release, git clone this repository and run
`npm install` followed by `npm start`.

By default the application runs at port `8080`. Go ahead and visit
`http://localhost:8080/admin/init`, here you can setup the first user and you're ready to relax.


Configuration
-------------

To configure the application you can use a `.relaxrc` file. You can place it
next to the application, on any parent folder, in your `HOME` folder, etc.

You can find a sample with the default values [here](.relaxrc.sample).


Contributing
------------

### Build

#### Development

While in development it's convenient to keep your application running while
watching for changes, for that you can run `npm run dev`.

The application will automatically restart when needed and keep your bundles
up to date.

#### Production

To build your assets ready to go for production run `npm run build`.


License
-------

Relax is [GPL-3 licensed](LICENSE).


Troubleshooting
---------------

Please create [an issue](https://github.com/relax/relax/issues/new).
