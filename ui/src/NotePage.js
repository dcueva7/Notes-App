import React from 'react'
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react'

export const NotePage = (props ) => {

    
    const params = useParams();

    const [ note, setNote ] = useState([])

    useEffect(() =>{
        fetch(`/api/notes/${params.id}`)
            .then(response => response.json())
            .then(json => setNote(json))
        
        }, [params.id]
    )
    

    return (
        <div>
            <Header />
            <p>{note.body} </p>
        </div>
        
    )
}

export default NotePage;