import axios from "axios"
import Cookies from "js-cookie"

const getCurrentUser = async () => {
    const accessToken = Cookies.get("accessToken")
    const data = {
        accessToken
    }
    try {
        const response = await axios.post("http://localhost:8000/api/v1/users/getuser", data)

        if (response) {
            console.log("response", response)
            return response.data.data;
            console.log(response)
        }

    } catch (error) {
        console.log(error)
    }
}
export { getCurrentUser }