import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";


const CardsInfo = (props) => {

    return (
        <div>
            <div className="site-statistic-demo-card">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card headStyle={{ backgroundColor: '#ff7a45' }}
                            bodyStyle={{ backgroundColor: '#ff7a45' }} >
                            <Statistic
                                title="Confimed Cases"
                                value={props.cases}
                                valueStyle={{ color: '#000000' }}
                                prefix={
                                    (props.cases != 0 && <ArrowUpOutlined color="green" />)
                                }
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card headStyle={{ backgroundColor: '#ff4d4f' }}
                            bodyStyle={{ backgroundColor: '#ff4d4f' }}>
                            <Statistic
                                title="Confimed Deaths"
                                value={props.deaths}
                                valueStyle={{ color: '#000000' }}
                                prefix={
                                    (props.deaths != 0 && <ArrowDownOutlined />)
                                }
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


export default CardsInfo;