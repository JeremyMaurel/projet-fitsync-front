import activitiesReducer from './activitiesReducer';
import categoriesReducer from './categoriesReducer';
import userReducer from './userReducer';

const reducer = {
  activities: activitiesReducer,
  categories: categoriesReducer,
  user: userReducer,
};

export default reducer;
