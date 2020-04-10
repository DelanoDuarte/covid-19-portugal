import axios from "./client";

export default class CovidAPI {

    static getDayliCount() {
        return axios.get("/extractor/daily")
            .then(res => res.data)
    }
}