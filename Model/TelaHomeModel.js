class home {
    constructor() {
        this.auth = false;
    }

    async home() {
        try {
            this.auth = true;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = home;