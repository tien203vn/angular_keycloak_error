import { APP_INITIALIZER, ApplicationConfig, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withEnabledBlockingInitialNavigation, withPreloading } from '@angular/router';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeKeycloak } from './keycloak/keycloak-init.factory';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation()
    ),
    provideAnimationsAsync(),
    provideClientHydration(),
    KeycloakService,
    {
      provide: APP_INITIALIZER, // cung cấp hàm khởi tạo
      useFactory: initializeKeycloak, // hàm khởi tạo keycloak
      multi: true, // nếu có nhiều hàm khởi tạo thì set multi = true
      deps: [KeycloakService] // phụ thuộc cần tiêm cho hàm initializeKeycloak
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    provideHttpClient(
      withInterceptorsFromDi() // tell httpClient to use interceptors from DI
    ),
  ],
};

