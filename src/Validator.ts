/**
 * Checks for the same package version to be used accross all package.json files
 */
export interface Validator {
  addDependency(dependency: string, version: string, filename: string): void;

  validate(): boolean;
}
