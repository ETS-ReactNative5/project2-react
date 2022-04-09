import React, { Component } from 'react'
import SpeciesCard from './SpeciesCard'

export default class ReadAllSpecies extends Component {


  render() {
    return (
      <React.Fragment>
        <div>
          <div className='d-flex flex-column align-items-center me-2 mt-3'>
            <a  className='align-self-end me-2 style-links'
                onClick={() => this.props.setActivePage('createSpecies')}>
              Help us expand our collection
            </a>
            
            <div className=' mt-3 me-2 text-muted style-text'>
              Displaying {this.props.species.length} results
            </div>
            
          </div>
          
          <div className='row px-2'>
          
            {this.props.species.map(
              eachItem => 
              <React.Fragment key={eachItem._id}>
                <div className='col col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 mx-auto'>
                <SpeciesCard  eachItem={eachItem}
                              distributionOptions={this.props.distributionOptions}
                              conservationOptions={this.props.conservationOptions}
                              // selectActiveDisplay={this.props.selectActiveDisplay}
                              setActivePage={this.props.setActivePage}
                              selectEdit = {this.props.selectEdit}
                              showMdSearchFilter={this.props.showMdSearchFilter}
                              checkApiUserFavourite={this.props.checkApiUserFavourite}
                              userFavouriteIds={this.props.userFavouriteIds}
                              loggedIn={this.props.loggedIn}
                              refreshSpeciesDisplay={this.props.refreshSpeciesDisplay}
                              />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>

    )
  }
}
