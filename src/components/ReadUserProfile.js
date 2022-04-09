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
    action: "readingEmail",
    closeModal: "modal"
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

  readEmail = () => {

    this.setState({
      action: "readingEmail"
    })
  }

  beginEditEmail() {
    return <div className="form-floating d-flex flex-column m-3">
      <input type="email"
        className="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        name='userEmail'
        onChange={this.props.updateFormField}
      />
      <label htmlFor="floatingInput">New email address</label>

      <div className='mt-3 align-self-end'>
        <button className='btn style-btn me-3 shadow-none'
                onClick={async() => {
                  await this.props.putApiUserEmail();
                  this.setState({
                    action: "readingEmail"
                  });
                }}
        >
          Submit
        </button>
        <button className='btn style-btn shadow-none'
                onClick={() => { 
                  this.props.clearEmailErr();
                  this.setState({ action: 'readingEmail' })
                }}
        >
          Cancel
        </button>

      </div>



    </div>
  }

  renderEmail() {
    return <div className='d-flex white rounded m-3 py-3 ps-3 pe-1 border border-dark'>
      <div className='row'>
        <div className='align-self-center style-text'>Hello, {this.props.userEmail}</div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body mt-3 style-text">
            Are you sure you wish to delete your account? You will lose all of your saved favourites.
          </div>
          <div className='row mt-2'>
            <div className='col-6 d-flex'>
              <button className='ms-auto btn style-btn px-4'
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Back
              </button>
            </div>
            <div className='col-6'>
              <button className='btn style-btn'
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={async () => {
                  await this.props.deleteApiUserEmail()
                  // this.props.setActivePage('main')
                  setTimeout(() => this.props.setActivePage('main'), 3000)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className='btn shadow-none ms-auto'
        onClick={() => {
          this.setState({
            action: "editingEmail"
          })
        }}
      >
        <AiFillEdit />
      </button>
      <button className='btn shadow-none'
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      // onClick={() => {this.props.deleteApiUserEmail()}}
      >
        <RiDeleteBinFill />
      </button>
    </div>
  }

  renderContent() {
    if (this.state.action === 'editingEmail') {
      return this.beginEditEmail()
    } else if (this.state.action === 'readingEmail') {
      return this.renderEmail()
    }
  }

  render() {

    // dont need this if validation because users can't even see this page without creating an account/logging in first?
    // needs validation if favourites == 0
    if (this.props.userFavouriteSpecies.length > 0) {
      return <React.Fragment>

        <div className='style-text'>
          {this.renderContent()}
          <p >{this.props.editEmailMsg}</p>
        </div>

        <div className='row px-2'>
          {this.props.userFavouriteSpecies.map(
            eachItem =>
              <React.Fragment key={eachItem._id}>
                <div className='col col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 mx-auto'>
                  <SpeciesCard eachItem={eachItem}
                    distributionOptions={this.props.distributionOptions}
                    conservationOptions={this.props.conservationOptions}
                    // selectActiveDisplay={this.props.selectActiveDisplay}
                    setActivePage={this.props.setActivePage}
                    selectEdit={this.props.selectEdit}
                    showMdSearchFilter={this.props.showMdSearchFilter}
                    checkApiUserFavourite={this.props.checkApiUserFavourite}
                    userFavouriteIds={this.props.userFavouriteIds}
                    loggedIn={this.props.loggedIn}
                    closeModal={this.state.closeModal}
                  />
                </div>
              </React.Fragment>
          )}
        </div>
      </React.Fragment>;
    } else {
      return <React.Fragment>
        <div className='px-2 style-text mb-3'>
          <div>
            {this.renderContent()}
            <p className='px-3'>{this.props.editEmailMsg}</p>
          </div>

          <div className='px-3'>
            You have not added any favourites.
          </div>

        </div>

      </React.Fragment>
    }
    // if (this.state.loaded) {
    // } else {
    //     return <React.Fragment>
    //         Loading, please wait...
    //     </React.Fragment>
    //   }






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
