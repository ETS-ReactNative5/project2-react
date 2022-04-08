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

  addSelection = () => {
    let newDistributionOptions = this.props.distributionOptions
    console.log(newDistributionOptions)
    
    newDistributionOptions.unshift({
      '_id': "noDistributionSelection",
      'name': 'No Selection'
    })
    console.log(newDistributionOptions)
    return newDistributionOptions
  }

  // componentDidMount() {
  //   let newDistributionOptions = this.props.distributionOptions.unshift({
  //     '_id': "noselection",
  //     'name': 'No Selection'
  //   })
  //   console.log(newDistributionOptions)
  //   return newDistributionOptions
  // }

  render() {
    return (
      <React.Fragment>

        <div className='d-flex mb-2'>
          <a className="ms-auto style-links"
            data-bs-toggle="collapse"
            href="#collapse-search-filter"
            role="button"
            aria-expanded="false"
            aria-controls="collapse-search-filter">
            Advanced Search
          </a>
        </div>

        <div className="collapse" id="collapse-search-filter">
          <div className="card card-body border-search" id='collapse-search-body'>
            <div className='row rounded'>
              <div className='col-1 col-lg-2 d-none d-md-block'></div>
              <div className='col'>
                <div className='row'>
                  <div className='col col-md-6'>
                    <label>Region:</label>
                    <select className='form-select'
                      name="distributionFilter"
                      value={this.props.distributionFilter}
                      onChange={this.props.updateFormField}>
                      {this.renderDropdown(this.props.distributionSelection)}
                    </select>
                  </div>
                  <div className='col col-md-6'>
                    <label>Conservation Status:</label>
                    <select className='form-select'
                      name="conservationFilter"
                      value={this.props.conservationFilter}
                      onChange={this.props.updateFormField}>
                      {this.renderDropdown(this.props.conservationSelection)}
                    </select>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col col-md-2'>
                    <label>Colours:</label>
                  </div>
                  <div className='col-md-8'>
                    {this.props.orchidColours.map(eachColour =>
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
                  <div className='col col-md-2 my-auto'></div>
                </div>
                <div className='row mt-2 mb-3'>
                  <div className='col col-6 my-auto'>
                    <label>Number of facts added:</label>
                    <select className='form-select'
                      name="factsFilter"
                      value={this.props.factsFilter}
                      onChange={this.props.updateFormField}
                    >
                      <option key='1' value='noFilter'>No selection</option>
                      <option key='2' value='noFacts'>None</option>
                      <option key='3' value='factsGte3'>Three or more</option>
                    </select>
                  </div>
                  <div className='col col-6 d-flex align-items-end justify-content-center'>
                    <button className="btn btn-primary me-3"
                    style={{
                      height: '80%'
                    }}
                      id="search-addon-md-1"
                      onClick={() => {
                        this.props.getSearchResults();
                        this.props.setActivePage("readAllSpecies")
                      }}
                    >
                      Apply filters
                    </button>
                    <button className="btn btn-primary"
                      style={{
                        height: '80%'
                      }}
                      id="search-addon-md-2"
                      onClick={() => {
                        this.props.resetFilters()
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                </div>











              </div>
              <div className='col-1 col-lg-2 d-none d-md-block'></div>
            </div>
          </div>
        </div>



      </React.Fragment>

    )
  }
}
