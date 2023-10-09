const TabCard = (props) => {
    const {
        name,
        description,
        onClick,
        logoText
    } = props;

    return (
        <div className="card" onClick={onClick}>
            <div className='card-logo'>
                {logoText}
            </div>

            <div className="card-text-block">
                <h2 className="card-text">{name}</h2>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}

export default TabCard;
