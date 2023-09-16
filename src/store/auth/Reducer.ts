import { ActionType, SET_TOKEN, UPDATE_ACOUNT_TABLE } from "../../type/Types";

const initialState = {
    acountTable: {
        year: '2023',
        month: '01'
    }
}
function reducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case UPDATE_ACOUNT_TABLE:
            return {
                ...state, acountTable: {
                    year: action.payload.year,
                    month: action.payload.month
                }
            };
        case SET_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

export default reducer;
