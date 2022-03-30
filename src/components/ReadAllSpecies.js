import axios from 'axios'
import React, { Component } from 'react'
import SpeciesCard from './SpeciesCard'

export default class ReadAllSpecies extends Component {
  

  //passed from Landing
  //props species, distributionOptions, setActivePage, selectActiveDisplay
  // renderModal

  state = {

  }



  render() {
    return (
      <React.Fragment>
        <div>ReadAllSpecies</div>
        <div>
          <a onClick={() => this.props.setActivePage('createSpecies')}>
            Help us expand our collection
          </a>
          <div className='row'>
          
            {this.props.species.map(
              eachItem => 
              <React.Fragment key={eachItem._id}>
                <div className='col col-10 col-sm-8 col-md-6 col-lg-4 border border-danger mx-auto'>
                <SpeciesCard eachItem={eachItem}
                              distributionOptions={this.props.distributionOptions}
                              conservationOptions={this.props.conservationOptions}
                              // selectActiveDisplay={this.props.selectActiveDisplay}
                              setActivePage={this.props.setActivePage}
                              />
                </div>
              </React.Fragment>
            )}
            
          </div>
          {/* { this.props.species.map(eachItem => console.log(eachItem)) } */}
        </div>
      </React.Fragment>

    )
  }
}
