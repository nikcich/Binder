import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';

function TinderCards({imageList, setImageList, getList, getImages, swiped}){

    return(
        <div className>

            <div className="tinderCards__cardContainer">
                {imageList.map((person) => (
                    // <TinderCard ref={image} className='swipe' key={image.img} onSwipe={(dir) => swiped(dir, image.img)} onCardLeftScreen={() => outOfFrame(image.img)}>
                    <TinderCard
                        className= "swipe"
                        key={person.img}
                        preventSwipe={["up", "down"]}
                        onSwipe={(dir) => swiped(dir, person)}
                    >
                        <div 
                            style={{ backgroundImage: `url(${person.img})` }}
                            className = "card"
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            
        </div>
    )
}

export default TinderCards