import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            // implement node event listeners here
            console.log('Environment Variable BACKEND:', config.env.BACKEND)
        },
    },
    env: {
        BACKEND: 'http://localhost:3003/api'
    }
})
