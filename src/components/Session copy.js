
import {Link, useParams} from "react-router-dom"
import React from 'react';


/*Select seats in a movie session */

const Session = () => {

    const[session,setSession] = React.useState(null)
    const {sessionId} = useParams();

    React.useEffect(()=>{
        fetch(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${sessionId}/seats`)
        .then((r)=>r.json())
        .then((json)=>(
            {...json,seats:json.seats.map(seat=>({...seat,isSelected:false}))}
        ))
        .then((json)=>setSession(json))
    }, [sessionId])

    function updateSeat (id) {
        let data = {...session}
        const seats = session.seats.map((seat)=> {
            if (seat.id === id && seat.isAvailable){
                seat.isSelected = !seat.isSelected;
            }
            return seat;
        });
        data.seats=seats;
        setSession(data);
    }

    if(session===null) return null;
    return  (
        <>
        {console.log('Renderizou')}
        <div className="seat-list">
            {session.seats.map((seat)=>(
                
                <div key={seat.id} className={`seat ${seat.isAvailable ? 'available' : 'unavailable'} ${seat.isSelected===true ? 'selected' : 'oi'}`}
                onClick={()=> {updateSeat(seat.id)}}>{seat.name}</div>
            ))}

            <div className="description">
                <div>
                    <div className="seat selected"></div>
                    <p>Selecionado</p>
                </div>
                <div>
                    <div className="seat available"></div>
                    <p>Disponível</p>
                </div>
                <div>
                    <div className="seat unavailable"></div>
                    <p>Indisponível</p>
                </div>
                
            </div>
        </div>   
    </>)
}

export default Session;

