import { Page, PageSection, PageSectionVariants, Text, TextContent } from '@patternfly/react-core';
import * as React from 'react';

const SingleNavItem: React.FunctionComponent = () => (
  <Page
    additionalGroupedContent={
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">Single Nav Item Page</Text>
          <Text component="p">Some definition for Single Nav Item Page</Text>
        </TextContent>
      </PageSection>
    }
  ></Page>
);

export { SingleNavItem };
