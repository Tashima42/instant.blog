/** @jsx h */
import { h } from "preact";
import Github from "../../../providers/Github.ts"
import MainConfig from "../../../interfaces/MainConfig.ts"
import { PageProps, Handlers } from "$fresh/server.ts";
import {tw} from "@twind"

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
    <div className="content" class={tw`w-30 grid grid-cols-1 divide-y items-center`}>

      <div className="header" class={tw`flex flex-col items-center`}>
        <img src={data.mainConfig.avatar} width={128} height={128} />
        <h1  class={tw`text-3xl`}>{data.mainConfig.title}</h1>
        <div className="socials" class="flex content-evenly">
          {
            data.mainConfig.social ? 
              data.mainConfig.social.map(({name, url, icon}) => {
                return <a href={url} ><img src={icon} alt={name}></img></a>          
              })
              : null
          }
        </div>
      </div>

      <div className="body">
        <div className="posts" class={tw`flex flex-col items-center text-lg`}>
          {
            data.postsTitles ? 
              data.postsTitles.map((name) => {
                return <a href={`${url}/${name}`} class={tw`underline`}>{name}</a>          
              })
              : null
          }
        </div>
      </div>

    </div>
  );
}
