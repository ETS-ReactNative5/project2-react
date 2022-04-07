import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return <React.Fragment>
        <div className="mb-3 d-flex flex-column mx-1">
          <label htmlFor="exampleFormControlInput1" 
                  className="form-label"
                  >
                    Enter your email to login:
          </label>

            <input type="email" 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="name@example.com"
                    name='userEmail'
                    value={this.props.userEmail}
                    onChange={this.props.updateFormField}
            />

            <button className='btn btn-primary mt-3 align-self-end'
                    onClick={() => {
                      
                      this.props.getApiUserEmail()
                      // this.setActivePage('readAllSpecies')

                    }}
            >
              Login
            </button>
            <div>{this.props.loginMsg}</div>

          
      </div>  
        </React.Fragment>
    }
}