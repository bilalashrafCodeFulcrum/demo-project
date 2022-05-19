import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import Patients from '../Pages/Patients';

export default function Router() {
  return (
      <div>
      <Routes>

<Route path='/' element={<Login />} />
<Route path='/patients' element={<Patients />} />


</Routes>
      </div>
  )
}
