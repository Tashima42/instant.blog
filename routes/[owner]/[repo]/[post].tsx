/** @jsx h */
import { h } from "preact";
import Github from "../../../providers/Github.ts"
import Post from "../../../interfaces/Post.ts"
import { PageProps, Handlers } from "$fresh/server.ts";

export const handler: Handlers<Post | null> = {
  async GET(_, ctx) {
  const github = Github()
    const { owner, repo, post: postName } = ctx.params;
    const post = await github.getPost(owner, repo, postName)
    return ctx.render(post);
  },
};

export default function Page({ data }: PageProps<Post | null>) {
  if (!data) {
    return <h1>Post not found</h1>;
  }

  return (
    <div>
      <div className="header">
        <h1>{data.title}</h1>
        <p>{data.date}</p>
      </div>
      <div className="body" dangerouslySetInnerHTML={{__html: data.content}}>
      </div>
    </div>
  );
}
