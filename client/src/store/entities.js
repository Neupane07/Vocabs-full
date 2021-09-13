import { combineReducers } from 'redux';
// import bugsReducer from './bugs';
// import projectsReducer from './projects';
// import userReducer from './users';
import wordsReducer from './words'

export default combineReducers({
    // bugs: bugsReducer,
    words: wordsReducer,
    // projects: projectsReducer,
    // users: userReducer,
});
