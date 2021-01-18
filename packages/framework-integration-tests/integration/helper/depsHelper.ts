import { exec } from 'child-process-promise'
import * as path from 'path'
import * as fs from 'fs'

const dotBooster = '.booster'

export async function overrideWithBoosterLocalDependencies(
  projectPath: string,
  injectDependencies?: string[]
): Promise<void> {
  const projectRelativePath = path.relative(__dirname, projectPath)
  const packageJSON = require(path.join(projectRelativePath, 'package.json'))

  if (!fs.existsSync(dotBooster)) {
    fs.mkdirSync(dotBooster)
  }

  // To compile the project with the current version we need to replace all Booster dependencies
  // by the versions under development.
  for (const packageName in packageJSON.dependencies) {
    if (/@boostercloud/.test(packageName)) {
      await overrideDependency(cleanPackageName(packageName), projectPath, packageJSON)
    }
  }
  for (const packageName in packageJSON.devDependencies) {
    const dependencyName = cleanPackageName(packageName)
    if (/@boostercloud/.test(packageName) && injectDependencies?.includes(dependencyName)) {
      await overrideDependency(dependencyName, projectPath, packageJSON)
    }
  }
  fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJSON, undefined, 2))
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function overrideDependency(packageName: string, projectPath: string, packageJSON: any) {
  const execution = await exec(`npm pack ${path.join('..', '..', packageName)}`, { cwd: dotBooster })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const packedDependencyFileName = execution.stdout
    ?.trim()
    ?.split('\n')
    ?.pop()!
  const dotBoosterRelativePath = path.relative(projectPath, dotBooster)
  // Now override the packageJSON dependencies with the path to the packed dependency
  packageJSON.dependencies[packageName] = `file:${path.join(dotBoosterRelativePath, packedDependencyFileName)}`
}

function cleanPackageName(packageName: string): string {
  return packageName.replace('@boostercloud/', '')
}

export async function forceLernaRebuild(): Promise<void> {
  await exec('lerna clean --yes && lerna bootstrap && lerna run clean && lerna run compile')
}
