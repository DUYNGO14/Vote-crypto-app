import { authSaga } from '@/store/sagas/authSaga';
import { miningSaga } from '@/store/sagas/miningSaga';
import { newsSaga } from '@/store/sagas/newsSaga';
import { all } from 'redux-saga/effects';
function* rootSaga() {
  yield all([authSaga(), miningSaga(), newsSaga()]);
}
export default rootSaga;
