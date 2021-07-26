import { Validator } from "./Validator";

/**
 * Checks for the same package version to be used accross all package.json files
 */
export class ConsistentPackageVersionValidator implements Validator {
  private depFileMap = {};

  constructor() {
    console.log("Validating  Packages");
  }

  addDependency(dependency: string, version: string, filename: string): void {
    if (!(dependency in this.depFileMap)) {
      this.depFileMap[dependency] = {};
    }
    if (!(version in this.depFileMap[dependency])) {
      this.depFileMap[dependency][version] = [];
    }
    this.depFileMap[dependency][version].push(filename);
  }

  validate(): boolean {
    let isValid = true;
    Object.keys(this.depFileMap).forEach((dep) => {
      if (Object.keys(this.depFileMap[dep]).length > 1) {
        if (isValid) {
          console.log(
            "The following dependencies have discrepancies, please check them"
          );
          isValid = false;
        }
        console.log(dep, this.depFileMap[dep]);
      }
    });
    return isValid;
  }
}
