import React, { Component } from 'react'

import axios from "axios";

export default class UpdateSpecies extends Component {


  //props: activeEditId

  state = {
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

  BASE_API_URL = "http://localhost:8888"

  async componentDidMount() {
    let documentEdit = await axios.get(this.BASE_API_URL + "/orchid_species/" + this.props.activeEditId)
    console.log(documentEdit.data.commonName)
    this.setState({
      commonName: documentEdit.data.commonName,
      officialName: documentEdit.data.officialName,
      genus: documentEdit.data.genus?documentEdit.data.genus:"",
      // parent1: documentEdit.data.hybridParent[0],
      // parent2: documentEdit.data.hybridParent[1],
      // creatorName: documentEdit.data.creation.creatorName,
      // creationYear: documentEdit.data.creation.creationYear,
      colours: documentEdit.data.colours,
      petalPattern: documentEdit.data.petalPattern,
      scents: documentEdit.data.scents,
      floralGrouping: documentEdit.data.floralGrouping,
      imageUrl: documentEdit.data.imageUrl,
      distribution: documentEdit.data.distribution,
      conservationStatus: documentEdit.data.conservationStatus
    })

  }

  render() {

    return (
      <div>UpdateSpecies</div>
    )
  }
}
