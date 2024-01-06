import React from "react";
import styles from "./styles";
import moveup from "../../../../assets/images/move_up.png";
import movedown from "../../../../assets/images/move_down.png";

const PreferenceItem = ({comm, index, move, commList}) => {
    return (       
        <div>
            {/* <p>{comm}</p>    {commList[comm].imageUrl}   */}
            <div style={styles.imgblock}>
                <img src={commList[comm].imageUrl} alt={commList[comm].short_name} style={styles.logo}/>
                <br/>
                <div style={styles.cont}>{commList[comm].name}({commList[comm].short_name})</div>
            </div>
            {/* <p>{commList[comm].imageUrl}</p> */}
            <button onClick={() => move(index, +1)} style={styles.buttonL}><img src={moveup} style={styles.movebutton} alt="moveup"/></button>
            <button onClick={() => move(index, -1)} style={styles.buttonR}><img src={movedown} style={styles.movebutton} alt="movedown"/></button>
        </div>
    )
}

export default PreferenceItem;