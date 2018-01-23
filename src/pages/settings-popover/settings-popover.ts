import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { Headers, Http, Request, RequestMethod } from "@angular/http";
import { ListPage } from '../list/list';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings-popover.html'
})

export class SettingsPopover {
  http: Http;
  mailgunUrl: string;
  mailgunApiKey: string;
  items: Array<{naam: string, studnr: string}>;

  constructor(http: Http, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.http = http;
    this.mailgunUrl = "sandboxe1f52f7dc53545a983dcb21f63b99bc1.mailgun.org";
    this.mailgunApiKey = window.btoa("api:key-87642c6e289d814a735b9ed70a8dec15");
    this.items = JSON.parse(localStorage.getItem('aanwezigen'));
  }

  close() {
    this.viewCtrl.dismiss();
  }

  exporteren() {
    if (this.items.length != 0) {
      let exporteren = this.alertCtrl.create({
        title: 'Exporteren',
        message: 'De data wordt verstuurd naar XXX',
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
              this.emailVersturen("s095683@ap.be", "Aanwezige studenten jobbeurs", this.ConvertToCSV());
            }
          }
        ]
      });
    exporteren.present();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Geen data',
        message: 'Er is geen data om te exporteren!',
        buttons: ['Terug']
      });
    alert.present();
    }
  }

  resultaatTonen(uitvoer) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: uitvoer,
      buttons: ['Terug']
    });
    alert.present();
  }

  emailVersturen(recipient: string, subject: string, message: string) {
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
    requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    this.http.request(new Request({
        method: RequestMethod.Post,
        url: "https://api:" + this.mailgunApiKey + "@api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
        body: "from=postmaster@sandboxe1f52f7dc53545a983dcb21f63b99bc1.mailgun.org&to=" + recipient + "&subject=" + subject + "&text=" + message,
        headers: requestHeaders
    }))
    .subscribe(success => {
        this.resultaatTonen("Succesvol verstuurd!");
    }, error => {
        this.resultaatTonen("Er is een fout opgetreden. Probeer opnieuw!");
    });
  }

  ConvertToCSV() {
    var str = '';
    var line;
    for (var i = 0; i < this.items.length; i++) {
      line = '';
      for (var index in this.items[i]) {
        if (line != '') line += ','
        line += this.items[i][index];
      }
    str += line + '\r\n';
    }
    return str;
  }

  bevestigingTonen() {
    if (this.items.length != 0) {
      let confirm = this.alertCtrl.create({
        title: 'Lijst verwijderen?',
        message: 'Opgelet! U staat op het punt deze lijst te verwijderen. Bent u zeker?',
        buttons: [
          {
            text: 'Ja, doorgaan',
            handler: () => {
              localStorage.setItem('aanwezigen', '[]');
              this.close();
            }
          },
          {
            text: 'Neen, teruggaan',
            handler: () => {
              this.close();
            }
          }
        ]
      });
    confirm.present();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Geen data',
        message: 'Er is geen data om te verwijderen!',
        buttons: ['Terug']
      });
    alert.present();
    }
  }
}