import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})

export class ListPage {

	items: Array<{naam: string, studnr: string}>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
	this.items = JSON.parse(localStorage.getItem('aanwezigen'));
	}

	refreshPagina() {
	this.items = JSON.parse(localStorage.getItem('aanwezigen'));
	}

	weergevenPopover() {
		let popover = this.popoverCtrl.create(MyPopOverPage);
		popover.present();
	}

	bevestigingTonen() {
	let confirm = this.alertCtrl.create({
	  title: 'Lijst wissen?',
	  message: 'Opgelet! U staat op het punt deze lijst te wissen. Bent u zeker?',
	  buttons: [
	    {
	      text: 'Ja, doorgaan.',
	      handler: () => {
	        console.log('agreed clicked');
	      }
	    },
	    {
	      text: 'Neen, teruggaan.',
	      handler: () => {
	        console.log('nope clicked');
	      }
	    }
	  ]
	});
	confirm.present();
  	}
}
