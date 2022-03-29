import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function SpeciesForm(props) {

//props: updateFormField, updateCheckbox, orchidColours, orchidScentsOptions, orchidPetalPatternOptions,
//distributionOptions, conservationOptions, renderDropdown, postApi
  return (
    <React.Fragment>
        <div>SpeciesForm</div>
        <div id="postSpeciesForm" className="row border border-secondary">
            <h2>Listing a new orchid</h2>
            <div className="col col-1 col-sm-2 border border-primary"></div>
            <div className="col col-md-8 border border-warning">
                <div className='row'>
                    <label>Common Name: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.commonName}
                            name="commonName"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label>Official Name: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.officialName}
                            name="officialName"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label>Genus: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.genus}
                            name="genus"
                            onChange={props.updateFormField}
                    />
                </div>
                {/* <div className='row'>
                    <label>Species: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.species}
                            name="species"
                            onChange={props.updateFormField}
                    />
                </div> */}
                <div className='row'>
                    <label>First Parent: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.parent1}
                            name="parent1"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label>Second Parent: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.parent2}
                            name="parent2"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label>Name of orchid's originator:</label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.creatorName}
                            name="creatorName"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label>Year of creation:</label>
                    {/* <DatePicker
                        selected={props.creationYear}
                        onChange={props.updateFormField}
                        name='creationYear'
                        showYearPicker
                        dateFormat="yyyy"
                    /> */}
                    <input className="form-control" 
                            type="text" 
                            placeholder="YYYY"
                            value={props.creationYear}
                            name="creationYear"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label>Colours:</label>
                    {props.orchidColours.map(
                        eachColour => 
                            <div key={eachColour.value} className="form-check form-check-inline">
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
                </div>
                <div className='row'>
                    <label>Petals Pattern:</label>
                    {props.orchidPetalPatternOptions.map(
                        eachPattern => 
                        <div key={eachPattern.value} className="form-check form-check-inline">
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
                </div>
                <div className='row'>
                    <label>Scents:</label>
                    {props.orchidScentsOptions.map(
                        eachScent => 
                        <div key={eachScent.value} className="form-check form-check-inline">
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
                </div>
                <div className='row'>
                    <label>Floral Grouping:</label>
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
                <div className='row'>
                    <label>Upload an image url: </label>
                    <input className="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.imageUrl}
                            name="imageUrl"
                            onChange={props.updateFormField}
                    />
                </div>
                <div className='row'>
                    <label>Region:</label>
                    <select className='form-select'
                            name="distribution" 
                            value={props.distribution} 
                            onChange={props.updateFormField}>
                        {props.renderDropdown(props.distributionOptions)}    
                    </select>
                </div>
                <div className='row'>
                    <label>Conservation Status:</label>
                    <select className='form-select'
                            name="conservationStatus" 
                            value={props.conservationStatus} 
                            onChange={props.updateFormField}>
                        {props.renderDropdown(props.conservationOptions)}    
                    </select>
                </div>
                <div className='row'>
                    <button className='btn btn-primary'
                            onClick={props.postApi}
                    >
                        Submit
                    </button>
                </div>
                
            </div>
            <div className="col col-1 col-sm-2 border border-primary"></div>


        </div>
    </React.Fragment>

  )
}

export default SpeciesForm