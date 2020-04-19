import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Spin } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";


const CardsInfo = (props) => {

    const [sizeRow, setSizeRow] = useState(16)
    const [sizeCard, setSizeCard] = useState(12)

    useEffect(() => {
        if (props.recovered !== undefined) {
            setSizeRow(24)
            setSizeCard(8)
        } else {
            setSizeRow(16)
            setSizeCard(12)
        }
    }, [props.recovered])

    return (
        <div className="site-statistic-demo-card">
            <Row gutter={sizeRow}>
                <Col span={sizeCard}>
                    <Spin spinning={props.loading} tip="Loading...">
                        <Card headStyle={{ backgroundColor: '#ff7a45' }}
                            bodyStyle={{ backgroundColor: '#ff7a45' }} >
                            <Statistic
                                title="Confimed Cases"
                                value={props.cases}
                                valueStyle={{ color: '#000000' }}
                                prefix={
                                    (props.cases !== 0 && <ArrowUpOutlined color="green" />)
                                }
                            />
                        </Card>
                    </Spin>
                </Col>
                <Col span={sizeCard}>
                    <Spin spinning={props.loading} tip="Loading...">
                        <Card headStyle={{ backgroundColor: '#ff4d4f' }}
                            bodyStyle={{ backgroundColor: '#ff4d4f' }}>
                            <Statistic
                                title="Confimed Deaths"
                                value={props.deaths}
                                valueStyle={{ color: '#000000' }}
                                prefix={
                                    (props.deaths !== 0 && <ArrowDownOutlined />)
                                }
                            />
                        </Card>
                    </Spin>
                </Col>

                {props.recovered && (
                    <Col span={sizeCard}>
                        <Spin spinning={props.loading} tip="Loading...">
                            <Card headStyle={{ backgroundColor: '#73d13d' }}
                                bodyStyle={{ backgroundColor: '#73d13d' }}>
                                <Statistic
                                    title="Recovered"
                                    value={props.recovered}
                                    valueStyle={{ color: '#000000' }}
                                    prefix={
                                        (props.recovered !== 0 && <ArrowDownOutlined />)
                                    }
                                />
                            </Card>
                        </Spin>
                    </Col>
                )}
            </Row>
        </div>
    )
}


export default CardsInfo;