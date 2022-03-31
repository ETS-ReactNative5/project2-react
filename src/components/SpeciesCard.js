import React, { Component } from 'react';
import SpeciesModal from './SpeciesModal';

//path: Landing => ReadAllSpecies =>
// this.props: eachItem from species, distributionOptions, conservationOptions, setActivePage


export default class SpeciesCard extends Component {
    state = {
        activeDistribution:"",
        activeConservation:""

    }

    // BASE_API_URL = "http://localhost:8888"

    // async componentDidMount() {
    //     let response = await axios.get(this.BASE_API_URL + "/distribution/" + this.props.eachItem._id);
    //     console.log(response.data)
    // }

    matchName(distributionId) {
        let matchedDistribution = this.props.distributionOptions.filter(
            eachDistribution =>
                (distributionId === eachDistribution._id)
        )
        return matchedDistribution[0].name
    }

    correspondData(distributionId, conservationId) {
        let matchedDistribution = this.props.distributionOptions.filter(
            eachDistribution =>
                (distributionId === eachDistribution._id)
        )
        let matchedConservation = this.props.conservationOptions.filter(
            eachConservation =>
                (conservationId === eachConservation._id)
        )
        this.setState({
            activeDistribution: matchedDistribution[0].name,
            activeConservation: matchedConservation[0].name
        })
    }

    render() {
        // console.log(this.props.eachItem)
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
                            width: "95%",
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
                        <div className='row'>
                            <div className='col-6'>
                                <a
                                data-bs-toggle="modal"
                                data-bs-target={"#modal" + this.props.eachItem._id}
                                onClick={() => {this.correspondData(this.props.eachItem.distribution, this.props.eachItem.conservationStatus)}}
                                >
                                    About this species
                                </a>
                            </div>
                            <div className='col-6'>
                                <a>View facts</a>
                            </div>
                        </div>

                        <SpeciesModal eachItem = {this.props.eachItem}
                                    activeDistribution={this.state.activeDistribution}
                                    activeConservation={this.state.activeConservation}
                                    setActivePage={this.props.setActivePage}
                                    selectEdit = {this.props.selectEdit}
                                    />
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}


