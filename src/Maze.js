import React, { useEffect, useState, useRef } from 'react'
import { css } from '@emotion/css'

import Personaje from './Personaje.js'

import floor from '../assets/floor2.png'
import wall1 from '../assets/wall1.png'
import wall2 from '../assets/wall2.png'
import idle from '../assets/idle.gif'
import left from '../assets/izquierda.gif'
import right from '../assets/derecha.gif'
import win from '../assets/win.gif'

const Maze = ({ maze }) => {
    if(maze.length !== 0){
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


        //Conocer movimiento
        const [normal, setNormal] = useState(false)
        //Conocer si se está moviendo
        const direction = useRef(false)

        const finish = useRef(false)

        //Saber en que posición de la parte gráfica (px)
        const x = useRef(0)
        const y = useRef(0)


        const image = useRef(idle)

        //Sirve para mantener record de la posicion del personaje en la matriz
        const k = useRef(1)
        const l = useRef(1)

        const change = (e) => {
            if(!direction.current){

                //39 DERECHA 68 D
                if(e.key === 'd'  || e.key === 'ArrowRight'){
                    if(l.current+1<maze[0].length){
                        if(maze[k.current][l.current+1] === 'g'){
                            direction.current=true
                            x.current += 50
                            image.current = win
                            l.current++
                            
                            setNormal(true)
                            finish.current=true
                        }
                        else if(maze[k.current][l.current+1] === ' ' || maze[k.current][l.current+1] === 'p'){
                            direction.current=true
                            x.current += 50
                            image.current = right
                            l.current++
                            
                            setNormal(true)
                        }
                    }
                }
                //37 IZQUIERDA 65 A
                if(e.key === 'a'  || e.key === 'ArrowLeft'){
                    if(l.current-1>=0){
                        if(maze[k.current][l.current-1] === 'g'){
                            direction.current=true
                            x.current -= 50
                            image.current = win
                            l.current--
                            
                            setNormal(true)
                            finish.current=true
                        }
                        else if(maze[k.current][l.current-1] === ' ' || maze[k.current][l.current-1] === 'p'){
                            direction.current=true
                            x.current -= 50
                            image.current = left
                            l.current--
                            
                            setNormal(true)
                        }
                    }
                }

                if(e.key === 's'  || e.key === 'ArrowDown'){
                    if(k.current+1<maze.length){
                        if(maze[k.current+1][l.current] === 'g'){
                            direction.current=true
                            y.current += 50
                            image.current = win
                            k.current++
                            
                            setNormal(true)
                            finish.current=true
                        }
                        else if(maze[k.current+1][l.current] === ' ' || maze[k.current+1][l.current] === 'p'){
                            
                            direction.current=true
                            y.current += 50
                            image.current = idle
                            k.current++
                                
                            setNormal(true)
                        }
                    }
                }

                if(e.key === 'w'  || e.key === 'ArrowUp'){
                    if(k.current-1>=0){
                        if(maze[k.current-1][l.current] === 'g'){
                            direction.current=true
                            y.current -= 50
                            image.current = win
                            k.current--
                            
                            setNormal(true)
                            finish.current=true
                        }
                        else if(maze[k.current-1][l.current] === ' ' || maze[k.current-1][l.current] === 'p'){
                            direction.current=true
                            y.current -= 50
                            image.current = idle
                            k.current--
                            
                            setNormal(true)
                        }
                    }
                }
            }
        }

        useEffect(() => {
            window.removeEventListener('keydown', change)
            window.addEventListener('keydown', change)
        }, [maze])

        const end = () => {
            if(!finish.current){
                direction.current=false
                setNormal(false)
            }
        }

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
                                                    <Personaje x={x.current} y={y.current} image={image.current} end={end} direction={direction.current} />
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
    return (<div></div>)
}

export default Maze