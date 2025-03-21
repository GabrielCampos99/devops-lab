module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Permite a análise de features modernas do ECMAScript
    sourceType: 'module', // Permite o uso de imports
    project: './tsconfig.json', // Especifica o caminho para o seu tsconfig
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    // Adicione ou ajuste regras conforme necessário
  },
};
