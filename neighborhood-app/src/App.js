import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header.js';
import Search from './components/search/search.js';
import Map from './components/map/map.js';

class App extends Component {
  state = {
    searchOpen: false,
    places: [],
    filterQuery: '',
    markers: []
  }

  placesFilter = (input) => {
    this.setState({ filterQuery: input })
  }

  addMarker = (marker) => {
    this.state.markers.push(marker)
  }

  addPlaces = (places) => {
    this.setState({ places: places })
  }

  deleteMarkers = () => {
    this.setState({ markers: [] })
  }

  closeSearch = () => {
    if (this.state.searchOpen === true) {
      this.setState({ searchOpen: false })
    }
  }

  searchToggle = () => {
    this.setState((previousValue) => {
      return { searchOpen: !previousValue.searchOpen }
    })
  }

  placeClick = (id) => {
    const foundMarker = this.state.markers.find(marker => marker.name === id)
    window.google.maps.event.trigger('click', foundMarker)
  }

  render() {
    let search

    search = 
      this.state.searchOpen ?
      <Search places={this.state.places} filter={this.placesFilter} markers={this.state.markers}/> :
      undefined;

    return (
      <div className="App">
        <Header click={this.searchToggle} />
        { search }
        <div onClick={this.closeSearch}>
          <Map tabIndex='-1' addPlaces={this.addPlaces} places={this.state.places} filterQuery={this.state.filterQuery} addMarker={this.addMarker} deleteMarkers={this.deleteMarkers}/>
        </div>
      </div>
    );
  }
}

export default App;
