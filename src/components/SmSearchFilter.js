import React, { Component } from 'react'

export default class SmSearchFilter extends Component {

    //passed down from Landing
    // props: distributionOptions, conservationOptions,
    // orchidColours, updateFormField, updateCheckbox,
    // distributionFilter, conservationFilter, colourFilter

    state = {
        // distributionFilter: "",
        // conservationFilter: "",
        // colourFilter: []
    }

    renderDropdown(options) {
        let selectOptions = options.map(
            eachOption => <option key={eachOption._id} value={eachOption._id}>{eachOption.name}</option>
        )
        return selectOptions
    }

    // updateFormField = (e) => {
    //     this.setState({
    //         [e.target.name] : e.target.value
    //     })
    // }

    // updateCheckbox = (e) => {
    //     if(this.state[e.target.name].includes(e.target.value)){
    //         let indexToRemove = this.state[e.target.name].findIndex( 
    //             value => value===e.target.value
    //         )
    //         this.setState({
    //             [e.target.name]: [...this.state[e.target.name].slice(0, indexToRemove), ...this.state[e.target.name].slice(indexToRemove + 1)]
    //         })
    //     } else {
    //         this.setState({
    //             [e.target.name]: [...this.state[e.target.name], e.target.value]
    //         })
    //     }
    // }

    
    render() {
        return (
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="XsSmSearchFilter" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Filter by: </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                <label>Region:</label>
                <select className='form-select'
                        name="distributionFilter" 
                        value={this.props.distributionFilter} 
                        onChange={this.props.updateFormField}>
                    {this.renderDropdown(this.props.distributionOptions)}    
                </select>

                <label>Conservation Status:</label>
                <select className='form-select'
                        name="conservationFilter" 
                        value={this.props.conservationFilter} 
                        onChange={this.props.updateFormField}>
                    {this.renderDropdown(this.props.conservationOptions)}    
                </select>

                {/* <label>Discovered/Created Before:</label>
                <input type="number"
                
                />

                <label>Discovered/Created After:</label> */}


                <label>Colours:</label>
                {this.props.orchidColours.map( eachColour => 
                    <React.Fragment key={eachColour.value}>
                        <div className="form-check">
                            <input className="form-check-input" 
                                    type="checkbox" 
                                    value={eachColour.value}
                                    name="colourFilter"
                                    id="flexCheckDefault"
                                    onChange={this.props.updateCheckbox}
                                    checked={this.props.colourFilter.includes(eachColour.value)}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {eachColour.display}
                            </label>
                        </div>
                    </React.Fragment>
                )}

                <button className="input-group-text border-0" 
                    id="search-addon"
                    onClick={() => {this.props.getSearchResults();
                                    this.props.setActivePage("readAllSpecies")}}
                    data-bs-dismiss="offcanvas"
                    >
                    Apply filters
                </button>




            </div>
        </div>
        )
    }
}
