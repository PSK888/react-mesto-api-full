import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm({ title, submitText, onSubmit, isRegister, children }) {
    return (
        <form className="form" onSubmit={onSubmit} noValidate autoComplete="off">
            <h2 className="form__header">
                {title}
            </h2>
            {children}
            <button className="form__button" type="submit">
                {submitText}
            </button>
            {isRegister && (
                <p className="form__text">Уже зарегистрированы?
                    <Link className="form__link" to="/sign-in"> Войти</Link>
                </p>
            )}
        </form>
    )
}

export default AuthForm;