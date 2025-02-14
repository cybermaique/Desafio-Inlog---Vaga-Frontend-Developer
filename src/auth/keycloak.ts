import Keycloak from "keycloak-js";

const clientId = "YY";

const keycloakConfig = {
  url: "YY",
  realm: "Inlog",
  clientId: clientId,
};

const keycloak = new Keycloak(keycloakConfig);

const doLogin = keycloak.login;

export const doLogout = () => {
  keycloak.logout();
};

export const initKeycloak = (
  onAuthenticated: (authenticated: boolean) => void
) => {
  keycloak
    .init({ onLoad: "check-sso", checkLoginIframe: false })
    .then((authenticated) => {
      if (authenticated) {
        if (keycloak.token)
          window.sessionStorage.setItem("token", keycloak.token);
        if (keycloak.refreshToken)
          window.sessionStorage.setItem("refreshToken", keycloak.refreshToken);

        window.sessionStorage.setItem(
          "tokenParsed",
          JSON.stringify(keycloak.tokenParsed)
        );

        const allowedClients = keycloak.tokenParsed?.resource_access || {};

        if (allowedClients[clientId]) {
          onAuthenticated(authenticated);
        } else {
          alert("Você não tem permissão para acessar este sistema.");
          doLogout();
        }
      } else {
        doLogin();
      }
    })
    .catch(doLogout);
};

export const getFullname = () => keycloak?.tokenParsed?.name || "";

export const getFirstname = () => keycloak?.tokenParsed?.given_name || "";

export const getUsername = () =>
  keycloak?.tokenParsed?.preferred_username || "";

export const getTokenParsed = () => keycloak.tokenParsed;

export const getToken = () => keycloak.token;
