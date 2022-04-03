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
        <div>
          <a onClick={() => this.props.setActivePage('createSpecies')}>
            Help us expand our collection
          </a>
          <div className='row'>
          
            {this.props.species.map(
              eachItem => 
              <React.Fragment key={eachItem._id}>
                <div className='col col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 border border-danger mx-auto'>
                <SpeciesCard eachItem={eachItem}
                              distributionOptions={this.props.distributionOptions}
                              conservationOptions={this.props.conservationOptions}
                              // selectActiveDisplay={this.props.selectActiveDisplay}
                              setActivePage={this.props.setActivePage}
                              selectEdit = {this.props.selectEdit}
                              showMdSearchFilter={this.props.showMdSearchFilter}
                              postApiUserFavourite={this.props.postApiUserFavourite}
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
