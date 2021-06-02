import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgrxCorrelationIdModule} from 'ngrx-correlation-id';

import {AppComponent} from './app.component';
import {EntityModule} from './entity/entity.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgrxCorrelationIdModule,

    EntityModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
