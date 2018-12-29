# IONIC Sliding Segment (Directive)

This component using two other component from ionic theres segment and slides. feel free to contribute.

## Getting Started

Just clone this repo, and add it into your project, dont forget to import slide-segment.module.ts module into your app.module.ts

```
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SlideSegmentDirectiveModule } from '../directives/slide-segment/slide-segment.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SlideSegmentDirectiveModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

```

## Example Code
```
<ion-header>
  <ion-navbar>
    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>Home</ion-title>
  </ion-navbar>
  <ion-segment slide-segment #segment [scrollable-segment]="segment" [segment-container]="segmentContainer" [(ngModel)]="section">
    <ion-segment-button value="082018">
      08/2018
    </ion-segment-button>
    <ion-segment-button value="092018">
      09/2018
    </ion-segment-button>
    <ion-segment-button value="102018">
      10/2018
    </ion-segment-button>
    <ion-segment-button value="112018">
      Bulan lalu
    </ion-segment-button>
    <ion-segment-button value="122018">
      Bulan ini
    </ion-segment-button>
    <ion-segment-button value="2019">
      Masa Depan
    </ion-segment-button>
  </ion-segment>
</ion-header>

<ion-content>
  <ion-slides #segmentContainer>
    <ion-slide>
      <h2>Slide 1</h2>
    </ion-slide>
    <ion-slide>
      <h2>Slide 2</h2>
    </ion-slide>
    <ion-slide>
      <h2>Slide 3</h2>
    </ion-slide>
    <ion-slide>
      <h2>Slide 4</h2>
    </ion-slide>
    <ion-slide>
      <h2>Slide 5</h2>
    </ion-slide>
    <ion-slide>
      <h2>Slide 6</h2>
    </ion-slide>
  </ion-slides>
</ion-content>
```

## Deployment

Add additional notes about how to deploy this on a live system

<!-- ## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds -->

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).  -->

## Authors

* **Franky So** - *Initial work* - [Github](https://github.com/frankyso)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details