import React, { Component } from 'react'

import axios from "axios";
import SpeciesForm from './SpeciesForm';


export default class UpdateSpecies extends Component {
  
  BASE_API_URL = "http://localhost:8888"

  state = {

    apiMethod: "put",

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
      [e.target.name]: e.target.value
    })
  }

  updateCheckbox = (e) => {
    if (this.state[e.target.name].includes(e.target.value)) {
      let indexToRemove = this.state[e.target.name].findIndex(
        value => value === e.target.value
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
    if(this.state.apiMethod === "put"){
      this.putApi();
    }
  }

  putApi = async () => {

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
        submitMsg:"Thank you for time editing this submission"
      })
    }


    await axios.put(this.BASE_API_URL + '/orchid_species/' + this.props.activeEditId, {
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
    // this.props.refreshSpeciesDisplay();
    // this.props.setActivePage('readAllSpecies')
  }

  

  async componentDidMount() {
    let documentEdit = await axios.get(this.BASE_API_URL + "/orchid_species/" + this.props.activeEditId)

    this.setState({
      commonName: documentEdit.data.commonName,
      officialName: documentEdit.data.officialName,
      genus: documentEdit.data.genus?documentEdit.data.genus:"",
      parent1: documentEdit.data.hybridParents[0] === '' ? "" : documentEdit.data.hybridParents[0],
      parent2: documentEdit.data.hybridParents[1] === '' ? "" : documentEdit.data.hybridParents[1],
      creatorName: documentEdit.data.creation.creatorName ? documentEdit.data.creation.creatorName : "",
      creationYear: documentEdit.data.creation.creationYear ? documentEdit.data.creation.creationYear : "",
      colours: documentEdit.data.colours,
      petalPattern: documentEdit.data.petalPattern,
      scents: documentEdit.data.scents,
      floralGrouping: documentEdit.data.floralGrouping ? documentEdit.data.floralGrouping : "",
      imageUrl: documentEdit.data.imageUrl,
      distribution: documentEdit.data.distribution,
      conservationStatus: documentEdit.data.conservationStatus
    })

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
          refreshSpeciesDisplay={this.props.refreshSpeciesDisplay}

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

          message={"Editing information about " + this.state.officialName}

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
