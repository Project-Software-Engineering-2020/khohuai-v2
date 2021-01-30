import React,{ useEffect } from 'react'

export default function funtional() {

    const [post, setpost] = useState()

    useEffect(() => {
        
        const getDataFrom_Backend = () => {
            const data = fetch("url......");
            data.then(respones => respones.json())
                .then(result => setpost(result))


            data.json();



            function then (data) {

                const respones = data;
                respones.json()

                return respones;
            }
        } 

        return () => {
            cleanup
        }
    }, [post])


    return (
        <div>
            
        </div>
    )
}
