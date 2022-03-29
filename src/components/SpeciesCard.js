import React, { Component } from 'react';
import axios from 'axios';

//path: Landing => ReadAllSpecies =>
// this.props: eachItem from species, distributionOptions


export default class SpeciesCard extends Component {
    state = {
    
    }
    
    // BASE_API_URL = "http://localhost:8888"
    
    // async componentDidMount() {
    //     let response = await axios.get(this.BASE_API_URL + "/distribution/" + this.props.eachItem._id);
    //     console.log(response.data)
    // }

    matchName(distributionId){
        let matchedDistribution = this.props.distributionOptions.filter(
            eachDistribution => 
            (distributionId === eachDistribution._id)
        )
        return matchedDistribution[0].name
    }
    
    render() {
    return (
    <React.Fragment key={this.props.eachItem._id}>        
            <div className='card'
                style={{
                    height: "50vh",
                    margin: "1rem auto",
                    borderRadius: "1rem",
                    boxSizing: "border-box"

                }}
            >
                <img className="card-img-top" 
                    src={this.props.eachItem.imageUrl} 
                    alt={this.props.eachItem.officialName}
                    style={{
                        width:"95%",
                        height: "70%",
                        margin: "0.5rem auto 0",
                        objectFit: "cover",
                        borderTopRightRadius: "1rem",
                        borderTopLeftRadius: "1rem",
                    }}
                 />
                <div className="card-body">
                    <h6>{this.props.eachItem.officialName}</h6>
                    <p>Native to {this.matchName(this.props.eachItem.distribution)}</p>
                    <a>View facts</a>
                </div>
            </div> 
    </React.Fragment>
  )
}
}


