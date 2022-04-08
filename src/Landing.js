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

import CreateUserProfile from "./components/CreateUserProfile";
import ReadUserProfile from "./components/ReadUserProfile";
import Login from "./components/Login";

import Footer from './components/Footer'

import { FaUserAlt } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { TiThMenu } from 'react-icons/ti'
import { GrLinkTop } from 'react-icons/gr'

import { scrollToTop } from "./utils";






export default class Landing extends React.Component {
    BASE_API_URL = "http://localhost:8888"

    state = {

        dataLoaded: false,

        activePage: 'main',
        showMdSearchFilter: true,
        species: [],
        distributionOptions: [],
        distributionSelection: [],
        conservationOptions: [],
        conservationSelection: [],
        orchidColours: [],
        orchidScentsOptions: [],
        orchidPetalPatternOptions: [],

        searchPrompt: "",
        fetchingSearchResults: false,
        searchResults: [],
        distributionFilter: "",
        conservationFilter: "",
        colourFilter: [],
        factsFilter: "",

        activeEditId: "",

        userEmail: "",
        currentUserId: "",
        registrationMsg: "",
        loginMsg: "",
        editEmailMsg: "",
        loggedIn: false,
        userFavouriteIds: [],
        userFavouriteSpecies: [],
        instructions: ""

    }

