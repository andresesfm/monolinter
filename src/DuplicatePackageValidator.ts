import { Validator } from "./Validator";

/**
 * Checks that every package is declared once.
 */
export class DuplicatePackageValidator implements Validator {
  private depFileMap = {};

  constructor() {
    console.log("Validating Duplicate Packages in same file");
  }

  addDependency(dependency: string, version: string, filename: string) {
    if (!(filename in this.depFileMap)) {
      this.depFileMap[filename] = {};
    }
    if (!(dependency in this.depFileMap[filename])) {
      this.depFileMap[filename][dependency] = 1;
    } else {
      this.depFileMap[filename][dependency] += 1;
    }
  }

  validate(): boolean {
    let isValid = true;
    Object.keys(this.depFileMap).forEach((filename) => {
      Object.keys(this.depFileMap[filename]).forEach((dep) => {
        if (this.depFileMap[filename][dep] > 1) {
          if (isValid) {
            console.log(
              "The following dependencies appear more than once, please check them"
            );
            isValid = false;
          }
          console.log(dep, this.depFileMap[dep]);
        }
      });
    });
    return isValid;
  }
}
