import { useEffect, useState } from "react";
import { UserType } from "../misc/Enums";

const ParticipantTypeTag = (props) => {
    const { participantType, style } = props;

    const [variant, setVariant] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        var _variant, _text;
        switch (participantType) {
            case UserType.OWNER:
                _variant = ""; _text = "OWNER"; break;
            case UserType.EDITOR:
                _variant = "success"; _text = "EDITOR"; break;
            case UserType.VIEWER:
                _variant = "danger"; _text = "VIEWER"; break;
        }

        setVariant(_variant);
        setText(_text);
    }, [])
    

    return (
        <div className={`tag ${variant}`} style={style}>
            {text}
        </div>
    )
}

export default ParticipantTypeTag;
