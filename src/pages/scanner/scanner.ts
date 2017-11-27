import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScanPage {

  options: BarcodeScannerOptions;
  results: {};

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
  }

  async scanBarcode() {
    this.results = await this.barcodeScanner.scan();
    console.log(this.results);
  }

}
