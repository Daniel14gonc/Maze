import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'

import fondo from '../assets/fondo.png'
import Titulo from '../assets/Titulo.png'

const PantallaInicial = ({ change }) => {
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

  return (
    <div className={Container}>
      <div className={Title} />
      <h2 className={css`color:white`}>Ingresa las dimensiones del tablero</h2>
      <div className={css`display:flex;justify-content:space-between;width:350px`}>
        <input type="text" placeholder="Ancho" onChange={(e) => { x.current = e.target.value }} />
        <input type="text" placeholder="Alto" onChange={(e) => { y.current = e.target.value }} />
      </div>
      <button type="button" className={Button} onClick={() => change(x.current, y.current)}>Jugar</button>
    </div>
  )
}

PantallaInicial.propTypes = {
  change: PropTypes.func.isRequired,
}

export default PantallaInicial
