import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Mail } from 'src/app/models/mail.model';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails: Mail[] = [];

  constructor(private http: HttpClient) { }

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

}
