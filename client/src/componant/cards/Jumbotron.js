import React from 'react'
import Typewriter from 'typewriter-effect';

const Jumbotron = ({ text }) => {
    return (
        < Typewriter
            options={{
                strings: ['new arrivals', 'best sellers'],
                autoStart: true,
                loop: true
            }}

        />
    )
}

export default Jumbotron
