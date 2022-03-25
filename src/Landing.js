import axios from "axios";
import React from "react";
import ReadAllSpecies from "./components/ReadAllSpecies";
import CreateSpecies from "./components/CreateSpecies";
import UpdateSpecies from "./components/UpdateSpecies";
import ReadSingleSpecies from "./components/ReadSingleSpecies";
import ReadAllDistribution from "./components/ReadAllDistribution";



export default class Landing extends React.Component {
    state = {
        activePage: 'main',
        species: [],
        distribution: []
    }

    renderPage() {
        switch (this.state.activePage) {
            case "readAllSpecies":
                return <ReadAllSpecies/>
              break;
            case "createSpecies":
                return <CreateSpecies/>
              break;
            case "updateSpecies":
                return <UpdateSpecies/>
              break;
            case "readSingleSpecies":
                return <ReadSingleSpecies/>
              break;
            case "readAllDistribution":
                return <ReadAllDistribution/>
              break;
            default:
              break;
          }
    }

    setActivePage(page) {
        this.setState({
            activePage: page
        })
    }

    BASE_API_URL = "https://tgc16-p2-api.herokuapp.com"

    async componentDidMount() {
        let speciesResponse = await axios.get(this.BASE_API_URL + "/orchid_species");
        let distributionResponse = await axios.get(this.BASE_API_URL + "/distribution")

        this.setState({
            species: speciesResponse.data,
            distribution: distributionResponse.data
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container border border-danger">
                    {/* MAIN NAV BAR */}
                    <ul className="nav d-flex border border-warning">
                        <li className="nav-item me-auto">
                            <a className="nav-link" aria-current="page">Project 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">User Dropdown</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Search (mobile)</a>
                        </li>
                    </ul>
                    {/* VIEW OPTIONS */}
                    <ul class="nav nav-pills justify-content-center">
                        <li class="nav-item">
                            <a class="nav-link" 
                                aria-current="page" 
                                href="#"
                                onClick={() => {
                                    this.setActivePage('readAllSpecies')
                                }}>
                                View Species
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" 
                                href="#"
                                onClick={() => {
                                    this.setActivePage('readAllDistribution')
                                }}>
                                Orchid Distribution
                            </a>
                        </li>
                    </ul>
                    {/* SEACRCH AND FILTER FOR >MD */}
                    <div className="d-none d-md-block border border-primary">
                        <h1>Search and Filter</h1>
                    </div>
                    <div className="border border-success">
                    {this.renderPage()}

                    </div>
                </div>
            </React.Fragment>
        )
    }
}