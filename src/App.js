import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './components/public/main';
import AlternateMain from './components/public/alternateMain';
import routes from './components/public/routes';
import { useTokenClaims } from "./components/public/hooks";
import DontHavePermission from "./components/public/dontHavePermission";
import { PREFIX } from './utils/constants';
import withClearCache from "./ClearCache";

const ClearCacheComponent = withClearCache(MainApp);


function MainApp() {

  const NON_LAYOUT_PAGES = [
    '/waitinguser',
    '/login',
    '/newUser',
    '/newuser',
    '/dashboard',
    '/user/protest'
    // '/notfound'
  ];

  const {roles = []} = useTokenClaims(false)

  const roleChecker = (roleList) => {
    let permission = false;
    if (roles.length){
      permission = roleList.every( i => roles.includes(i) )
    }
    return permission
  }

  return (
    <BrowserRouter basename={`${PREFIX}`} forceRefresh={false}>
      <Switch>

        {routes.map(({ path, Component, loginRequired, requiredRoles = undefined }, key) => (
            <Route
              exact
              path={path}
              key={key}
              render={props => {
                const crumbs = routes
                  // Get all routes that contain the current one.
                  .filter(({ path }) => props.match.path.includes(path))
                  // Swap out any dynamic routes with their param values.
                  // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                  .map(({ path, ...rest }) => ({
                    path: Object.keys(props.match.params).length
                      ? Object.keys(props.match.params).reduce(
                        (path, param) => path.replace(
                          `:${param}`, props.match.params[param]
                        ), path
                        )
                      : path,
                    ...rest
                  }));
                props.crumbs = crumbs;
                props.loginRequired = loginRequired
                // if (NON_LAYOUT_PAGES.filter( item =>  String(props.location.pathname).includes(item)).length ){
                //   return <AlternateMain {...props} > <Component {...props} /> </AlternateMain>
                // }

                if (requiredRoles){
                  if (!roleChecker(requiredRoles)){
                    return <Main {...props}> <DontHavePermission /> </Main>
                  }
                }

                return (
                   <Main {...props}> <Component {...props} /> </Main>
                );
              }}
            />
        ))}
        </Switch>
    </BrowserRouter>
  );
}


const App = () => <ClearCacheComponent />


export default App;
