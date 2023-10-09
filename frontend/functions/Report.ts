import axios from "axios";
import { backend } from "../config";
export async function ReportError(data: String) {
  let dw = await axios.post(`${backend}/api/reports/newReport`, {
    body: {
      createdTimeStamp: Date.now(),
      data,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return dw.data;
}

