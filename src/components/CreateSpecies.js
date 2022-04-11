import React, { Component } from 'react';
import axios from "axios";
import SpeciesForm from './SpeciesForm';

export default class CreateSpecies extends Component {

  BASE_API_URL = "https://tgc16-p2-api.herokuapp.com"

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
    conservationStatusErr:"",

    submitMsg:"",

    xCommonName: "",
    xOfficialName: "",
    xGenus: "",
    xColours: "",
    xPetalPattern: "",
    xScents: "",
    xImageUrl: "",
    xDistribution: "",
    xConservationStatus: ""
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
    }
  }

  postApi = async () => {

    //clear previous errors
    this.setState({
      commonNameErr:"",
      officialNameErr:"",
      genusErr:"",
      coloursErr:"",
      petalPatternErr:"",
      scentsErr:"",
      imageUrlErr:"",
      distributionErr:"",
      conservationStatusErr:"",
      submitMsg:"",
      xCommonName: "",
      xOfficialName: "",
      xGenus: "",
      xColours: "",
      xPetalPattern: "",
      xScents: "",
      xImageUrl: "",
      xDistribution: "",
      xConservationStatus: ""

    })

    let errorTracker = false

    if(!this.state.commonName){
      errorTracker = true
      this.setState({
        commonNameErr: "Please provide the common name of this species",
        xCommonName: "red-border"
      })
    } else if (this.state.commonName.length < 3){
      errorTracker=true
      this.setState({
        commonNameErr: "Please enter a name longer than 2 characters",
        xCommonName: "red-border"
      })
    }

    if(!this.state.officialName){
      errorTracker = true
      this.setState({
        officialNameErr: "Please provide the common name of this species",
        xOfficialName: "red-border"
      })
    } else if (this.state.officialName.length < 5){
      errorTracker=true
      this.setState({
        officialNameErr: "Please enter a name longer than 4 characters",
        xOfficialName: "red-border"
      })
    }

    if(!this.state.genus){
      errorTracker = true
      this.setState({
        genusErr: "Please provide the common name of this species",
        xGenus: "red-border"
      })
    } else if (this.state.genus.length < 3){
      errorTracker=true
      this.setState({
        genusErr: "Please enter a name longer than 2 characters",
        xGenus: "red-border"
      })
    }

    if(this.state.colours.length === 0){
      errorTracker = true
      this.setState({
        coloursErr: "Please select at least one colour",
        xColours: "red-border"
      })
    }

    if(!this.state.petalPattern){
      errorTracker = true
      this.setState({
        petalPatternErr: "Please select the closest matching pattern",
        xPetalPattern: "red-border"
      })
    }

    if(this.state.scents.length === 0){
      errorTracker = true
      this.setState({
        scentsErr: "Please select at least one scent",
        xScents: "red-border"
      })
    }

    const imgUrl = /(https?:\/\/.*\.(?:png|jpg))/i

    if(!this.state.imageUrl){
      errorTracker=true
      this.setState({
        imageUrlErr:"Please provide an image via URL",
        xImageUrl: "red-border"
      })
    } else if( !this.state.imageUrl.match(imgUrl) ){
      errorTracker=true
      this.setState({
        imageUrlErr:"Please provide a valid URL",
        xImageUrl: "red-border"
      })
    }

    if(!this.state.distribution){
      errorTracker=true
      this.setState({
        distributionErr:"Please select where this species is native to",
        xDistribution: "red-border"
      })
    }

    if(!this.state.conservationStatus){
      errorTracker=true
      this.setState({
        conservationStatusErr:"Please select the conservation status of this species",
        xConservationStatus : 'red-border'
      })
    }

    if(errorTracker){
      return
    }

    if(!errorTracker){
      this.setState({
        commonNameErr:"",
        officialNameErr:"",
        genusErr:"",
        coloursErr:"",
        petalPatternErr:"",
        scentsErr:"",
        imageUrlErr:"",
        distributionErr:"",
        conservationStatusErr:"",
        submitMsg:"Thank you for your submission"
      })
    }

    // let arrayParents = [];
    // if(this.state.parent1) {
    //   arrayParents.push(this.state.parent1)
    // }
    // if 

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
    }).catch( e => {console.log(e.response.data)})
      

    await setTimeout(() => {this.props.refreshSpeciesDisplay();
      this.props.setActivePage('readAllSpecies');}, 3000);
    // await setTimeout(this.props.refreshSpeciesDisplay(), 2000);

    // this.props.setActivePage('readAllSpecies');
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

          submitMsg={this.state.submitMsg}

          xCommonName={this.state.xCommonName}
          xOfficialName={this.state.xOfficialName}
          xGenus={this.state.xGenus}
          xColours={this.state.xColours}
          xPetalPattern={this.state.xPetalPattern}
          xScents={this.state.xScents}
          xImageUrl={this.state.xImageUrl}
          xDistribution={this.state.xDistribution}
          xConservationStatus={this.state.xConservationStatus}
          
          
        />

      </React.Fragment>

    )
  }

}
