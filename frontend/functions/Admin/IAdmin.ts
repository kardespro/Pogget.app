import axios from "axios";
import { backend, admin_key } from "../../config";
import { ReportError } from "../Report";

export async function DeletePlugin(id: String) {
  let d = await axios.get(`${backend}/api/platform/plugins/${id}/delete`, {
      headers: {
        Authorization: `Admin ${admin_key}`,
      },
    })
    .catch((err) => ReportError(JSON.stringify(err)));
  return JSON.stringify(d.data);
}
export async function getToken(token: string) {
  let data = await axios.get(
    `
  ${backend}/api/admin/tokens/getToken?id=${token}
  `,
    {
      headers: {
        Authorization: `Admin ${admin_key}`,
      },
    }
  );
  return data.data
}
