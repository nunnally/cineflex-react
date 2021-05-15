import {Link, useParams} from "react-router-dom"
import React from 'react';
import Footer from './Footer'

const Movies = () => {
    const[movie,setMovie] = React.useState(null)

    const {movieId} = useParams();

    React.useEffect(()=>{
        fetch(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${movieId}/showtimes`)
        .then((r)=>r.json())
        .then((json)=>setMovie(json))
    }, [movieId])

    console.log(movie)

    if(movie===null) return null;
    return  (
        <>
        <div className="movie-page">
            <p class="page-title">Selecione o horário</p>            
            <div className="schedule">
                {movie.days.map((day)=>(
                    <div key={day.id} className="movie-day">
                        <div className="title">{day.weekday}</div>
                        <div>
                            {day.showtimes.map((session)=>(
                                <Link to={`/session/${session.id}`}>
                                    <a href="#" key ={session.id}>{session.name}</a>
                                </Link>
                                
                            ))}
                        </div>
                    </div>
                ))}

            </div>


        </div>
        <Footer props={movie}/>
        
        </>
        )
}

export default Movies;