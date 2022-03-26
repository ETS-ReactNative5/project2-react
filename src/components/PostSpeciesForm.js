import React from 'react'

function PostSpeciesForm(props) {

//props: updateFormField, updateCheckbox
  return (
    <React.Fragment>
        <div>PostSpeciesForm</div>
        <div id="postSpeciesForm" className="row border border-secondary">
            <h2>Listing a new orchid</h2>
            <div className="col d-none d-md-block border border-primary"></div>
            <div className="col col-md-8 border border-warning">
                <div className='row'>
                    <label>Common Name: </label>
                    <input class="form-control" 
                            type="text" 
                            placeholder="Default input"
                            value={props.commonName}
                            name="commonName"
                            onChange={props.updateFormField}
                    />
                </div>
            </div>
            <div className="col d-none d-md-block border border-primary"></div>


        </div>
    </React.Fragment>

  )
}

export default PostSpeciesForm