import React, { useState, useEffect } from "react";
import CardsInfo from "./CardsInfo";
import ChartCard from "./ChartCard";
import CovidAPI from "../../services/covid_api";

const Index = (props) => {

    const [fullInfo, setFullInfo] = useState([])
    const [lastCases, setLastCases] = useState(0)
    const [lastDeaths, setLasDeaths] = useState(0)

    const getCountData = () => {
        CovidAPI.getFullDataCount()
            .then((response) => {
                setLastCases(response.data.cases)
                setLasDeaths(response.data.deaths)
            })
    }

    const getFullData = () => {
        CovidAPI.getFullData()
            .then(response => setFullInfo(response.data))
    }

    useEffect(() => {
        getCountData()
        getFullData()
    }, [])

    return (
        <div>
            <CardsInfo cases={lastCases} deaths={lastDeaths} />
            <br />
            <ChartCard data={fullInfo} />
        </div>
    )
}


export default Index;