import React, {Component} from 'react';
import ToggleButton from '../toggle-button/toggle-button.js'
import './header.css'

class Header extends Component {
  render() {
    return(
      <header>
        <nav id="main-navigation">
          <div>
            <ToggleButton click={this.props.click} />
          </div>
          <div id="nav-list">
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
