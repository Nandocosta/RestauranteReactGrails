import axios from "axios";

const Auth = {
    setAuth: (data) => localStorage.auth = JSON.stringify(data),
    getToken: () => {
        let data = localStorage.getItem("auth");
        data = data ? JSON.parse(data) : null;
        return data ? data.access_token : null;
    },
}

export default Auth