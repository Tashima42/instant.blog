/** @jsx h */
import { h } from "preact";
import Github from "../../../providers/Github.ts"
import MainConfig from "../../../interfaces/MainConfig.ts"
import { PageProps, Handlers } from "$fresh/server.ts";

export const handler: Handlers<Props | null> = {
  async GET(_, ctx) {
  const github = Github()
    const { owner, repo } = ctx.params;
    const mainConfig = await github.getMainConfig(owner, repo)
    const postsTitles = await github.getPostsTitles(owner, repo)
    return ctx.render({mainConfig, postsTitles});
  },
};

interface Props {
  mainConfig: MainConfig,
  postsTitles: string[]
}

export default function Page(props: PageProps<Props | null>) {
  const { data } = props
  if (!data) {
    return <h1>Main Config not found</h1>;
  }
  const url = props.url.href

  return (
    <div>
      <div className="header">
        <img src={data.mainConfig.avatar} width={128} height={128} />
        <h1>{data.mainConfig.title}</h1>
        <div className="socials">
          {
            data.mainConfig.social ? 
              data.mainConfig.social.map(({name, url, icon}) => {
                return <a href={url} >{name}</a>          
              })
              : null
          }
        </div>
      </div>
      <div className="body">
        <div className="posts">
          {
            data.postsTitles ? 
              data.postsTitles.map((name) => {
                return <a href={`${url}/${name}`}>{name}</a>          
              })
              : null
          }
        </div>
      </div>
      <p>{data.mainConfig.author}</p>
    </div>
  );
}
