import * as mockProcess from 'jest-mock-process'
import { validate } from './validate'

const oldEnv = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = { ...oldEnv }
})

function mockEnv(requiredManagerName: string, executorManagerName: string): void {
  process.env.REQUIRED = requiredManagerName
  process.env.npm_execpath = executorManagerName
}

test('Validate function do not kill process for yarn when we require yarn', () => {
  mockEnv('yarn', 'yarn')
  const mockExit = mockProcess.mockProcessExit()

  validate()
  expect(mockExit).not.toHaveBeenCalled()
})

test('Validate function do not kill process for npm when we require npm', () => {
  mockEnv('npm', 'npm')
  const mockExit = mockProcess.mockProcessExit()

  validate()
  expect(mockExit).not.toHaveBeenCalled()
})

test('Validate function kill process for npm when we require yarn and display proper validation message', () => {
  mockEnv('yarn', 'npm')
  const mockExit = mockProcess.mockProcessExit()
  const mockLog = mockProcess.mockConsoleLog()

  validate()
  expect(mockExit).toHaveBeenCalledTimes(1)
  expect(mockLog).toHaveBeenCalledWith(
    'Please install / add dependencies via yarn. Other managers are not allowed.'
  )
})

test('Validate function kill process for yarn when we require npm and display proper validation message', () => {
  mockEnv('npm', 'yarn')
  const mockExit = mockProcess.mockProcessExit()
  const mockLog = mockProcess.mockConsoleLog()

  validate()
  expect(mockExit).toHaveBeenCalledTimes(1)
  expect(mockLog).toHaveBeenCalledWith(
    'Please install / add dependencies via npm. Other managers are not allowed.'
  )
})
