import { ADD_MIANCATEGORY_RED, DELETE_MIANCATEGORY_RED, GET_MIANCATEGORY_RED, UPDATE_MIANCATEGORY_RED } from "../Constants";

export default function MaincategoryReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_MIANCATEGORY_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState

        case GET_MIANCATEGORY_RED:
            return action.payload

        case UPDATE_MIANCATEGORY_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].active = action.payload.active
            return state

        case DELETE_MIANCATEGORY_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
