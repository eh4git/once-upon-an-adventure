import React, { useState, useEffect } from 'react'
import Player from '../player';
import Map from '../map'
import API from "../../utils/API";
import { useParams } from "react-router-dom";

import { Forest } from '../../data/maps/1'
import store from '../../config/store'

function ForestWorld(props) {
    let tiles = Forest;
   
    const { id } = useParams();
    store.dispatch({
        type: 'ADD_TILES', payload: {
            tiles,
        }
    });
    const [userAvatar, setUserAvatar] = useState(null)
    useEffect(() => {
        API.UpdateSpritePlaceForest("forest", id).then(()=> {
            console.log("we're at the forest")          
        })
        API.getUserSprite(id).then(user => {
            console.log(user.data[0].sprite[0].sprite)
            const { sprite } = user.data[0].sprite[0]
            console.log(sprite)
            return setUserAvatar(sprite)
        })
    }, []);

    console.log(userAvatar);

    return (
        <div
            id="world-container"
            style={{
                position: 'relative',
                width: '968px',
                top: '35%',
                // marginTop: '50px',
                marginLeft: '3px',
                border: '4px solid black',
                borderRadius: '5px'
            }}
        >
            <Map />
            <Player avatar={props.avatar} avatarName={props.avatarName} />
        </div>
    )
}

export default ForestWorld;