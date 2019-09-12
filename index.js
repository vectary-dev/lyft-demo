import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

async function run() {
    console.log("Example script running..");

    function errHandler(err) {
        console.log("API error", err);
    }

    async function onReady() {
        console.log("API ready..");

        const frontVideoMaterial = {
            videoMap: "frontVideoTag",
            emissiveVideoMap: "frontVideoTag",
            emissiveIntensity: 2.0,
            emissive: "#FFFFFF",
        }

        const backVideoMaterial = {
            name: "BackVideoMaterial",
            videoMap: "backVideoTag",
            emissiveVideoMap: "backVideoTag",
            emissiveIntensity: 1.0,
            emissive: "#FFFFFF",
            // alphaVideoMap: "backVideoTag",
        }

        try {            
            console.log(await vctrApi.getObjects());

            vctrApi.updateMaterial("FrontMatOriginal", frontVideoMaterial);
            vctrApi.updateMaterial("BackMatOriginal", backVideoMaterial);

        } catch (e) {
            errHandler(e);
        }

    }
    const vctrApi = new VctrApi("e4395677-8be7-41a6-a34e-7e0da420a02b", errHandler);
    try {
        await vctrApi.init();
        onReady();
    } catch (e) {
        errHandler(e);
    }
}

run();