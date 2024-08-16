import { takeEvery, put } from "redux-saga/effects";

import { ADD_MIANCATEGORY, ADD_MIANCATEGORY_RED, GET_MIANCATEGORY_RED, UPDATE_MIANCATEGORY_RED, DELETE_MIANCATEGORY_RED, GET_MIANCATEGORY, UPDATE_MIANCATEGORY, DELETE_MIANCATEGORY } from "../Constants";
import {createRecord, deleteRecord, getRecord, updateRecord} from './Service/APICallingService'

function* createSaga(action){
    let response = yield createRecord(action.payload)
    yield put({type: ADD_MIANCATEGORY_RED, payload:response})
}

function* getSaga(action){
    let response = yield getRecord()
    yield put({type: GET_MIANCATEGORY_RED, payload:response})
}

function* updateSaga(action){
    yield updateRecord(action.payload)
    yield put({type: UPDATE_MIANCATEGORY_RED, payload:action.payload})
}

function* deleteSaga(action){
    yield deleteRecord(action.payload)
    yield put({type: DELETE_MIANCATEGORY_RED, payload:action.payload})
}

export default function* maincategorySagas(){
    yield takeEvery(ADD_MIANCATEGORY,createSaga)
    yield takeEvery(GET_MIANCATEGORY,getSaga)
    yield takeEvery(UPDATE_MIANCATEGORY,updateSaga)
    yield takeEvery(DELETE_MIANCATEGORY,deleteSaga)
}