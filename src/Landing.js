import axios from "axios";
import React from "react";

import MainDisplay from "./components/MainDisplay";

import ReadAllSpecies from "./components/ReadAllSpecies";
import CreateSpecies from "./components/CreateSpecies";
import UpdateSpecies from "./components/UpdateSpecies";
import ReadSingleSpecies from "./components/ReadSingleSpecies";

import ReadAllDistribution from "./components/ReadAllDistribution";

import MdSearchFilter from "./components/MdSearchFilter";
import SmSearchFilter from "./components/SmSearchFilter";

import CreateUserProfile from  "./components/CreateUserProfile";
import ReadUserProfile from "./components/ReadUserProfile";

import SpeciesModal from "./components/SpeciesModal";



export default class Landing extends React.Component {
    state = {
        activePage: 'main',
        showMdSearchFilter: true,
        species: [],
        distributionOptions: [],
        conservationOptions: [],
        orchidColours: [],
        orchidScentsOptions: [],
        orchidPetalPatternOptions: [],

        searchPrompt: "",
        fetchingSearchResults: false,
        searchResults: [],
        distributionFilter: "",
        conservationFilter: "",
        colourFilter: []

        // activeObject: ""

    }

    renderPage() {
        switch (this.state.activePage) {
            case "main":
                return <MainDisplay />
                break;
            case "readAllSpecies":
                return <ReadAllSpecies 
                        species={this.state.species}
                        distributionOptions={this.state.distributionOptions}
                        conservationOptions={this.state.conservationOptions}
                        setActivePage={this.setActivePage}
                        selectActiveDisplay={this.selectActiveDisplay}
                        renderModal={this.renderModal}
                        />
                break;
            case "createSpecies":
                return <CreateSpecies
                        setActivePage={this.setActivePage}
                        orchidColours={this.state.orchidColours}
                        orchidScentsOptions={this.state.orchidScentsOptions}
                        orchidPetalPatternOptions={this.state.orchidPetalPatternOptions}
                        distributionOptions={this.state.distributionOptions}
                        conservationOptions={this.state.conservationOptions}

                        />
                break;
            case "updateSpecies":
                return <UpdateSpecies />
                break;
            case "readSingleSpecies":
                return <ReadSingleSpecies
                        activeObject = {this.state.activeObject}
                        />
                break;
            case "readAllDistribution":
                return <ReadAllDistribution />
                break;
            case "createUserProfile":
                return <CreateUserProfile />
                break;
            case "readUserProfile":
                return <ReadUserProfile />
                break;
            default:
                break;
        }
    }

    setActivePage = (page) => {
        this.setState({
            activePage: page
        })
    }

    // selectActiveDisplay = (identifier) => {
    //     this.setState({
    //         activeObject: identifier
    //         // ,
    //         // activePage: "readSingleSpecies"
    //     })
    // }

