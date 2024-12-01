import axios from "axios";
import { load } from "cheerio";
import { NextRequest } from "next/server";
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

function isValidUrl(url: string): boolean {
  return urlRegex.test(url);
}

export async function GET(req: NextRequest) {
  const url = req?.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json(
      { data: null, error: "URL not found" },
      { status: 400 }
    );
  }
  if (!isValidUrl(url)) {
    return Response.json({ data: null, error: "Invalid URL" }, { status: 400 });
  }
  const res = await axios.get(url);

  const $ = load(res?.data);
  $("script").remove();
  $("style").remove();
  $("svg").remove();
  $("footer").remove();
  $("header").remove();
  $("aside").remove();
  $("picture").remove();
  $("video").remove();
  $("media").remove();
  $("*").removeAttr("class");
  $("*").removeAttr("style");

  const bodyHtml = $.root().find("body");
  bodyHtml.find("img").each((_, elem) => {
    $(elem).addClass("editor-image");
  });
  return Response.json({ data: bodyHtml.html(), error: null });
}
