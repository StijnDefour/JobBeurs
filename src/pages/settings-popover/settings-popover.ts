import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
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

  constructor(http: Http, public viewCtrl: ViewController, public alertCtrl: AlertController, public navCtrl: NavController) {
    this.http = http;
    this.mailgunUrl = "sandboxe1f52f7dc53545a983dcb21f63b99bc1.mailgun.org";
    this.mailgunApiKey = window.btoa("api:key-87642c6e289d814a735b9ed70a8dec15");
    this.items = JSON.parse(localStorage.getItem('aanwezigen'));
  }

  close() {
    this.navCtrl.push(ListPage);
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
            this.emailVersturen(data.email, "test1", this.ConvertToCSV());
          }
        }
      ]
    });
    exporteren.present();
  }

  resultaatTonen(uitvoer) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: uitvoer,
      buttons: ['Dismiss']
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
        this.resultaatTonen("SUCCESS -> " + JSON.stringify(success));
    }, error => {
        this.resultaatTonen("ERROR -> " + JSON.stringify(error));
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
    let confirm = this.alertCtrl.create({
      title: 'Lijst wissen?',
      message: 'Opgelet! U staat op het punt deze lijst te wissen. Bent u zeker?',
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
}