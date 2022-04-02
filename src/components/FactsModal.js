import React, { Component } from 'react';
import axios from 'axios';

export default class FactsModal extends Component {

    state = {
        action: "readingFacts",
        // refreshFacts: false,
        facts: this.props.eachItem.facts,
        newFact: ""

    }

    updateFormField = (evt) => {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    BASE_API_URL = "http://localhost:8888"

    apiFactsPost = async () => { 
        await axios.post(this.BASE_API_URL + '/orchid_species/' + this.props.eachItem._id + '/facts',{
            fact: this.state.newFact
        })
        this.setState({
            action: "",
            newFact: ""
        })
        console.log('done posting fact to ' + this.props.eachItem.officialName)
        // this.setState({
        //     refreshFacts: true
        // })
        return this.refreshFacts();
    }

    refreshFacts = async () => {
        console.log('refreshingFacts')
        // if(this.state.refreshFacts === true){
            let factsResponse = await axios.get(this.BASE_API_URL + '/orchid_species/' + this.props.eachItem._id + '/facts')
        console.log(factsResponse.data)
            this.setState({
                facts: factsResponse.data.facts
            })
        // }
        // this.setState({
        //     refreshFacts: false
        // })
    }

    renderTextbox() {
            return (
            <React.Fragment>
                <input className="form-control" 
                        type="text" 
                        row='3'
                        placeholder="New fact"
                        value={this.state.newFact}
                        name="newFact"
                        onChange={this.updateFormField}
                    />
                    <button onClick={() => this.apiFactsPost()}
                            className="btn btn-primary"
                    >
                        Add to collection
                    </button>
            </React.Fragment>
            )
    }

    renderReadFacts = (f) => {
        return <React.Fragment key={f._id}>
            <li className="list-group-item">{f.fact}</li>
        </React.Fragment>
    }

    renderFacts() {
        let factsJSXs = [];
        if(this.state.facts.length !== 0){
            this.state.facts.map(
                f => {
                    if(this.state.factIdBeingEdited !== f._id) {
                        return <ul className="list-group">
                            {factsJSXs.push(this.renderReadFacts(f))}
                        </ul>
                        
                    }
                }
            )
        }
        return factsJSXs
    }

    renderContent() {
        if(this.state.action === 'addingNewFact'){
           return this.renderTextbox();
        } else if(this.state.action === 'readingFacts'){
            return this.renderFacts();
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal fade"
                    id={"modal-facts" + this.props.eachItem._id}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    {this.props.eachItem.officialName}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className = 'row'>
                                <div className='col col-md-8 mx-auto'>
                                {this.renderContent()}
                                </div>

                                </div>
                                
                                







                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            this.setState({
                                                action: 'addingNewFact'
                                            })
                                        }}
                                >
                                    Add new fact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>


        )
    }

}

