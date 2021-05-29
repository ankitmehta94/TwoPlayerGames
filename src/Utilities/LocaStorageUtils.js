/**
 * It will take care of localStorage handling while
 * fetching or setting data in localStorage
 */
 class LocalStorage {
    /**
     * @function getLSData will fetch parsed data from provided key.
     * @param {string} lsKey is localStorage Key in which data will be stored.
     */
    static get(key) {
        let value = null;
        try {
            if (typeof (localStorage) !== 'undefined' && typeof key === 'string' && key !== '') {
                value = JSON.parse(localStorage.getItem(key));
            }
        } catch (error) {
            console.error("Err. LocalStorage.get : %s", error);
        }
        return value;
    }

    /**
     * @function setLSData will stringify data and store it in provided key.
     * @param {string} lsKey is localStorage Key in which data will be stored.
     * @param {any} lsData is data that will be stored in above localStorage key.
     */
    static set(key, data) {
        try {
            if (typeof (localStorage) !== 'undefined' && typeof key === 'string' && key !== '' && data) {
                localStorage.setItem(key, JSON.stringify(data));
            }
        } catch (error) {
            console.error("Err. LocalStorage.set : %s", error);
        }
    }
    /**
     * 
     * @param {String} key 
     * deletes entry from localstorage againt the passed key
     */
    static delete(key){
        try{
            if (typeof (localStorage) !== 'undefined' && typeof key === 'string' && key.trim() !== '') {
                localStorage.removeItem(key);
            }
        }catch(err){
            console.error('Err. LocalStorage.delete : %s',err);
        }
    }
}

export default LocalStorage;