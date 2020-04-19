import React from "react";
import { Radio } from "antd";


const SwitchDataSource = (props) => {
    return (
        <div>
            <Radio.Group size="large" defaultValue="oms" buttonStyle="solid" onChange={(e) => props.changeSource(e.target.value)}>
                <Radio.Button value="oms">OMS Data</Radio.Button>
                <Radio.Button value="dgs">DGS Data</Radio.Button>
            </Radio.Group>
        </div>
    )
}


export default SwitchDataSource;