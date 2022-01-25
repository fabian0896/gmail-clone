import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Mail } from 'src/app/models/mail.model';
import randomColor from 'randomcolor';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';
import { AccountPageModule } from '../account/account.module';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails: Mail[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private popoverCrt: PopoverController,
  ) { }

  ngOnInit() {
    this.http.get<Mail[]>('./assets/data.json')
      .subscribe((res) => {
        this.emails = res.map((mail) => ({
          ...mail,
          color: randomColor(),
        }));
        console.log(this.emails);
      });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async openAccount(event) {
    const popover = await this.popoverCrt.create({
      component: AccountPage,
      event,
      cssClass: 'custom-popover',
    });
    await popover.present();
  }

  openDetails(id: string) {
    this.router.navigate(['tabs', 'mail', id]);
  }

}
