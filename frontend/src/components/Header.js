import logo from '../images/logo.svg';
import line from '../images/line.svg';
import Close from '../images/Close.svg';
import { Link, Route, Routes } from 'react-router-dom';
import UserMenu from "./UserMenu.js";

function Header({ email, handleLogout, isUserMenuOpen, handleOpenUserMenu }) {
    return (
        <div>
            <UserMenu 
                email={email}
                handleLogout={handleLogout}
                isUserMenuOpen={isUserMenuOpen}
            />
            <header className="header">
                <img className="header__logo" src={logo} alt="Логотип Место"/>
                <Routes>
                    <Route path="/" element={
                        <div className="header__data">
                            <p className="header__mail">{email}</p>
                            <button className="header__button header__button_action" onClick={handleLogout}>Выйти</button>
                        </div>
                    } />
                    <Route></Route>
                    <Route path="sign-in" element={<Link className="header__button" to="/sign-up">Регистрация</Link>} />
                    <Route path="sign-up" element={<Link className="header__button" to="/sign-in">Войти</Link>} />
                </Routes>
                 <button
                    className="header__line"
                    type="button"
                    onClick={handleOpenUserMenu}
                    style={{backgroundImage: `url(${ isUserMenuOpen ? Close : line })`}}
                />
            </header>
        </div>

    )
}

export default Header;