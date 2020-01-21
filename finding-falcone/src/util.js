const getData = async (destUrl) => {
    const response  = await fetch(destUrl);

    const result = await response.json();
    if(response.ok) {
        return result;
    }
    
    throw new Error(result.error);
}

const postData = async (destUrl, body=null) => {
    const response  = await fetch(destUrl, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body
        }
    );

    const result = await response.json();
    if(response.ok) {
        return result;
    }
    
    throw new Error(result.error);
}

const getPlanet = () => getData('https://findfalcone.herokuapp.com/planets');
const getVehicle = () => getData('https://findfalcone.herokuapp.com/vehicles');
const getToken = () => postData('https://findfalcone.herokuapp.com/token');
const find = (request) => postData('https://findfalcone.herokuapp.com/find', request);

export { getPlanet, getVehicle, getToken, find };