import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { render } from 'react-dom'
import checkAuth from './check-auth'

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (checkAuth.isAuth()) {
          return <Component {...props} />
        }
        return <Redirect
          to={{
            pathname: "/signin",
            state: {
              from: props.location
            }
          }}
        />
      }}
    />
  )
}
