function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__container popup__container_${name}`}>
                <button className="popup__close" onClick={onClose} type="button" />
                <h3 className="popup__title">{title}</h3>
                <form
                    onSubmit={onSubmit}
                    className={`popup__form popup__form_${name}`}
                    name={name}
                    noValidate>

                    {children}
                    
                    <button className="popup__button popup__button_active">Сохранить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;

