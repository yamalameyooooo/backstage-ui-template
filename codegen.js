const fs = require('fs');

//input json from user
const inputJson = {
  'Landing Page': '/',
  'Single Nav Item': '/single-nav-item',
  'Group Nav Item': {
    'Group Nav Item 1': '/group-nav-item-1',
    'Group Nav Item 2': '/group-nav-item-2',
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
          path: `/${key.toLowerCase().replace(/\s+/g, '-')}${json[key][subKey]}`,
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

// Function to Generate All the Pages based on the user inputJson
const generatePages = (json) => {
  const landingPageTemplateContent = `
    import { WhatsNew } from '@app/WhatsNew/WhatsNew';
    import packageJson from '@jsonPath';
    import { Page, PageSection, PageSectionVariants, TextContent, Title, Text } from '@patternfly/react-core';
    import * as React from 'react';
    
    const LandingPage : React.FunctionComponent = () => {
      //logic for whats new modal, if the user is opening app for first time or after a version bump,
      //then the version from package.json wont match the client browser version and modal will pop up,
      //and at the end new version will be saved to client browser so on next page opening modal wont show
      var appCurrentVersion = packageJson.version;
      var appLocalStorageVersion = localStorage.getItem('appVersion');
    
      if (appCurrentVersion != appLocalStorageVersion) {
        //setting updated version to local storage
        localStorage.setItem('appVersion', appCurrentVersion);
    
        //show Whats new
        return (
          <Page
            additionalGroupedContent={
              <PageSection variant={PageSectionVariants.light} isWidthLimited>
                <TextContent>
                  <Text component="h1">Landing Page</Text>
                  <Text component="p">Some definition for Landing Page</Text>
                </TextContent>
                <WhatsNew />
              </PageSection>
            }
          ></Page>
        );
      } else {
        return (
          <Page
            additionalGroupedContent={
              <PageSection variant={PageSectionVariants.light} isWidthLimited>
                <TextContent>
                  <Text component="h1">Landing Page</Text>
                  <Text component="p">Some definition for Landing Page</Text>
                </TextContent>
              </PageSection>
            }
          ></Page>
        );
      }
    };
    
    export { LandingPage };
    `;
  const genericPageTemplateContent = `
    import { Page, PageSection, PageSectionVariants, Text, TextContent } from '@patternfly/react-core';
    import * as React from 'react';
    
    const SingleNavItem : React.FunctionComponent = () => (
      <Page
        additionalGroupedContent={
          <PageSection variant={PageSectionVariants.light} isWidthLimited>
            <TextContent>
              <Text component="h1">Single Nav Item</Text>
              <Text component="p">Some definition for Single Nav Item Page</Text>
            </TextContent>
          </PageSection>
        }
      ></Page>
    );
    
    export { SingleNavItem };
    `;
  for (const key in json) {
    if (json[key] === '/') {
      //generate root tsx
      const filename = key;
      const pageName = key.replace(/\s+/g, '');

      // Create directories if they don't exist
      const directoryPath = `src/app/Pages/${pageName}`;
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      // Write content to LandingPage.tsx file
      const filePath = `${directoryPath}/${pageName}.tsx`;
      const landingPageContent = landingPageTemplateContent
        .replace(/LandingPage/g, `${pageName}`)
        .replace(/Landing Page/g, `${filename}`);
      fs.writeFileSync(filePath, landingPageContent);

      console.log(`${pageName}.tsx file generated successfully at ${filePath}`);
    } else if (typeof json[key] === 'string') {
      //generate generic tsx
      const filename = key;
      const pageName = key.replace(/\s+/g, '');
      // Create directories if they don't exist
      const directoryPath = `src/app/Pages/${pageName}`;
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      // Write content to LandingPage.tsx file
      const filePath = `${directoryPath}/${pageName}.tsx`;
      const genericPageContent = genericPageTemplateContent
        .replace(/SingleNavItem/g, `${pageName}`)
        .replace(/Single Nav Item/g, `${filename}`);
      fs.writeFileSync(filePath, genericPageContent);

      console.log(`${pageName}.tsx file generated successfully at ${filePath}`);
    } else if (typeof json[key] === 'object') {
      const pagegroupName = key.replace(/\s+/g, '');

      for (const subKey in json[key]) {
        //generate generic tsx by subkey
        const filename = subKey;
        const pageName = subKey.replace(/\s+/g, '');
        // Create directories if they don't exist
        const directoryPath = `src/app/Pages/${pagegroupName}/${pageName}`;
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
        }

        // Write content to LandingPage.tsx file
        const filePath = `${directoryPath}/${pageName}.tsx`;
        const genericPageContent = genericPageTemplateContent
          .replace(/SingleNavItem/g, `${pageName}`)
          .replace(/Single Nav Item/g, `${filename}`);
        fs.writeFileSync(filePath, genericPageContent);

        console.log(`${pageName}.tsx file generated successfully at ${filePath}`);
      }
    }
  }
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

  //generate pages
  generatePages(inputJson);

  // Remove postinstall script from package.json
  removePostinstallScript();
};

// Call the importComponentsToRoute function
importComponentsToRoute();
