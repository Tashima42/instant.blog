import MainConfig from "../interfaces/MainConfig.ts";
import Post from "../interfaces/Post.ts";
import Base64 from "../helpers/Base64.ts";
import * as markdown from "https://deno.land/x/markdown@v2.0.0/mod.ts";
const { Marked } = markdown;

export default function Github() {
  const base64 = Base64();
  const config = {
    baseUrl: "https://api.github.com",
    authorization: Deno.env.get("GITHUB_AUTHORIZATION") || "",
    mainConfigFile: "main.json",
    postsFolder: "posts",
  };
  return Object.freeze({
    getMainConfig,
    getPostsTitles,
    getPost,
  });

  async function getMainConfig(
    owner: string,
    repo: string,
  ): Promise<MainConfig> {
    const { content } = await getRepositoryContent(
      owner,
      repo,
      config.mainConfigFile,
    );
    const c = base64.toString(content);
    const mainConfig: MainConfig = JSON.parse(c);
    return mainConfig;
  }

  async function getPostsTitles(
    owner: string,
    repo: string,
  ): Promise<string[]> {
    const posts = await getRepositoryContent(
      owner,
      repo,
      config.postsFolder,
    );
    return posts.map(({ name }: { name: string }) => name.split(".")[0]);
  }

  async function getPost(
    owner: string,
    repo: string,
    postName: string,
  ): Promise<Post> {
    const { content } = await getRepositoryContent(
      owner,
      repo,
      `${config.postsFolder}/${postName}.md`,
    );
    const postContent = base64.toString(content);
    const { meta: { title, date }, content: contentMarkup } = Marked.parse(
      postContent,
    );
    return { title, date, content: contentMarkup };
  }

  async function getRepositoryContent(
    owner: string,
    repo: string,
    path: string,
  ) {
    const resp = await get(`repos/${owner}/${repo}/contents/${path}`);
    return await resp.json();
  }

  async function get(path: string) {
    return await fetch(`${config.baseUrl}/${path}`, {
      headers: {
        Authorization: "Basic " + config.authorization,
      },
    });
  }
}
