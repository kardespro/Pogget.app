import axios from "axios";
import { backend } from "../config";
interface IFetchReadmeProps {
  repoAuthor: string;
  repoName: string;
}

interface GithubFile {
  name: string;
  download_url: string;
}

export async function fetchRepoReadmeContent({
  repoAuthor,
  repoName,
}: IFetchReadmeProps) {
  const github_base = "https://api.github.com";

  try {
    const response = await axios.get<GithubFile[]>(
      `${backend}/repos/${repoAuthor}/${repoName}/contents`
    );

    const incd = ["readme", "README", "Readme"];

    const fPath = response.data.find((a) =>
      incd.some((keyword) => a.name.includes(keyword))
    );

    if (!fPath) {
      return JSON.stringify({ status: 404, message: "Path Not Found" });
    }

    const dw = fPath.download_url;

    const rreq = await axios.get<string>(dw);

    return JSON.stringify({
      status: 200,
      message: "Success",
      markdownContent: rreq.data,
    });
  } catch (error) {
    return JSON.stringify({ status: 500, message: "Server Error" });
  }
}
