import React, { Component } from 'react'

export default class CreateUserProfile extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mb-3 d-flex flex-column mx-1">
          <label htmlFor="exampleFormControlInput1" 
                  className="form-label"
                  >
                    Enter your email:
          </label>

            <input type="email" 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="name@example.com"
                    name='userEmail'
                    value={this.props.userEmail}
                    onChange={this.props.updateFormField}
            />

            <button className='btn mt-3 btn-primary align-self-end'
                    onClick={() => {
                      
                      this.props.postApiUserEmail()
                      // this.setActivePage('readAllSpecies')

                    }}
            >
              Register
            </button>
            <div>{this.props.registrationMsg}</div>

          
      </div>  
      </React.Fragment>
    )
  }
}
