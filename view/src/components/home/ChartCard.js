import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ComposedChart, Area
} from 'recharts';
import { Card } from "antd";

const ChartCard = (props) => {

    return (
        <div>
            <Card>
                <ComposedChart width={1200} height={300} data={props.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Bar dataKey="deaths" barSize={20} fill="#413ea0" />
                </ComposedChart>

            </Card>
        </div>
    )
}

export default ChartCard;