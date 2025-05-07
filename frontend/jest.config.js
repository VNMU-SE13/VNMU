module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", "json", "node", "mjs"],
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest"
    },
    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/node_modules/react-router-dom/dist/index.js"
    }
  };