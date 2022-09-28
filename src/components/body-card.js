const BodyCard = ({name, image, id, selectedBodyId, onSelectAvatarsBody}) => {
    return (
        <div className="body-card"  key={id} onClick={() => onSelectAvatarsBody(id)}>
            <div className="body-name text-center">
                <span>{name}</span>
                {selectedBodyId === id && <i className="fa-solid fa-circle-check fa-2x text-success selected-tick"></i>}
            </div>
            <div className="body-image">
                <img src={image} alt="Your or friend's selfie"/>
            </div>
        </div>
    )
}

export default BodyCard;