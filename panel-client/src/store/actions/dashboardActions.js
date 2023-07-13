import axios from "axios";
import { API_BASEURL } from "../../constants";
import { toast } from "react-toastify";
import { getAll } from "../slices/dashboardSlice";

export const getInfoDashboard = () =>async (dispatch) =>{
    const { data } = await axios.get(`${API_BASEURL}/dashboard/count`);

    dispatch(getAll(data))
    console.log({ data });

    return data; 
}

