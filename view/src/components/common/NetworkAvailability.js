import React, { useEffect } from "react";
import CovidAPI from "../../services/covid_api";
import { notification } from "antd";

const NetworkAvailability = (props) => {

    useEffect(() => {
        CovidAPI.appRunning()
            .then(available => {
                if (!available) {
                    notification.open({
                        type: "warning",
                        message: "Network Problem",
                        description: "Problem in connection with Service.",
                        duration: 5
                    })
                }
            })
    }, [])

    return (
        <div>
        </div>
    )
}


export default NetworkAvailability;