import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer,popup, Layer, marker, icon } from 'leaflet';
import { Router, ActivatedRoute } from '@angular/router';
import { FireserviceService } from '../services/fireservice.service';
import { FireauthService } from '../fireauthservice/fireauth.service'
import { Library } from '../domain/library';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage   implements OnInit{
  map: Map;
  libs: Library[];

  constructor(private router: Router,private route: ActivatedRoute,private fireservice: FireserviceService,private authService: FireauthService)  {}

  ngOnInit(): void {
      this.libs=this.initiateLibraries();
  }

  ionViewDidEnter() {
    // In setView add latLng and zoom
    // tslint:disable-next-line:quotemark
    console.log("ionViewDidEnter" + this.map);
    this.map = new Map('mapId3').setView([38.760231, -9.160311], 10);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a>',
    }).addTo(this.map);

    // tslint:disable-next-line:quotemark
    console.log("ionViewDidEnter" + this.map);
    this.leafletMap();
  }

  leafletMap() {
    var blackIcon = icon({
      iconUrl: "../assets/location.png",

      iconSize: [30,30],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    })


    for (let i=0; i < this.libs.length; i++){

      
      let str = this.isLibraryOpen(this.libs[i].getSchedule());
      let strSch ="";

      if(str[0]){
        strSch = '<h6 style="margin: 0.2rem 0;"><span style="font-weight:bold">Schedule: </span><span style="color:green">Open</span> - ' +
        str[1]+
        '</h6>'
      }
      else{
          strSch = '<h6 style="margin: 0.2rem 0;"><span style="font-weight:bold">Schedule: </span></span><span style="color:red">Closed</span> - ' +
          str[1]+
          '</h6>'
        
      }


      var popupContent = popup({
        closeOnClick: true,
        className: 'custom-popup'
      }).setContent(
        '<div style="display: flex; flex-direction: column; ">' +
        '<img src="' + this.libs[i].getPic() + '" alt="Library Image" style="height:125px;width:100%;"><div style="height:5px"></div>'+
        '<h6 style="margin: 0.2rem 0;"><span style="font-weight:bold">Name: </span>' + this.libs[i].getName() + '</h6>' +
        '<h6 style="margin: 0.2rem 0;"><span style="font-weight:bold">Address: </span>' + this.libs[i].getLibAddress() + '</h6>' +
        strSch +
        '</div>'

      );
      
      marker(this.libs[i].getGeo(), {icon: blackIcon})
        .addTo(this.map)
        .bindPopup(popupContent);
      
     
    }

    

   
  }


   isLibraryOpen(sc:{day: string, openingTime: string, closingTime: string }[]):[boolean,string] {
    const today = new Date();
    const currentDay = today.toLocaleString('en-US', { weekday: 'long' });
    const currentTime = today.toLocaleTimeString('en-US', { hour12: true });
    const currentSeconds = this.timeToSeconds(currentTime);

    for (let i = 0; i < sc.length; i++) {
      if (sc[i].day === currentDay) {
       const openingTime = this.timeToSeconds(sc[i].openingTime);
       let closingTime = sc[i].closingTime;
       let closingTime_2 = this.timeToSeconds(sc[i].closingTime);

        if (closingTime === 'Closed') {
          return [false, 'Closed at '+sc[i].day] ;
        }
        
        else if (currentSeconds  >= openingTime && currentSeconds  <= closingTime_2) {
          console.log("currentTime", currentTime)
          console.log("openingTime", openingTime)
          console.log("closingTime", closingTime_2)
          return [true, 'Closes at '+sc[i].closingTime];
        }
        else {
          return [false, 'Closed at '+sc[i].closingTime];
        }
      }
    }
  
    return [false, '']; // if no schedule found for current day
  }

  
timeToSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

  initiateLibraries(){
    
    var schedule1 = [
      {
        day: 'Monday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Tuesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Wednesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Thursday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Friday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Saturday',
        openingTime: '',
        closingTime: 'Closed'
      },
      {
        day: 'Sunday',
        openingTime: '',
        closingTime: 'Closed'
      }
    ]

    var schedule2= [
      {
        day: 'Monday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Tuesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Wednesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Thursday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Friday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Saturday',
        openingTime: '10:00 AM',
        closingTime: '1:00 PM'
      },
      {
        day: 'Sunday',
        openingTime: 'Closed',
        closingTime: ''
      }
    ]

    var schedule3 = [
      {
        day: 'Monday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Tuesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Wednesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Thursday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Friday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Saturday',
        openingTime: '10:00 AM',
        closingTime: '1:00 PM'
      },
      {
        day: 'Sunday',
        openingTime: 'Closed',
        closingTime: ''
      }
    ]

    var schedule4 = [
      {
        day: 'Monday',
        openingTime: '',
        closingTime: 'Closed'
      },
      {
        day: 'Tuesday',
        openingTime: '',
        closingTime: 'Closed'
      },
      {
        day: 'Wednesday',
        openingTime: '',
        closingTime: 'Closed'
      },
      {
        day: 'Thursday',
        openingTime: '',
        closingTime: 'Closed'
      },
      {
        day: 'Friday',
        openingTime: '',
        closingTime: 'Closed'
      },
      {
        day: 'Saturday',
        openingTime: '',
        closingTime: 'Closed'
      },
      {
        day: 'Sunday',
        openingTime: '',
        closingTime: 'Closed'
      }
    ]

    var schedule5 = [
      {
        day: 'Monday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Tuesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Wednesday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Thursday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Friday',
        openingTime: '10:00 AM',
        closingTime: '7:00 PM'
      },
      {
        day: 'Saturday',
        openingTime: '10:00 AM',
        closingTime: '6:00 PM'
      },
      {
        day: 'Sunday',
        openingTime: '',
        closingTime: 'Closed'
      }
    ]


    const libraries: Library[] = [
     new Library("National Library of Portugal",[38.760231, -9.160311],"Campo Grande 83, 1749-081 Lisboa, Portugal",
    'assets/bibs/463aab778dc1e95ec468d36c50c1b772-19957-lisbon-national-museum-of-ancient-art-09.jpg',schedule1),
     new Library("Municipal Library of Lisbon",[38.712188, -9.135804]," Rua da Madalena 143, 1100-319 Lisboa, Portugal",
    'assets/bibs/bib2.jpg',schedule2),
     new Library("Library of the Faculty of Law of the University of Lisbon",[38.737395, -9.154204],"Alameda da Universidade, Cidade Universitária, 1649-014 Lisboa, Portugal",
    'assets/bibs/biblio1.jpg',schedule3),
     new Library("Library of the National Museum of Ancient Art",[38.705649, -9.161797],"Rua das Janelas Verdes, 1249-017 Lisboa, Portugal",
    'assets/bibs/lib4.jpg',schedule4),
     new Library("Library of the Calouste Gulbenkian Foundation",[38.736449, -9.155667],"Avenida de Berna 45A, 1067-001 Lisboa, Portugal",
    'assets/bibs/lib5.jpg',schedule5)
    ];

    return libraries;

  }













  goHome() {

    this.router.navigate(['/homepage']);
  }

  goCollection() {
    this.router.navigate(['/collection'],{ queryParams: { userId: this.fireservice.userId }});
  }


  goSearch() {

    this.router.navigate(['/searchfull']);

  }


  goProfile() {
    this.router.navigate(['/userprofile']);
  }

  goLogout(){
    this.authService.doLogout();
    this.router.navigate(['/sign-up-one']);
  }


}
