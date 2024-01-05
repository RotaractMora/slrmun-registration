import React from "react";
import PreferenceItem from "./preference-item/PreferenceItem";


const PreferenceOrderSection = ({preferenceList, move}) => {
    return (
        <div>
            {preferenceList.map((comm, index) => {
                return <PreferenceItem key={index} comm={comm} index={index} move={move} />
            })}
        </div>
    )
}

export default PreferenceOrderSection;