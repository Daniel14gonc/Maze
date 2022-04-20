import React, { useEffect, useState, useRef } from 'react'
import { css } from '@emotion/css'

import idle from '../assets/idle.gif'
import left from '../assets/izquierda.gif'
import right from '../assets/derecha.gif'
import floor from '../assets/floor2.png'
import wall1 from '../assets/wall1.png'
import wall2 from '../assets/wall2.png'
import fondo from '../assets/fondo.png'
import Titulo from '../assets/Titulo.png'
import song from '../assets/duel-of-the-fates.mp3'


const Personaje = ({ maze }) => {
    
    //Conocer movimiento
    const [normal, setNormal] = useState(false)

    //Conocer si se está moviendo
    const direction = useRef(false)

    //Saber en que posición de la parte gráfica (px)
    const x = useRef(0)
    const y = useRef(0)


    const image = useRef(idle)

    //Sirve para mantener record de la posicion del personaje en la matriz
    const k = useRef(1)
    const l = useRef(1)

    const Idle = css`
        width: 50px;
        height: 50px;
        background-image: url(${idle});
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: ${x.current}px;
        margin-top: ${y.current}px;
        position:absolute;
    `

    const motion = css`
        background-image: url(${image.current});
        transform: translate(${x.current}px, ${y.current}px);
        width: 50px;
        background-size: contain;
        background-repeat: no-repeat;
        transition-duration: 0.8s;
        height: 50px;
        position:absolute;
    `
    useEffect(() => {
        window.addEventListener('keydown', e => {
            if(!direction.current){

                //39 DERECHA 68 D
                if(e.key === 'd'  || e.key === 'ArrowRight'){
                    if(l.current+1<maze[0].length){
                        if(maze[k.current][l.current+1] === ' ' || maze[k.current][l.current+1] === 'p'){
                            direction.current=true
                            x.current += 50
                            image.current = right
                            l.current++
                        }
                    }
                }
                //37 IZQUIERDA 65 A
                if(e.key === 'a'  || e.key === 'ArrowLeft'){
                    if(l.current-1>=0){
                        if(maze[k.current][l.current-1] === ' ' || maze[k.current][l.current-1] === 'p'){
                            direction.current=true
                            x.current -= 50
                            image.current = left
                            l.current--
                        }
                    }
                }
    
                if(e.key === 's'  || e.key === 'ArrowDown'){
                    if(k.current+1<maze.length){
                        if(maze[k.current+1][l.current] === ' ' || maze[k.current+1][l.current] === 'p'){
                            direction.current=true
                            y.current += 50
                            image.current = idle
                            k.current++
                        }
                    }
                }
    
                if(e.key === 'w'  || e.key === 'ArrowUp'){
                    if(k.current-1>=0){
                        if(maze[k.current-1][l.current] === ' ' || maze[k.current-1][l.current] === 'p'){
                            direction.current=true
                            y.current -= 50
                            image.current = idle
                            k.current--
                        }
                    }
                }
                setNormal(true)
            }
        })
    }, [])


    const end = () => {
        direction.current=false
        setNormal(false)
    }

    const movement = direction.current ? motion : Idle
    return (
        <div className={movement} onTransitionEnd={end} ></div>
    )
}

const Maze = ({ maze }) => {
    const Container = css`
        display: flex;
        flex-direction: row;
    `

    const Floor = css`
        width: 50px;
        height: 50px;
        background-image: url(${floor});
        background-size: 100% 100%;
        padding: 0px;
        margin: 0px;
        background-repeat: no-repeat;
    `

    const Wall1 = css`
        width: 50px;
        height: 50px;
        background-image: url(${wall1});
        background-size: 100% 100%;
        padding: 0px;
        margin: 0px;
        background-repeat: no-repeat;
    `
    const Wall2 = css`
        width: 50px;
        height: 50px;
        background-image: url(${wall2});
        background-size: 100% 100%;
        padding: 0px;
        margin: 0px;
        background-repeat: no-repeat;
    `

    return (
        <React.Fragment>
            {maze.map((elements, i) => {
                return (
                    <div key={i} className={Container}>
                        {elements.map((algo, j) => {
                            if ((algo === ' ' || algo === 'p' || algo === 'g')){
                                if(algo === 'p'){

                                    return(
                                        <React.Fragment>
                                            <div key={j} className={Floor}>
                                                <Personaje maze={maze}/>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                                return <div key={j} className={Floor}></div>
                            }
                            if (algo === '-' || algo === '|' ){
                                return <div key={j} className={Wall2}></div>
                            }
                            if (algo === '+'){
                                return <div key={j} className={Wall1}></div>
                            }
                            
                        })}
                    </div>
                )
                
            }
            )}
        </React.Fragment>
    )
}

const PantallaInicial = ({ change }) => {
    //Cambiar a estado!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const x = useRef(4)
    const y = useRef(4)

    const Container = css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        width: 100vw;
        height: 100vh;
        background-image: url(${fondo});
        background-size: 100% 100%;
        background-repeat: no-repeat;
    `

    const Title = css`
        width: 500px;
        height: 50px;
        background-image: url(${Titulo});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-bottom: 40px;
    `

    const Button = css`
        width: 100px;
        height: 25px;
        margin-top: 20px;
        border-radius: 10px;
        background-color: white;
    `

    return(
        <div className={Container}>
            <div className={Title}></div>
            <h2 className={css`color:white`}>Ingresa las dimensiones del tablero</h2>
            <div className={css`display:flex;justify-content:space-between;width:350px`}>
                <input type='text' placeholder='Ancho' onChange={(e) => x.current=e.target.value}/>
                <input type='text' placeholder='Alto' onChange={(e) => y.current=e.target.value}/>
            </div>
            <button className={Button} onClick={()=>change(x.current, y.current)}>Jugar</button>
        </div>
    )
}


const App = () => {

    const [maze, setMaze] = useState([])
    const [isMaze, setIsMaze] = useState(false)
    
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
    
    const dimensions = useRef([4,4])

    const changeDimensions = (x, y) => {
        dimensions.current = [parseInt(x), parseInt(y)]
        setIsMaze(true)
    }

    const fetchLaberinto = async() =>{
        console.log(dimensions.current)
        const response = await fetch("https://maze.juanelcaballo.club/?type=json&w="+ dimensions.current[0] +"&h="+ dimensions.current[1])
        const responseJSON = await response.json()
        setMaze(responseJSON)
    }

    useEffect(()=>{
        fetchLaberinto()
    },[isMaze])

    const audio = useRef(new Audio(song))

    if(!isMaze){
        audio.current.pause()
        return (
            <PantallaInicial change={changeDimensions}/>
        )
    } else{
        audio.current.load()
        audio.current.volume = 0.1
        audio.current.loop = true
        audio.current.play()
    }

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
            <button className={reinicio} onClick={()=>setIsMaze(false)}>Reiniciar</button>
            <div className= {
                        css`display: inline-block; 
                            width: 100vw;
                            height: 100vh;
                            overflowX: scroll;`}>
                <div className = {Container1}>
                    <Maze maze={maze}/>
                </div>
            </div>
        </div>
        
    )
    
}

export default App
