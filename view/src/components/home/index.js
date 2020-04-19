import React, { useState, useEffect } from "react";
import CardsInfo from "./CardsInfo";
import ChartCard from "./ChartCard";
import CovidAPI from "../../services/covid_api";
import SwitchDataSource from "../switch_data_source/SwitchDataSource";
import { Row, Col, Divider, Spin } from "antd";

const Index = (props) => {

    const [fullInfo, setFullInfo] = useState([])
    const [lastCases, setLastCases] = useState(0)
    const [lastDeaths, setLasDeaths] = useState(0)
    const [lastRecovered, setLastRecovered] = useState(undefined)

    const [loading, setLoading] = useState(false)

    async function callOMSData() {
        setLoading(true)
        const { full_data, cases, deaths, recovered } = await CovidAPI.getFullDataFromOMS().then(data => { return data }).finally(() => setLoading(false))
        setFullInfo(full_data)
        setLastCases(cases)
        setLasDeaths(deaths)
        setLastRecovered(recovered)
    }

    async function callDGSData() {
        setLoading(true)
        const { full_data, cases, deaths, recovered } = await CovidAPI.getFullDataFromDGS().then(data => { return data }).finally(() => setLoading(false))
        setFullInfo(full_data)
        setLastCases(cases)
        setLasDeaths(deaths)
        setLastRecovered(recovered)
    }

    const switch_data_source = (source) => {
        switch (source) {
            case "oms":
                callOMSData()
                break;
            case "dgs":
                callDGSData()
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        callOMSData()
    }, [])

    return (
        <div>
            <Row>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <SwitchDataSource changeSource={(source) => switch_data_source(source)} />
                </Col>
            </Row>

            <Divider />

            <CardsInfo cases={lastCases} deaths={lastDeaths} recovered={lastRecovered} loading={loading} />

            <Divider />

            <Spin spinning={loading} tip="Loading...">
                <ChartCard data={fullInfo} />
            </Spin>
        </div>
    )
}


export default Index;