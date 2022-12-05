import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="editForm"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="editNameInput"
                name="name"
                className="popup__input popup__name"
                type="text"
                minLength="2"
                maxLength="40"
                required
                placeholder='Имя'
                onChange={handleNameChange}
                value={name || ''}
                autoComplete="off"
            />
            <span className="editNameInput-error popup__input-error" />
            <input
                id="editJobInput"
                name="about"
                className="popup__input popup__job"
                type="text"
                minLength="2"
                maxLength="200"
                placeholder='Описание'
                required
                onChange={handleDescriptionChange}
                value={description || ''}
                autoComplete="off"
            />
            <span className="editJobInput-error popup__input-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;