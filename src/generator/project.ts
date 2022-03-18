import { GeneratorConfig } from '@prisma/generator-helper';
import { promises } from 'fs';

const { readFile } = promises;

export type ProjectOptions = {
  name: string;
  databaseType: string;
  note: string;
  isMd: boolean;
};

export function generateProject({
  name,
  databaseType,
  note,
  isMd = false,
}: ProjectOptions): string[] {
  const projectNote = isMd
    ? `'''\n` +
      `    ${note
        .replace(/\n/g, '\n    ')
        .replace(/(\n\s+\n)/g, '\n\n')
        .replace(/\s+$/g, '')}\n  '''`
    : `'${note}'`;
  const project = [
    `Project ${name} {\n` +
      `  database_type: '${databaseType}'\n` +
      `  Note: ${projectNote}\n}`,
  ];

  return name ? project : [];
}

export async function getProjectOptions({
  projectName,
  projectDatabaseType,
  projectNote,
  projectNotePath,
}: GeneratorConfig['config']): Promise<ProjectOptions> {
  let projectNoteMd = '';

  if (projectNotePath) {
    const fullPath = `${process.cwd()}/${projectNotePath}`;
    try {
      projectNoteMd = await readFile(fullPath, 'utf-8');
    } catch (e) {
      console.log(
        `❌ Error: project note markdown file not found: ${fullPath}`
      );
    }
  }

  return {
    name: projectName && `"${projectName}"`,
    databaseType: projectDatabaseType || '',
    note: projectNoteMd || projectNote || '', // noteMd takes precedence
    isMd: projectNoteMd !== '',
  };
}
