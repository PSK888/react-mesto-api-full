import { useContext } from "react";

import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditAvatar,
    onAddPlace,
    onEditProfile,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__guest">
                    <div className="profile__editpen" >
                        <div
                            className="profile__avatar"
                            style={{ backgroundImage: `url(${currentUser.avatar})` }}
                            onClick={onEditAvatar} />
                    </div>
                    <div className="profile__info">
                        <div className="profile__personal">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                aria-label="Open editForm"
                                className="profile__edit-button"
                                type="button"
                                onClick={onEditProfile} />
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace} />
            </section>

            <section className="elements">
                {cards.map(card => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardDelete={onCardDelete}
                        onCardLike={onCardLike} />
                ))}
            </section>
        </main>
    )
}

export default Main;



