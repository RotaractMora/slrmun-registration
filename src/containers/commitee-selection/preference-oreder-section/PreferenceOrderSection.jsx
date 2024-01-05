import React from "react";
import PreferenceItem from "./preference-item/PreferenceItem";


const PreferenceOrderSection = ({preferenceList, move, commList}) => {
    if (!preferenceList || preferenceList.length === 0) {
        preferenceList = commList.map((comm, index) => index);
    }
    return (
        <div>
            {preferenceList.map((comm, index) => {
                return <PreferenceItem key={index} comm={comm} index={index} move={move} commList={commList} />
            })}
        </div>
    )
}

export default PreferenceOrderSection;