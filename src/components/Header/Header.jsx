import { useContext, useState, useEffect }from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';
import { MdOutlineDarkMode,MdOutlineLightMode } from "react-icons/md";
import { UserContext } from '../../context/UserContext';
import SearchResults from '../SearchResults/SearchResults';
import axios from "../../axios"

function Header({ baseUrl, apiKey }) {
  const { user,token }=useContext(UserContext) 
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const [query, setQuery] = useState ('');
  const [searchResults, setSearchResults] = useState([]);
  const [profileOptions,setProfileOptions]=useState(false)

    useEffect(()=> {
      if(query.trim().length>0){
      axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
      .then(res=>{
        setSearchResults(res.data.results)
      })
      .catch(err=>console.log(err))
    }
    }, [query])

//function to handle the dark/light mode
const handleTheme =() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
}
const handleLogout=()=>{
  localStorage.clear()
  setToken('')
  navigate('/') 
} 

  return (
    <div className={darkMode ?"header-container":"header-container header-light" }>
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
        <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        className={`search-input ${query && "input-active"} ${!query && !darkMode && query}`}
        placeholder="Search movies..."/>
          {query.trim() !== "" && (
            <div className="search-results-container">
              {searchResults.map((movie) => {
              return <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
            })}
            </div>
            )}
      </div>
      <div className="header-buttons-container">
        <div className="theme-button-container">
             {
                darkMode 
                ? <div className="theme-buttons">
                    <MdOutlineLightMode onClick={handleTheme} className="theme-icon "/>
                    <MdOutlineDarkMode className="theme-icon theme-icon-active"/>  
                </div>
                : <div className="theme-buttons">
                    <MdOutlineLightMode className="theme-icon theme-icon-active"/>
                    <MdOutlineDarkMode onClick={handleTheme} className="theme-icon"/>  
                </div>
}        
</div>
{
                    token 
                    ? <div className={darkMode ?"profile-container" : "profile-container profile-light" }>
                        <img src={user.image_url} className="profile-img" onClick={()=>setProfileOptions(!profileOptions)} alt=""/>
                        <p>Welcome {user.username}<span></span></p>
                        {
                            profileOptions
                            ? <div className="profile-options">
                                <Link to="/myfavorites">My Favorites</Link>
                                <p className="logout" onClick={handleLogout}>Logout</p>
                              </div>
                            : null
                        } 
                        
                        
                     </div>
                    : <div>
                  <button className="create-account-btn" onClick={()=>navigate('/signup')}>Create an account</button>
        </div>
}
      </div>
    </div>
  )
}

export default Header