export const planetReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECT_PLANET':
            if (state === []) {
                return [{ ...action.data }];
            }

            const selected = state.findIndex(s => s.index === action.data.index);
            
            if (selected === -1) {
                return [...state, { ...action.data }];
            }

            return [
                ...state.slice(0, selected),
                { ...action.data },
                ...state.slice(selected +1)
            ];
        case 'RESET':
            return [];
        default:
            return state;
    }
};
