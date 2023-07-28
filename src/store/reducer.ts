import {combineReducers} from 'redux';

import userSlice from './slice/user';
import popupSlice from './slice/popup';
import insightSlice from './slice/insight';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  popup:popupSlice.reducer,
  insight:insightSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;