import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () => {
      keycloak.init({
        config: {
          url: 'http://localhost:8081',
          realm: 'pitch',
          clientId: 'pitch',
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets', '/public'],
        bearerPrefix: 'Bearer',
        initOptions:{
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/public/silent-check-sso.html',
              checkLoginIframe: false
        },
        
        updateMinValidity: 60,
      }).catch((e) => {
        console.log("Error thrown in init "+e)
     });
  };
}
