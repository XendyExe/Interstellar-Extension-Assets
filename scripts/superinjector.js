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


const startGame = async () => {
    const PUBLIC_KEY_RAW = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi/rGIcKjvQMAQLxUt7pP0wFkEzuP5rzMi4hslvzrCe+/uqN6jztM70kaBiizJTzG1ZLK7IRFzXomGwhUNCyuLOCmDMP27MKB9kkO/giVQbPmpFmdCtr1M6p8LYiPbGeWuh3THVeojyYI/e2CPMXmKCyHw0lZtqlQuJUv7r6veDRUMHlDq38OHwCPPeW/srTtLgIo7SVk9hJ4Wi8wZMtgSgiaddkXcSXiYosRW+akXDllRxdGSFTTGnj3c/H7/6szr7nH+XlaAzbb5T99VeT9P+povkuTseS958FoKmujE5eDQVjch9ih19VbaKYyjzh334V0mGwFAknEv6dN00t1IwIDAQAB"
    window.itag = document.getElementById("interstellarTag")
    window.iurl = itag.getAttribute("interstellarURL");
    window.istest = true;
    window.isurl = istest ? "http://127.0.0.1:9000" : "https://interstellar.myvnc.com";
    window.BASE_DREDNOT_CODE = itag.getAttribute("interstellarPreCode");
    itag.setAttribute("interstellarPreCode", "");
    window.assetversion = Number.parseInt(itag.getAttribute("interstellarassetversion"));
    itag.src = isurl+"/launcher.js";
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
window.starttime = Date.now();
startGame();