/* import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
bootstrapApplication(AppComponent, appConfig,)
  .catch((err) => console.error(err));
 */



/*   import { bootstrapApplication } from '@angular/platform-browser';
  import { AppComponent } from '../src/app/app.component';
  import { importProvidersFrom } from '@angular/core';
  import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app/app.config';
  
  bootstrapApplication(AppComponent,appConfig, {
    providers: [
      importProvidersFrom(HttpClientModule) // Ensure HttpClient is available
    ]
  }).catch(err => console.error(err));
   */
  import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; 
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app/app.config';
bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, 
    importProvidersFrom(HttpClientModule) 
  ]
}).catch(err => console.error(err));
