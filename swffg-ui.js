"use strict";

class swffgUIModule {
    constructor() {
        this.swffgUIModule = new Map();
        this.TIMEOUT_INTERVAL = 50; // ms
        this.MAX_TIMEOUT = 1000; // ms
        // Random id to prevent collision with other modules;
        this.ID = randomID(24);
    }

    log(msg, ...args) {
        if (game && game.settings.get("swffgUI", "verboseLogs")) {
            const color = "background: #6699ff; color: #000; font-size: larger;";
            console.debug(`%c swffgUIModule: ${msg}`, color, ...args);
        }
    }

    async init() {
        game.settings.register("swffgUI", "selectSkin", {
            name: game.i18n.localize("SWFFG.selectSkin"),
            hint: game.i18n.localize("SWFFG.selectSkinHint"),
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
        });

        game.settings.register("swffgUI", "verboseLogs", {
            name: "Enable more module logging.",
            hint: "Enables more verbose module logging. This is useful for debugging the module. But otherwise should be left off.",
            scope: "world",
            config: false,
            default: false,
            type: Boolean,
        });
		
		this.switchStyleSheet();

    }
	
	switchStyleSheet(){
		var head = document.getElementsByTagName('head')[0];
		var locationOrigin= document.location.origin;
		
		for(var elem = 0 ; elem < head.children.length; elem++)
			{
				if (head.children[elem].href == locationOrigin +"/"+"modules/swffgUI/swffg-default.css"){
					head.children[elem].href= locationOrigin +"/"+"modules/swffgUI/css/swffg.css";
					break;
				}
			}
		
		if (game.settings.get("swffgUI", "selectSkin")) {
			console.log("[SWFFG-UI] Default option is activated");
		}
		else {
			console.log("[SWFFG-UI] *Dark Side* option is activated");
	
			for(var elem = 0 ; elem < head.children.length; elem++)
			{
				if (head.children[elem].href == locationOrigin +"/"+"modules/swffgUI/css/swffg.css"){
				  head.children[elem].href= locationOrigin +"/"+"modules/swffgUI/darkside/css/swffg.css";
				  break;
				}
			}
		}
		
	}

}

Hooks.on("ready", () => {
    swffgUIModule.singleton = new swffgUIModule();
    swffgUIModule.singleton.init();
});
