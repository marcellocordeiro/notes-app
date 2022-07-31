module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@next/next/core-web-vitals",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // eslint
    // "arrow-body-style": "warn",
    // "sort-imports": ["warn", { "ignoreDeclarationSort": true }],
    "object-shorthand": "warn",

    // eslint-plugin-import
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // eslint-plugin-react
    // "react/destructuring-assignment": "warn",
    "react/prop-types": "off",
    "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        // @typescript-eslint
        "@typescript-eslint/prefer-optional-chain": "warn",

        // @typescript-eslint with type checking
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/consistent-type-exports": "warn",
        "@typescript-eslint/await-thenable": "warn",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
        "@typescript-eslint/no-unnecessary-condition": "warn",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/prefer-includes": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/unbound-method": "warn",
        "@typescript-eslint/no-inferrable-types": "warn",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"] },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
