import { WhatsNew } from '@app/WhatsNew/WhatsNew';
import packageJson from '@jsonPath';
import { Page, PageSection, PageSectionVariants, TextContent, Title, Text } from '@patternfly/react-core';
import * as React from 'react';

const LandingPage: React.FunctionComponent = () => {
  //logic for whats new modal, if the user is opening app for first time or after a version bump,
  //then the version from pakage.json wont match the clint browser version and modal will pop up,
  //and at the end new version will be saved to client brwser so on next page opening modal wont show
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
