# fork-branch-git-workflow

> There are several git workflows, the fork branch is one of the most common.

> It involves several repositories which allow the official maintainer to accept commits (through pull requests) from any developer without giving them write access to the official repository.

Here are the steps of the workflow:

**1. fork the official repository (from github)**

**2. clone the forked repository to a local env:**
  - `git clone https://github.com/nicolas-briemant/peep.git`

**3. add a remote for the official repository:**
  - `git remote add upstream https://github.com/redpelicans/peep.git`
  - *upstream is the name of the remote of the official repository*
  - `git remove -v` to see all remotes

**4. work on a feature:**
  - create a feature branch:
    - `git checkout develop`
    - `git checkout -b new-feature`
  - push the feature to the forked repository:
    - `git push -u origin new-feature` (origin is the name of the remote of the forked repository)
  - commit changes
  - push changes:
    - `git push` is the equivalent of `git push origin new-feature` if `push.default=matching`
    - `git config --list` to see local git config

**5. create a pull request from the feature branch to the official repository (from github):**
  - source is forked repository(new-feature branch)
  - target is official repository(develop branch)

**6. sync and clean the forked repository when the pull request is accepted:**
  - `git checkout develop`
  - sync local develop regarding the official repository: `git pull upstream develop`
  - sync forked develop: `git push origin develop`
  - update your local branch references: `git fetch --prune`
  - remove your local branch
