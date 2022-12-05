import { useState } from 'react';
import AuthForm from './AuthForm.js';

function Register({ handleRegistration }) {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValues;
    handleRegistration(email, password);
  }

  return (
    <AuthForm
      title="Регистрация"
      submitText='Зарегистрироваться'
      onSubmit={handleSubmit}
      isRegister={true}
    >
      <input
        className="form__input"
        type="email"
        name="email"
        value={formValues.email}
        placeholder="Email"
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <input
        className="form__input"
        type="password"
        name="password"
        value={formValues.password}
        placeholder="Пароль"
        onChange={handleChange}
        autoComplete="off"
        required
      />
    </AuthForm>
  )
}

export default Register;

