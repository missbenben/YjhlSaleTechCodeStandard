import { combineReducers } from 'redux-immutable';
import indexReducer from '../modules/Index/store/reducer';
import loginReducer from '../modules/Login/store/reducer';

/* reducers */
const reducers: Object = {
  ...indexReducer,
  ...loginReducer
};

/* 创建reducer */
export function createReducer(asyncReducers: Object): Function{
  return combineReducers({
    ...reducers,
    ...asyncReducers
  });
}