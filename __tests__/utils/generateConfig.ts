import { getConfig, ConfigMetaFormat } from '@prisma/internals';

export function generateConfig(datamodel: string): Promise<ConfigMetaFormat> {
  return getConfig({ datamodel });
}
