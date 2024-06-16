const isTest = location.href.includes("test.drednot.io");

const split = location.href.split("/")

let inGame = true;

// if (
//     split[3] != "" &&
//     split[3] != location.search &&
//     split[3] != location.hash &&
//     split[3] != "#" &&
//     split[3] != "?" 
// ) inGame = false;
// if (split[3] == "invite") inGame = true;
console.log("Interstellar Content Script // User is ingame? ", inGame);

if (location.hash != "#vanilla" && inGame)
{
    const URL = chrome.runtime.getURL("");
    inject = (loc, callback=()=>{}, module = false, local = true) => {
        let j = document.createElement("script");
        if (local) j.src = URL + loc;
        else j.src = loc;
        if (module) {
            j.type = "module";
            j.setAttribute("type", "module");
        }
        j.onload = callback;
        (document.head || document.documentElement || document).appendChild(j);
    } 
    const loadlibs = async (tag, precode) => {
        let lexend = document.createElement("div");
        lexend.innerHTML = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">`;
(document.head || document.documentElement || document).appendChild(lexend);
        inject("libs/msgpack.js");
        inject("libs/pixi.js", () => {
            inject("libs/pixi-filters.js", () => {
                inject("libs/pixi-sound.js", () => {
                    tag.id = "interstellarTag";
                    inject("scripts/superinjector.js")
                    tag.setAttribute("interstellarAssetVersion", "4");
                    tag.setAttribute("interstellarURL", URL);
                });
            });
        });
        try {
            let t = await (await fetch("https://interstellar.myvnc.com/ping")).text();
            if (t!=="strawberry girl was here :3") {
                alert("Failed to connect to interstellar server. Sending you to vanilla! Please report this to the discord.");
                location.hash = "vanilla";
                location.reload();
            }
        }
        catch {
            alert("Failed to connect to interstellar server. Sending you to vanilla! Please report this to the discord.");
            location.hash = "vanilla";
            location.reload();
        }
    }
    (function() {
        new MutationObserver((_, observer) => {
            const scriptTag = document.querySelectorAll('script');
            let scriptTagsArray = Array.from(scriptTag);
            scriptTagsArray.forEach(function(tag) {
                if (tag.innerText.includes("test.drednot.io")) {
                    tag.id = "OLD_SCRIPT_TAG";
                    tag.type = "text/plain";
                    window.onload = () => {
                        let script = document.createElement("script");
                        tag.parentElement.appendChild(script);
                        loadlibs(script);
                    }
                    observer.disconnect();
                }
            });
        }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
    })();
}