    showMdSearchFilter() {
        return this.state.showMdSearchFilter ? <MdSearchFilter /> : null
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    updateCheckbox = (e) => {
        if(this.state[e.target.name].includes(e.target.value)){
            let indexToRemove = this.state[e.target.name].findIndex( 
                value => value===e.target.value
            )
            this.setState({
                [e.target.name]: [...this.state[e.target.name].slice(0, indexToRemove), ...this.state[e.target.name].slice(indexToRemove + 1)]
            })
        } else {
            this.setState({
                [e.target.name]: [...this.state[e.target.name], e.target.value]
            })
        }
    }

    getSearchResults = async() => {
        let params = {
            params: {}
        }

        let searchConditions = [this.state.searchPrompt, this.state.distributionFilter, this.state.conservationFilter]

        searchConditions.map(
            condition => {
                if(condition){
                params.params[condition] = condition
            }
        }
        )
        console.log(params)
        
        // if(this.state.searchPrompt){
        //     params.params.searchPrompt = this.state.searchPrompt
        // }

    }

    // async componentDidUpdate() {
    //     if(fetchingSearchResults === true){

    //     }
    // }


    BASE_API_URL = "http://localhost:8888"

    // getApi = async () => {
    //     let speciesResponse = await axios.get(this.BASE_API_URL + "/orchid_species");
    // }

    async componentDidMount() {
        let speciesResponse = await axios.get(this.BASE_API_URL + "/orchid_species");
        let distributionResponse = await axios.get(this.BASE_API_URL + "/distribution");
        let conservationResponse = await axios.get(this.BASE_API_URL + "/conservation");
        let coloursResponse = await axios.get('orchidColours.json');
        let scentsResponse = await axios.get('orchidScents.json');
        let petalPatternResponse = await axios.get('orchidPetalPattern.json');


        this.setState({
            species: speciesResponse.data,
            distributionOptions: distributionResponse.data,
            conservationOptions: conservationResponse.data,
            orchidColours: coloursResponse.data,
            orchidScentsOptions: scentsResponse.data,
            orchidPetalPatternOptions: petalPatternResponse.data 
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid border border-danger">
                    {/* MAIN NAV BAR */}
                    <ul className="nav d-flex border border-warning">
                        <li className="nav-item me-auto">
                            <a className="nav-link"
                                aria-current="page"
                            >
                                Project 2
                            </a>
                        </li>
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li>
                                        <button 
                                            className="dropdown-item" 
                                            type="button"
                                            onClick = {() => {
                                                this.setActivePage('createUserProfile');
                                                this.setState({
                                                    showMdSearchFilter: false
                                                });
                                            }}
                                            >
                                                Create Account
                                        </button> 
                                    </li>
                                    <li>
                                        <button 
                                            className="dropdown-item" 
                                            type="button"
                                            onClick = {() => {
                                                this.setActivePage('readUserProfile');
                                                this.setState({
                                                    showMdSearchFilter: false
                                                });
                                            }}
                                            >
                                                View Profile
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item d-md-none">
                            <button className="btn" 
                                    type="button" 
                                    data-bs-toggle="offcanvas" 
                                    data-bs-target="#XsSmSearchFilter" 
                                    aria-controls="offcanvasWithBothOptions"
                                    >
                                        Filter (XS-SM)
                            </button>
                        </li>
                    </ul>
                    {/* OFFCANVAS FILTER FOR <MD */}
                    <SmSearchFilter  
                        distributionOptions = {this.state.distributionOptions}
                        conservationOptions = {this.state.conservationOptions}
                        orchidColours = {this.state.orchidColours}
                        updateFormField = {this.updateFormField}
                        distributionFilter = {this.state.distributionFilter}
                        conservationFilter = {this.state.conservationFilter}
                        colourFilter = {this.state.colourFilter}
                        updateCheckbox = {this.updateCheckbox}
                    />
                    {/* VIEW OPTIONS */}
                    <ul className="nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link"
                                aria-current="page"
                                href="#"
                                onClick={() => {
                                    this.setActivePage('readAllSpecies');
                                    this.setState({
                                        showMdSearchFilter: true
                                    });
                                }}>
                                View Species
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="#"
                                onClick={() => {
                                    this.setActivePage('readAllDistribution');
                                    this.setState({
                                        showMdSearchFilter: true
                                    });
                                }}>
                                Orchid Distribution
                            </a>
                        </li>
                    </ul>
                    {/* SEARCH INPUT */}
                    <div className="input-group rounded">
                        <input type="search" 
                                name="searchPrompt"
                                onChange={this.updateFormField}
                                className="form-control rounded" 
                                placeholder="Search" 
                                aria-label="Search" 
                                aria-describedby="search-addon" />
                        <button className="input-group-text border-0" 
                                id="search-addon">
                            Search
                        </button>
                    </div>
                    {/* FILTER FOR >=MD */}
                    <div className="d-none d-md-block border border-primary">
                        {this.showMdSearchFilter()}
                    </div>
                    <div className="border border-success">
                        {this.renderPage()}

                    </div>
                    {/* FOOTER GOES HERE */}
                </div>
            </React.Fragment>
        )
    }
}