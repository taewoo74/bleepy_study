import {combineReducers} from 'redux';

import popupSlice from './slice/popup';

const rootReducer = combineReducers({
  popup:popupSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;