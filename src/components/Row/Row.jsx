import React, { useState, useEffect } from 'react'
import './Row.css'
import axios from '../../axios'


export default function Row({ title, fetchUrl, isLargeRow=false}) {
  
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original';
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  
  return (
    <div className="row">
      <h2>{title}</h2>
      
      {movies.map(movie => {
      // console.log(base_url + movie.backdrop_path);
      <img 
        className={`row_poster ${isLargeRow && "row_poster--Large"}`}
        key={movie.id}
        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
        alt={movie.name} />
      })}
    </div>
  );
}