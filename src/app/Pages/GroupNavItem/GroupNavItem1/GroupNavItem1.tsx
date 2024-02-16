import { Page, PageSection, PageSectionVariants, Text, TextContent } from '@patternfly/react-core';
import * as React from 'react';

const GroupNavItem1: React.FunctionComponent = () => (
  <Page
    additionalGroupedContent={
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">Group Nav Item 1</Text>
          <Text component="p">Some definition for Group Nav Item 1 Page</Text>
        </TextContent>
      </PageSection>
    }
  ></Page>
);

export { GroupNavItem1 };
