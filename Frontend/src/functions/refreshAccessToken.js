import axios from "axios";
import Cookies from "js-cookie";
const refreshAccessToken = async () => {
    const refreshToken = Cookies.get("refreshToken")
    const data = {
        refreshToken
    }
    try {
        const response = await axios.post("http://localhost:8000/api/v1/users/refresh-token", data)
        const tokens = {
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken
        }
        
        Cookies.set("accessToken", tokens.accessToken, { expires: 1 });
        Cookies.set("refreshToken", tokens.refreshToken, { expires: 5 });
        accessToken = Cookies.get("accessToken")
    } catch (error) {
        console.log("Error accured  while refreshing the access token", error);
    }
}
export {refreshAccessToken}