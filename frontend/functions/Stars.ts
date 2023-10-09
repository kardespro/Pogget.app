import axios from "axios";
import { backend } from "../config";
import PropTypes from "prop-types";

interface ICheckUserStars {
  userToken: String;
}

export async function CheckStarred({ userToken }: ICheckUserStars) {
  let data = await axios.get(`${backend}/api/users/@me/stars`, {
    timeout: 8000,
    headers: {
      Authorization: `Basic ${userToken}`,
    },
    withCredentials: true,
  });
  return data.data.data
}
