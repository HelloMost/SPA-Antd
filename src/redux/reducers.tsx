import { combineReducers } from 'redux';
import { ADD_DATA, UPDATE_DATA, DELETE_DATA } from './actions';

const initialState = {
  data: [],
};

const dataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case UPDATE_DATA:
      return {
        ...state,
        data: state.data.map((item: any) =>
          item.id === action.payload.id ? action.payload.updatedData : item
        ),
      };
    case DELETE_DATA:
      return {
        ...state,
        data: state.data.filter((item: any) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
