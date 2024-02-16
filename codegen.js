const fs = require('fs');

//input json from user
const inputJson = {
  'Landing Page': '/',
  'Single Nav Item': 'single-nav-item',
  'Group Nav Item': {
    'Group Nav Item 1': 'group-nav-item-1',
    'Group Nav Item 2': 'group-nav-item-2',
  },
};

// Function to generate import lines from JSON
const generateImportLines = (json) => {
  let importLines = '';

  for (const key in json) {
    if (typeof json[key] === 'string') {
      // Single Nav Item
      importLines += `import { ${key.replace(/\s+/g, '')} } from './Pages/${key.replace(/\s+/g, '')}/${key.replace(
        /\s+/g,
        '',
      )}';\n`;
    } else if (typeof json[key] === 'object') {
      // Group Nav Item
      for (const subKey in json[key]) {
        importLines += `import { ${subKey.replace(/\s+/g, '')} } from './Pages/${key.replace(
          /\s+/g,
          '',
        )}/${subKey.replace(/\s+/g, '')}/${subKey.replace(/\s+/g, '')}';\n`;
      }
    }
  }
  return importLines;
};

// Function to generate routes from JSON
const generatedRoutes = (json) => {
  const generatedRoutes = [];

  for (const key in json) {
    if (typeof json[key] === 'string') {
      // Single Nav Item
      generatedRoutes.push({
        component: key.replace(/\s+/g, ''),
        exact: true,
        label: key,
        path: json[key],
        title: key,
      });
    } else if (typeof json[key] === 'object') {
      // Group Nav Item
      const groupRoutes = [];
      for (const subKey in json[key]) {
        groupRoutes.push({
          component: subKey.replace(/\s+/g, ''),
          exact: true,
          label: subKey,
          path: `/${key.toLowerCase().replace(/\s+/g, '-')}/${json[key][subKey]}`,
          title: subKey,
        });
      }
      generatedRoutes.push({
        label: key,
        routes: groupRoutes,
      });
    }
  }
  return generatedRoutes;
};

// Function to check if import lines are already present
const isImportLinesPresent = (filePath, importLines) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return fileContent.includes(importLines);
};

// Function to remove postinstall script from package.json
const removePostinstallScript = () => {
  const packageJsonPath = 'package.json';
  let packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  packageJsonContent = packageJsonContent.replace(/"postinstall":\s*"node\s+codegen\.js",?/, '');
  fs.writeFileSync(packageJsonPath, packageJsonContent);
};

// Modify the files after npm install
const importComponentsToRoute = () => {
  const filePath = 'src/app/routes.tsx'; // Adjust this path to the file you want to modify
  let fileContent = fs.readFileSync(filePath, 'utf8');

  const importLines = generateImportLines(inputJson);
  // Check if import lines are already present
  if (!isImportLinesPresent(filePath, importLines)) {
    // Append the import lines at the top of the file
    fileContent = importLines + '\n' + fileContent;
  }

  // Find the position to insert the generated routes
  const routesIndex = fileContent.indexOf('const routes: AppRouteConfig[] = generatedRoutesHere');
  const insertIndex = fileContent.indexOf('generatedRoutesHere', routesIndex);

  // Add the generated routes at the appropriate position
  const generatedRoutesContent = generatedRoutes(inputJson);
  const routesString = JSON.stringify(generatedRoutesContent, null, 2).replace(
    /"component":\s*"([^"]+)"/g,
    '"component": $1',
  );
  fileContent = fileContent.replace('generatedRoutesHere', routesString);

  // Write the modified content back to the file
  fs.writeFileSync(filePath, fileContent);

  // Remove postinstall script from package.json
  removePostinstallScript();
};

// Call the importComponentsToRoute function
importComponentsToRoute();
