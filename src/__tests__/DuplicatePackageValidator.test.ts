import { DuplicatePackageValidator } from "../DuplicatePackageValidator";

let validator: DuplicatePackageValidator;
beforeEach(()=>{
    validator = new DuplicatePackageValidator();
})
test('Should pass  dependencies are unique',()=>{
    validator.addDependency('dep','0.0.1','package.json')
    validator.addDependency('pep','0.0.1','package.json')
    expect(validator.validate()).toBeTruthy()
})

test('should fail validation when dep is added more than once', () => {
    validator.addDependency('dep','1.0.1','package.json')
    validator.addDependency('dep','1.0.2','package.json')
    expect(validator.validate()).toBeFalsy()
})
