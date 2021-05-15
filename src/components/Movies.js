import React from 'react';
import {Link} from "react-router-dom"


const Movies = () => {
    const[movies,setMovies] = React.useState(null)

    React.useEffect(()=>{
        fetch('https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies')
        .then((r)=>r.json())
        .then((json)=>setMovies(json))
    }, [])

    console.log(movies)

    if(movies===null) return null;
    return  (
        <div className="movies">
            {movies.map((movie)=>(
                <Link key={movie.id}  to={`/movie/${movie.id}`}>
                    <div className="movie" key={movie.id}>
                        <img src={movie.posterURL} alt={movie.title}/>
                    </div>
                </Link>

            ))}
        </div>)
}

export default Movies;