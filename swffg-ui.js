"use strict";

const IndicatorMode = {
    REBEL: 0,
    GALACTIC: 1,
};

const IndicatorFonts = {
	EARTHORBITER: 0,
	KUIPERBELT: 1,
	GENESYS: 2,
	DISTANTGALAXY: 3,
	SIGNIKA: 4,
	ROBOTO: 5,
};

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
            default: 0,
            type: Number,
			choices: {
				0: "SWFFG.options.indicator.choices.0",
				1: "SWFFG.options.indicator.choices.1"
			},
			onChange: (value) => {
				let state = Number(value);
				var head = document.getElementsByTagName('head')[0];
				var locationOrigin= document.location.origin;
				if (state === IndicatorMode.GALACTIC){
						for(var elem = 0 ; elem < head.children.length; elem++){
							if (head.children[elem].href === locationOrigin +"/"+"modules/swffgUI/swffg-default.css" ||
							    head.children[elem].href === locationOrigin +"/"+"modules/swffgUI/css/swffg.css"){
							// head.children[elem].href= locationOrigin +"/"+"modules/swffgUI/darkside/css/swffg.css";
							head.children[elem].href= "modules/swffgUI/darkside/css/swffg.css";
							break;
							}
						}
				}
				else {
					for(var elem = 0 ; elem < head.children.length; elem++){
							if (head.children[elem].href == locationOrigin +"/"+"modules/swffgUI/swffg-default.css" ||
								head.children[elem].href === locationOrigin +"/"+"modules/swffgUI/darkside/css/swffg.css"){
							// head.children[elem].href= locationOrigin +"/"+"modules/swffgUI/css/swffg.css";
							head.children[elem].href= "modules/swffgUI/css/swffg.css";
							break;
							}
						}					
				}
				
			}
        });
		
		game.settings.register("swffgUI", "fontSettings", {
            name: game.i18n.localize("SWFFG.fontSettings"),
            hint: game.i18n.localize("SWFFG.fontSettingsHint"),
            scope: "world",
            config: true,
            default: 0,
            type: Number,
			choices: {
				0: "SWFFG.options.indicator.fonts.0",
				1: "SWFFG.options.indicator.fonts.1",
				2: "SWFFG.options.indicator.fonts.2",
				3: "SWFFG.options.indicator.fonts.3",
				4: "SWFFG.options.indicator.fonts.4",
				5: "SWFFG.options.indicator.fonts.5"
			},
			onChange: (value) => {
				let state = Number(value);

				switch (state){
					case IndicatorFonts.EARTHORBITER:
					  document.documentElement.style.setProperty('--major-button-font-family','EarthOrbiter');	
					  break;
					case IndicatorFonts.KUIPERBELT:
					  document.documentElement.style.setProperty('--major-button-font-family','KuiperBelt');	
					  break;
					case IndicatorFonts.GENESYS:
					  document.documentElement.style.setProperty('--major-button-font-family','Genesys');	
					  break;
					case IndicatorFonts.DISTANTGALAXY:
					  document.documentElement.style.setProperty('--major-button-font-family','DistantGalaxy');	
					  break;
					case IndicatorFonts.SIGNIKA:
					  document.documentElement.style.setProperty('--major-button-font-family','Signika');	
					  break;
					case IndicatorFonts.ROBOTO:
					  document.documentElement.style.setProperty('--major-button-font-family','Roboto');	
					  break;
					default:
					  console.log('Something went wrong [$value] does not exists in fonts choices');
				}
			}
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
		let state = Number(game.settings.get("swffgUI", "selectSkin"));
				
		if (state === IndicatorMode.REBEL) {
			console.log("[SWFFG-UI] Default option is activated");
			for(var elem = 0 ; elem < head.children.length; elem++)
			{
				if (head.children[elem].href === locationOrigin +"/"+"modules/swffgUI/swffg-default.css" ||
				    head.children[elem].href === locationOrigin +"/"+"modules/swffgUI/darkside/css/swffg.css"){
					//head.children[elem].href= locationOrigin +"/"+"modules/swffgUI/css/swffg.css";
					head.children[elem].href= "modules/swffgUI/css/swffg.css";
					break;
				}
			}
		}
		else {
			console.log("[SWFFG-UI] *Dark Side* option is activated");
	
			for(var elem = 0 ; elem < head.children.length; elem++)
			{
				if (head.children[elem].href === locationOrigin +"/"+"modules/swffgUI/swffg-default.css" ||
				    head.children[elem].href === locationOrigin +"/"+"modules/swffgUI/css/swffg.css"){
				  // head.children[elem].href= locationOrigin +"/"+"modules/swffgUI/darkside/css/swffg.css";
				  head.children[elem].href= "modules/swffgUI/darkside/css/swffg.css";
				  break;
				}
			}
		}
		
		state = Number(game.settings.get("swffgUI", "fontSettings"));
		switch (state){
			case IndicatorFonts.EARTHORBITER:
			  document.documentElement.style.setProperty('--major-button-font-family','EarthOrbiter');	
			  break;
			case IndicatorFonts.KUIPERBELT:
			  document.documentElement.style.setProperty('--major-button-font-family','KuiperBelt');	
			  break;
			case IndicatorFonts.GENESYS:
			  document.documentElement.style.setProperty('--major-button-font-family','Genesys');	
			  break;
			case IndicatorFonts.DISTANTGALAXY:
			  document.documentElement.style.setProperty('--major-button-font-family','DistantGalaxy');	
			  break;
			case IndicatorFonts.SIGNIKA:
			  document.documentElement.style.setProperty('--major-button-font-family','Signika');	
			  break;
			case IndicatorFonts.ROBOTO:
			  document.documentElement.style.setProperty('--major-button-font-family','Roboto');	
			  break;
			default:
			  console.log('Something went wrong [$value] does not exists in fonts choices');
		}
		
	}

}

Hooks.on("ready", () => {
    swffgUIModule.singleton = new swffgUIModule();
    swffgUIModule.singleton.init();
});
