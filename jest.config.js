// For more info see: https://jestjs.io/docs/en/configuration.html
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup-tests.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx|js)$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "@styles/(.*)": "<rootDir>/src/styles/$1",
    "@lib/(.*)": "<rootDir>/src/lib/$1",
    "@hooks/(.*)": "<rootDir>/src/hooks/$1",
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@pages/(.*)": "<rootDir>/src/pages/$1",
  },
}
