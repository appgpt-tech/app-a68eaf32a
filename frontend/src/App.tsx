//Source code generated by AppGPT (www.appgpt.tech)
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { customDataProvider } from './dataProvider';
import fakeDataProvider from 'ra-data-fakerest';
import { Dashboard } from './dashboard';
import { authProvider, apInitialize } from './authProvider';
import { i18nProvider } from './i18nProvider';
import LoginPage, { Login } from './Login';
import data from './data';
import { UsersList, UsersCreate, UsersEdit } from './resources/Users';
import {
  FitnessActivitiesList,
  FitnessActivitiesCreate,
  FitnessActivitiesEdit,
} from './resources/FitnessActivities';
import { GoalsList, GoalsCreate, GoalsEdit } from './resources/Goals';
import {
  ActivityRecordsList,
  ActivityRecordsCreate,
  ActivityRecordsEdit,
} from './resources/ActivityRecords';
import UsersIcon from '@mui/icons-material/Person';
import FitnessActivitiesIcon from '@mui/icons-material/FitnessCenter';
import GoalsIcon from '@mui/icons-material/Flag';
import ActivityRecordsIcon from '@mui/icons-material/Event';
// SUPERTOKENS
import React from 'react';
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react';
import ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import Session from 'supertokens-auth-react/recipe/session';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
let sessionFn = Session.init();
SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_SUPERTOKENS_APPNAME,
    apiDomain: import.meta.env.VITE_BACKEND_DOMAIN,
    websiteDomain: import.meta.env.VITE_SUPERTOKENS_WEBSITEDOMAIN,
    apiBasePath: import.meta.env.VITE_BACKEND_APIPATH + '/auth',
    websiteBasePath: import.meta.env.VITE_SUPERTOKENS_WEBSITEBASEPATH,
  },
  recipeList: [
    ThirdPartyPasswordless.init({
      contactMethod: 'EMAIL',
      signInUpFeature: {
        providers: [
          ThirdPartyPasswordless.Github.init(),
          //ThirdPartyPasswordless.Google.init(),
          //ThirdPartyPasswordless.Facebook.init(),
          //ThirdPartyPasswordless.Apple.init(),
        ],
      },
    }),
    sessionFn,
  ],
});
apInitialize(Session);
// END SUPERTOKENS
let dataProvider: any;
if (import.meta.env.VITE_USE_BACKEND_DATA === 'true') {
  dataProvider = customDataProvider(
    import.meta.env.VITE_BACKEND_DOMAIN +
      import.meta.env.VITE_BACKEND_APIPATH +
      '/proxy',
  );
} else {
  dataProvider = fakeDataProvider(data.defaultData);
}

const App = () => (
  <SuperTokensWrapper>
    <BrowserRouter basename="/a68eaf32a">
      <Admin
        authProvider={
          import.meta.env.VITE_ENVIRONMENT != 'DEV' ? authProvider : undefined
        }
        requireAuth
        loginPage={LoginPage}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        dashboard={Dashboard}
      >
        <Resource
          name="Users"
          options={{ label: 'Users' }}
          list={UsersList}
          create={UsersCreate}
          edit={UsersEdit}
          recordRepresentation="username"
          icon={UsersIcon}
        />
        <Resource
          name="FitnessActivities"
          options={{ label: 'Fitness Activities' }}
          list={FitnessActivitiesList}
          create={FitnessActivitiesCreate}
          edit={FitnessActivitiesEdit}
          recordRepresentation="activityType"
          icon={FitnessActivitiesIcon}
        />
        <Resource
          name="Goals"
          options={{ label: 'Goals' }}
          list={GoalsList}
          create={GoalsCreate}
          edit={GoalsEdit}
          recordRepresentation="goalID"
          icon={GoalsIcon}
        />
        <Resource
          name="ActivityRecords"
          options={{ label: 'Activity Records' }}
          list={ActivityRecordsList}
          create={ActivityRecordsCreate}
          edit={ActivityRecordsEdit}
          recordRepresentation="recordID"
          icon={ActivityRecordsIcon}
        />
        <CustomRoutes noLayout>
          {/*This renders the login UI on the /auth route*/}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          {/*Your app routes*/}
        </CustomRoutes>
      </Admin>
    </BrowserRouter>
  </SuperTokensWrapper>
);

export default App;
