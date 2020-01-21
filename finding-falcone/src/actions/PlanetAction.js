export const selectPlanet = (index, planetName, distance) => ({
    type: 'SELECT_PLANET',
    data: {
        index,
        planetName,
        distance,
    }
})