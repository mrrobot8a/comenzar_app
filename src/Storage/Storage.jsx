
export const Storage = {

    /**
     * Retrieves the value associated with the given key from the local storage.
     *
     * @param {string} key - The key of the value to retrieve.
     * @return {any} The value associated with the given key, or null if it doesn't exist.
     */
    get(key) {
        const value = window.localStorage.getItem(key);
        //se valida si existe un token el localstorage
        if (!value) {

            return null;

        }
        return JSON.parse(value);
    },

    /**
     * Stores the given value with the given key in the local storage.
     *
     * @param {string} key - The key to associate with the value.
     * @param {any} value - The value to store.
     */
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * Removes the value associated with the given key from the local storage.
     *
     * @param {string} key - The key of the value to remove.
     */
    remove(key) {
        window.localStorage.removeItem(key);
    },

    clear() {
        window.localStorage.clear();
    },

    // //token & usuario

    // getToken() {
    //    const token = window.localStorage.getItem('token');
    //    if (!token) {
    //        return null;
    //    }

    //     return JSON.parse(token);
    // },
    // getUser() {
    //     const user = window.localStorage.getItem('user');
    //     if (!user) {
    //         return null;
    //     }

    //     return JSON.parse(user);
    // },
        

    // setToken(token) {

    //     window.localStorage.setItem('token', token);
    // },
    // setUser(user) {
    //     window.localStorage.setItem('user', user);
    // },

    // removeToken() {
    //     window.localStorage.removeItem('token');
    // },
    // removeUser() {
    //     window.localStorage.removeItem('user');
    // },

    // clearStorage() {
    //     window.localStorage.clear();
    // }




}

export default Storage;