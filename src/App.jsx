// import React from 'react'
// import './App.css'
// import Home from './pages/Home/Home'

// export default function App() {
//   return (
//     <div className="app">
//       <Home />
//     </div>
//   )
// }



import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CombinedContextProvider from './context/index'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Favorites from './pages/Favorites/Favorites';





function App() {
  const apiKey = "cdb3a697cd18e64e86da5590fa8eaf94";
  const baseUrl = "https://api.themoviedb.org/3";
  const serverUrl = "https://cinetrail-server.herokuapp.com/";


  return (
    
      <BrowserRouter>
      <CombinedContextProvider>
      <Header apiKey={apiKey} baseUrl={baseUrl} />
      <Routes>
        <Route path="/" element={<Home apiKey={apiKey} baseUrl={baseUrl} />}/>
        <Route path="/moviedetails/:movieid" element={<Details serverUrl={serverUrl} baseUrl={baseUrl} apiKey={apiKey}/>}/>
        <Route path="/myfavorites" element={<Favorites serverUrl={serverUrl} baseUrl={baseUrl} apiKey={apiKey}/>}/>
        <Route path="/signup" element={<SignUp serverUrl={serverUrl}/>}/>
        <Route path="/signin" element={<SignIn serverUrl={serverUrl}/>}/>
      </Routes>
      </CombinedContextProvider>
      </BrowserRouter>
       
   
  )
}

export default App