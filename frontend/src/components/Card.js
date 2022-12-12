
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({ card, onCardDelete, onCardClick, onCardLike }) => {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`element__del ${isOwn ? 'element__del_visible' : 'element__del_hidden'}`);
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'element__like element__like_active' : 'element__like'}`);

    function handleClick() { onCardClick(card); }

    function handleLikeClick() { onCardLike(card); }

    function handleDeleteClick() { onCardDelete(card); }

    return (
        <div className="element">
            <div className="element__image" onClick={handleClick} alt={`${card.name}`} style={{ backgroundImage: `url(${card.link})` }} />
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" />
            <div className="element__footer">
                <h3 className="element__text">{card.name}</h3>
                <div className="element__column">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
                    <span className="element__counter">{card.likes.length}</span >
                </div>
            </div>
        </div>
    )
}

export default Card;