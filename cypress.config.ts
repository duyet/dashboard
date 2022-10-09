import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '5985os',
  fixturesFolder: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
})
