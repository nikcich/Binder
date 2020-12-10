import React from 'react';
import './Header.css';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import binderlogo from'./binderlogo.jpg';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

function Header({handleLogout, setPages, pages}){

    function changePage(){
        if(pages=="Settings"){
            setPages('');
        }else{
            setPages("Settings");
        }
    }

    function leaderboard(){
        if(pages == "Leaderboard"){
            setPages('');
        }else{
            setPages('Leaderboard');
        }
    }

    return(
        <div className="header">
     
            <IconButton className="header__icon" onClick={handleLogout}>
                <ExitToAppIcon fontSize="large"/>
            </IconButton>

            <IconButton className="header__icon" onClick={leaderboard}>
                <img className ="header__logo" src={binderlogo} alt="logo" />
            </IconButton>
            

            {pages=="Settings" ? (
                <>
                    <IconButton className="header__icon" onClick={changePage}>
                        <ArrowBackIosIcon  fontSize="large"/>
                    </IconButton>
                </>
            ):(
                <>
                    <IconButton className="header__icon" onClick={changePage}>
                        <SettingsApplicationsIcon  fontSize="large"/>
                    </IconButton>
                </>
            )}
            

        </div>
    )
}

export default Header