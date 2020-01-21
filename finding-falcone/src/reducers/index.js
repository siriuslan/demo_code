import { combineReducers } from 'redux';
import { planetReducer } from './PlanetReducer';
import { resultReducer } from './ResultReducer';
import { vehicleReducer } from './VehicleReducer';

export default combineReducers({
    planets: planetReducer,
    result: resultReducer,
    vehicles: vehicleReducer
});