import axios from 'axios'
import React, { Component } from 'react'

import SpeciesCard from './SpeciesCard'

export default class ReadUserProfile extends Component {

  state = {
    userFavouriteIds: [],
    userFavouriteSpecies: [],
    loaded: false
  }

  BASE_API_URL = "http://localhost:8888"

  getUserFavourites = async() => {
    console.log('getting user favourites')
    let payload = {
      params: {}
    }

    if(this.state.userFavouriteIds.length > 0){
      payload.params.userFavouriteIds = this.state.userFavouriteIds
    }

    let userFavouritesResponse = await axios.get(this.BASE_API_URL + '/orchid_species', payload);
    this.setState({
      userFavouriteSpecies: userFavouritesResponse.data,
      loaded: true
    })

  }

  async componentDidMount() {

    console.log('mounting readuserprofile')

    if(this.props.currentUserId){
      let userFavouritesResponse = await axios.get(this.BASE_API_URL + '/users/' + this.props.currentUserId)

      console.log(userFavouritesResponse.data)

      this.setState({
        userFavouriteIds: userFavouritesResponse.data.favourites
      })
    }

    return this.getUserFavourites();

  }

  render() {

    if(this.props.currentUserId){
      if (this.state.loaded) {
        console.log('loaded')
        return <React.Fragment>
          <div className='row'>
            {this.state.userFavouriteSpecies.map(
              eachItem => 
              <React.Fragment key={eachItem._id}>
                <div className='col col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 border border-danger mx-auto'>
                <SpeciesCard  eachItem={eachItem}
                              distributionOptions={this.props.distributionOptions}
                              conservationOptions={this.props.conservationOptions}
                              // selectActiveDisplay={this.props.selectActiveDisplay}
                              setActivePage={this.props.setActivePage}
                              selectEdit = {this.props.selectEdit}
                              showMdSearchFilter={this.props.showMdSearchFilter}
                              // postApiUserFavourite={this.props.postApiUserFavourite}
                              />
                </div>
              </React.Fragment>
            )}
        </div>
        </React.Fragment>;
    } else {
        return <React.Fragment>
            Loading, please wait...
        </React.Fragment>
      }
    } else{
      return<>Please create an account to add favourites to your profile.</>
    }


    

    
    return 
    // (
    //   <div className='row'>
    //     {this.state.userFavourites.map(
    //         eachItem => 
    //         <React.Fragment key={eachItem._id}>
    //           <div className='col col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 border border-danger mx-auto'>
    //           <SpeciesCard  eachItem={eachItem}
    //                         distributionOptions={this.props.distributionOptions}
    //                         conservationOptions={this.props.conservationOptions}
    //                         // selectActiveDisplay={this.props.selectActiveDisplay}
    //                         setActivePage={this.props.setActivePage}
    //                         selectEdit = {this.props.selectEdit}
    //                         showMdSearchFilter={this.props.showMdSearchFilter}
    //                         // postApiUserFavourite={this.props.postApiUserFavourite}
    //                         />
    //           </div>
    //         </React.Fragment>
    //       )}
    //   </div>
    // )
  }
}
