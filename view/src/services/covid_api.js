import axios from "./client";

export default class CovidAPI {

    static getDayliCount() {
        return axios.get("/extractor/daily")
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static getFullDataCount() {
        return axios.get("/extractor/full_data/count")
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static getFullData() {
        return axios.get("/extractor/full_data")
            .then(res => res.data)
            .catch(error => console.log(error))
    }

}