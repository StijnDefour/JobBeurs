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
  items: Array<{naam: string, studnr: string}>;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
    this.items = [
      { "naam": "Stijn", "studnr": "S6969"},
      { "naam": "Mahyar", "studnr": "S666" },
      { "naam": "Cedric", "studnr": "S420blazeit" }
    ];

    localStorage.setItem('aanwezigen', JSON.stringify(this.items));
  }

  async scanBarcode() {
    this.results = await this.barcodeScanner.scan();

    this.items.push({
        naam: 'Nieuwe',
        studnr: 'this.results.text'
      });

    localStorage.setItem('aanwezigen', JSON.stringify(this.items));
  }
}
