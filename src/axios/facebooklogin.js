import axios from "axios";

const Facebooklogin = (accesstoken) => {
    axios.post("http://127.0.0.1:8000/auth/convert-token/", {
        token: accesstoken,
        backend: "facebook",
        grant_type: "convert_token",
        client_id: "4nMXyQkDNi5290RyBmnyk7DQBnR9SUf0g1qCKSew",
        client_secret: "8zv6lYfuP1dZf85rsAaFB7Vx1OQJQCvzWQ5e91GUguttwUrHaiZexVfWUx2kVanVd77t35vKsN6Wp9Tk1NkJQW2FIwFjTgWwN1LVeI4k4f0P5Q1oGxco2bUBc1AbUJgL"
    })
    .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
    });
}
export default Facebooklogin;