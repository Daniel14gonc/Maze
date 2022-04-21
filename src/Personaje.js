import React, { useEffect, useState, useRef } from 'react'
import { css } from '@emotion/css'

import idle from '../assets/idle.gif'
import left from '../assets/izquierda.gif'
import right from '../assets/derecha.gif'


const Personaje = ({ x, y, image, end, direction }) => {

    const Idle = css`
        width: 50px;
        height: 50px;
        background-image: url(${idle});
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: ${x}px;
        margin-top: ${y}px;
        position:absolute;
    `

    const motion = css`
        background-image: url(${image});
        transform: translate(${x}px, ${y}px);
        width: 50px;
        background-size: contain;
        background-repeat: no-repeat;
        transition-duration: 0.8s;
        height: 50px;
        position:absolute;
    `

    const movement = direction ? motion : Idle
    return (
        <div className={movement} onTransitionEnd={end} ></div>
    )
}

export default Personaje