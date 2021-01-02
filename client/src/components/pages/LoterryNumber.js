import React ,{useEffect, useState} from 'react';

const Number = (props) => {

    const [number, setNumber] = useState([]);

    setNumber(props.data);
    return (
        <div>
            {console.log(number)}

            {number.map((prize, index) => (
                <div key={index}>
                    <h3>{prize.name} รางวัลละ {prize.reward}</h3>
                    {console.log(prize)}
                 
                        {prize.number.map((number, id) => (
                            {number}
                        ))}
                  
                    <hr></hr>
                    <br></br>
                </div>
            ))}
        </div>
    )
    
}

export default Number;