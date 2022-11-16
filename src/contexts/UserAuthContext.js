import React, { createContext, useReducer, useEffect } from 'react'
import { userAuthReducer } from '../reducers/UserAuthReducer'
import { getCurrentUser, getCurrentUserRefreshToken } from '../api/UserAuthAPI'
import jwt_decode from "jwt-decode";

export const UserAuthContext = createContext()

const UserAuthContextProvider = (props) => {
  const [user, dispatch] = useReducer(userAuthReducer, {
    'user': null
  })

  const getUser = async () => {
    dispatch({type: 'GET_USER_LOADING'})
    if (localStorage.getItem('access_token')) {
      let token = localStorage.getItem('access_token')
      let user = await getCurrentUser(token)
      if (user['message'] === 'token not valid') {
        dispatch({type: 'GET_CURRENT_OR_REFRESH_USER_FAILURE', user})
        user = await useRefreshToken()
      } else {
        dispatch({type: 'GET_USER_SUCCESS', user})
      }
    } else {
      dispatch({type: 'GET_USER_LOADING'})
    }
  }

  const useRefreshToken = async () => {
    dispatch({type: 'GET_USER_LOADING'})
    if (localStorage.getItem('refresh_token')) {
      let refreshToken = {
        'refresh': localStorage.getItem('refresh_token')
      }
      let refreshResponse = await getCurrentUserRefreshToken(refreshToken)
      if (refreshResponse['access']) {
        let decoded = jwt_decode(refreshResponse['access'])
        let user = {
          email: decoded['email'],
          username: decoded['username'],
          is_premium: decoded['is_premium'],
          id: decoded['id']
        }
        dispatch({type: 'GET_USER_SUCCESS', user})
      } else {
        dispatch({type: 'GET_CURRENT_OR_REFRESH_USER_FAILURE', user})
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  // console.log("USER: ", user)
  return (
    <UserAuthContext.Provider value={{user, dispatch}}>
      { props.children }
    </UserAuthContext.Provider>
  )
}

export default UserAuthContextProvider
