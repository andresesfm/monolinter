import { ExactPackageVersionValidator } from "../ExactPackageVersionValidator";

let validator: ExactPackageVersionValidator;
beforeEach(()=>{
    validator = new ExactPackageVersionValidator();
})
test('Should pass as version is exact',()=>{
    validator.addDependency('dep','0.0.1','package.json')
    expect(validator.validate()).toBeTruthy()
})

test('should fail validation', () => {
    validator.addDependency('dep','~1.0.1','package.json')
    expect(validator.validate()).toBeFalsy()
})

test('should fail validation', () => {
    validator.addDependency('dep','^1.0.1','package.json')
    expect(validator.validate()).toBeFalsy()
})