    resetFilters = () => {
        this.setState({
            distributionFilter: "",
            conservationFilter: "",
            colourFilter: [],
            factsFilter: ""
        })
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
                    selectEdit={this.selectEdit}
                    showMdSearchFilter={this.state.showMdSearchFilter}
                    checkApiUserFavourite={this.checkApiUserFavourite}
                    userFavouriteIds={this.state.userFavouriteIds}
                    loggedIn={this.state.loggedIn}
                    refreshSpeciesDisplay={this.refreshSpeciesDisplay}
                // selectActiveDisplay={this.selectActiveDisplay}
                // renderModal={this.renderModal}
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
                    refreshSpeciesDisplay={this.refreshSpeciesDisplay}
                />
                break;
            case "updateSpecies":
                return <UpdateSpecies
                    activeEditId={this.state.activeEditId}
                    orchidColours={this.state.orchidColours}
                    orchidScentsOptions={this.state.orchidScentsOptions}
                    orchidPetalPatternOptions={this.state.orchidPetalPatternOptions}
                    distributionOptions={this.state.distributionOptions}
                    conservationOptions={this.state.conservationOptions}
                    setActivePage={this.setActivePage}
                    refreshSpeciesDisplay={this.refreshSpeciesDisplay}
                />
                break;
            // case "readSingleSpecies":
            //     return <ReadSingleSpecies
            //             activeObject = {this.state.activeObject}
            //             />
            //     break;
            case "readAllDistribution":
                return <ReadAllDistribution />
                break;
            case "createUserProfile":
                return <CreateUserProfile
                    updateFormField={this.updateFormField}
                    setActivePage={this.setActivePage}
                    userEmail={this.state.userEmail}
                    postApiUserEmail={this.postApiUserEmail}
                    registrationMsg={this.state.registrationMsg}
                />
                break;
            case "readUserProfile":
                return <ReadUserProfile
                    currentUserId={this.state.currentUserId}
                    userEmail={this.state.userEmail}
                    updateFormField={this.updateFormField}
                    putApiUserEmail={this.putApiUserEmail}
                    deleteApiUserEmail={this.deleteApiUserEmail}
                    editEmailMsg={this.state.editEmailMsg}
                    distributionOptions={this.state.distributionOptions}
                    conservationOptions={this.state.conservationOptions}
                    setActivePage={this.setActivePage}
                    selectEdit={this.selectEdit}
                    userFavouriteIds={this.state.userFavouriteIds}
                    userFavouriteSpecies={this.state.userFavouriteSpecies}
                    checkApiUserFavourite={this.checkApiUserFavourite}
                    loggedIn={this.state.loggedIn}
                />
                break;
            case "login":
                return <Login
                    updateFormField={this.updateFormField}
                    userEmail={this.state.userEmail}
                    getApiUserEmail={this.getApiUserEmail}
                    loginMsg={this.state.loginMsg}

                />
            default:
                break;
        }
    }

    setActivePage = (page) => {
        this.setState({
            activePage: page
        })
    }

    selectEdit = (identifier) => {
        this.setState({
            activeEditId: identifier
        })
    }

    showMdSearchFilter() {
        return this.state.showMdSearchFilter ? <MdSearchFilter
            distributionSelection={this.state.distributionSelection}
            conservationSelection={this.state.conservationSelection}
            orchidColours={this.state.orchidColours}
            updateFormField={this.updateFormField}
            distributionFilter={this.state.distributionFilter}
            conservationFilter={this.state.conservationFilter}
            colourFilter={this.state.colourFilter}
            updateCheckbox={this.updateCheckbox}
            getSearchResults={this.getSearchResults}
            setActivePage={this.setActivePage}
            factsFilter={this.state.factsFilter}
            resetFilters={this.resetFilters}
        /> : null
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateCheckbox = (e) => {
        if (this.state[e.target.name].includes(e.target.value)) {
            let indexToRemove = this.state[e.target.name].findIndex(
                value => value === e.target.value
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

    getSearchResults = async () => {
        let payload = {
            params: {}
        }

        // let searchConditions = [this.state.searchPrompt, this.state.distributionFilter, this.state.conservationFilter]

        // searchConditions.map(
        //     condition => {
        //         if(condition){
        //         payload.params[condition] = condition
        //     }
        //     return payload
        // }
        // )

        if (this.state.searchPrompt) {
            payload.params.searchPrompt = this.state.searchPrompt
        }

        if (this.state.distributionFilter) {
            payload.params.distributionFilter = this.state.distributionFilter
        }

        if (this.state.conservationFilter) {
            payload.params.conservationFilter = this.state.conservationFilter
        }

        if (this.state.colourFilter.length > 0) {
            payload.params.colourFilter = this.state.colourFilter
        }

        if (this.state.factsFilter) {
            if (this.state.factsFilter === 'noFacts') {
                payload.params.noFacts = '0'
            } else if (this.state.factsFilter === 'factsGte3') {
                payload.params.factsGte3 = '3'
            }
        }

        console.log(payload)

        let searchResponse = await axios.get(this.BASE_API_URL + "/orchid_species", payload);
        this.setState({
            species: searchResponse.data
        })

    }

    refreshSpeciesDisplay = async () => {
        console.log('starting refreshSpeciesDisplay')
        let speciesResponse = await axios.get("http://localhost:8888/orchid_species");
        this.setState({
            species: speciesResponse.data,
            activeEditId: ""
        })
        console.log('ending refreshSpeciesDisplay')
    }

    postApiUserEmail = async () => {
        try{
            this.setState({
                registrationMsg: ""
            })
    
            let results = await axios.post(this.BASE_API_URL + '/users', {
                userEmail: this.state.userEmail
            })
            this.setState({
                currentUserId: results.data.insertedId,
                registrationMsg: "Thanks for registering an account! You can now save favourites to your profile.",
                loggedIn: true
            })
        }catch(e){
            console.log(e.response.data.message)
            this.setState({
                registrationMsg: e.response.data.message
            });
        }
        // .then(() => {
        //     this.setState({
        //         currentUserId: results.data.insertedId,
        //         registrationMsg:"Thanks for registering an account! You can now save favourites to your profile.",
        //         loggedIn: true
        //     })
        // })
    }

    putApiUserEmail = async () => {
        

        try{

            this.setState({
                editEmailMsg: ""
            })
            
            await axios.put(this.BASE_API_URL + '/users/' + this.state.currentUserId, {
                userEmail: this.state.userEmail
            })
        } catch (e){
            this.setState({
                editEmailMsg: e.response.data.message
            })
        }
        
        
        
        // .catch((e) => {
        //     this.setState({
        //         editEmailMsg: e.response.data.message
        //     })
        // })
        // .then((res) => {
        //     if (res.status === 200) {
        //         this.setState({
        //             editEmailMsg: "Your email has been changed"
        //         })
        //         setTimeout(() => {
        //             this.setState({
        //                 editEmailMsg: ""
        //             })
        //         }, 3000)
        //     }
        // })

        // .then(() => {
        //     this.setState({
        //         editEmailMsg: "Your email has been changed"
        //     })

        //     setTimeout(() => {
        //         this.setState({
        //             editEmailMsg: ""
        //         })
        //     }, 3000)
        // });

    }

    

    deleteApiUserEmail = async () => {
        await axios.delete(this.BASE_API_URL + '/users/' + this.state.currentUserId)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        editEmailMsg: "Your email has been deleted. You will now be redirected to the main page"
                    })
                    setTimeout(this.deleteEmailActions, 5000)
                }
            })
    }

    deleteEmailActions = () => {
        this.setState({
            currentUserId: "",
            loggedIn: false,
            userEmail: "",
            editEmailMsg: ""
        })
    }

    getApiUserEmail = async () => {

        let response = await axios.get(this.BASE_API_URL + '/users',
            {
                params: {
                    userEmail: this.state.userEmail
                }
            }).catch((e) => {
                this.setState({
                    loginMsg: e.response.data.message,
                    instructions: ""
                });
            });

        this.setState({
            currentUserId: response.data._id,
            loginMsg: "You have logged in successfully.",
            loggedIn: true
        })

        return this.getUserFavouriteIds();
    }

    checkApiUserFavourite = async (speciesId) => {

        if (this.state.loggedIn === true) {
            if (this.state.userFavouriteIds.includes(speciesId)) {
                console.log('testing delete')
                await axios.delete(this.BASE_API_URL + '/users/' + this.state.currentUserId + '/favourites/' + speciesId)
            } else {
                await axios.post(this.BASE_API_URL + '/users/' + this.state.currentUserId + '/favourites/' + speciesId, {
                    favourites: speciesId
                })
            }
            return this.getUserFavouriteIds();
        }
    }

    getUserFavouriteIds = async () => {
        if (this.state.currentUserId) {
            let userFavouritesResponse = await axios.get(this.BASE_API_URL + '/users/' + this.state.currentUserId)

            // if (userFavouritesResponse.data.favourites.length > 0){
                this.setState({
                    userFavouriteIds: userFavouritesResponse.data.favourites
                })
                return this.getUserFavouriteSpecies();
            // }
        }
        
    }

    getUserFavouriteSpecies = async () => {
        let payload = {
            params: {}
        }
        // && this.state.userFavouriteIds.length > 0
        if (this.state.currentUserId) {

            payload.params.userFavouriteIds = this.state.userFavouriteIds
            let userFavouritesResponse = await axios.get(this.BASE_API_URL + '/orchid_species/user_favourites', payload);
            console.log(userFavouritesResponse.data)
            this.setState({
                userFavouriteSpecies: userFavouritesResponse.data
            })
        }
    }

    async componentDidMount() {
        let speciesResponse = await axios.get(this.BASE_API_URL + "/orchid_species");
        let distributionResponse = await axios.get(this.BASE_API_URL + "/distribution");
        let conservationResponse = await axios.get(this.BASE_API_URL + "/conservation");
        let coloursResponse = await axios.get('orchidColours.json');
        let scentsResponse = await axios.get('orchidScents.json');
        let petalPatternResponse = await axios.get('orchidPetalPattern.json');

        let distributionSelection = distributionResponse.data.slice()

        distributionSelection.unshift({
            '_id':'noDistributionSelected',
            'name': 'No selection'
        })

        let conservationSelection = conservationResponse.data.slice()

        conservationSelection.unshift({
            '_id':'noConservationSelected',
            'name': 'No selection'
        })

        this.setState({
            species: speciesResponse.data,
            distributionOptions: distributionResponse.data,
            distributionSelection,
            conservationOptions: conservationResponse.data,
            conservationSelection,
            orchidColours: coloursResponse.data,
            orchidScentsOptions: scentsResponse.data,
            orchidPetalPatternOptions: petalPatternResponse.data,
            dataLoaded: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id='components-wrapper' className="container border border-danger">
                    {/* MAIN NAV BAR */}
                    <nav id='navbar'>
                        <ul className="nav d-flex pt-2">
                            <li className="nav-item me-auto">
                                <a className="nav-link"
                                    aria-current="page"
                                    onClick={() => this.setActivePage('main')}
                                >
                                    Project 2
                                </a>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn"
                                        type="button"
                                        id="dropdownMenu2"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >

                                        <FaUserAlt className="react-icons" size={20} />

                                    </button>
                                    <ul className="dropdown-menu"
                                        aria-labelledby="dropdownMenu2">

                                        {!this.state.loggedIn && <li>
                                            <button
                                                className="dropdown-item"
                                                type="button"
                                                onClick={() => {
                                                    this.setActivePage('createUserProfile');
                                                    this.setState({
                                                        showMdSearchFilter: false,
                                                        registrationMsg: ""
                                                    });
                                                }}
                                            >
                                                Create Account
                                            </button>
                                        </li>}

                                        {!this.state.loggedIn && <li>
                                            <button
                                                className="dropdown-item"
                                                type="button"
                                                onClick={() => {
                                                    this.setActivePage('login');
                                                    this.setState({
                                                        showMdSearchFilter: false,
                                                        loginMsg: ""
                                                    });
                                                }}
                                            >
                                                Login
                                            </button>
                                        </li>}

                                        {this.state.loggedIn && <li>
                                            <button
                                                className="dropdown-item"
                                                type="button"
                                                onClick={() => {
                                                    this.setActivePage('readUserProfile');
                                                    this.setState({
                                                        showMdSearchFilter: false
                                                    });
                                                }}
                                            >
                                                View Favourites
                                            </button>
                                        </li>}

                                        {this.state.loggedIn && <li>
                                            <button
                                                className="dropdown-item"
                                                type="button"
                                                onClick={() => {
                                                    this.setActivePage('main');
                                                    this.setState({
                                                        showMdSearchFilter: true,
                                                        currentUserId: "",
                                                        loggedIn: false,
                                                        userEmail: "",
                                                        userFavouriteIds: [],
                                                        userFavouriteSpecies: []
                                                    });
                                                }}
                                            >
                                                Log out
                                            </button>
                                        </li>}
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item d-md-none">
                                <button className="btn"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#xs-sm-search-filter"
                                    aria-controls="offcanvasWithBothOptions"
                                >
                                    <TiThMenu />
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {/* OFFCANVAS FILTER FOR <MD */}
                    <SmSearchFilter
                        distributionSelection={this.state.distributionSelection}
                        conservationSelection={this.state.conservationSelection}
                        orchidColours={this.state.orchidColours}
                        updateFormField={this.updateFormField}
                        distributionFilter={this.state.distributionFilter}
                        conservationFilter={this.state.conservationFilter}
                        colourFilter={this.state.colourFilter}
                        updateCheckbox={this.updateCheckbox}
                        getSearchResults={this.getSearchResults}
                        setActivePage={this.setActivePage}
                        factsFilter={this.state.factsFilter}
                        resetFilters={this.resetFilters}
                    />
                    {/* VIEW OPTIONS */}
                    {this.state.dataLoaded &&
                        <nav id='nav-tabs'>
                            <ul className="nav nav-pills justify-content-center">
                                <li className="nav-item">
                                    <a className="nav-link"
                                        aria-current="page"
                                        href="#"
                                        onClick={() => {
                                            this.refreshSpeciesDisplay();
                                            this.setActivePage('readAllSpecies');
                                            this.setState({
                                                showMdSearchFilter: true,
                                                searchPrompt: ""
                                            });
                                        }}>
                                        View All Species
                                    </a>
                                </li>
                                {/* <li className="nav-item">
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
                            </li> */}
                            </ul>
                        </nav>
                    }
                    {/* SEARCH INPUT */}
                    {this.state.dataLoaded &&
                        <section id='search-bar' className="row border border-danger">
                            <div className="col-2 d-none d-md-block"></div>
                            <div className="px-3 col-12 col-md-8 white rounded-pill input-group border border-dark">
                                <input type="search"
                                    name="searchPrompt"
                                    value={this.state.searchPrompt}
                                    onChange={this.updateFormField}
                                    className="form-control border-0"
                                    placeholder="Search"
                                // aria-label="Search" 
                                // aria-describedby="search-addon" 
                                />
                                <button className="input-group-text border-0 btn mb-1 shadow-none"
                                    type="button"
                                    id="search-addon"
                                    onClick={() => {
                                        this.getSearchResults();
                                        this.setActivePage("readAllSpecies")
                                    }}
                                >
                                    <BsSearch />
                                </button>
                            </div>
                            <div className="col-2 d-none d-md-block"></div>

                        </section>
                    }
                    {/* FILTER FOR >=MD */}
                    {this.state.dataLoaded &&
                        <section id='search-filter-md' className=" px-2 d-none d-md-block mt-3">

                            {this.showMdSearchFilter()}

                        </section>
                    }
                    {/* render SPA pages */}
                    {/*  */}
                    <main id='main-content' className="mt-3 mx-1 mx-md-2 border border-danger">
                        {this.renderPage()}
                    </main>
                    {/* FOOTER */}
                    <footer id='footer' className='container mt-3 pt-3 px-3'>
                        <Footer />
                    </footer>
                </div>
                <button id='scroll-to-top-btn'
                    className="btn rounded-circle shadow border border-dark"
                    onClick={() => scrollToTop()}
                >
                    <GrLinkTop />
                </button>
            </React.Fragment>
        )
    }
}