import React, { Component } from 'react'

export default class CreateUserProfile extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mb-3">
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

            <button className='btn btn-primary'
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
