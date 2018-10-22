import React, {Component} from 'react'
import './toggle-button.css'

class ToggleButton extends Component {
  render() {
    return(
      <button className="toggle-button" onClick={this.props.click}>
          <div className="no-line" />
          <div className="button-line" />
          <div className="button-line" />
          <div className="button-line" />
          <div className="no-line" />
      </button>
    )
  }
}

export default ToggleButton;
