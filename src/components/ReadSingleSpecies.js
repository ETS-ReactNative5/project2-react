import React, { Component } from 'react'


// props activeObject
export default class ReadSingleSpecies extends Component {
  render() {
    return (
      <div>{this.props.activeObject.officialName}</div>
    )
  }
}
