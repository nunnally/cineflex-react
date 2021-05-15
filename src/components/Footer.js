  
import React from 'react';
const Footer = ({props}) => {
    const { posterURL, title } = props;
    console.log(props)
    return (
        
        <div className="footer">
            {console.log('called footer')}
            <div className="movie">
                <img src={posterURL} alt='asasa' />
            </div>

            <div className="description">
                <p>{title}</p>
                
            </div>
        </div>

    );
}

export default Footer;