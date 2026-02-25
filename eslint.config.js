import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx,js}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        plugins: {
            '@stylistic': stylistic,
            import: importPlugin,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: 'module',
            },
        },
        rules: {
            'no-console': [
                'error',
                {
                    'allow': [
                        'warn',
                        'error',
                    ],
                },
            ],
            '@stylistic/indent': [
                'error',
                4,
            ],
            '@stylistic/semi': [
                'error',
                'never',
            ],
            '@stylistic/eol-last': [
                'error',
                'always',
            ],
            '@stylistic/comma-dangle': [
                'error',
                {
                    arrays: 'always-multiline',
                    objects: 'always-multiline',
                    imports: 'always-multiline',
                    exports: 'always-multiline',
                    functions: 'never',
                },
            ],
            '@stylistic/object-curly-spacing': [
                'error',
                'always',
                {
                    emptyObjects: 'never',
                },
            ],
            '@stylistic/function-call-argument-newline': [
                'error',
                'consistent',
            ],
            '@stylistic/array-element-newline': [
                'error',
                {
                    multiline: true,
                    minItems: 2,
                },
            ],
            '@stylistic/array-bracket-newline': [
                'error',
                { minItems: 2 },
            ],
            '@stylistic/quotes': [
                'error',
                'single',
                { avoidEscape: true },
            ],
            '@stylistic/object-property-newline': [
                'error',
                {
                    'allowAllPropertiesOnSameLine': true,
                },
            ],
            '@stylistic/keyword-spacing': [
                'error',
                {
                    'before': true,
                    'after': true,
                },
            ],
            'import/order': [
                'error',
                {
                    // 1. Группировка: определяем порядок групп
                    groups: [
                        'builtin',  // Встроенные модули (fs, path)
                        'external', // Внешние пакеты (react, lodash)
                        'internal', // Внутренние пути (настроенные через alias, например @/...)
                        [
                            'parent',
                            'sibling',
                        ], // Родительские и соседние файлы (../, ./)
                        'index',    // Индексные файлы
                        'object',   // object-imports
                        'type',      // TS типы (если используете TypeScript)
                    ],

                    // 2. Кастомные группы (например, чтобы React всегда был самым первым)
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],

                    // 3. Настройка визуального разделения
                    'newlines-between': 'always', // Всегда пустая строка между группами

                    // 4. Алфавитный порядок внутри групп
                    alphabetize: {
                        order: 'asc',           // Сортировка по возрастанию
                        caseInsensitive: true,  // Игнорировать регистр
                    },
                },
            ],
            '@stylistic/no-trailing-spaces': [
                'error',
                {
                    'ignoreComments': true,
                },
            ],
        },
    },
])
