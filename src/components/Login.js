import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return <React.Fragment>
          <div className='d-flex flex-column ht-100'
                style={{height: '100%'}}>
          <div className="my-3 mx-2 d-flex flex-column">
          <label htmlFor="exampleFormControlInput1" 
                  className="form-label style-text"
                  >
                    Enter your email to login:
          </label>

            <input type="email" 
                    className="form-control shadow-none" 
                    id="exampleFormControlInput1" 
                    placeholder="name@example.com"
                    name='userEmail'
                    value={this.props.userEmail}
                    onChange={this.props.updateFormField}
            />

            <button className='btn style-btn mt-3 align-self-end'
                    onClick={() => {
                      
                      this.props.getApiUserEmail()
                      // this.setActivePage('readAllSpecies')

                    }}
            >
              Login
            </button>
            <div className='style-text'>{this.props.loginMsg}</div>

          
        </div>
        <div  className='flex-fill' 
            style={{
            textAlign: 'right',
            overflow:'hidden'
            }}
            >
          <img className='background-image ht-100 mx-auto' 
                src={require('../local-data/images/orchid-vector.png')}/>
        </div>




          </div>
        
        </React.Fragment>
    }
}