import React from "react";
import ReactDOM from "react-dom/client";
import App from '@app/index';
import opcBase from "@one-platform/opc-base";
import Literals from "@app/utils/Literals";

if (process.env.NODE_ENV !== "production") {
  const config = {
    rules: [
      {
        id: 'color-contrast',
        enabled: false
      }
    ]
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000, config);
}
// Login Functionality
// opcBase.configure({
//   apiBasePath: "",
//   subscriptionsPath: "",
//   keycloakUrl: "https://auth.stage.redhat.com/auth",
//   keycloakClientId: Literals.CLIENT_ID,
//   keycloakRealm: "EmployeeIDP",
//   projectId: ""
// });

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

// Login Functionality
// if(opcBase?.auth){
//   opcBase.auth?.onLogin(() => {
//     root.render(
//       <App /> 
//     )
//   });
// } else {
//   root.render(
//     <App /> 
//   )
// }

root.render(
  <App /> 
)
