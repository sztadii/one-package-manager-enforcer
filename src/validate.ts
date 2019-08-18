function checkManagerExecPath(manager: string): boolean {
  return process.env.npm_execpath.includes(manager)
}

function displayWarning(message: string): void {
  console.log('=========================================')
  console.log(message)
  console.log('=========================================')
}

function displayValidationWarning(managerName: string): void {
  displayWarning(
    `Please install / add dependencies via ${managerName}. Other managers are not allowed.`
  )
}

export function validate(): void {
  const supportedManagers = {
    npm: 'npm',
    yarn: 'yarn'
  }
  const requiredManagerName = process.env.REQUIRED || supportedManagers.npm

  if (checkManagerExecPath(requiredManagerName)) return

  const supportedArray = Object.values(supportedManagers)
  const supportedManagersString = supportedArray.join(' / ')
  const isSupportedManager = supportedArray.includes(requiredManagerName)

  if (!isSupportedManager)
    displayWarning(`Not supported package manager please try via ${supportedManagersString}.`)
  else if (isSupportedManager) displayValidationWarning(requiredManagerName)
  else displayWarning(`Something went wrong please try via ${supportedManagersString}.`)

  process.exit(1)
}
