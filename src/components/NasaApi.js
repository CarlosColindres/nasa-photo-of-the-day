import React , {useState, useEffect, useRef} from 'react'
import API_KEY from '../Api/API_KEY'
import styled from 'styled-components'
import axios from 'axios'

const DivContainer = styled.div`
    height:100%;
    background-color: #1d1f21;
    color: #e9edf2;
    h1 {
        font-size: 3rem;
        padding:1rem 0;
        margin:0;
    }
    h3 {
        margin:0;
        padding:1rem 0;
    }
    
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    form {
        input {
            padding:.5rem;
            border-radius:.5rem;
            margin: 0 .3rem;
        }
        button {
            border:none;
            padding:.5rem;
            border-radius:.5rem;
        }
        
    }
`

const TextContainer = styled.div`
    width: 50%;
    background:#e9edf2;
    color:#1d1f21;
    text-align:left;
    padding:1rem;
    border-radius:1rem;
`

const PictureContainer = styled.div`
    width:45%;
    margin:1rem 0;
    img {
        border-radius:2rem;
    }
    
`

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
        <DivContainer>
            <h1>{nasaData.title}</h1>
            <form onSubmit={textInputFunction}>
            <input type='text' placeholder='YYYY-MM-DD' ref={textInputRef}/>
            <button type='submit' onKeyDown={handleKeyDown} >Search for date</button>
            </form>
            <PictureContainer>
                <img src={nasaData.hdurl} />
            </PictureContainer>
            <TextContainer>
                <h3>Date: {nasaData.date}</h3>
                <p>{nasaData.explanation}</p>   
            </TextContainer> 
        </DivContainer>
    )
}

export default NasaApi

