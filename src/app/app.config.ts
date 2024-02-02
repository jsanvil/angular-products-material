import { ApplicationConfig, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideRouter(routes),
    provideAnimations()
],
};
