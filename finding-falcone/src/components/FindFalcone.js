import React, { useEffect, useState } from 'react';
import Main from './Main';
import { getPlanet, getVehicle, getToken } from '../util';

function FindFalcone() {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
      Promise.all([
        getPlanet(),
        getVehicle(),
        getToken(),
      ]).then(response => {
          setPlanets(response[0]);
          setVehicles(response[1]);
          setToken(response[2]);
      });      
  }, []);

  return (
    <Main planets={planets} vehicles={vehicles} token={token} />
    );
}

export default FindFalcone;
