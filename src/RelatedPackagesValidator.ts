import { Validator } from "./Validator";

/**
 * Validates package groups that should match for best compatibility
 */
export class RelatedPackagesValidator implements Validator {
  /** List of related dependencies that should share the same version number */
  private depsGroups: string[][] = [
    ["babel-plugin-react-native-web", "react-native-web"],
  ];

  private depsGroupsMap: { [key: string]: string } = {};

  private depFileGroupMap: {
    [key: string]: { [key: string]: { [key: string]: string[] } };
  } = {};

  constructor() {
    console.log("Validating Related packages");
    this.depsGroupsMap = this.depsGroups.reduce(
      (map: { [key: string]: string }, arr: string[], index) => {
        arr.forEach((element) => {
          map[element] = index.toString(); // eslint-disable-line no-param-reassign
        });
        return map;
      },
      {}
    );
  }

  addDependency(dependency: string, version: string, filename: string): void {
    const groupKey = this.depsGroupsMap[dependency];
    if (dependency in this.depsGroupsMap) {
      if (!(groupKey in this.depFileGroupMap)) {
        this.depFileGroupMap[groupKey] = {};
      }
      if (!(version in this.depFileGroupMap[groupKey])) {
        this.depFileGroupMap[groupKey][version] = {};
      }
      if (!(dependency in this.depFileGroupMap[groupKey][version])) {
        this.depFileGroupMap[groupKey][version][dependency] = [];
      }
      this.depFileGroupMap[groupKey][version][dependency].push(filename);
    }
  }

  validate(): boolean {
    let isValid = true;
    Object.keys(this.depFileGroupMap).forEach((group) => {
      if (Object.keys(this.depFileGroupMap[group]).length > 1) {
        if (isValid) {
          console.log(
            "The following dependencies versions should match, please check them"
          );
          isValid = false;
        }
        console.log(this.depsGroups[+group], this.depFileGroupMap[group]);
      }
    });
    return isValid;
  }
}
