import { getTemplateDataSync, renderSync } from 'jsdoc-to-markdown';
import { resolve } from 'path';
import fs from 'fs';
import { readdirSync } from 'fs-extra';

/* input and output paths */
const outputDir = __dirname;
const inputFiles = resolve(__dirname, '../packages/**/src/**/*.ts');

console.log(readdirSync(inputFiles));
/* get template data */
const templateData = getTemplateDataSync({ files: [inputFiles] });

/* reduce templateData to an array of class names */
const classNames = templateData.reduce<any>((classNames, identifier) => {
  console.log(identifier);
  // @ts-ignore
  if (identifier.kind === 'class') classNames.push(identifier.name);
  return classNames;
}, []);

/* create a documentation file for each class */
for (const className of classNames) {
  const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
  console.log(`rendering ${className}, template: ${template}`);
  const output = renderSync({
    data: templateData,
    template: template,
  });
  fs.writeFileSync(resolve(outputDir, `${className}.md`), output);
}
