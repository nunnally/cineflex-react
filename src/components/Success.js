import React from 'react';
import {Link} from "react-router-dom"


const Success = (props) => {
    const { name, cpf, seats,day,movie } = props.location.state;
    console.log(day)
    let formatedSeats = seats.join(', ');
    console.log(props.state)
    return  (
        <div class="success-data">
            <p>Pedido feito com sucesso!</p>
            <div>
                <h2>Filme e sessão</h2>
                <p>{movie}</p>
                <p>{day.weekday} - {day.date}</p>
            </div>
            <div>
                <h2>Ingressos</h2>
                <p>{formatedSeats}</p>
            </div>
            <div>
                <h2>Comprador</h2>
                <p>Nome:{name} </p>
                <p>CPF:{cpf} </p>
            </div>
        </div>
    )
}

export default Success;