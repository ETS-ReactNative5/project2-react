import axios from 'axios'
import React, { Component } from 'react'

export default class ReadAllSpecies extends Component {

  //props species, setActivePage

  state = {

  }



  render() {
    return (
      <React.Fragment>
        <div>ReadAllSpecies</div>
        <div>
          <a onClick={() => this.props.setActivePage('createSpecies')}
            >Help us expand our collection</a>
        </div>
      </React.Fragment>

    )
  }
}
