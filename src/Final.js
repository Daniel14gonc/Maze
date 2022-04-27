import React from 'react'
import { css } from '@emotion/css'
import fondo from '../assets/fondo.png'
import main from '../assets/main.mp3'

const Final = () => {
  const audio = new Audio(main)
  audio.load()
  audio.volume = 0.1
  audio.loop = true
  audio.play()

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
      color: #479aca
  `

  return (
    <div className={Container}>
      <h1 className={Title}>!Ha ganado la resistencia!</h1>
    </div>
  )
}

export default Final
