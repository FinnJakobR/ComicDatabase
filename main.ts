import marvel from "./api/marvel/marvel.js";
import MangaAnime from "./api/MyMangaList/mangaAnime.js";

async function main() {
    var m = new MangaAnime();
    var res = await m.anime.all("deathNote");

    console.log(res);

}

main();