import { resolve } from 'node:path'
import { expect, it, vi } from 'vitest'
import { getNpmConfig } from '../src/utils/npm'

function stubEnvCaseInsensitive(name: string, value: string) {
  return vi.stubEnv(name.toLowerCase(), value).stubEnv(name.toUpperCase(), value)
}

it('do not override userconfig path', async () => {
  const userconfig = resolve('.npm-userconfig')

  stubEnvCaseInsensitive('npm_config_userconfig', userconfig)

  const config = await getNpmConfig()
  expect(config.userconfig).toBe(userconfig)
})

it('do not override globalconfig path', async () => {
  const globalconfig = resolve('.npm-globalconfig')

  stubEnvCaseInsensitive('npm_config_globalconfig', globalconfig)

  const config = await getNpmConfig()
  expect(config.globalconfig).toBe(globalconfig)
})
