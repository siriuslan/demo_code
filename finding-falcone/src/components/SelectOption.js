import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Radio, Select } from 'antd';
import 'antd/dist/antd.css';
import { selectPlanet } from '../actions/PlanetAction';
import { selectVehicle } from '../actions/VehicleAction';

const { Group } = Radio;
const { Option } = Select;

function SelectOption ({ planets, vehicles, index, changePlanet, changeVehicle, state }) {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const handleSelectPlanet = planet => {
        const planetObject = planets.filter(p => p.name === planet)[0];
        setSelectedPlanet(planetObject);
        changePlanet(index, planet, planetObject.distance);
        
    }

    const handleSelectVehicle = vehicle => {
        const speed = vehicles.filter(v => v.name === vehicle.target.value)[0].speed;
        changeVehicle(index, vehicle.target.value, speed);
    }

    return (
        <div style={{ 'display': 'flex', 'flexDirection': 'column' }}>
            <div>{`Destination ${index}`}</div>
            <Select
                style={{ width: 150 }}
                onChange={handleSelectPlanet}
                disabled={planets.length === 0}
            >
                {planets.map(planet => {
                    return (
                        <Option value={planet.name} key={`${planets.name}_${index}`}>
                            {planet.name}
                        </Option>
                    );
                })}
            </Select>
            {selectedPlanet &&
                <Group onChange={handleSelectVehicle}>
                    {vehicles.length > 0 && 
                    vehicles.map(vehicle => {
                        return (
                            <Radio
                                style={radioStyle}
                                value={vehicle.name}
                                key={`${vehicle.name}_${index}`}
                                disabled={
                                    vehicle.total_no === 0
                                    || selectedPlanet.distance > vehicle.max_distance
                                }
                            >
                                {vehicle.name} ({vehicle.total_no})
                            </Radio>
                        );
                    })}
                </Group>
            }
        </div>
    );
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => {
    return {
        changePlanet: (index, name, distance) => dispatch(selectPlanet(index, name, distance)),
        changeVehicle: (index, name, speed) => dispatch(selectVehicle(index, name, speed)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOption);