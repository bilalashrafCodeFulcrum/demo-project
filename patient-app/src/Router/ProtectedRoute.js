import React from 'react'
import {Navigate} from 'react-router-dom'
import { isLoging } from '../Services'

export default function ProtectedRoute({children}) {
    const isLogin = isLoging()
    if(!isLogin){
        return <Navigate to='/' replace />
    }
  return children
}
