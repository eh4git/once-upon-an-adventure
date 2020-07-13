import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useParams } from "react-router-dom";
// import walkSprite from '../../assets/sprites/gladiator-4row.png'
// import x from "../../assets/sprites/option2-4row.png"
import { handleKeyDown, observeImpassable } from "./movement"

import "../../components/TextBox/TextBox.css";
import API from "../../utils/API";
import Exposition from "../../components/Exposition";
import WizardExposition from "../../components/Exposition/wizardExposition";
import "./gamePlay.css"
import CanvasSnake from '../../components/CanvasSnake';


// console.log(x)
console.log("this is gamestate")
// console.log(gameState)


const handleMovement = player => {
    return player
}

let firstTalkOrcFalse = ""; 
let userName = "You";
let firstGuardTalk = "true";
let firstOrcTalk = "true";
let hasPermit = "false";


function Player(props) {
    // console.log(props.avatar)
    const { id } = useParams();

    const [gameState, setGameState] = useState({
        firstJaceTalk: true,
        firstCastle: false,
        guardButtons: "hide",
        jaceButtons: "hide",
        snakeMinigame: "hide",
        storyString: "",
    });
    
    useEffect(() => {
        window.addEventListener("keydown", e =>{handleKeyDown(e, guardTalking, orcTalking, jaceTalking) } )
    },[])

    useEffect(() => {
        API.getUserSprite(id).then(user => {
            console.log(user.data[0].sprite[0].sprite)
            const { name, place, apiFirstGuardTalk, apiFirstOrcTalk, permit } = user.data[0].sprite[0]
            userName = name
            firstGuardTalk = apiFirstGuardTalk
            firstOrcTalk = apiFirstOrcTalk
            hasPermit = permit
            console.log("FIRSTS")
            console.log(apiFirstGuardTalk)
            console.log(apiFirstOrcTalk)

            if ( place === "castle") {
                setGameState({...gameState, storyString: userName + " follows the path to the castle. Up close it is even more marvelous. " + userName + " notices a guard in front of the castle, glittering in the sunlight in their armor. " + userName + " also thinks they hear a person very faintly saying '...find me...I'll give you hearts...' "})
            }

            if ( place === "forest") {
                console.log("forest")
            }

            if ( place === "cliff") {
                setGameState({...gameState, storyString: userName + " emerges from the path and looks around. There is a cliff that looks out over mountains. At the edge of the cliff is a magical looking person. " + userName + " wonders if they should go up and talk to them... " })
            }
        })
    }, []);

   
 

    function guardTalking() {
        switch(firstGuardTalk) {
            case false:
                if (hasPermit === true) {
                    console.log(gameState.permit)
                    let currentStory = gameState.storyString
                    setGameState({...gameState, storyString: currentStory + userName + " decides to speak to Guard Tony. Guard Tony smiles and says 'It looks like you have a permit!', and goes inside the castle so that" + userName + " can choose to enter the castle. "})
                }
                if (hasPermit === false) {
                    console.log(gameState.permit)
                    setGameState({...gameState, storyString: userName + " decides to speak to Guard Tony. Guard Tony frowns and shakes his head. 'Still no permit?', he says. 'I would try the shopkeeper. He usually has some. His store is in the forest.' "})
                }
                return;
            case true:
                let currentStory = gameState.storyString + " " + userName + " decides to talk to the guard. 'Hello.' says Guard Tony. 'Do you have a permit to enter Castle Richfield?' "
                setGameState({...gameState, guardButtons: "show", storyString: currentStory})
                return;
            default:
                break;

        }
        
    }

    function orcTalking () {
        console.log(gameState.firstTalkOrc)
        if (firstOrcTalk === false) {
            
            updateStory(userName + " decides to speak to Orc Vinne. 'ALREADY GAVE HEARTS' he says.")
            return;
        }
        if (firstOrcTalk === true) {
            updateStory(userName + " decides to speak to Orc Vinnie. 'HI' says Orc Vinnie. 'IMMA GIVE YOU A HEART' ")
            API.UpdateSpriteFirstOrcTalk(false, id).then(()=> {
                console.log("updated OrcTalk")            
            })
        }
        
    }

    function jaceTalking ()  {
        console.log("what?")
        if (gameState.firstJaceTalk === false) {
            let currentStory = gameState.storyString
            console.log("hi")
            // updateStory("'Hi " + userName + " did you want to play my math game?' ")
            // setGameState({...gameState, storyString: currentStory + "'Hi " + userName + " did you want to play my math game?' ", jaceButtons: "show"})
            setGameState({...gameState, storyString: "hi", jaceButtons: "show"})
            return;
        }
        if (gameState.firstJaceTalk === true) {
            // updateStory("Wizard Jace says 'Hello " + userName + "a little birdy told me you were trying to help our kingdom! I can give you money if you play my magical math game!' ")
            // setGameState({...gameState, jaceButtons: "show", firstTalkJace: false})
            let currentStory = gameState.storyString + "Wizard Jace says 'Hello " + userName + " a little birdy told me you were trying to help our kingdom! I can give you money if you play my magical math game!' "
            setGameState({...gameState, storyString: currentStory, jaceButtons: "show", firstTalkJace: false})
            
        }
       
    }

    function updateStory (storyObjectPath) {
        // setGameState({...gameState, storyString: gameState.storyString + " " + storyObjectPath})
        let currentStory = gameState.storyString
        // console.log(gameState.storyString)
        setGameState({...gameState, storyString: currentStory + " " + storyObjectPath})

               
    }

    function handleBtnClick  (event) {
                // Get the data-value of the clicked button
                const btnType = event.target.attributes.getNamedItem("data-value").value;
                
            
                if (btnType === "guardYes") {
                    console.log("yes")
                    API.UpdateSpriteFirstGuardTalk(false, id).then(()=> {
                        console.log("updated GuardTalk")            
                    })
                    if (gameState.permit === true) {
                        let currentStory = gameState.storyString
                        setGameState({...gameState, guardButtons: "hide", storyString: currentStory + userName + " decides to speak to Guard Tony. Guard Tony smiles and says 'It looks like you have a permit!' and goes inside the castle so that " + userName + " can choose to enter the castle. "})
                    }
                    if (gameState.permit === false) {
                        let currentStory = gameState.storyString + " " + userName + " says 'Sure! Sure I have a permit!' and tries to smile as innocently as possible. 'LIES? LYING to ME?' Guard Tony says. He is clearly very upset. 'You clearly don't have a permit. Come back when you do!' "
                        setGameState({ ...gameState, guardButtons: "hide", storyString: currentStory})
                    }
                } 
                if (btnType === "guardNo") {
                    API.UpdateSpriteFirstGuardTalk(false, id).then(()=> {
                        console.log("updated GuardTalk")            
                    })
                    console.log("no")
                    gameState.guardButtons = "hide"
                    updateStory(userName + " frowns and says 'no'. Guard Tony smiled helpfully 'I would try the shopkeeper. He usually has some. His store is in the forest' ")
                }
                if (btnType === "jaceYes") {
                    console.log("yes")
                    gameState.jaceButtons = "hide"
                    updateStory(userName + " says 'Math? Money? You bet!' ")
                    setGameState({ snakeMinigame: "show", guardButtons: "hide"})
                }
                if (btnType === "jaceNo") {
                    console.log("no")
                    gameState.jaceButtons = "hide"
                    updateStory(userName + " says, 'Not now, thanks. Maybe later!")
                }
                
    };

    function handleDoneButtonClick() {
        setGameState({...gameState, snakeMinigame: "hide", guardButtons: "hide", jaceButtons: "hide"})

    }

    
   if (!props.avatar) {
       return <h1>Loading...</h1>
   }
    
    return(
        <>
        <div className="row"    
        style={{
            position: 'absolute',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: `url('${require("../../assets/sprites/" + props.avatar)}')`,
            backgroundPosition: props.spriteLocation,
            width: '64px',
            height: '64px'
        }}
        />
        <div className="textBG">
                <div>
                    {gameState.storyString}
                </div>
        </div>
        <div className="guardBtns">
        <Exposition 
        handleBtnClick={handleBtnClick}
        hideState={gameState.guardButtons} />
        </div>

        <div className="jaceBtns">
            <WizardExposition
            handleBtnClick={handleBtnClick}
            hideState={gameState.jaceButtons} 
            />
        </div>
        
        <div className={gameState.snakeMinigame} id="snake" >
            <CanvasSnake 
            handleDoneButtonClick={handleDoneButtonClick}
            />
        </div>
                         
        </>
    );
};

function mapStateToProps(state) {
    return {
        ...state.player,
    }
}

export default connect(mapStateToProps)(handleMovement(Player));
