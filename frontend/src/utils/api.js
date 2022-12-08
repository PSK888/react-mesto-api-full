class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    // Проверка ответа сервера
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    // Загрузка данных карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Загрузка данных пользователя с сервера
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Устанавливаем данные пользователя
    setUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    };
    // Добавление новой карточки
    createNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Удаление карточки
    deleteIdCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Снятие лайка
    dislike(data) {
        return fetch(`${this._baseUrl}/cards/${data}/likes`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Постановка  лайка
    putLike(data) {
        return fetch(`${this._baseUrl}/cards/${data}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._getResponseData)
    };

    changeLikeCardStatus(data, isLiked) {
        if (!isLiked) {
            return this.dislike(data);
        } else {
            return this.putLike(data);
        }
    }

    // Обновление аватара пользователя
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    };

};

const api = new Api({
    baseUrl: 'https://api.psk888.students.nomoredomains.club',
    headers: { 'Content-Type': 'application/json' }
});

export default api;