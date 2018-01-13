import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { SettingsPopover } from '../settings-popover/settings-popover';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})

export class ListPage {

	items: Array<{naam: string, studnr: string}>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
	this.items = JSON.parse(localStorage.getItem('aanwezigen'));
	}

	refreshPagina() {
	this.items = JSON.parse(localStorage.getItem('aanwezigen'));
	}

	weergevenPopover(event) {
		let popover = this.popoverCtrl.create(SettingsPopover);
		popover.present({
			ev: event
		});
	}
}
