import './Mainpage.css';

import React from 'react';
import Header from '../../Components/Header/Header'
import Calendar from '../../Components/Calendar/Calendar'
import Menubar from '../../Components/Menubar/Menubar'
import Categorybox from '../../Components/Categorybox/Categorybox'

function Mainpage() {
    return(
        <div className='Container'>
            <div className = 'headerContainer'>
                <Header />
            </div>
            <div className = 'mainContainer'>
                <div className='menubarContainer'>
                    <Menubar />
                </div>
                <div className='calendarContainer'>
                    <Calendar/>
                </div>
                {/* <div className='CategoryboxContainer'>
                    <Categorybox />
                </div> */}
            </div>

        </div>
    )
}

export default Mainpage;