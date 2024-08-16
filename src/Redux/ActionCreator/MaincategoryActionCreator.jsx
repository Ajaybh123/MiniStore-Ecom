import { ADD_MIANCATEGORY, DELETE_MIANCATEGORY, GET_MIANCATEGORY, UPDATE_MIANCATEGORY } from "../Constants";

export function createMaincategory(data) {
    return {
        type: ADD_MIANCATEGORY,
        payload: data
    }
}

export function getMaincategory() {
    return {
        type: GET_MIANCATEGORY
    }
}

export function updateMaincategory(data) {
    return {
        type: UPDATE_MIANCATEGORY,
        payload: data
    }
}

export function deleteMaincategory(data) {
    return {
        type: DELETE_MIANCATEGORY,
        payload: data
    }
}