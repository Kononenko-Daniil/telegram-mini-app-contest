import { useEffect, useState } from "react";
import { LessonType } from "../misc/Enums";

const LessonTypeTag = (props) => {
    const { lessonType, style } = props;

    const [variant, setVariant] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        var _variant, _text;
        switch (lessonType) {
            case LessonType.NONE:
                _variant = ""; _text = "NONE"; break;
            case LessonType.LECTURE:
                _variant = "danger"; _text = "LECTURE"; break;
            case LessonType.PRACTISE:
                _variant = "success"; _text = "PRACTICE"; break;
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

export default LessonTypeTag;
