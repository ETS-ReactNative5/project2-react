import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function SpeciesForm(props) {

//props: updateFormField, updateCheckbox, orchidColours, orchidScentsOptions, orchidPetalPatternOptions,
//distributionOptions, conservationOptions, renderDropdown, postApi
  return (
    <React.Fragment>
        <div id="postSpeciesForm" className="row">
            {/* <h2>{props.message}</h2> */}
            <div className="col col-1 col-sm-2"></div>
            <div className="col col-md-8">
                <div className='row'>
                    <h2 className='pb-2'>{props.message}</h2>
                    <label className='pb-2'>Common Name: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.commonName}
                            name="commonName"
                            onChange={props.updateFormField}
                    />
                    <p>{props.commonNameErr}</p>
                </div>
                <div className='row'>
                    <label className='pb-2'>Official Name: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.officialName}
                            name="officialName"
                            onChange={props.updateFormField}
                    />
                    <p>{props.officialNameErr}</p>
                </div>
                <div className='row'>
                    <label className='pb-2'>Genus: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.genus}
                            name="genus"
                            onChange={props.updateFormField}
                    />
                    <p>{props.genusErr}</p>
                </div>
                <div className='row'>
                    <label className='pb-2'>First Parent: </label>
                    <input className="form-control mb-3" 
                            type="text" 
                            placeholder="Default input"
                            value={props.parent1}
                            name="parent1"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label className='pb-2'>Second Parent: </label>
                    <input className="form-control mb-3" 
                            type="text" 
                            placeholder="Default input"
                            value={props.parent2}
                            name="parent2"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label className='pb-2'>Name of orchid's originator:</label>
                    <input className="form-control mb-3" 
                            type="text" 
                            placeholder="Default input"
                            value={props.creatorName}
                            name="creatorName"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label className='pb-2'>Year of creation:</label>
                    {/* <DatePicker
                        selected={props.creationYear}
                        onChange={props.updateFormField}
                        name='creationYear'
                        showYearPicker
                        dateFormat="yyyy"
                    /> */}
                    <input  className="form-control mb-3" 
                            type="text" 
                            placeholder="YYYY"
                            value={props.creationYear}
                            name="creationYear"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label className='pb-2'>Colours:</label>
                    <div className="form-control mb-3">
                    {props.orchidColours.map(
                        eachColour => 
                            <div key={eachColour.value} className='form-check form-check-inline'>
                                <input className="form-check-input" 
                                        type="checkbox" 
                                        value={eachColour.value}
                                        name="colours"
                                        onChange={props.updateCheckbox}
                                        checked={props.colours.includes(eachColour.value)}
                                />
                                <label className="form-check-label">{eachColour.display}</label>
                            </div>
                    )}
                    <p>{props.coloursErr}</p>
                    </div>
                </div>
                <div className='row'>
                    <label className='pb-2'>Petals Pattern:</label>
                    <div className="form-control mb-3">
                    {props.orchidPetalPatternOptions.map(
                        eachPattern => 
                        <div key={eachPattern.value} className='form-check form-check-inline'>
                            <input className="form-check-input" 
                                    type="radio" 
                                    name="petalPattern"
                                    value={eachPattern.value}
                                    onChange={props.updateFormField}
                                    checked={props.petalPattern === eachPattern.value}
                            />
                            <label className="form-check-label">{eachPattern.display}</label>
                        </div>
                    )}
                    <p>{props.petalPatternErr}</p>
                    </div>
                </div>
                <div className='row'>
                    <label className='pb-2'>Scents:</label>
                    <div className="form-control mb-3">
                    {props.orchidScentsOptions.map(
                        eachScent => 
                        <div key={eachScent.value} className='form-check form-check-inline'>
                            <input className="form-check-input" 
                                    type="checkbox" 
                                    value={eachScent.value}
                                    name="scents"
                                    onChange={props.updateCheckbox}
                                    checked={props.scents.includes(eachScent.value)}
                            />
                            <label className="form-check-label">{eachScent.display}</label>
                        </div>
                    )}
                    <p>{props.scentsErr}</p>
                    </div>
                </div>
                <div className='row'>
                    <label className='pb-2'>Floral Grouping:</label>
                    <div className='form-control mb-3 '>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" 
                                    type="radio" 
                                    name="floralGrouping" 
                                    value="cluster"
                                    onChange={props.updateFormField}
                                    checked={props.floralGrouping === "cluster"}
                            />
                            <label className="form-check-label">Cluster</label>
                        </div> 
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" 
                                    type="radio" 
                                    name="floralGrouping" 
                                    value="single"
                                    onChange={props.updateFormField}
                                    checked={props.floralGrouping === "single"}
                            />
                            <label className="form-check-label">Single</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <label className='pb-2'>Upload an image url: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.imageUrl}
                            name="imageUrl"
                            onChange={props.updateFormField}
                    />
                    <p>{props.imageUrlErr}</p>
                </div>
                <div className='row'>
                    <label>Region:</label>
                    <select className='form-select'
                            name="distribution" 
                            value={props.distribution} 
                            onChange={props.updateFormField}>
                        {props.renderDropdown(props.distributionOptions)}    
                    </select>
                    <p>{props.distributionErr}</p>
                </div>
                <div className='row'>
                    <label className='pb-2'>Conservation Status:</label>
                    <select className='form-select'
                            name="conservationStatus" 
                            value={props.conservationStatus} 
                            onChange={props.updateFormField}>
                        {props.renderDropdown(props.conservationOptions)}    
                    </select>
                    <p>{props.conservationStatusErr}</p>
                </div>
                <div className='row'>
                    <p>{props.submitMsg}</p>
                    <button className='btn btn-primary'
                            onClick={() => {props.apiMethod()
                                            // props.refreshSpeciesDisplay()
                                            }}
                    >
                        Submit
                    </button>
                </div>
                
            </div>
            <div className="col col-1 col-sm-2"></div>


        </div>
    </React.Fragment>

  )
}

export default SpeciesForm