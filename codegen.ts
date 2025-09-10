import type { CodegenConfig } from '@graphql-codegen/cli';

const url = 'https://wp-admin.lineart-alumo.ru/graphql';
const user = process.env.WP_CODEGEN_USER ?? '';
const pass = process.env.WP_CODEGEN_PASS ?? '';

const basic = Buffer.from(`${user}:${pass}`).toString('base64');

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [url]: {
        headers: {
          Authorization: `Basic ${basic}`,
          'User-Agent': 'CodegenClient/1.0',
          Referer: 'https://lineart-alumo.ru',
        },
      },
    },
  ],
  documents: 'src/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    'src/shared/api/gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        useTypeImports: true,
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
