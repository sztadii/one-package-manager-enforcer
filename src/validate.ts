const popularManagers = {
  npm: 'npm',
  yarn: 'yarn'
}

function checkManagerExecPath(manager: string): boolean {
  return process.env.npm_execpath.includes(manager)
}

function displayWarning(message: string): void {
  console.log('=========================================')
  console.log(message)
  console.log('=========================================')
}

export function validate(): void {
  const requiredManagerName = process.env.REQUIRED || popularManagers.npm

  if (checkManagerExecPath(requiredManagerName)) return

  displayWarning(
    `Please install / add dependencies via ${requiredManagerName}. Other managers are not allowed.`
  )

  process.exit(1)
}
