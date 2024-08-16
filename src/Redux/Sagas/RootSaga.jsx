import { all } from "redux-saga/effects";
import maincategorySagas from './MaincategorySagas'

export default function* RootSaga(){
    yield all([
          maincategorySagas()
    ])
}