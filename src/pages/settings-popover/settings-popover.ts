import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings-popover.html'
})

export class SettingsPopover {
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController) {}

  close() {
    this.viewCtrl.dismiss();
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