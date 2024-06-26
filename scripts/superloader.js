window.iurl = "REDIRECT_TO_INTERSTELLAR_BLOB";
window.assetversion = 5;

let oldscripttag = document.querySelector("#OLD_SCRIPT_TAG");
window.BASE_DREDNOT_CODE = oldscripttag.innerText;
oldscripttag.innerHTML = "";

window.isurl = istest ? "http://127.0.0.1:9000" : "https://interstellar.myvnc.com";

const getAccountData = async () => {
    const PUBLIC_KEY_RAW = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi/rGIcKjvQMAQLxUt7pP0wFkEzuP5rzMi4hslvzrCe+/uqN6jztM70kaBiizJTzG1ZLK7IRFzXomGwhUNCyuLOCmDMP27MKB9kkO/giVQbPmpFmdCtr1M6p8LYiPbGeWuh3THVeojyYI/e2CPMXmKCyHw0lZtqlQuJUv7r6veDRUMHlDq38OHwCPPeW/srTtLgIo7SVk9hJ4Wi8wZMtgSgiaddkXcSXiYosRW+akXDllRxdGSFTTGnj3c/H7/6szr7nH+XlaAzbb5T99VeT9P+povkuTseS958FoKmujE5eDQVjch9ih19VbaKYyjzh334V0mGwFAknEv6dN00t1IwIDAQAB"
    function str2ab(str) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    
    function splitString(str, chunkSize) {
        var chunks = [];
        for (var i = 0; i < str.length; i += chunkSize) {
            chunks.push(str.substr(i, chunkSize));
        }
        return chunks;
    }
    const accountdata = await (await fetch("/account")).text();
    const Z_PUB_KEY = await crypto.subtle.importKey("spki",
        str2ab(atob(PUBLIC_KEY_RAW)),
        { name: "RSA-OAEP", hash: { name: "SHA-256" }},
        false,
        ["encrypt"]
    )
    async function encryptChunk(c){
        const encryptedchunk = btoa(String.fromCharCode.apply(null, new Uint8Array(await crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            Z_PUB_KEY,
            new TextEncoder().encode(c)
        ))));
        return encryptedchunk;
    }
    let encrypteduserdata = "";
    const esep = "/`/";
    const chunked_data_raw = splitString(accountdata, 64)
    let __d = [];
    for (let i = 0; i < chunked_data_raw.length; i++) {
        __d.push(encryptChunk(chunked_data_raw[i]));
    }
    const chunked_data = await Promise.all(__d);
    for (let i = 0; i < chunked_data.length; i++) {
        encrypteduserdata += chunked_data[i] + esep
    }
    window.Z_AUTH_DATA = encrypteduserdata;
}
let lexend = document.createElement("div");
lexend.innerHTML = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">`;
(document.head).appendChild(lexend);

const scripts = document.createElement("script");
let script = ""
const inject = async (path) => {
    script += await (await stellarAsset(path)).text()+ "\n\n\n";
}
(async () => {
    getAccountData();
    await inject("libs/msgpack.js");
    await inject("libs/pixi.js");
    await inject("libs/pixi-sound.js");
    await inject("libs/pixi-filters.js");
    const elm = document.createElement("script");
    elm.src = window.isurl + "/launcher.js";
    scripts.innerHTML = script;
    document.body.appendChild(elm);
    document.body.appendChild(scripts);
    // try {
    //     let t = await (await fetch("https://interstellar.myvnc.com/ping")).text();
    //     if (t!=="strawberry girl was here :3") {
    //         if (window.SENDING_TO_VANILLA) return;
    //         alert("Failed to connect to interstellar server. Sending you to vanilla! Please report this to the discord.");
    //         location.hash = "vanilla";
    //         location.reload();
    //     }
    // }
    // catch {
    //     if (window.SENDING_TO_VANILLA) return;
    //     alert("Failed to connect to interstellar server. Sending you to vanilla! Please report this to the discord.");
    //     location.hash = "vanilla";
    //     location.reload();
    // }
})()