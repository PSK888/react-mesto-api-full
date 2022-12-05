function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_card ${(!!card.name && !!card.link) ? "popup_opened" : ""}`}>
            <div className="popup__cardcontainer">
                <div className="popup__cardbox">
                    <button
                        className="popup__close"
                        onClick={onClose}
                        type="button"
                    />
                    <img className="popup__image" src={card.link} alt={card.name} />
                </div>
                <p className="popup__text">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;