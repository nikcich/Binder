import React from 'react';


const Leaderboard = ({imageList}) => {
    let top = [];


    for(let i=0; i < imageList.length; i++){
        let image = imageList[i];

            if(top.length < 10){
                top.push(image);
            }else{
                if(top.length > 0){
                    let curr = top.pop();
                    if(curr.right <= image.right){
                        top.push(image);
                        if(top.length <= 10){
                            top.push(curr);
                        }
                    }else{
                        top.push(curr);
                    }
                }
            }
            

    }

    return(
        <>
        {top.map( (person, index) => (
            <div
                key={index}
                style={{ backgroundImage: `url(${person.img})` }}
                className = "leader"
            >
                <h2>{index+1}</h2>
            </div>
        ))}
        </>
    )
}

export default Leaderboard;