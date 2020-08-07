import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { render } from 'react-dom'
import checkAuth from './check-auth'

export default function AdminProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (checkAuth.isAuth() && checkAuth.isAdmin()) {
          return <Component {...props} />
        }
        return <Redirect
          to={{
            pathname: "/",
            state: {
              from: props.location
            }
          }}
        />
      }}
    />
  )
}
