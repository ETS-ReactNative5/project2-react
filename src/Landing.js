import axios from "axios";
import React from "react";

export default class Landing extends React.Component {
    state = {
        activePage: '',
        species: [],
        distribution: []
        

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
}