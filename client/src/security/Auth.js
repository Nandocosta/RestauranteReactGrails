
const Auth = {
    setAuth: (data) => localStorage.auth = JSON.stringify(data),
    getToken: () => {
        let data = localStorage.getItem("auth");
        data = data ? JSON.parse(data) : null;
        return data ? data.access_token : null;
    },
    getRules: () => {
        let data = localStorage.getItem("auth");
        data = data ? JSON.parse(data) : null;
        return data ? data.roles : null;
    }
}
export default Auth