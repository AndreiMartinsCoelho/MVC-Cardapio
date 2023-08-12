class Login {
    constructor() {
        this._email = "";
        this._senha = "";
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get senha() {
        return this._senha;
    }

    set senha(senha) {
        this._senha = senha;
    }
}

module.exports = Login;