import { ADD_Newsletter, DELETE_Newsletter, GET_Newsletter, UPDATE_Newsletter } from "../Constants";

export function createNewsletter(data) {
    return {
        type: ADD_Newsletter,
        payload: data
    }
}

export function getNewsletter() {
    return {
        type: GET_Newsletter
    }
}

export function updateNewsletter(data) {
    return {
        type: UPDATE_Newsletter,
        payload: data
    }
}

export function deleteNewsletter(data) {
    return {
        type: DELETE_Newsletter,
        payload: data
    }
}