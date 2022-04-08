import React, { Component } from 'react'

export default class CreateUserProfile extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='d-flex flex-column ht-100'
                style={{height: '100%'}}>
        <div className="my-3 d-flex flex-column mx-2">
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
    )
  }
}
