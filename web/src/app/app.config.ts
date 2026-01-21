import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptorInterceptor } from './core/auth/interceptors/auth-interceptor-interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptorInterceptor])),
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'd MMMM y à HH:mm' },
    },
  ],
};
