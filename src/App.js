import React from 'react';
import { Route , Link} from 'react-router-dom';
import Home from './component/Home'
import Header from './component/Header'
import Login from './component/Login'
import about from './about'
import SignInSide from './component/SignInSide'
import SignUp from './component/SignUp'

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};


function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)
    console.log("user"+user);
    console.log("token"+token);
    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {/* <Header /> */}

      <div className="App">
        {!state.isAuthenticated ?
          <Route path="/" component={SignInSide} exact />
          :
          <Route path="/" component={Home} exact />
        }
        <Route path="/signup" component={SignUp}  />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
