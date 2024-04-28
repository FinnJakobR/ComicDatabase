import marvel from "./api/marvel/marvel.js";

async function main() {
    var m = new marvel();
    var res = await m.comics.all();

    console.log(res);

}

main();