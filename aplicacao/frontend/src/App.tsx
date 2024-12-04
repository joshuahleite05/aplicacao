import { RouterProvider } from "react-router";
import { router } from './Router'

import './styles/global.css'; 


export function App() {
  return (
    <>
      <RouterProvider router={ router } />
    </>
  )
}