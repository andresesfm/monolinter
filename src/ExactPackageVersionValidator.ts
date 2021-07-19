import {Validator} from "./Validator";

/**
 * Checks that all versions are exact, meaning no ~ or ^
 */
export class ExactPackageVersionValidator implements Validator {
    private depFileMap = {};

    constructor() {
        console.log("Validating  Packages");
    }

    addDependency(dependency: string, version: string, filename: string) {
        if (version.startsWith("^") || version.startsWith("^")) {
            this.depFileMap[dependency] = {dependency, version, filename};
        }
    }

    validate(): boolean {
        let isValid = true;
        Object.keys(this.depFileMap).forEach((dep) => {
            if (isValid) {
                console.log(
                    "The following dependencies are not exact, please check them"
                );
                isValid = false;
            }
            console.log(dep, this.depFileMap[dep]);
        });
        return isValid;
    }
}
