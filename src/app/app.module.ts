import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialModule} from '@blox/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from './my-rx-stomp.config';
import {AgGridModule} from 'ag-grid-angular';
import { FixEventsComponent } from './fix-events/fix-events.component';

@NgModule({
  declarations: [
    AppComponent,
    FixEventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
