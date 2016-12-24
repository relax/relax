---
layout: default
id: development/contributing
title: Contributing
---

We're always open for contributors and your help is essential for this project's
success and survival. Contributions come in every form, not only from code, it
is also crucial that we get feedback on bugs, things to improve or suggestions
of any kind.

## Issues

Issues is what we use to keep track of what everyone's doing, what's to do,
problems and new features to implement. If you have any problem when using Relax
create an issue. A problem can be a bug, a feature suggestion or just about
anything relative to the project. We do recommend:

* **Check existing issues** for your issue. Duplicating an issue is slower for
both parties so search through open and closed issues to see if what you’re
running into has been addressed already.
* **Be clear** about what your problem is: what was the expected outcome, what
happened instead? Detail how someone else can recreate the problem.
* **Include system details** like what browser and operating system you’re using
and its version.
* **Paste error output** or logs in your issue or in a Gist. If pasting them in
the issue, wrap it in three backticks so that it renders nicely.

## Pull Request

If you want to contribute with actual code, you're awesome! There's just a few
things you need to comply with:

### Start With an Issue

If you're planning on contributing but don't know where, the best thing for you
is to look into the opened issues and choose one to tackle. Make sure you let us
know you'll pick up the issue by commenting on the issue, so that multiple people
aren't trying to fix the same thing.

### Eslint Configuration

We use an eslint configuration to ensure the projects' code is coherent. Having
this enabled in your editor is the best way to avoid errors.

If you want to make sure you can also run the command `yarn eslint` which will
validate the entire project and output any error it finds. We won't accept a PR
that doesn't pass this test.

### Unit Tests

When possible include unit tests in your pull requests. This helps in ensuring
your code runs as expected and leads to it being accepted quicker.
