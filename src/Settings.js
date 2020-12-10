import React from 'react';
import Header from './Header';

const Settings = ({handleLogout, fileChange, handleUpload}) => {
    
    return(
        <>
        <Header handleLogout={handleLogout}/>
        <section className ="hero">
            <div className="upload">
                <input type="file" onChange={fileChange} />
                <button onClick={handleUpload}>UPLOAD</button>
            </div>
        </section>
        
        </>
    )
}

export default Settings;