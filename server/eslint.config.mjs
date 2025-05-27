import globals from 'globals';
import pluginJs from '@eslint/js';
import tslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { ignores: ['dist/*', 'tsconfig-paths-bootstrap.js'] },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tslint.parser,
        },
    },
    pluginJs.configs.recommended,
    ...tslint.configs.recommended,
    eslintConfigPrettier,
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'lf',
                },
            ],
        },
    },
];
