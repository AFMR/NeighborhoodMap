import React, { Component } from 'react';
import './map.css'

class Map extends Component {
  state = {
    infoWindows: []
  }

  componentDidMount() {
    this.getPlaces(this.props.filterQuery)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filterQuery !== this.props.filterQuery) {
      this.getPlaces(this.props.filterQuery)
    }
  }

  getPlaces = (query) => {
    const request = 'https://api.foursquare.com/v2/venues/search?'
    const params = {
      client_id: "DLG0O4T1FT032MXEQLHWLMKDKH5WKFTJI1G3FR2ZWQMO5U2V",
      client_secret: "0KUBI43IHXPHRX3X23K0R1VQ1U30F3YDLRFQA1HSNIKRBYSV",
      near: "Wayne, PA",
      query: query,
      radius: 30000,
      intent: "browse",
      v: "20180922"
    }

    const requestUrl = request + new URLSearchParams(params)
    fetch(requestUrl)
    .then(response => response.json())
    .then(parsedJSON => {
      this.props.addPlaces(parsedJSON.response.venues)
      this.setState({
        places: parsedJSON.response.venues
      },
      this.loadOrInitializeMap())
    }).catch(error => {
      alert('Foursquare encountered an error');
      console.log(error);
      this.loadOrInitializeMap();
    });
  }

  loadOrInitializeMap = () => {
    if (typeof google === 'undefined') {
      this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyAJHpmgtHiENUB7k7EdZt_ZX5hvFzVKecc&v=3&callback=initMap")
    } else {
      this.initializeMap()
    }
  }

  initializeMap = () => {
    this.props.deleteMarkers()

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 40.043858,
        lng: -75.407242
      }
    })

    var bounds = new window.google.maps.LatLngBounds();

    this.props.places.forEach(markedPlace => {
      let category = '';

      if (markedPlace.categories !== 'undefined' &&
          markedPlace.categories[0] !== 'undefined' &&
          markedPlace.categories.length > 0){
        category = markedPlace.categories[0].name;
      }

      var placeDescriptionHtml =
      `<div tabIndex="0">
        <h1>${markedPlace.name}</h1>
        <p>
          <b>
            ${markedPlace.location.formattedAddress[0]}
            <br>
            ${markedPlace.location.formattedAddress[1]}
          </b>
        </p>
        <div>
          <p>${category}</p>
        </div>
      </div>`;

      var marker = new window.google.maps.Marker({
        title: markedPlace.name,
        id: markedPlace.id,
        position: {
          lat: markedPlace.location.lat,
          lng: markedPlace.location.lng
        },
        map: map
      });

      var mapsInfoWindow = new window.google.maps.InfoWindow();
      this.state.infoWindows.push(mapsInfoWindow);
      marker.addListener('click', () => {
        this.state.infoWindows.forEach(window => { window.close() });
        map.setCenter(marker.getPosition())
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => { marker.setAnimation(null) }, 1000)
        mapsInfoWindow.setContent(placeDescriptionHtml)
        mapsInfoWindow.open(map, marker)
      });

      this.props.addMarker(marker);
      var loc = new window.google.maps.LatLng(marker.position.lat(), marker.position.lng());
      
      bounds.extend(loc);
    })

    map.fitBounds(bounds)
    map.panToBounds(bounds)
}

  loadMap = (src) => {
    const failureHandler = window.gm_authFailure = function() {
      alert('An error has occurred when authenticating to google maps.');
    }

    const firstScript = window.document.getElementsByTagName('script')[0]
    const scriptElement = window.document.createElement('script')
    
    scriptElement.setAttribute('onerror', failureHandler)
    scriptElement.setAttribute("id", "map-script")
    scriptElement.src = src
    scriptElement.defer = true
    scriptElement.async = true

    firstScript.parentNode.insertBefore(scriptElement, firstScript, failureHandler)
    window.initMap = this.initializeMap

    setTimeout(() => {
      if (typeof window.google == 'undefined' || typeof window.google.maps == 'undefined' ) {
        alert('Google maps failed to load.')
      }
    }, 4000);
  }

  render() {
    return (<div id='map' role="application" aria-label="Map" tabIndex="-1"></div>)
  }
}

export default Map
