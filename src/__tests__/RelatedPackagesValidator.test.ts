import { RelatedPackagesValidator } from "../RelatedPackagesValidator";

var validator: RelatedPackagesValidator;
beforeEach(()=>{
    validator = new RelatedPackagesValidator();
})
test('Should pass dependencies are not in related list',()=>{
    validator.addDependency('dep','0.0.1','package.json')
    validator.addDependency('pep','0.0.1','package.json')
    expect(validator.validate()).toBeTruthy()
})

test('should fail validation when dep is added more than once', () => {
    validator.addDependency("babel-plugin-react-native-web",'1.0.1','package.json')
    validator.addDependency("react-native-web",'1.0.2','package.json')
    expect(validator.validate()).toBeFalsy()
})