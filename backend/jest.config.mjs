export default {
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,

    // Run tests inside /test folder
    testMatch: ["**/test/**/*.test.js"],

    // Ensure NODE_ENV is test
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],

    // Prevent open handle leaks (Mongo, Express)
    detectOpenHandles: true,
}