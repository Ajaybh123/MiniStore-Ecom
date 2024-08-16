import { takeEvery, put } from "redux-saga/effects";

import { ADD_BRAND, ADD_BRAND_RED, GET_BRAND_RED, UPDATE_BRAND_RED, DELETE_BRAND_RED, GET_BRAND, UPDATE_BRAND, DELETE_BRAND } from "../Constants";
import { createRecord, deleteRecord, getRecord, updateRecord } from './Service/APICallingService'

function* createSaga(action) {
    let response = yield createRecord('brand', action.payload)
    yield put({ type: ADD_BRAND_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord('brand')
    yield put({ type: GET_BRAND_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord('brand', action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord('brand', action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}

export default function* brandSagas() {
    yield takeEvery(ADD_BRAND, createSaga)
    yield takeEvery(GET_BRAND, getSaga)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)
}