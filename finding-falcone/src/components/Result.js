import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import { restart } from '../actions/ResultAction';

function Result ({ result, reset }) {
    const handleRestart = () => reset();

    const textStyle = {
        fontSize: '30px',
        fontWeight: '400'
    };

    if (Object.keys(result).length === 0) {
        return null;
    }

    return (
        <>
            {result.status === 'success'
            ? <>
                <Row type="flex" justify="center">
                    <Col span={14} style={textStyle}>
                        Success! Congratulations on Finding Falcone. King Shan is mighty pleased
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={3} style={textStyle}>
                        Time taken: {result.timeTaken}
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={3} style={textStyle}>
                        Planet: {result.planet_name}
                    </Col>
                </Row>
            </>
            : <Row type="flex" justify="center">
                <Col span={8} style={textStyle}>
                    Failed to find Falcone, please try again!
                </Col>
            </Row>
            }                
            <Row type="flex" justify="center" style={{ marginTop: '50px'}}>
                <Button
                    onClick={handleRestart}
                >
                    <Link to="/">Start Again</Link>
                </Button>
            </Row>
        </>
    );
}

const mapStateToProps = state => ({ result: state.result });

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(restart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);

