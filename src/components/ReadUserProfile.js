import axios from 'axios'
import React, { Component } from 'react'

import SpeciesCard from './SpeciesCard'

import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBinFill } from 'react-icons/ri'



export default class ReadUserProfile extends Component {

  BASE_API_URL = "http://localhost:8888"

  state = {
    // userFavouriteIds: [],
    // userFavouriteSpecies: [],
    // loaded: false
    // userFavouriteSpecies2:[]
    action: "readingEmail"
  }

  // componentDidUpdate(prevState){
  //   if(prevState.userFavouriteIds !== this.props.userFavouriteIds){
  //       console.log('componenddidupdate')
  //       await
  //   }
  // }


  // getUserFavourites = async() => {
  //   console.log('getting user favourites')
  //   let payload = {
  //     params: {}
  //   }

  //   if(this.state.userFavouriteIds.length > 0){
  //     payload.params.userFavouriteIds = this.state.userFavouriteIds
  //   }

  //   let userFavouritesResponse = await axios.get(this.BASE_API_URL + '/orchid_species', payload);
  //   this.setState({
  //     userFavouriteSpecies: userFavouritesResponse.data,
  //     loaded: true
  //   })

  // }

  // async componentDidMount() {

  //   console.log('mounting readuserprofile')

  //   if(this.props.currentUserId){
  //     let userFavouritesResponse = await axios.get(this.BASE_API_URL + '/users/' + this.props.currentUserId)

  //     console.log(userFavouritesResponse.data)

  //     this.setState({
  //       userFavouriteIds: userFavouritesResponse.data.favourites
  //     })
  //   }

  //   return this.getUserFavourites();

  // }

  // editEmail = () => {
  //   this.setState({
  //     action: "editingEmail"
  //   })
  // }

  beginEditEmail() {
    return <div className="form-floating mb-3">
    <input type="email" 
            className="form-control" 
            id="floatingInput" 
            placeholder="name@example.com"
            name='userEmail'
            onChange={this.props.updateFormField}
            />
    <label htmlFor="floatingInput">New email address</label>
    <button className='btn'
            onClick={async () => {
              await this.props.putApiUserEmail();
              setTimeout( this.setState({
                action: "readingEmail"
              }), 3000)
            }}
            >
              Submit
    </button>
    <button className='btn'
            onClick={() => {this.setState({action: 'readingEmail'})}}
            >
              Cancel
    </button>
    
  </div>
  }

  renderEmail() {
    return <div className='d-flex border border-danger border-3'>
      <div className='row'>
        <div className='align-self-center'>Hello, {this.props.userEmail}</div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            Are you sure you wish to delete your account? You will lose all of your saved favourites.
          </div>
          <div className='row'>
            <div className='col-6 d-flex'>
                <button className='btn ms-auto'
                        data-bs-toggle="collapse" 
                        data-bs-target={"#collapseExample"} 
                        aria-expanded="false" 
                        aria-controls="collapseExample"
                >
                    Go back
                </button>
            </div>
            <div className='col-6 d-flex'>
                <button className='btn me-auto'
                        onClick={async() => {
                          await this.props.deleteApiUserEmail()
                          setTimeout(() => this.props.setActivePage('main'), 3000)
                        }}
                >
                    Delete
                </button>
            </div>
            
          </div>
        </div>
        </div>
        <button className='btn ms-auto'
                onClick={() => {this.setState({
                  action: "editingEmail"
                })}}
                >
                  <AiFillEdit  />
        </button>
        <button className='btn'
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseExample" 
                aria-expanded="false" 
                aria-controls="collapseExample"
                // onClick={() => {this.props.deleteApiUserEmail()}}
                >
          <RiDeleteBinFill/>
        </button>
      </div>
  }

  renderContent() {
    if(this.state.action === 'editingEmail'){
      return this.beginEditEmail()
    } else if(this.state.action === 'readingEmail'){
      return this.renderEmail()
    }
  }

  render() {

    // dont need this if validation because users can't even see this page without creating an account/logging in first?
    // needs validation if favourites == 0
    if(this.props.currentUserId){
      // if (this.state.loaded) {
        return <React.Fragment>
        {/* <div className = 'row'>
          <div className='col col-2'></div>
          <div className='col-8 border border-primary border-3'>
            {this.renderContent()}
          </div>
          <div className='col col-2'></div>
        </div> */}
        <div className='border border-primary border-3'>
          {this.renderContent()}
          <p>{this.props.editEmailMsg}</p>
        </div>

        <div className='row'>
            {this.props.userFavouriteSpecies.map(
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
                              checkApiUserFavourite={this.props.checkApiUserFavourite}
                              userFavouriteIds={this.props.userFavouriteIds}
                              />
                </div>
              </React.Fragment>
            )}
        </div>


        </React.Fragment>;
    // } else {
    //     return <React.Fragment>
    //         Loading, please wait...
    //     </React.Fragment>
    //   }
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
