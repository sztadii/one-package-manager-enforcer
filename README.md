# Welcome to **[one-package-manager-enforcer](https://github.com/sztadii/one-package-manager-enforcer)**!

## Why

When many developers are working on the same project each of them can use the different package manager ( npm, yarn or bower ),
but using multi-lock files can make some small issues. 
To prevent it I created this package.

## Requirements

Available `npx` ( execute npm package binaries - default tool in latest npm )

### Run it with `preinstall` hook. We support only `npm` and `yarn` ( by default we support npm )

Example for yarn
```
"scripts": {
  "preinstall": "REQUIRED=yarn npx one-package-manager-enforcer"
  ...
}
```

Example for npm
``` 
"scripts": {
  "preinstall": "npx one-package-manager-enforcer"
  ...
}
```
