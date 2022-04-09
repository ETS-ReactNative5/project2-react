import React, { Component } from 'react';
import axios from 'axios';
import SpeciesModal from './SpeciesModal';
import FactsModal from './FactsModal';

//path: Landing => ReadAllSpecies =>
// this.props: eachItem from species, distributionOptions, conservationOptions, setActivePage


export default class SpeciesCard extends Component {

    BASE_API_URL = "https://tgc16-p2-api.herokuapp.com"

    state = {
        activeDistribution: "",
        activeConservation: "",
        favourited: false,
        instructionMsg:"",
        deleteSpeciesMsg: ""
    }

    matchName = (distributionId) => {
        let matchedDistribution = this.props.distributionOptions.filter(
            eachDistribution =>
                (distributionId === eachDistribution._id)
        )
        return matchedDistribution[0].name
    }


    correspondData(distributionId, conservationId) {
        let matchedDistribution = this.props.distributionOptions.filter(
            eachDistribution =>
                distributionId === eachDistribution._id
        )

        let matchedConservation = this.props.conservationOptions.filter(
            eachConservation =>
                conservationId === eachConservation._id
        )

        this.setState({
            activeDistribution: matchedDistribution[0].name,
            activeConservation: matchedConservation[0].name
        })
    }

    checkWordCount(givenName){
        let output = ""
        if(givenName.trim().split(' ').length === 2 ){
            let [word1, word2] = givenName.trim().split(' ')
            output = <React.Fragment><span className='to-italicise'>{word1 + " " + word2}</span></React.Fragment>
        } else{
            let [word1,...rest] = givenName.trim().split(' ')
            output= <React.Fragment><span className='to-italicise'>{word1 + " "}</span>{rest.join(' ')}</React.Fragment>
        }
        return output
    }

    checkFavourited() {

        if(this.props.userFavouriteIds.includes(this.props.eachItem._id)){
            this.setState({
                favourited:true
            })
        } else {
            this.setState({
                favourited: false
            })
        }
    }

    setInstructions = () => {
        console.log('testing instructions')
        this.setState({
            instructionMsg: (this.props.loggedIn) ? "" :"Please create an account to favourite a species" 
        })
    }

    clearInstructions = () => {
        this.setState({
            instructionMsg: ""
        })
    }

    deleteApiSpecies  = async(speciesId) => {
        try{
            // let results = 
            await axios.delete(this.BASE_API_URL + '/orchid_species/' + speciesId)
            // this.setState({
            //     deleteSpeciesMsg: results.data.message
            // })
            
            // setTimeout(() => {
            //     this.setState({
            //         deleteSpeciesMsg: ""
            //     });
            // }, 4000)

            // setTimeout(() => {
            //     this.setState({
            //         handleModalClose: ""
            //     })
            // }, 2000)

            setTimeout(() => {
                this.props.refreshSpeciesDisplay();
                this.props.setActivePage('main')
            }, 1000)
        }catch(e){
            console.log(e.response.data)
        }
        // let results = await axios.delete(this.BASE_API_URL + '/orchid_species/' + speciesId)
        //             .then((res)=> {
        //                 if(res.status === 200) {
        //                     console.log(results.data.message)
        //                     // this.setState({
        //                     //     deleteSpeciesMsg: "You "
        //                     // })
        //                 }
        //             })
    }

    componentDidUpdate(prevProps){
        if(prevProps.userFavouriteIds !== this.props.userFavouriteIds){
            console.log('CDU')
            return this.checkFavourited()
        }
    }
    
    componentDidMount() {
        this.checkFavourited()
    }

    render() {
        return (
            <React.Fragment key={this.props.eachItem._id}>
                
                <div className='card gradient shadow species-card'
                    style={{
                        height: "50vh",
                        margin: "1rem auto",
                        borderRadius: "1rem",
                        boxSizing: "border-box",
                        borderColor: "#557360"
                    }}
                >
                    <div className='card-wrapper m-2'
                        style={{
                            borderTopRightRadius: "1rem",
                            borderTopLeftRadius: "1rem",
                            height: '100%'
                        }}>
                        <img className="card-img-top"
                            src={this.props.eachItem.imageUrl}
                            alt={this.props.eachItem.officialName}
                            style={{
                                width: "100%",
                                height: "100%",
                                // margin: "1rem auto 0",
                                objectFit: "cover",
                                borderTopRightRadius: "1rem",
                                borderTopLeftRadius: "1rem",
                            }}
                        />
                    </div>
                            
                        
                        <div className="card-body"
                            style={{
                                backgroundColor:'white',
                                borderBottomLeftRadius: "1rem",
                                borderBottomRightRadius: "1rem"
                            }} 
                                >
                            <h6>{this.checkWordCount(this.props.eachItem.officialName)}</h6>

                            <p>Native to {this.matchName(this.props.eachItem.distribution)}</p>
                            <div className='row'>
                                <div className='col-6 d-flex'>
                                    <a
                                        className='ms-auto'
                                        data-bs-toggle="modal"
                                        data-bs-target={"#modal" + this.props.eachItem._id}
                                        onClick={() => { this.correspondData(this.props.eachItem.distribution, this.props.eachItem.conservationStatus) }}
                                    >
                                        About this species
                                    </a>
                                </div>
                                <div className='col-6 d-flex'>
                                    <a
                                        className='me-auto'
                                        data-bs-toggle="modal"
                                        data-bs-target={"#modal-facts" + this.props.eachItem._id}
                                    >
                                        View facts
                                    </a>
                                </div>
                            </div>

                            <SpeciesModal eachItem={this.props.eachItem}
                                activeDistribution={this.state.activeDistribution}
                                activeConservation={this.state.activeConservation}
                                setActivePage={this.props.setActivePage}
                                selectEdit={this.props.selectEdit}
                                showMdSearchFilter = {this.props.showMdSearchFilter}
                                checkApiUserFavourite={this.props.checkApiUserFavourite}
                                favourited={this.state.favourited}
                                instructionMsg={this.state.instructionMsg}
                                setInstructions={this.setInstructions}
                                clearInstructions={this.clearInstructions}
                                deleteApiSpecies={this.deleteApiSpecies}
                                deleteSpeciesMsg={this.state.deleteSpeciesMsg}
                                closeModal={this.props.closeModal}
                                checkWordCount={this.checkWordCount}
                            />
                            <FactsModal eachItem={this.props.eachItem}
                            />
                        </div>
                </div>
            </React.Fragment>
        )
    }
}


