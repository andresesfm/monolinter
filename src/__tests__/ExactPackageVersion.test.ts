import { ExactPackageVersionValidator } from "../ExactPackageVersionValidator";

test('Exact dependency',()=>{
    const validator = new ExactPackageVersionValidator();
    validator.addDependency('dep','0.0.1','package.json')
    expect(validator.validate()).toBeTruthy()
})