import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'https://wp-admin.lineart-alumo.ru/graphql': {
        headers: {
          'User-Agent': 'CodegenClient/1.0',
          Referer: 'https://lineart-alumo.ru',
        },
      },
    },
  ],
  documents: ['./src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withSuspense: true,
        preResolveTypes: true,
        dedupeFragments: true,
        scalars: { DateTime: 'string' },
        namingConvention: { enumValues: 'keep' },
      },
    },
    './schema.graphql': { plugins: ['schema-ast'] },
    './schema.json': {
      plugins: ['introspection'],
      config: { minify: true },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
