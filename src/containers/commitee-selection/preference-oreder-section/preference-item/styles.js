import { BorderLeft, Height } from "@mui/icons-material"
import { max } from "date-fns"

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid #ccc",
        outline: "1px solid #ccc",
        height: "120px",
        width: "100%",
        paddingLeft: "10px",
    },
    imgblock: {
        // display: "inline-block"
    },

    nameBlock: {
        flex: 1,
        padding: "20px",
        maxWidth: "350px",
    },

    buttonBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        selfAlign: "end",
        borderLeft: "1px solid #ccc",
        height: "100%",
        width: "60px",
        backgroundColor: "red",
    },

    button: {
        width: "100%",
        flex: 1,
        border: "none",
        outline: "none",
        backgroundColor: "white",
        cursor: "pointer",
        fontSize: "20px",
        color: "#666",

    },

    buttonHover: {
        width: "100%",
        flex: 1,
        border: "none",
        outline: "none",
        backgroundColor: "#ccc",
        cursor: "pointer",
        fontSize: "20px",
        color: "#666",
        
    },

    buttonR: {
        backgroundColor: "white",
        borderColor: "white",
        marginLeft: "10px",
        marginTop: "20px"
    },
    buttonL: {
        backgroundColor: "white",
        borderColor: "white",
        marginRight: "10px",
        marginLeft: "10%",
        marginTop: "20px"
    },
    logo: {
        verticalAlign: "middle",
        // display: "inline",
        float: "left",
        padding: "10px",
    },
    cont: {
        verticalAlign: "middle",
        display: "inline",
        padding: "10px"
    },
    movebutton: {
        width: "25px",
    }
}

export default styles