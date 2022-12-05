import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`element__del ${isOwn ? 'element__del_visible' : 'element__del_hidden'}`);
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'element__like element__like_active' : 'element__like'}`);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="element">
            <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }} />
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"/>
            <div className="element__footer">
                <h3 className="element__text">{props.card.name}</h3>
                <div className="element__column">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"/>
                    <p className="element__counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;