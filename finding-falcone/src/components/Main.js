import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { notification, Button, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import SelectOption from './SelectOption';
import { updateResult } from '../actions/ResultAction';
import { find } from '../util';

const FIND_CHOICES_INDEXES = [0, 1, 2, 3]

function Main ({ planets, vehicles, token, state, sendResult }) {
    const [availablePlanets, setAvailablePlanets] = useState(planets);
    const [availableVehicle, setAvailableVehicles] = useState(vehicles);
    const [time, setTime] = useState(0);

    const initPlanetList = () => {
        const availableItems = planets.filter(p => {
            for (const s of state.planets) {
                if (p.name === s.planetName) {
                    return false;
                }
            }
            return true;
        });
        setAvailablePlanets(availableItems);
    }

    const initVehicleList = () => {
        const availableItems = [];
        for (const v of vehicles) {
            const selectedNum = state.vehicles.filter(sv => sv.vehicleName === v.name).length;
            availableItems.push(Object.assign({}, v, { "total_no": v.total_no - selectedNum }));
        }
        setAvailableVehicles(availableItems);
    }

    useEffect(() => {
        initPlanetList();
        initVehicleList();
        let time = 0;
        for (let i = 0; i < state.vehicles.length; ++i) {
            time += state.planets[i].distance / state.vehicles[i].speed;
        }
        setTime(time);
    }, [planets, state.planets, vehicles, state.vehicles]);


    const handleClick = () => {
        if (token === '') {
            notification.error({ message: "You need token to complete finding, please restart again."});
            return;
        }

        const planetNames = [];
        for (const p of state.planets) {
            planetNames.push(p.planetName);
        }
        const vehicleNames = [];
        for (const v of state.vehicles) {
            vehicleNames.push(v.vehicleName);
        }

        find(JSON.stringify({
            ...token,
            "planet_names": planetNames,
            "vehicle_names": vehicleNames,
        })).then(
            response => sendResult(response, time)
        ).catch(error => {
            notification.error({ message: `Something wrong, please try again. Error detail - ${error}`});
        });
    }

    return (
        <>
            <Row type="flex" justify="center">
                <Col span={8} style={{ fontSize: '30px', fontWeight: '500', marginTop: '50px', marginBottom: '30px' }}>
                    Select planets you want to search in:
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={4} />
                {FIND_CHOICES_INDEXES.map(index => (
                    <Col span={3} key={index}>
                        <SelectOption planets={availablePlanets} vehicles={availableVehicle} index={index} />
                    </Col>    
                ))}
                <Col span={4}>
                    <div style={{ fontSize: '26px', fontWeight: '400' }}>Time taken: {time}</div>
                </Col>
            </Row>
            <Row type="flex" justify="center" style={{ marginTop: '50px'}}>
                <Button
                    onClick={handleClick}
                    disabled={state.vehicles.length !== FIND_CHOICES_INDEXES.length
                        || state.planets.length !== FIND_CHOICES_INDEXES.length}
                >
                    <Link to="/result">Find Falconel</Link>
                </Button>
            </Row>
        </>
    );
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => {
    return {
        sendResult: (result, timeTaken) => dispatch(updateResult(result, timeTaken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);