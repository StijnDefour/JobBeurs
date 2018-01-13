import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ScanPage } from '../pages/scanner/scanner';
import { ListPage } from '../pages/list/list';
import { SettingsPopover } from '../pages/settings-popover/settings-popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 

@NgModule({
  declarations: [
    MyApp,
    ScanPage,
    ListPage,
    SettingsPopover
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScanPage,
    ListPage,
    SettingsPopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Camera,
    BarcodeScanner
  ]
})
export class AppModule {}
