import {
  UPLOAD_FILES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return {
        ...state,
        data: action.payload,
      };
          case UPLOAD_FILES:
      return {
        ...state,
        todays: action.payload,
      };
  }
};