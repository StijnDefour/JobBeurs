import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import * as $ from 'jquery';

@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScanPage {

  options: BarcodeScannerOptions;
  results: {};
  items: Array<{naam: string, studnr: string}>;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
    this.items = JSON.parse(localStorage.getItem('aanwezigen'));
  }

  async scanBarcode() {
    this.results = await this.barcodeScanner.scan();
    if (!this.results.cancelled) {
      this.getStudenten(this.results.text);
      localStorage.setItem('aanwezigen', JSON.stringify(this.items));
    }
  }

  getStudenten(input: String) {
    var url_s = 'https://defourstijn.cloudant.com/studenten/19cbb0e3b2065adcadd507f609df43d5';

		$.get(
				url_s,
				function(data_o) {
            input = input.substring(4, 11) + "-" + input.substring(input.length-2);
						for(var i = 0; i < data_o.studenten.length; i++)
						{
              if (data_o.studenten[i].registratienummer == input) {
                this.items.push({
                    naam: data_o.studenten[i].naam + " " + data_o.studenten[i].voornaam,
                    studnr: input
                  });
              }
						}
				}
			);
  }
}
