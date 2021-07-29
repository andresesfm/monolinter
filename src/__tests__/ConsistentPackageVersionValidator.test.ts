import { ConsistentPackageVersionValidator } from "../ConsistentPackageVersionValidator";

var validator: ConsistentPackageVersionValidator;
beforeEach(()=>{
    validator = new ConsistentPackageVersionValidator();
})
test('Should pass when versions match',()=>{
    validator.addDependency('dep','0.0.1','package.json')
    validator.addDependency('dep','0.0.1','apps/package.json')
    expect(validator.validate()).toBeTruthy()
})

test('should fail validation when versions don\'t match', () => {
    validator.addDependency('dep','1.0.1','package.json')
    validator.addDependency('dep','1.0.2','apps/package.json')
    expect(validator.validate()).toBeFalsy()
})
