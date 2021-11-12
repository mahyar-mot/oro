// // import UserManager from "oidc-client";
// import {UserManager} from "oidc-client";
// import {SSO_SERVER, SSO_LOGIN_REDIRECT} from "./constants"


// const config = {
//     // the URL of our identity server
//     authority: SSO_SERVER,
//     // metadata: {
//     //     issuer: `${SSO_SERVER}`,
//     //     authorization_endpoint: `${SSO_SERVER}/connect/authorize`,
//     //     token_endpoint: `${SSO_SERVER}/connect/token`,
//     //     userinfo_endpoint: `${SSO_SERVER}/connect/userinfo`,
//     //     end_session_endpoint: `${SSO_SERVER}/connect/endsession`,
//     //     jwks_uri: `${SSO_SERVER}/.well-known/openid-configuration/jwks`,
//     // },

//     // signingKeys: {"kty":"RSA","use":"sig","kid":"085336afe64c86ed7459c19c48f43727","e":"AQAB","n":"rnVg5L1qINNLutKIHZTht3uSsDuNsn7sCrjAAh1m-mAoplgOxZlcusoGSt129rCtsgjGvG8T_WCC14xvjDQPtasFXDdIZCEAKs-FkBLHf5L3l3nrVsRaUmltIyDnv6i6UqiTgEff1uGKUXLvGd7AADoBwedVa3LaIJvs9K0Ow4KZWrm1y7Qdr3pGClqE0lGSKg6vbLUB3yDRdNgDezIyDDpiBN_8eoHQKDSzufqQKzuZ3S33jfAy5-W3VIYNELnNBQVvERK2L1HlfT-tuumJIfN-ehXJNVP0THQZuu9zVl2Dm4KuYUngnMsdR37fHxuJzsr_san916axYKC9_UMRNw","alg":"RS256"},
//     // this ID maps to the client ID in the identity client configuration
//     client_id: "ReactJsClient",
//     // client_secret: "secret",
//     // URL to redirect to after login
//     redirect_uri: SSO_LOGIN_REDIRECT,
//     response_type: "id_token token",
//     // response_mode: "query",
//     // the scopes or resources we would like access to
//     scope: "openid profile roles SSO_Admin_Api Elec_Rest_Api Elec_Res_Mng_Api",

//     // URL to redirect to after logout
//     post_logout_redirect_uri: "http://front.netbean.ir",
//     // post_logout_redirect_uri: "http://192.168.0.161:3000",

// };

// // initialise!
// const userManager = new UserManager(config)

// export default userManager;
