
import {Link, useParams} from "react-router-dom"
import React from 'react';
import Input from './Input'
import Footer from './Footer'
import axios from 'axios'


/*Select seats in a movie session */

const Session = () => {

    const[session,setSession] = React.useState(null)
    const[name,setName] = React.useState('')
    const[cpf,setCpf] = React.useState('')
    const[selectedSeats,setSeats] = React.useState([])
    const {sessionId} = useParams();

    React.useEffect(()=>{
        fetch(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${sessionId}/seats`)
        .then((r)=>r.json())
        .then((json)=>(
            {...json,seats:json.seats.map(seat=>({...seat,isSelected:false}))}
        ))
        .then((json)=>setSession(json))
    }, [sessionId])

    function reserveSeats(){
        
        let seatsRequest = {
            ids: selectedSeats,
            name,
            cpf
        };
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/seats/book-many', seatsRequest)
 
    }
    function updateSeat (seat) {
        if(!seat.isAvailable){
            return alert("Assento não disponível")
        }
        
        let id=seat.id;
        let data = {...session}
        const seats = session.seats.map((seat)=> {
            if (seat.id === id && seat.isAvailable){
                seat.isSelected = !seat.isSelected;
            }
            return seat;
        });
        let seatsData = [...selectedSeats];
        if(!seatsData.includes(id)){
            seatsData.push(id);               
        }else{
            seatsData.splice(seatsData.indexOf(id), 1);  
        }
        setSeats(seatsData)
        data.seats=seats;
        setSession(data);
    }

    if(session===null) return null;
    return  (
        <>
        {console.log('Renderizou')}
        
        <div className="seat-list">
            {session.seats.map((seat)=>(
                
                <div key={seat.id} className={`seat${seat.isAvailable ? ' available' : ' unavailable'} ${seat.isSelected===true ? ' selected' : ''}`}
                onClick={()=> {updateSeat(seat)}}>{seat.name}</div>
            ))}
            <div className="break"></div>

            
        </div>  
        <div className='flex-center'>
                <div className='seat-category-block flex-center'>
                    <div className='seat selected flex-center'></div>
                    <p>Selecionado</p>
                </div>
                <div className='seat-category-block flex-center'>
                    <div className='seat available flex-center'></div>
                    <p>Disponível</p>
                </div>
                <div className='seat-category-block flex-center'>
                    <div className='seat unavailable flex-center'></div>
                    <p>Indisponível</p>
                </div>
        </div>

        {selectedSeats.length >0 && (
            <>
            <Input
                label="Nome do comprador:"
                placeholder="Digite o nome do comprador"
                data={[name, setName]}
            />
            <Input
                label="CPF do comprador:"
                placeholder="Digite o CPF do comprador"
                data={[cpf, setCpf]}
            />
            {console.log(sessionId)}
            <Link to={{
                pathname: '/success',
                state: {
                    movie: session.movie.title,
                    seats: selectedSeats,
                    day:session.day,
                    name:name,
                    cpf:cpf
                }
                }}>
            
                <div class="checkout-button"><a href="#" onClick={()=> {reserveSeats()}} >Reservar assento(s)</a></div>
            </Link>
            </>
        )}
        <Footer props={session.movie}/>
    </>)
}

export default Session;

