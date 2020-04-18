import axios from "./client";

export default class CovidAPI {

    static appRunning() {
        return axios.get("/")
            .then(response => {
                if (response.status === 200) {
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

    static async getFullDataFromOMS() {
        const ue_data_count = await this.getFullDataCount().then(data => { return data });
        const ue_full_data = await this.getFullData().then(data => { return data });
        return {
            full_data: ue_full_data.data,
            cases: ue_data_count.data.cases,
            deaths: ue_data_count.data.deaths
        }
    }

    static async getFullDataFromDGS() {
        const daily_count = await this.getDayliCount().then(data => { return data });
        const cases = daily_count.data[daily_count.data.length - 1].cases
        const deaths = daily_count.data[daily_count.data.length - 1].deaths
        return {
            full_data: daily_count.data,
            cases: cases,
            deaths: deaths
        }
    }

}