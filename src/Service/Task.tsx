export function create(description: string) {
    let authData = localStorage.getItem('auth');

    /* Check if auth does not exist in local storage. */
    if (authData === null) {
        return false;
    }
}
