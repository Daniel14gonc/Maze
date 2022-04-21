import React, { useEffect, useState, useRef } from 'react'
import { css } from '@emotion/css'

import Maze from './Maze.js'
import PantallaInicial from './Pantalla.js'
import Final from './Final.js'

import fondo from '../assets/fondo.png'
import song from '../assets/duel-of-the-fates.mp3'






const App = () => {

    const [maze, setMaze] = useState([])
    const [isMaze, setIsMaze] = useState(false)
    const [final, setFinal] = useState(false)
    
    const Container1 = css`
        display: inline-block;
        overflow: scroll;
    `  
    const reinicio = css`
        width: 90px;
        height: 50px;
        border-radius: 10px;
        margin:20px;
        background-color: white;
    ` 
    
    const dimensions = useRef(null)

    const changeDimensions = (x, y) => {
        dimensions.current = [parseInt(x), parseInt(y)]
        setIsMaze(true)
    }

    const fetchLaberinto = async() =>{
        if(dimensions.current){
            const response = await fetch("https://maze.juanelcaballo.club/?type=json&w="+ dimensions.current[0] +"&h="+ dimensions.current[1])
            const responseJSON = await response.json()
            setMaze(responseJSON)
        }
    }

    useEffect(()=>{
        fetchLaberinto()
    },[isMaze])

    const audio = useRef(new Audio(song))

    if(final){
        audio.current.pause()
        return (
            <Final />
        )
    }

    if(!isMaze){
        audio.current.pause()
        return (
            <PantallaInicial change={changeDimensions}/>
        )
    } 

    audio.current.load()
    audio.current.volume = 0.1
    audio.current.loop = true
    audio.current.play()

    return(
        <div className= {
            css`display: flex; 
                flex-direction:column;
                width: 100vw;
                height: 100vh;
                background-image: url(${fondo});
                background-size: 100% 100%;
                background-repeat: no-repeat;
                padding-bottom: 30px`}>
            <button className={reinicio} onClick={()=>window.location.reload()}>Reiniciar</button>
            <div className= {
                        css`display: inline-block; 
                            width: 100vw;
                            height: 100vh;
                            overflowX: scroll;`}>
                <div className = {Container1}>
                    <Maze maze={maze} final={setFinal}/>
                </div>
            </div>
        </div>
        
    )
    
}

export default App
