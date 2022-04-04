import React, { Component } from 'react';
import axios from "axios";
import SpeciesForm from './SpeciesForm';

export default class CreateSpecies extends Component {

  //props: setActivePage, orchidColours, orchidScentsOptions, orchidPetalPatternOptions.
  //distribution, conservation
  
  state= {

    apiMethod : "post",

    commonName: "",
    officialName: "",
    genus: "",
    parent1: "", 
    parent2: "",
    creatorName: "",
    creationYear: "",
    colours: [],
    petalPattern: "",
    scents: [],
    floralGrouping: "",
    imageUrl: "",
    distribution: "",
    conservationStatus: "",

    commonNameErr: "",
    officialNameErr:"",
    genusErr: "",
    coloursErr: "",
    petalPatternErr: "",
    scentsErr:"",
    imageUrlErr:"",
    distributionErr:"",
    conservationStatusErr:""

    

  }

  updateFormField = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  updateCheckbox = (e) => {
      if(this.state[e.target.name].includes(e.target.value)){
          let indexToRemove = this.state[e.target.name].findIndex( 
              value => value===e.target.value
          )
          this.setState({
              [e.target.name]: [...this.state[e.target.name].slice(0, indexToRemove), ...this.state[e.target.name].slice(indexToRemove + 1)]
          })
      } else {
          this.setState({
              [e.target.name]: [...this.state[e.target.name], e.target.value]
          })
      }
  }

  renderDropdown(options) {
    let selectOptions = options.map(
        eachOption => <option key={eachOption._id} value={eachOption._id}>{eachOption.name}</option>
    )
    return selectOptions
  }

  apiMethod = () => {
    if(this.state.apiMethod === "post"){
      this.postApi();
    } else if(this.state.apiMethod === "put"){
      this.putApi();
    }
  }

  BASE_API_URL = "http://localhost:8888"

  postApi = async () => {

    let errorTracker = false

    if(this.state.commonName === "" || this.state.commonName === undefined){
      errorTracker = true
      this.setState({
        commonNameErr: "Please provide the common name of this species"
      })
    } else if (this.state.commonName.length < 3){
      errorTracker=true
      this.setState({
        commonNameErr: "Please enter a name longer than 2 characters"
      })
    }

    if(this.state.officialName === "" || this.state.officialName === undefined){
      errorTracker = true
      this.setState({
        officialNameErr: "Please provide the common name of this species"
      })
    } else if (this.state.officialName.length < 5){
      errorTracker=true
      this.setState({
        officialNameErr: "Please enter a name longer than 4 characters"
      })
    }

    if(this.state.genus === "" || this.state.genus === undefined){
      errorTracker = true
      this.setState({
        genusErr: "Please provide the common name of this species"
      })
    } else if (this.state.genus.length < 3){
      errorTracker=true
      this.setState({
        genusErr: "Please enter a name longer than 2 characters"
      })
    }

    if(this.state.colours.length === 0){
      errorTracker = true
      this.setState({
        coloursErr: "Please select at least one colour"
      })
    }

    if(this.state.petalPattern === "" || this.state.petalPattern === undefined){
      errorTracker = true
      this.setState({
        petalPatternErr: "Please select the closest matching pattern"
      })
    }

    if(this.state.scents.length === 0){
      errorTracker = true
      this.setState({
        scentsErr: "Please select at least one scent"
      })
    }



    if(errorTracker){
      return
    }



    //error validation here
    await axios.post(this.BASE_API_URL + '/orchid_species', {
      commonName: this.state.commonName,
      officialName: this.state.officialName,
      genus: this.state.genus,
      species: this.state.species,
      hybridParents: [this.state.parent1, this.state.parent2],
      creation: {creatorName: this.state.creatorName,
                creationYear: this.state.creationYear},
      colours: this.state.colours,
      petalPattern: this.state.petalPattern,
      scents:this.state.scents,
      floralGrouping:this.state.floralGrouping,
      imageUrl:this.state.imageUrl,
      distribution:this.state.distribution,
      conservationStatus:this.state.conservationStatus
    })
    // .catch( e => {
    //   this.setState({
    //     errorMsg: e.response.data.message
    //   })
    // })
    
    // this.props.setActivePage('readAllSpecies')
  }

  render() {
    return (
      <React.Fragment>
        <div>CreateSpecies</div>
        <SpeciesForm 
          orchidColours = {this.props.orchidColours}
          orchidScentsOptions = {this.props.orchidScentsOptions}
          orchidPetalPatternOptions = {this.props.orchidPetalPatternOptions}
          distributionOptions = {this.props.distributionOptions}
          conservationOptions = {this.props.conservationOptions}

          updateFormField = {this.updateFormField}
          updateCheckbox = {this.updateCheckbox}
          renderDropdown = {this.renderDropdown}
          apiMethod = {this.apiMethod}

          commonName = {this.state.commonName}
          officialName = {this.state.officialName}
          genus = {this.state.genus}
          species= {this.state.species}
          parent1 = {this.state.parent1}
          parent2={this.state.parent2}
          creatorName={this.state.creatorName}
          creationYear = {this.state.creationYear}
          colours = {this.state.colours}
          petalPattern = {this.state.petalPattern}
          scents = {this.state.scents}
          floralGrouping = {this.state.floralGrouping}
          imageUrl = {this.state.imageUrl}
          distribution = {this.state.distribution}
          conservationStatus = {this.state.conservationStatus}

          message="Listing a new orchid species"

          commonNameErr={this.state.commonNameErr}
          officialNameErr={this.state.officialNameErr}
          genusErr={this.state.genusErr}
          coloursErr={this.state.coloursErr}
          petalPatternErr={this.state.petalPatternErr}
          scentsErr={this.state.scentsErr}
          imageUrlErr={this.state.imageUrlErr}
          distributionErr={this.state.distributionErr}
          conservationStatusErr={this.state.conservationStatusErr}
          
          
        />

      </React.Fragment>

    )
  }

}
