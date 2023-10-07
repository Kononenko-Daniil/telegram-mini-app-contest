const RadioButton = (props) => {
    const {
        label,
        variant,
        isChecked,
        onChange,
        index
    } = props;

    return (
        <div className="radio-button">
            <input onChange={() => onChange(index)} checked={isChecked} type="radio" />
            <div className={`tag ${variant}`}>{label}</div>
        </div>
    )
}

export default RadioButton;
