import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import Bulker from '../src/routes/bulker'
import Pep from '../src/routes/pep'
import Pipelines from '../src/routes/pipelines'
import Refgenie from '../src/routes/refgenie'
import Refget from '../src/routes/refget'
import Contribute from './routes/contribute.tsx'

const router = createHashRouter([
  {path: '/', element: <App />, },
  {path: '/bulker/', element: <Bulker />},
  {path: '/pep/', element: <Pep />},
  {path: '/pipelines/', element: <Pipelines />},
  {path: '/refgenie/', element: <Refgenie />},
  {path: '/refget/', element: <Refget />},
  {path: '/contribute/', element: <Contribute />},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)