import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "jsdom",
  testMatch: [`**/?(*.)+(spec).+(ts|tsx)`],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "src"],
  roots: ["<rootDir>/src/"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "@/(.*)": "<rootDir>/src/$1",
    "@components/(.*)": "<rootDir>/src/components/$1",
  },
  // Load @testing-library/jest-dom since it is not included in jest
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  workerIdleMemoryLimit: "1GB",
};

export default config;
