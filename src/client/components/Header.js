import React from 'react'
import logo from '../images/man-bald-head-with-two-gears-inside.png'


const NavBar = () => {
    return (
        <header>
            <div className="header">
                <img src={logo} alt="logo"/>
                <h1>Evaluate News</h1>
            </div>
        </header>
    )
}

export default NavBar
