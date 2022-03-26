import React, { Component } from 'react';
import axios from "axios";
import PostSpeciesForm from './PostSpeciesForm';

export default class CreateSpecies extends Component {

  //props: setActivePage

  state= {

    scentOptions: "",

    commonName: "",
    officialName: "",
    genus: "",
    species: "",
    hybridParents: [], //is this correct?
    creation: {},
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

  render() {
    return (
      <React.Fragment>
        <div>CreateSpecies</div>
        <PostSpeciesForm 
          updateFormField = {this.updateFormField}
          updateCheckbox = {this.updateCheckbox}
          commonName = {this.state.commonName}
          officialName = {this.state.officialName}
          genus = {this.state.genus}
          
        />

      </React.Fragment>

    )
  }

}
