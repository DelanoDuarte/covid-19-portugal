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
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#000000' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card headStyle={{ backgroundColor: '#ff4d4f' }}
                            bodyStyle={{ backgroundColor: '#ff4d4f' }}>
                            <Statistic
                                title="Confimed Deaths"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#000000' }}
                                prefix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


export default CardsInfo;