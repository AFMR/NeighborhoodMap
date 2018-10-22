import React, {Component} from 'react';
import './search.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) =>{
    this.setState({searchText: event.target.value});
  }

  onSubmit = (event) => {
    this.props.filter(this.state.searchText)
    event.preventDefault();
  }

  click = (id) => {
    let foundMarker = this.props.markers.find(marker => marker.id === id)
    window.google.maps.event.trigger(foundMarker, 'click')
  }

  render() {
    return (
      <div class='search'>
        <form onSubmit={this.onSubmit} role="search">
          <label>
            <input type="text" name="place-type"
            placeholder='Search'
            aria-label='Enter your search'
            onChange={this.onChange}/>
          </label>
          <input type="submit" value="Search"/>
        </form>
        <div id='search-list' aria-label='List of places' tabIndex='0'>
          <nav id='search-nav'>
            <ul>
              {
                this.props.places.map((place, index) => {
                  const categories = place.venue.categories[0] ? place.venue.categories[0].name : "";
                  return(
                  <li key={index}>
                    <a class="place-name"
                      aria-label={`${place.venue.name} ${place.venue.location.formattedAddress} ${categories}`  }
                      onClick={() => {this.click(place.venue.id)}}
                      onKeyPress={() => {this.click(place.venue.id)}}
                      tabIndex="0">
                        {place.venue.name}
                    </a>
                  </li>)
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default Search
