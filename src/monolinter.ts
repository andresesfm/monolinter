import fs from 'fs'
import globby from 'globby'
import { RelatedPackagesValidator } from './RelatedPackagesValidator'
import { ConsistentPackageVersionValidator } from './ConsistentPackageVersionValidator'
import { ExactPackageVersionValidator } from './ExactPackageVersionValidator'
import { DuplicatePackageValidator } from './DuplicatePackageValidator'

const validators = [
  new ConsistentPackageVersionValidator(),
  new DuplicatePackageValidator(),
  new ExactPackageVersionValidator(),
  new RelatedPackagesValidator(),
]

/**
 Finds and reports inconsistencies between packages,
 */
export default async function lint(globs: string[]): Promise<number> {
  console.log('Validating package.json filenames in monorepo')
  const filenames = await globby(globs)
  filenames.forEach((filename) => {
    const rawdata = fs.readFileSync(filename)
    const packageJson = JSON.parse(rawdata.toString())
    console.log(`Processing ${packageJson.name}: ${filename} ...`)
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }
    Object.keys(deps).forEach((dep) => {
      const version = deps[dep]
      validators.forEach((validator) => {
        validator.addDependency(dep, version, filename)
      })
    })
  })

  const valid = validators.every((validator) => validator.validate())
  if (valid) {
    console.log('No validation errors found in dependencies')
    return 0
  } else if (!process.argv.includes('--no-verify')) {
    console.error(
      'Please fix before continuing, use flag --no-verify to ignore',
    )
    return 1
  }
}
