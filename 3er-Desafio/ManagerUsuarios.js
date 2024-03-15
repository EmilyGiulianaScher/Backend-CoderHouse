const fs = require('fs').promises;

class UserManager {
    constructor(path) {
        this.path = path;
    }

    async createUser(user) {
        const users = await this.getUsersFromFile();
        users.push(user);
        await this.saveUsersToFile(users);
        return user;
    }

    async getUsers() {
        return await this.getUsersFromFile();
    }

    async getUsersFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe o está vacío, se devuelve un arreglo vacío !!
            return [];
        }
    }

    async saveUsersToFile(users) {
        await fs.writeFile(this.path, JSON.stringify(users, null, 2), 'utf-8');
    }
}

module.exports = UserManager;
