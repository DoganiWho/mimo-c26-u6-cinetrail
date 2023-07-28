import {useState} from 'react'
import { useNavigate } from "react-router-dom";
// import noImage from '../../assets/no-image.svg.png'

function SearchResults({movie,setQuery}) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);


    const handleNavigation=()=>{ 
      setQuery('')
      navigate(`/moviedetails/${movie.id}`)
    }
  return (
    <div className="search-results-item" onClick={handleNavigation} >
        <img className="result-img" src={imageError ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' :`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
           onError={() => setImageError(true)} alt=""/>
        <p>{movie.title}</p> 
    </div>
  )
}

export default SearchResults;