import React , {useState, useEffect, useRef} from 'react'
import API_KEY from '../Api/API_KEY'
import axios from 'axios'



function NasaApi() {

    const fetchNasa = date => {

        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
            .then(res => {
                setNasaData(res.data)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
        .then(res => {
            setNasaData(res.data)
        })
        .catch(e => console.log(e))
    }, [])

    const [nasaData, setNasaData] = useState({})

    const textInputRef = useRef(null)

    const textInputFunction = e => {
        e.preventDefault()
        const enteredText = textInputRef.current.value
        fetchNasa(enteredText)
        return textInputRef.current.value = ''
    }

    const handleKeyDown = (e) => {
        e.preventDefault()
        if(e.keyCode === 13) { 
        const enteredText = textInputRef.current.value
        fetchNasa(enteredText)
        return textInputRef.current.value = ''
      }
    }

    return (
        <div>
            <h1>{nasaData.title}</h1>
            <h2>Date</h2>
            <h3>{nasaData.date}</h3>
            <form onSubmit={textInputFunction}>
            <label htmlFor='todo-text'>Search for date</label>
            <input type='text' placeholder='YYYY-MM-DD' ref={textInputRef}/>
            <button type='submit' onKeyDown={handleKeyDown} >Search</button>
            </form>
            <div>
                <img src={nasaData.hdurl} />
            </div>
            <div>
                {nasaData.explanation}
            </div> 
        </div>
    )
}

export default NasaApi

