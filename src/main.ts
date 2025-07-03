import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';


bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes)

  ]
}).catch(err => console.error(err));