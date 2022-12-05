import api from "../utils/api.js";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from '../utils/auth.js';
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [sucсess, setSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false)
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteIdCard(card)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api.setUser(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegistration(email, password) {
    auth.register(email, password).then((res) => {
      setSuccess(true);
      setIsInfoTooltipOpen(true);
      navigate('/');
    }).catch((e) => {
      console.log(e);
      setSuccess(false);
      setIsInfoTooltipOpen(true);
    })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        setLoggedIn(true)
        setCurrentEmail(email)
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        setSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/sign-in');
    setCurrentEmail('');
    setLoggedIn(false);
    setIsUserMenuOpen(false)
  }

  function handleOpenUserMenu() {
    if (loggedIn) {
      setIsUserMenuOpen(!isUserMenuOpen)
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.checkToken(jwt).
        then(({ data }) => {
          setCurrentEmail(data.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        });
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        email={currentEmail}
        handleLogout={handleLogout}
        sucсess={sucсess}
        isUserMenuOpen={isUserMenuOpen}
        handleOpenUserMenu={handleOpenUserMenu}
      />

      <Routes>
        <Route path="/" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              setCards={setCards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
        }>
        </Route>
        <Route path="/sign-up" element={<Register handleRegistration={handleRegistration} sucсess={sucсess} />} />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} sucсess={sucсess} />} />
      </Routes>

      <Footer />
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} sucсess={sucсess} />
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
