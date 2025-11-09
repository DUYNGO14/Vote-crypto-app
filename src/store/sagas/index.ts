import { authSaga } from "@/store/sagas/authSaga";
import { all } from "redux-saga/effects";
function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}
export default rootSaga;