import React from "react";
import { useState } from "react";

import styles from "./styles";

// import moveup from "../../../../assets/images/move_up.png";
// import movedown from "../../../../assets/images/move_down.png";

const PreferenceItem = ({comm, index, move, commList, reserved}) => {

    const [isHovered, setIsHovered] = useState([false, false]);

    return (       
        <div style={styles.flexRow}>
            <div style={styles.imgblock}>
                <img src={commList[comm].imageUrl} alt={commList[comm].short_name} style={styles.logo} width={"120px"} height={"120px"}/>
            </div>
            <div style={styles.nameBlock}>
                <p style={{fontSize: "1.3rem", fontWeight: 600, marginBottom: "0.2rem"}}>{commList[comm].short_name}</p>
                <p style={{marginTop: "0.2rem"}}>{commList[comm].name}</p>
            </div>
            {(!reserved) ? (
                <div style={styles.buttonBlock}> 
                    <button onClick={() => move(index, +1)} style={isHovered[0] ? styles.buttonHover : styles.button} onMouseEnter={() => setIsHovered([true, false])} onMouseLeave={() => setIsHovered([false, false])}>▲</button>
                    <button onClick={() => move(index, -1)} style={isHovered[1] ? styles.buttonHover : styles.button} onMouseEnter={() => setIsHovered([false, true])} onMouseLeave={() => setIsHovered([false, false])}>▼</button>
                </div>
            ): null}
            
        </div>
    )
}

export default PreferenceItem;