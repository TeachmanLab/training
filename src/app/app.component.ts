import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Intro, Session } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  intro: Intro;
  session: Session;
  sessionIndex: number;
  sessionNames: string[];
  introComplete: boolean;
  sessionComplete: boolean;

  // Read in the Json file.
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.sessionNames = ['example_session'];
    this.sessionIndex = -1;
    this.introComplete = false;
    this.sessionComplete = false;
    this.getIntro();
  }

  getIntro() {
    this.api.getIntro().subscribe(intro => {
      this.intro = intro;
      console.log('Loaded intro from JSON');
    });
  }

  nextSessionButtonVisible() {
    return this.sessionComplete;
  }

  nextSession() {
    this.sessionIndex++;
    this.introComplete = true;
    this.sessionComplete = false;
    if (this.sessionIndex < this.sessionNames.length) {
      console.log('Moving on to session ' + this.sessionIndex);
      this.sessionComplete = false;
      this.api.getSession(this.sessionNames[this.sessionIndex]).subscribe(session => {
        this.session = session;
        console.log('Loaded session from JSON');
        console.log('Session contains ' + this.session.sections.length + ' sections.')
      });
    }
  }

}
