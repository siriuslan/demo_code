export const selectVehicle = (index, vehicleName, speed) => ({
    type: 'SELECT_VEHICLE',
    data: {
        index,
        vehicleName,
        speed,
    }
})