import React from "react";
import "./ComingSoon.css";

const styles = {
    over: {
        backgroundColor: "black",
        
    },
    text: {
        color: "red"
    }
}

function YouWin() {


    return(
        <div className="cs text-center" style={styles.over}>
            <p style={styles.text}>
                GAME OVER...
            </p>
        </div>
    )
}

export default YouWin;