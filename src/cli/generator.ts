import { generatorHandler } from '@prisma/generator-helper';

import { generate } from './dbml-generator';

generatorHandler({
  onManifest: () => ({
    defaultOutput: './dbml',
    prettyName: 'Prisma DBML Generator',
  }),
  onGenerate: generate,
});
