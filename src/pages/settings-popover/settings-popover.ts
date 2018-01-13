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

  exporteren() {
    let exporteren = this.alertCtrl.create({
      title: 'Exporteren',
      message: 'Naar welke email wilt u dat de data ge-exporteerd wordt?',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          handler: data => {
            console.log('Geanuleerd');
          }
        },
        {
          text: 'Exporteer data',
          handler: data => {
            console.log(data.email);
          }
        }
      ]
    });
    exporteren.present();
  }
  bevestigingTonen() {
    let confirm = this.alertCtrl.create({
      title: 'Lijst wissen?',
      message: 'Opgelet! U staat op het punt deze lijst te wissen. Bent u zeker?',
      buttons: [
        {
          text: 'Ja, doorgaan',
          handler: () => {
            console.log('agreed clicked');
          }
        },
        {
          text: 'Neen, teruggaan',
          handler: () => {
            console.log('nope clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}