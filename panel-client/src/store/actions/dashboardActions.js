import axios from "axios";
import { API_BASEURL } from "../../constants";
import { toast } from "react-toastify";

const getInfoDashboard = async () => {
    const { data } = await axios.get(`${API_BASEURL}/dashboard/count`);

    console.log({ data });

    return data; 
}

export const fetchCountDashboard = async () => {
    try {
        return await getInfoDashboard();
    } catch (error) {
        toast.error(error.response?.data?.message || "Algo salió muy mal xd");
    }
};
