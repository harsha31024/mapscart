import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';





@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit {

  
  latitude: number=17.004393;
  longitude: number= 81.783325;
  zoom:any;
  title_add: any;
  mapTypeId:any;
  map:any= google.maps.Map;
  //center:any;

  


//   positions = [{
//     "post_id":1,
//     "post_city": "Vizag",                                                                                       
//     "post_latitude": 17.690474,
//     "post_longitude": 83.231049,
//     "draggable":true
    
// }, 
// {
//     "post_id":2,
//     "post_city": "Rajahmundry",
//     "post_latitude": 17.004393,
//     "post_longitude": 	81.783325,
//     "draggable":false
// }, 
// {
//     "post_id":3,
//     "post_city": "Kakinada",
//     "post_latitude": 16.989065,
//     "post_longitude": 82.247467,
//     "draggable":true
// }]
  

  


  constructor(private router: Router) {
    this.mapTypeId='hybrid';
    
   }


    @ViewChild("placesRef", {static:false}) placeRef:GooglePlaceDirective
    
    | undefined


  

  // options = {
  //   types: [],
  //   componentRestrictions: { country: 'MX' }
  // }

  // options = {

  //   types : [],

  //   componentRestrictions:{country:'MX'}

  // } 
  



  ngOnInit(): void {
    console.log('set');
    this.setCurrentLocation();
    this.getZoom();
    // this.getSearch();

  }
  
 
  

  public handleAddressChange(address: Address) {

    
  
    console.log('google address', address);
    console.log('latitude', address.geometry.location.lat())
    console.log('longitude', address.geometry.location.lng())

    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
  
  
  
  }
  public setCurrentLocation() {
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        
      })
    
    
    }
  
  
}


getZoom(){
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      
      zoom: 6,
      center: {  lat: 17.004393, lng: 81.783325 },
      mapTypeId: "hybrid",
      
    }
  );
  // map.setTilt(55);
 
  // const image =
  // "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  const image="assets/images/marker1.png";


  
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
  });

  let markers: google.maps.Marker[] = [];

 
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];


    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon as string,
        size: new google.maps.Size(70, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
          
        })
      );

      if (place.geometry.viewport) {
        
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
 
  
  const myLocations: [google.maps.LatLngLiteral, string][] = [
    [{ "lat": 17.690474, "lng": 83.231049 }, "<h6>CITY: Vizag</h6><h6>LATITUDE: 17.690474</h6><h6>LONGITUDE: 83.231049</h6>"],
    [{ "lat": 17.004393, "lng": 81.783325}, "<h6>CITY: Rajahmundry</h6><h6>LATITUDE: 17.004393</h6><h6>LONGITUDE: 81.783325</h6>"],
    [{ "lat": 16.989065, "lng":  82.247467 }, "<h6>CITY: Kakinada</h6><h6>LATITUDE: 16.989065</h6><h6>LONGITUDE: 82.247467</h6>"],
    [{ "lat":16.515099, "lng": 80.632095},"<h6>CITY: Vijayawada</h6><h6>LATITUDE: 16.515099</h6><h6>LONGITUDE:  80.632095</h6>"]
   
  ];

  

  const infoWindow = new google.maps.InfoWindow();

 
  
  // Create the markers.
 
  myLocations.forEach(([position,title], i) => {
    const marker = new google.maps.Marker({
      position,
      map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: `${i + 1}. ${title}`,
      // label: `${i + 1}`,
      optimized: false,
      icon: image,
     

    });
  
    
   

  
    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click",() => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap() , marker);
      // infoWindow.open(map, marker);
    
      map.setZoom(10);
      map.setCenter(marker.getPosition() as google.maps.LatLng);
    });
   
  });

  
}

// getSearch(){
//   const map = new google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       center: { lat: -33.8688, lng: 151.2195 },
//       zoom: 13,
//       mapTypeId: "roadmap",
//     }
//   );

//   // Create the search box and link it to the UI element.
//   const input = document.getElementById("pac-input") as HTMLInputElement;
//   const searchBox = new google.maps.places.SearchBox(input);

//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener("bounds_changed", () => {
//     searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
//   });

//   let markers: google.maps.Marker[] = [];

//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener("places_changed", () => {
//     const places = searchBox.getPlaces();

//     if (places.length == 0) {
//       return;
//     }

//     // Clear out the old markers.
//     markers.forEach((marker) => {
//       marker.setMap(null);
//     });
//     markers = [];

//     // For each place, get the icon, name and location.
//     const bounds = new google.maps.LatLngBounds();

//     places.forEach((place) => {
//       if (!place.geometry || !place.geometry.location) {
//         console.log("Returned place contains no geometry");
//         return;
//       }

//       const icon = {
//         url: place.icon as string,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25),
//       };

//       // Create a marker for each place.
//       markers.push(
//         new google.maps.Marker({
//           map,
//           icon,
//           title: place.name,
//           position: place.geometry.location,
//         })
//       );

//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });
//     map.fitBounds(bounds);
//   });

// }

  LogoutUser() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }
 
  

}



