export const resultReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_RESULT':
            return Object.assign({}, action.data);
        case 'RESET':
                return {};
        default:
            return state;
    }
};
