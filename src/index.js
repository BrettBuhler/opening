import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewLineRoute from './routes/NewLineRoute'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);


/*
<BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/newline' element={<NewLineRoute />}></Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
*/