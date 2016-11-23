---
layout: default
id: installation/docker
title: Docker
---

Before you start using Relax you must have Docker on your system. Please check
their [documentation](https://docs.docker.com/) if you need more information
about it.

We continuously build our official Docker image into Docker's registry. To use
our latest docker image you just have to have MongoDB running on a different
container and link it to Relax.

To start MongoDB in the background you can run  `docker run -d --name mongo mongo`.
Afterwards run `docker run -p 8080:8080 --link mongo -it relax/relax` to start
Relax on `http://localhost:8080`.


Docker Compose
--------------

Relax ships with a `docker-compose` file ready to start everything needed by
running a single command.


### Data Volumes

The `docker-compose.yml` comes configured with two external volumes that must be
defined by the user before we can start the stack, they are `relax-media` and
`relax-mongo`, they store file uploads and MongoDB data, respectively. To create
them run:

```sh
docker volume create --name relax-media
docker volume create --name relax-mongo
```

You can check where their located by running `docker volume inspect relax-media`
or `docker volume inspect relax-mongo`.


### Start Relaxing

To start relaxing, run the following commands from Relax's root directory:

```sh
cd docker
docker-compose up -d
```

You should be able to access the instance of Relax through
`http://localhost:8080`.
