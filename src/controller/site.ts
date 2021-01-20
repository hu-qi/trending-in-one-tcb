import { renderFile, State } from "../deps.ts";
import { formatTime } from "../util/time.ts";

export const site = {
  async home(ctx: State) {
    const file = await Deno.open(`${Deno.cwd()}/views/data.txt`, { read: true });
    const data = await Deno.readAll(file);
    Deno.close(file.rid);
    const decoder = new TextDecoder("utf-8");
    const content = decoder.decode(data).trim();

    const words = content.split("\n");
    const count = words.length;
    // const index = Math.floor(Math.random() * count);

    console.log(formatTime(new Date()))
    const response = await fetch(`https://cdn.jsdelivr.net/gh/hu-qi/trending-in-one/raw/toutiao-search/${formatTime(new Date(),{template:'{{YYYY}}-{{MM}}-{{DD}}'})}.json`)
    const responseJson = await response.json()
    const index = Math.floor(Math.random() * responseJson.length);

    const pathname = Deno.env.get("PATHNAME") || '';
    ctx.response.body = await renderFile(`${Deno.cwd()}/views/home.ejs`, {
      title: '一条热搜',
      text: responseJson[index],
      pathname,
    });
  },
  async info(ctx: State) {
    let mdContent = "";
    if (ctx.curl) {
      mdContent = await ctx.curl({
        url: "https://raw.githubusercontent.com/denoland/deno/master/README.md",
        dataType: "text",
      });
    }
    const pathname = Deno.env.get("PATHNAME") || '';
    ctx.response.body = await renderFile(`${Deno.cwd()}/views/info.ejs`, {
      title: "info",
      pathname,
      mdContent,
    });
  },
  error() {
    throw new Error("page error");
  },
};
