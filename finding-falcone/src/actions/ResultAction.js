export const updateResult = (result, timeTaken) => ({
    type: 'UPDATE_RESULT',
    data: { ...result, timeTaken }
})

export const restart = () => ({
    type: 'RESET'
});