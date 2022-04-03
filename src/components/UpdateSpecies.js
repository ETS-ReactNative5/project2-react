import React, { Component } from 'react'

import axios from "axios";
import SpeciesForm from './SpeciesForm';


export default class UpdateSpecies extends Component {


  //props: activeEditId

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
    conservationStatus: ""
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
    console.log(this.BASE_API_URL + '/orchid_species/' + this.props.activeEditId)
    if(this.state.apiMethod === "post"){
      this.postApi();
    } else if(this.state.apiMethod === "put"){
      this.putApi();
    }
  }

  putApi = async () => {
    //error validation here

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
    })
    console.log('done putting')
    // setTimeout(this.props.refreshSpeciesDisplay(), 1500)
    this.props.refreshSpeciesDisplay();
    this.props.setActivePage('readAllSpecies')
  }

  BASE_API_URL = "http://localhost:8888"

  async componentDidMount() {
    let documentEdit = await axios.get(this.BASE_API_URL + "/orchid_species/" + this.props.activeEditId)
    // console.log(typeof documentEdit.data.hybridParents[0])

    // let x = documentEdit.data.hybridParents.length == 0 ? "" : documentEdit.data.hybridParent[0]
    // console.log(typeof x)
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
        <div>UpdateSpecies</div>
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
          
        />
      </React.Fragment>
      
    )
  }
}
