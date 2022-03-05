import { fetch } from "@remix-run/node";
import { json, LoaderFunction } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async ({ request }) => {
  const id = new URL(request.url).searchParams.get("id") ?? "MoH8Fk2K9bc";
  const url = `https://www.youtube.com/watch?v=${id}`;
  const res = await fetch(url, { headers: { "accept-language": "en" } });
  if (res.ok) {
    const metadata = parsePlayerResponse(await res.text());
    return json(metadata);
  }
  return json(null);
};

// cf. https://github.com/ytdl-org/youtube-dl/blob/a7f61feab2dbfc50a7ebe8b0ea390bd0e5edf77a/youtube_dl/extractor/youtube.py#L283
const PLAYER_REPONSE_REGEX = /var ytInitialPlayerResponse = ({.+?});/;

export function parsePlayerResponse(html: string): any {
  const match = html.match(PLAYER_REPONSE_REGEX);
  if (match && match[1]) {
    return JSON.parse(match[1]);
  }
  throw new Error("player response not found");
}
