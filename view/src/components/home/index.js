import React, { useState, useEffect } from "react";
import CardsInfo from "./CardsInfo";
import ChartCard from "./ChartCard";
import CovidAPI from "../../services/covid_api";

const Index = (props) => {

    const [fullInfo, setFullInfo] = useState([])
    const [lastCases, setLastCases] = useState(0)
    const [lastDeaths, setLasDeaths] = useState(0)

    useEffect(() => {
        CovidAPI.getDayliCount()
            .then((response) => {
                setFullInfo(response.data)
                setLastCases(response.data[response.data.length - 1].cases)
                setLasDeaths(response.data[response.data.length - 1].deaths)
            })
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