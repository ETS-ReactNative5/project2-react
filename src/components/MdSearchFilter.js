import React, { Component } from 'react'

export default class MdSearchFilter extends Component {

  
//                         distributionOptions 
//                         conservationOptions
//                         orchidColours 
//                         updateFormField 
//                         distributionFilter 
//                         conservationFilter 
//                         colourFilter 
//                         updateCheckbox 

  renderDropdown(options) {
    let selectOptions = options.map(
        eachOption => <option key={eachOption._id} value={eachOption._id}>{eachOption.name}</option>
    )
    return selectOptions
  }

  render() {
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-1 col-lg-2 d-none d-md-block'></div>
          <div className='col'>
            <div className='row border border-danger'>
                <div className='col col-md-6 border border-warning'>
                  <label>Region:</label>
                          <select className='form-select'
                                  name="distributionFilter" 
                                  value={this.props.distributionFilter} 
                                  onChange={this.props.updateFormField}>
                              {this.renderDropdown(this.props.distributionOptions)}    
                          </select>
                </div>
                <div className='col col-md-6 border border-warning'>
                  <label>Conservation Status:</label>
                      <select className='form-select'
                              name="conservationFilter" 
                              value={this.props.conservationFilter} 
                              onChange={this.props.updateFormField}>
                          {this.renderDropdown(this.props.conservationOptions)}    
                      </select>
                </div>
            </div>
            <div className='row border border-primary'>
              <div className='col col-md-2'>
                <label>Colours:</label>
                </div>
                  <div className='col-md-8'>
                    {this.props.orchidColours.map( eachColour => 
                        <React.Fragment key={eachColour.value}>
                            <div className="form-check form-check-inline">
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

              </div>
              <div className='col col-md-2 my-auto'>
                <button className="input-group-text border-0" 
                          id="search-addon"
                          onClick={() => {this.props.getSearchResults();
                                          this.props.setActivePage("readAllSpecies")}}
                          >
                          Apply filters
                </button>

              </div>
            </div>
            </div>
          <div className='col-1 col-lg-2 d-none d-md-block'></div>
        </div>
      </React.Fragment>
      
    )
  }
}
