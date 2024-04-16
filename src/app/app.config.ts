import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [HttpClientModule, provideHttpClient(), provideRouter(routes, withComponentInputBinding())]
};
