import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

async function run() {
    console.log("Example script running..");

    function errHandler(err) {
        console.log("API error", err);
    }

    async function onReady() {
        console.log("API ready..");

        const frontVideoMaterial = {
            name: "FrontVideoMaterial",
            videoMap: "frontVideoTag",
            emissiveVideoMap: "frontVideoTag",
            emissiveIntensity: 2.0,
            emissive: "#FFFFFF",
        }

        const backVideoMaterial = {
            name: "BackVideoMaterial",
            videoMap: "backVideoTag",
            emissiveVideoMap: "backVideoTag",
            emissiveIntensity: 2.0,
            emissive: "#FFFFFF",
            alphaVideoMap: "backVideoTag",
        }

        try {            
            console.log(await vctrApi.getObjects());
            const frontObjects = await vctrApi.getObjectsByName("display_front");
            const backObjects = await vctrApi.getObjectsByName("display_back");
            
            // Create material
            const frontMat = await vctrApi.createMaterial(frontVideoMaterial, frontObjects[0].material);
            if (frontMat) {
                await vctrApi.setMaterial("display_front", "FrontVideoMaterial");
            }
            const backMaterials = vctrApi.getMaterialsByName(backObjects[0].material);
            const backMat = await vctrApi.createMaterial(backVideoMaterial, backMaterials[1]);
            if (backMat) {
                await vctrApi.setMaterial("display_back", "BackVideoMaterial");
            }

        } catch (e) {
            errHandler(e);
        }

    }
    const vctrApi = new VctrApi("d0769c54-47ee-4ad3-9bdc-a2e711da2d7a", errHandler);
    try {
        await vctrApi.init();
        onReady();
    } catch (e) {
        errHandler(e);
    }
}

run();