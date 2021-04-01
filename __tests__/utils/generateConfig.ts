import { getConfig, ConfigMetaFormat } from '@prisma/sdk';

export function generateConfig(datamodel: string): Promise<ConfigMetaFormat> {
  return getConfig({ datamodel });
}
