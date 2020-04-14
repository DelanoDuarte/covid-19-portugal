import axios from "./client";

export default class CovidAPI {

    static appRunning() {
        return axios.get("/")
            .then(response => {
                if (response.status == 200) {
                    return true
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    static getDayliCount() {
        return axios.get("/extractor/daily")
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static getFullDataCount() {
        return axios.get("/ue_data/full_data/count")
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static getFullData() {
        return axios.get("/ue_data/full_data")
            .then(res => res.data)
            .catch(error => console.log(error))
    }

}