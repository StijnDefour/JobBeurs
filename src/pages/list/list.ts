import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  items: Array<{naam: string, studnr: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = JSON.parse(localStorage.getItem('aanwezigen'));

    /*this.items = [
      { "naam": "Stijn", "studnr": "S6969"},
      { "naam": "Mahyar", "studnr": "S666" },
      { "naam": "Cedric", "studnr": "S420blazeit" }
    ];*/
  }
}
