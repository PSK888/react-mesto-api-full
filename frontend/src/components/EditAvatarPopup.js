import PopupWithForm from "./PopupWithForm.js";
import { useRef } from "react";

function EditAvatarPopup(props) {
    const avaRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avaRef.current.value,
        });
        e.target.reset(); 
    }

    return (
        <PopupWithForm
            name="avatarForm"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={avaRef}
                id="avatar"
                type="url"
                className="popup__input popup__input_avatar"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
                autoComplete="off"
            />
            <span className="popup__input-error avatar-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;