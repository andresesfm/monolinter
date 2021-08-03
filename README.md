# Monolinter
When woriking in a monorepo, often we find that some subprojects's package dependencies diverge, leading to unexpected results. Monolinter reads all provided `package.json`'s files and validates their consistency. The validation can be run as part of your CI/CD process.

Note: validations are useful / can be applied even if your project only has one `package.json`

Monolinter was designed to be modular and easily extensible with validation modules

## Validation Modules:
- Consistent package versions: Checks that packages declared accross subprojects have matching versions. For example if `app1/package.json` has a dependency to `depA` version `1.0.0` but `app2/package.json` has a dependency to `depA` version `2.0.0` the validation will fail

- Duplicate packages: withing the same file, it prevents duplicate declaration of the same package, this happens accross `devDependencies` and `dependencies`. If the same dependency `depA` is found more than once in dependencies of `package.json`. 

- Exact package versions: prevents using fuzzy versions (starting with `^` or `~`) that might cause inconsistent builds. For example if `package.json` contains `depA` version `^1.0.0` this validation will fail as `^1.0.0` might lead to inconsistencies.

- Related packages: some packages should have matching versions. For example  `"react-native-web"` and `"babel-plugin-react-native-web"`. Hoever there's no way to enforce that until now. Please contribute more such packages to this repo.

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

# Contributing
Contributions are welcome, please create a PR, open an issue or start a discussion.


Tutorial Credits for creating this package:
https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

https://medium.com/wizardnet972/write-a-simple-node-executable-with-typescript-and-vscode-97c58adca02d

https://medium.com/jspoint/creating-cli-executable-global-npm-module-5ef734febe32