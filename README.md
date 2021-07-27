# Monolinter
The goal of this package is to have a set of utilities to lint monorepos.

## Validation Modules:
- Consistent package versions: Checks that packages declared accross subprojects have matching verssions
- Duplicate packages: withing the same file, it prevents duplicate declaration of the same package, this happens accross devDependencies and depenencies
- Exact package versions: prevents using fuzzy versions (starting with `^` or `~`) that might cause inconsistent builds
- Related packages: some packages should have matching versions. For example  "react-native-web" and "babel-plugin-react-native-web". Hoever there's no way to enforce that until now ;)

## Installation
```
yarn add monolinter -d
```
## Usage
Create a file called `.monolinterrc` in your root folder with the following configuration:
```
{
 "include":["package.json","mypackagespath/**/package.json"]
}
```
the included paths can be glob expressions.

In order to run from command line, you can call it directly instead
```
yarn monolinter package.json [list of globs to other package.json files]
```



Tutorial Credits for creating this package:
https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

https://medium.com/wizardnet972/write-a-simple-node-executable-with-typescript-and-vscode-97c58adca02d

https://medium.com/jspoint/creating-cli-executable-global-npm-module-5ef734febe32