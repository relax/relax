Roadmap
=======

v1.0.0-Beta (Spring 2016)
-------------------------

Since the start of the project we've been through some major refactors in
order to achieve the desired stack and experience to finally have a first stable
release.

We've changed from a RESTful API into a GraphQL API, while also changing the data
architecture in the front end to include Redux.

Our first dashboard was also not designed at all because our focus was mainly on
the page builder. We're now finally tuning up the entire admin experience
so that we can make it as relaxed as possible.

Below you can find the major things that are still in the road we're going through to
reach the beta release, there are of course other minor issues that can be found
[here](https://github.com/relax/relax/milestones/1.0.0-Beta).

**What must be done:**
- [ ] Dashboard (*ongoing*) (#214)
  - [ ] Settings
  - [ ] Pages
  - [ ] Menus
  - [ ] Schemas
  - [ ] Fonts
  - [ ] Users
  - [ ] Media
  - [ ] Symbols
- [ ] Link Element
  - [ ] Allow to navigate to another page
  - [ ] Allow to go an absolute URL
  - [ ] Allow anchoring (with sections)
- [ ] Forms
  - [ ] Compose e-mail and set where the e-mail should be sent to
- [ ] Symbols Management
  - [x] Manage through context menu (#208)
  - [ ] Edit symbol content (#209)
  - [ ] Delete symbol through context menu
- [ ] Page Templates (#133)
  - [ ] Save page as template
  - [ ] Use template as a schema *single* template
  - [ ] Use template as a starting point to a page
- [ ] Input option types (#158)
- [ ] Schema entry *singles* (#127)
- [ ] Import/export database
  - [ ] Export theme (#56)
  - [ ] Export data
  - [ ] Export all
- [ ] Users
  - [ ] Recover password
  - [ ] Change password
  - [ ] Edit basic info
- [ ] Third party elements API (#55)
- [ ] Developer API Documentation (#53)

**If we have time:**
- [ ] Link forms to schemas (#124)
- [ ] User account activation
- [ ] User roles management
- [ ] Schema entry single override template (#128)
- [ ] Docker image (#213)

There are no optional issues, we really want to have everything as polished as
possible for the first release.

Feel free to create missing issues or discuss some of the features in the issues
section or with us over Slack. All help and feedback is welcome.
