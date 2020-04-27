import userTypes from '../types/user'

const {ON_LOGIN_SUCCESS,ON_LOGIN_FAILED,ON_LOGOUT_SUCCES} = userTypes;

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: {},
  role: "",
  errMsg: ""
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const {username, fullName, id, role } = action.payload
        return { 
            ...state, 
            username,//namanya sama  
            fullName, 
            role, 
            id, 
        };
    case ON_LOGIN_FAILED:
      return {...state, errMsg: action.payload};    
    default:
      return {...state};
  };
};
