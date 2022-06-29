/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import {PageProps} from "$fresh/server.ts"

export default function Home(props: PageProps) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <a class={tw`my-6`} href={props.url.href + "tashima42/blog"}>Tashima42 Blog</a>
    </div>
  );
}
