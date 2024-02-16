import appLogo from '@app/bgimages/Logos/appLogo.svg';
import footerLogo from '@app/bgimages/Logos/footerLogo.svg';
import avatar from '@app/bgimages/Icons/defaultAvatar.svg';
import { IAppRoute, IAppRouteGroup, routes } from '@app/routes';
import Easter from '@app/utils/Easter';
import Literals from '@app/utils/Literals';
import {
  Avatar,
  Brand,
  Button,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  PageSidebarBody,
  Switch,
  Text,
  TextContent,
  TextVariants,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  var isDarkMode = false;
  //pick up user preference from local storage
  isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  if (isDarkMode) {
    document.getElementById('rootHTML')!.classList.add('pf-v5-theme-dark');
    localStorage.setItem('isDarkMode', 'true');
    isDarkMode = true;
  }

  //toggle methods for dark and light mode

  const toggleLightMode = (event) => {
    document.getElementById('rootHTML')!.classList.remove('pf-v5-theme-dark');
    localStorage.setItem('isDarkMode', 'false');
    isDarkMode = false;
  };

  const toggleDarkMode = (event) => {
    document.getElementById('rootHTML')!.classList.add('pf-v5-theme-dark');
    localStorage.setItem('isDarkMode', 'true');
    isDarkMode = true;
  };

  const toggleTheme = (event) => {
    if (isDarkMode == false) {
      document.getElementById('rootHTML')!.classList.add('pf-v5-theme-dark');
      localStorage.setItem('isDarkMode', 'true');
      isDarkMode = true;
    } else {
      document.getElementById('rootHTML')!.classList.remove('pf-v5-theme-dark');
      localStorage.setItem('isDarkMode', 'false');
      isDarkMode = false;
    }
  };

  const headerToolbar = (
    <Toolbar ouiaId="Toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="icon-button-group"
          align={{ default: 'alignRight' }}
          spacer={{ default: 'spacerNone', md: 'spacerMd' }}
        >
          <ToolbarItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#aaabac"
              height="1em"
              width="1em"
              version="1.1"
              id="SunIcon"
              viewBox="0 0 207.628 207.628"
              xmlSpace="preserve"
              style={{ margin: '0.5em' }}
            >
              <circle cx="103.814" cy="103.814" r="45.868" />
              <path d="M103.814,157.183c-29.427,0-53.368-23.941-53.368-53.368s23.941-53.368,53.368-53.368s53.368,23.941,53.368,53.368  S133.241,157.183,103.814,157.183z M103.814,65.446c-21.156,0-38.368,17.212-38.368,38.368s17.212,38.368,38.368,38.368  s38.368-17.212,38.368-38.368S124.97,65.446,103.814,65.446z" />
              <path d="M103.814,39.385c-4.142,0-7.5-3.358-7.5-7.5V7.5c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385  C111.314,36.027,107.956,39.385,103.814,39.385z" />
              <path d="M103.814,207.628c-4.142,0-7.5-3.358-7.5-7.5v-24.385c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385  C111.314,204.271,107.956,207.628,103.814,207.628z" />
              <path d="M200.128,111.314h-24.385c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5  S204.271,111.314,200.128,111.314z" />
              <path d="M31.885,111.314H7.5c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5  S36.027,111.314,31.885,111.314z" />
              <path d="M154.676,60.452c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.242  c2.929-2.929,7.678-2.93,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.242C158.515,59.72,156.595,60.452,154.676,60.452z" />
              <path d="M35.709,179.419c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.243  c2.929-2.929,7.678-2.929,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.243C39.548,178.687,37.629,179.419,35.709,179.419z  " />
              <path d="M171.918,179.419c-1.919,0-3.839-0.732-5.303-2.197l-17.243-17.243c-2.929-2.929-2.929-7.678,0-10.606  c2.929-2.929,7.678-2.929,10.606,0l17.243,17.243c2.929,2.929,2.929,7.678,0,10.606  C175.757,178.687,173.838,179.419,171.918,179.419z" />
              <path d="M52.952,60.452c-1.919,0-3.839-0.732-5.303-2.197L30.406,41.013c-2.929-2.929-2.929-7.677,0-10.606  c2.929-2.929,7.678-2.93,10.606,0l17.243,17.242c2.929,2.929,2.929,7.677,0,10.606C56.791,59.72,54.872,60.452,52.952,60.452z" />
            </svg>

            <Switch
              ouiaId="ToggleThemeSwitch"
              defaultChecked={isDarkMode}
              aria-label="ToggleThemeSwitchButton"
              onClick={toggleTheme}
              label=""
            />

            {/* Added Hardcoded Margin below due to a bug in Patternfly Switch where it adds checkIcon with label
            When Passing empty String it adds extra margin, to negate that added -0.5em marfin on left */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="#aaabac"
              id="MoonIcon"
              style={{ margin: '0.5em', marginLeft: '-0.5em' }}
            >
              <rect width="24" height="24" fill="none" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.23129 2.24048C9.24338 1.78695 10.1202 2.81145 9.80357 3.70098C8.72924 6.71928 9.38932 10.1474 11.6193 12.3765C13.8606 14.617 17.3114 15.2755 20.3395 14.1819C21.2206 13.8637 22.2173 14.7319 21.7817 15.7199C21.7688 15.7491 21.7558 15.7782 21.7427 15.8074C20.9674 17.5266 19.7272 19.1434 18.1227 20.2274C16.4125 21.3828 14.3957 22.0001 12.3316 22.0001H12.3306C9.93035 21.9975 7.6057 21.1603 5.75517 19.6321C3.90463 18.1039 2.64345 15.9797 2.18793 13.6237C1.73241 11.2677 2.11094 8.82672 3.2586 6.71917C4.34658 4.72121 6.17608 3.16858 8.20153 2.25386L8.23129 2.24048Z"
                fill="#aaabac"
              />
            </svg>
          </ToolbarItem>
        </ToolbarGroup>
        {/* default blank profile avatar */}
        <Avatar src={avatar} alt="avatar" />
      </ToolbarContent>
    </Toolbar>
  );

  const Header = (
    <Masthead>
      <MastheadToggle>
        <Button
          ouiaId="GlobalNavigation"
          variant="plain"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Global navigation"
        >
          <BarsIcon />
        </Button>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand>
          <Brand
            src={appLogo}
            alt="appLogo"
            heights={{ default: '30px' }}
            style={{ marginRight: '10px', marginTop: '5px' }}
          />
          <TextContent style={{ borderLeft: '1px solid white', lineHeight: '20px' }}>
            <Text component={TextVariants.p} style={{ marginBottom: '0px', marginLeft: '10px' }}>
              {Literals.COMPANY_TEAM_NAME}
            </Text>
            <Text component={TextVariants.p} style={{ marginLeft: '10px' }}>
              <b>{Literals.APP_NAME}</b>
            </Text>
          </TextContent>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const Footer = (
    <PageSection
      variant={PageSectionVariants.darker}
      isCenterAligned={true}
      isWidthLimited={true}
      style={{ fontSize: '12px' }}
      id="Footer"
    >
      <div style={{ alignItems: 'center', display: 'inline-flex', width: '100%', justifyContent: 'space-evenly' }}>
        <div>
          <a href={Literals.COMPANY_HOMEPAGE} id="footerLogo">
            <Brand src={footerLogo} alt="footerLogo" heights={{ default: '30px' }} />
          </a>
        </div>
        <div>
          <Text id="CopyRightMessageFooter" ouiaId="CopyRightMessageFooter" style={{ color: '#D2D2D2' }}>
            Copyright © Message.
          </Text>
        </div>
        <div>
          <a
            id="ContactUsFooter"
            href={Literals.MAIL_TO_CONTACT_US}
            style={{ color: '#D2D2D2', textDecoration: 'underline' }}
            onClick={Easter.COWSAY}
          >
            Contact Us
          </a>
        </div>
      </div>
    </PageSection>
  );

  const location = useLocation();

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem
      key={`${route.label}-${index}`}
      ouiaId={`${route.label}-${index}`}
      isActive={route.path === location.pathname}
    >
      <NavLink exact={route.exact} to={route.path}>
        {route.label}
      </NavLink>
    </NavItem>
  );

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      ouiaId={`${group.label}-${groupIndex}`}
      title={group.label}
      isActive={group.routes.some((route) => route.path === location.pathname)}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
    </NavExpandable>
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="light">
      <NavList id="nav-list-simple" style={{ paddingTop: '0px' }}>
        {routes.map(
          (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx)),
        )}
      </NavList>
    </Nav>
  );

  const Sidebar = (
    <PageSidebar theme="light">
      <PageSidebarBody>{Navigation}</PageSidebarBody>
    </PageSidebar>
  );

  const pageId = 'primary-app-container';

  return (
    <Page mainContainerId={pageId} header={Header} sidebar={sidebarOpen && Sidebar}>
      {/* All pages as children */}
      {children}

      {/* FOOTER HERE */}
      {Footer}
    </Page>
  );
};

export { AppLayout };
