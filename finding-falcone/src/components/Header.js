import React from 'react';
import { Col, Row } from 'antd';

export default function Header () {
    return (
        <Row style={{ marginTop: '10px' }}>
            <Col
                span={6}
                offset={9}
                style={{ fontSize: '40px', fontWeight: '500' }}
            >
                Finding Falcone!
            </Col>
            <Col offset={21}>
                <nav>
                    <a href="/">Reset</a>
                    {' | '}
                    <a href="https://www.geektrust.in">GeekTrust Home</a>
                </nav>
            </Col>
        </Row>
    );
}