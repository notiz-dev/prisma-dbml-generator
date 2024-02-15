import {
  datamodelProjectWithNote,
  datamodelProjectWithNoteMd,
  datamodelUnnamedProject,
} from './fixtures/project.datamodel';
import { generateConfig } from './utils/generateConfig';
import { generateProject, getProjectOptions } from '../src/generator/project';

describe('Project', () => {
  test('generate no project block', async () => {
    const { generators } = await generateConfig(datamodelUnnamedProject);
    const projectOptions = await getProjectOptions(generators[0].config);
    expect(projectOptions).toBeUndefined();
  });

  test('generate a project block with note', async () => {
    const { generators } = await generateConfig(datamodelProjectWithNote);
    const projectOptions = await getProjectOptions(generators[0].config);
    const project = generateProject(projectOptions!);

    const expected =
      'Project "Test Project" {\n' +
      "  database_type: 'PostgreSQL'\n" +
      "  Note: 'Test project description'\n" +
      '}';

    expect(project.length).toEqual(1);
    expect(project[0]).toEqual(expected);
  });

  test('generate a project block with noteMd', async () => {
    const { generators } = await generateConfig(datamodelProjectWithNoteMd);
    const projectOptions = await getProjectOptions(generators[0].config);
    const project = generateProject(projectOptions!);

    const expected =
      'Project "Test Project" {\n' +
      "  database_type: 'PostgreSQL'\n" +
      "  Note: '''\n" +
      '    # Test Project Database\n' +
      '    **markdown content here**\n' +
      "  '''\n" +
      '}';

    expect(project.length).toEqual(1);
    expect(project[0]).toEqual(expected);
  });
});
