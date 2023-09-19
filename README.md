# Boilerplate

## Developing

Install NPM dependencies

`yarn`

Watch for file changes and rebuild assets

`bin/dev`

## Starting a new project

- Clone this repo into your new project `git clone git@github.com:dylanfisher/bp.git my-new-project`
- Change to your new project directory `cd my-new-project`
- Remove the existing git directory `rm -rf .git`
- Initialize a new repo `git init`

## Exclude dist directories from your code environment

In Sublime Text, add the following to your `.sublime-project` file

```
  "folder_exclude_patterns": ["dist", "build", "/Users/my-user-name/projects/my-new-project/wp-content/themes/my-new-project/vendor"],
  "file_exclude_patterns": ["style.css"]
```
