import React, { Component } from 'react';
import axios from "axios";
import PostSpeciesForm from './PostSpeciesForm';

export default class CreateSpecies extends Component {

  //props: setActivePage, orchidColours, orchidScentsOptions, orchidPetalPatternOptions.
  //distribution, conservation

  state= {

    commonName: "",
    officialName: "",
    genus: "",
    species: "",
    parent1: "", //is this correct?
    parent2: "",
    creation: {
      creatorName: "",
      creationYear: 0
    },
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

  BASE_API_URL = "https://tgc16-p2-api.herokuapp.com"

  postApi = async () => {
    //error validation here
    await axios.post(this.BASE_API_URL + '/orchid_species', {
      commonName: this.state.commonName,
      officialName: this.state.officialName,
      genus: this.state.genus,
      species: this.state.species,
      hybridParents: [this.state.parent1, this.state.parent2],
      //creation: compare with express side!
      creation: this.state.creation,
      colours: this.state.colours,
      petalPattern: this.state.petalPattern,
      scents:this.state.scents,
      floralGrouping:this.state.floralGrouping,
      imageUrl:this.state.imageUrl,
      distribution:this.state.distribution,
      conservationStatus:this.state.conservationStatus
    })

    this.props.setActivePage('readAllSpecies')
  }

  render() {
    return (
      <React.Fragment>
        <div>CreateSpecies</div>
        <PostSpeciesForm 
          orchidColours = {this.props.orchidColours}
          orchidScentsOptions = {this.props.orchidScentsOptions}
          orchidPetalPatternOptions = {this.props.orchidPetalPatternOptions}
          distributionOptions = {this.props.distribution}
          conservationOptions = {this.props.conservation}

          updateFormField = {this.updateFormField}
          updateCheckbox = {this.updateCheckbox}
          renderDropdown = {this.renderDropdown}
          postApi = {this.postApi}

          commonName = {this.state.commonName}
          officialName = {this.state.officialName}
          genus = {this.state.genus}
          species= {this.state.species}
          parent1 = {this.state.parent1}
          parent2={this.state.parent2}
          creatorName={this.state.creation.creatorName}
          creationYear = {this.state.creation.creationYear}
          colours = {this.state.colours}
          petalPattern = {this.state.petalPattern}
          scents = {this.state.scents}
          floralGrouping = {this.state.floralGrouping}
          imageUrl = {this.state.imageUrl}
          distribution = {this.state.distribution}
          conservationStatus = {this.state.conservationStatus}
          
        />

      </React.Fragment>

    )
  }

}
