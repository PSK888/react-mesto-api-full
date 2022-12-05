import PopupWithForm from "./PopupWithForm.js";
import { useRef } from "react";


function AddPlacePopup(props) {
    const nameRef = useRef();
    const linkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
       e.target.reset(); 
    }

    return (
        <PopupWithForm
            name="addForm"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={nameRef}
                id="addNameInput"
                name="name"
                className="popup__input popup__input_name"
                type="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                autoComplete="off"
            />
            <span className="addNameInput-error popup__input-error" />
            <input
                ref={linkRef}
                id="addLinkInput"
                name="link"
                className="popup__input popup__input_link"
                type="url"
                placeholder="Ссылка на картинку"
                required
                autoComplete="off"
                
            />
            <span className="addLinkInput-error popup__input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;