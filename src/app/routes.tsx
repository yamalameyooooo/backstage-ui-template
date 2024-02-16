import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import * as React from 'react';
import { Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom';
import { GroupNavItem1 } from './Pages/GroupNavItem/GroupNavItem1/GroupNavItem1';
import { GroupNavItem2 } from './Pages/GroupNavItem/GroupNavItem2/GroupNavItem2';
import { SingleNavItem } from './Pages/SingleNavItem/SingleNavItem';
import { LandingPage } from './Pages/LandingPage/LandingPage';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: LandingPage,
    exact: true,
    label: 'Landing Page',
    path: '/',
    title: 'Landing Page',
  },
  {
    component: SingleNavItem,
    exact: true,
    label: 'Single Nav Item',
    path: '/single-nav-item',
    title: 'Single Nav Item',
  },
  {
    label: 'Group Nav Item',
    routes: [
      {
        component: GroupNavItem1,
        exact: true,
        label: 'Group Nav Item 1',
        path: '/group-nav-item/group-nav-item-1',
        title: 'Group Nav Item 1',
      },
      {
        component: GroupNavItem2,
        exact: true,
        label: 'Group Nav Item 2',
        path: '/group-nav-item/group-nav-item-2',
        title: 'Group Nav Item 2',
      }
    ]
  }
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
// may not be necessary if https://github.com/ReactTraining/react-router/issues/5210 is resolved
const useA11yRouteChange = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    routeFocusTimer = window.setTimeout(() => {
      const mainContainer = document.getElementById('primary-app-container');
      if (mainContainer) {
        mainContainer.focus();
      }
    }, 50);
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [pathname]);
};

const RouteWithTitleUpdates = ({ component: Component, title, ...rest }: IAppRoute) => {
  useA11yRouteChange();
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <Switch>
    {flattenedRoutes.map(({ path, exact, component, title }, idx) => (
      <RouteWithTitleUpdates path={path} exact={exact} component={component} key={idx} title={title} />
    ))}
    <PageNotFound title="404 Page Not Found" />
  </Switch>
);

const routesByUser = (json) => {
  for (const key in json) {
    if (typeof json[key] === 'string') {
      // Single Nav Item
      routes.push({
        component: json[key].replace(' ',''),
        exact: true,
        label: json[key],
        path: `/${key.toLowerCase().replace(/\s+/g, '-')}`,
        title: json[key],
      });
    } else if (typeof json[key] === 'object') {
      // Group Nav Item
      const groupRoutes:any = [];
      for (const subKey in json[key]) {
        groupRoutes.push({
          component: subKey.replace(' ',''),
          exact: true,
          label: json[key][subKey],
          path: `/${key.toLowerCase().replace(/\s+/g, '-')}/${subKey.toLowerCase().replace(/\s+/g, '-')}`,
          title: json[key][subKey],
        });
      }
      routes.push({
        label: key,
        routes: groupRoutes,
      });
    }
  }
};

export { AppRoutes, routes };
