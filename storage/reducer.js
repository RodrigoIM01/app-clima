export default (state, action) => {
    switch (action.type) {
        case 'SET_UNIT':
            return {
                ...state,
                unit: action.payload
            }
    }
}