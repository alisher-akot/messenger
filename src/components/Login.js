import React from 'react'
import { GoogleOutlined } from '@ant-design/icons'
import firebase from 'firebase/app'
import 'firebase/app'
import { auth } from '../firebase'

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h1>Welcome to my Social-Media!</h1>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign in with Google
        </div>
      </div>
    </div>
  )
}

export default Login
