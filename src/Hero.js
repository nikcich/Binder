
import React, {useEffect, useState, useMemo} from 'react';
import fire from"./fire";

import TinderCard from 'react-tinder-card';
import './Tinder.css';
import TinderCards from './TinderCards';
import SwipeButtons from './SwipeButtons';
import Header from './Header';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Leaderboard from'./Leaderboard';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));




const Hero = ({ handleLogout, user, list, setList, handleUpload, fileChange, setPages, pages }) => {
    
    const [imageList, setImageList] = useState([]);

    function getList(){
        const ref = fire.firestore().collection("usersList");
        ref.onSnapshot( (querySnapshot) => {
            const items= [];
            querySnapshot.forEach( (doc) => {
                items.push(doc.data());
            });
            setList(items);
        });
    }
    
    function getImages(){
        const imageRef = fire.firestore().collection("images");
        imageRef.onSnapshot( (querySnapshot) => {
            const items= [];
            querySnapshot.forEach( (doc) => {
                items.push(doc.data());
            });
            setImageList(items);
        });
    }

    useEffect(()=>{
        //getList();
        getImages();
    }, []);


    //const [characters, setCharacters] = useState(imageList)
    //const [lastDirection, setLastDirection] = useState()


    const swiped = (direction, person) => {

        const imgRef = fire.firestore().collection("images");

        if(direction == "right") person.right = person.right+1;
        else person.left = person.left+1;

        imgRef.doc(person.user).set({img: person.img, right: person.right, left: person.left, user: person.user});

        console.log(person.user);
        console.log(direction);
        // setLastDirection(direction)
        // alreadyRemoved.push(nameToDelete)
    }

    const outOfFrame = (name) => {
        // console.log(name + ' left the screen!')
        // charactersState = charactersState.filter(character => character.name !== name)
        // setCharacters(charactersState)
    }



    // const swipe = (dir) => {
    //     const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    //     if (cardsLeft.length) {
    //       const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
    //       const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
    //       alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
    //       childRefs[index].current.swipe(dir) // Swipe the card!
    //     }
    //   }

    let theirImage;
    for(let i = 0; i < imageList.length; i++){
        if(user.uid == imageList[i].user){
            theirImage = imageList[i].img;
            break;
        }
    }


    return(
        <>
            
            {(pages=="Settings") ? (
                <>
                    <Header handleLogout={handleLogout} setPages={setPages} pages={pages}/>

                    <section>

                        <div className="upload">

                            <Button 
                                variant="outlined"
                                color="secondary"
                                component="label"
                            >
                                Select a File
                                <input type="file" onChange={fileChange} hidden/>
                            </Button>
                            <br></br>
                            <br></br>
                            <Button 
                                variant="outlined"
                                color="secondary"
                                component="label"
                            >   
                                UPLOAD
                                <button onClick={handleUpload} hidden>UPLOAD</button>
                            </Button>

                        </div>
                    </section>

                    <br></br>

                    <div 
                        style={{ backgroundImage: `url(${theirImage})` }}
                        className = "card"
                    >
                        <h2>Current Picture</h2>
                    </div>

                </>
            ):(
                (pages=="Leaderboard") ? (
                    <>
                        <Header handleLogout={handleLogout} setPages={setPages} pages={pages}/>
                        <Leaderboard imageList={imageList}/>
                    </>
                ):(
                    <>
                    <Header handleLogout={handleLogout} setPages={setPages} pages={pages}/>
                    <TinderCards imageList={imageList} setImageList={setImageList} getList={getList} getImages={getImages} swiped={swiped}/>
                    <SwipeButtons/>
                    </>
                )
                
            )}

            
        </>
    );
}

export default Hero;

//{imageList.map((image) =>
{/* <TinderCard ref={image} className='swipe' key={image.img} onSwipe={(dir) => swiped(dir, image.img)} onCardLeftScreen={() => outOfFrame(image.img)}>
<div style={{ backgroundImage: 'url(' + image.img + ')' }} className='card'>
    <h3>NAME</h3>
</div>
</TinderCard>
)} */}




{/* <section className ="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Log out</button>
                
            </nav>

            <div className="upload">
                <input type="file" onChange={fileChange} />
                <button onClick={handleUpload}>UPLOAD</button>
            </div>
</section> */}