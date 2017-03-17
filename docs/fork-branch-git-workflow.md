# fork-branch-git-workflow

There are several git workflows, the fork branch is one of the most common.

It involves several repositories which allow the official maintainer to accept commits (through pull requests) from any developer without giving them write access to the official repository.

**Here are the steps of the workflow:**
1. fork the official repository from github
1. clone the forked repository to a local env:
  - `git clone https://github.com/nicolas-briemant/peep.git`
1. add a remote for the official repository:
  - `git remote add upstream https://github.com/redpelicans/peep.git`
  - *upstream is the name of the remote of the official repository*
  - `git remove -v` to see all remotes
1. work on a feature:
  1. create a feature branch:
    - `git checkout develop && git checkout -b new-feature`
  1. push the feature to the forked repository
    - `git push -u origin new-feature`
    - *origin is the name of the remote of the forked repository*
  1. commit changes
  1. push changes
    - `git push` is the equivalent of `git push origin new-feature` if `push.default=matching`
    - `git config --list` to see local git config
1. create a pull request from the feature branch to the official repository:
  - on github
  - source is forked repository(new-feature branch)
  - target is official repository(develop branch)
1. Sync and clean the forked repository when the pull request is accepted:
  - `git checkout develop`
  - `git pull upstream develop` to sync local develop regarding the official repository
  - `git push origin develop` to sync forked develop
  - generally, after a successful pull request, the branch is deleted, use `git fetch --prune` to update your local branch references
  - remove your local branch