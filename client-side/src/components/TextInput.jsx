const TextInput = (props) => {
    const {
        style,
        value,
        onChange,
        labelText,
        disabled
    } = props;

    return (
        <div style={style}>
            <span className={`text-input-label`}>{labelText}</span>
            <div>
                <input disabled={disabled} onChange={onChange} value={value} type="text" />
            </div>
        </div>
    );
}

export default TextInput;
