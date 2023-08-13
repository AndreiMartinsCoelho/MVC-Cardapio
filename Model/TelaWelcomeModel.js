class welcome {
    constructor() {
        this.auth = false;
    }

    get auth() {
        return this._auth;
    }

    set auth(auth) {
        this._auth = auth;
    }
}

module.exports = welcome;