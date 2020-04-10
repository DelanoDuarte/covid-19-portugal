import axios from "./client";

export default class CovidAPI {

    static getDayliCount() {
        return axios.get("/extractor/daily")
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}