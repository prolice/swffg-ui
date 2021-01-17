
Hooks.on("setup", () => {
    // Register Advantage cap
    game.settings.register("swffg-core", "initialized", {
    name: "Initialization",
    scope: "world",
    config: false,
    default: false,
    type: Boolean
    });

    const SWFFG = game.swffg.config

    // Species
    /*SWFFG.species = {
        "human": "Human",
        "dwarf": "Dwarf",
        "halfling": "Halfling",
        "helf": "High Elf",
        "welf": "Wood Elf",
    };

    SWFFG.speciesCharacteristics = {
        "human": {
            "ws": "2d10+20",
            "bs": "2d10+20",
            "s": "2d10+20",
            "t": "2d10+20",
            "i": "2d10+20",
            "ag": "2d10+20",
            "dex": "2d10+20",
            "int": "2d10+20",
            "wp": "2d10+20",
            "fel": "2d10+20"
        },
        "dwarf": {
            "ws": "2d10+30",
            "bs": "2d10+20",
            "s": "2d10+20",
            "t": "2d10+30",
            "i": "2d10+20",
            "ag": "2d10+10",
            "dex": "2d10+30",
            "int": "2d10+20",
            "wp": "2d10+40",
            "fel": "2d10+10"
        },
        "halfling": {
            "ws": "2d10+10",
            "bs": "2d10+30",
            "s": "2d10+10",
            "t": "2d10+20",
            "i": "2d10+20",
            "ag": "2d10+20",
            "dex": "2d10+30",
            "int": "2d10+20",
            "wp": "2d10+30",
            "fel": "2d10+30"
        },
        "helf": {
            "ws": "2d10+30",
            "bs": "2d10+30",
            "s": "2d10+20",
            "t": "2d10+20",
            "i": "2d10+40",
            "ag": "2d10+30",
            "dex": "2d10+30",
            "int": "2d10+30",
            "wp": "2d10+30",
            "fel": "2d10+20"
        },
        "welf": {
            "ws": "2d10+30",
            "bs": "2d10+30",
            "s": "2d10+20",
            "t": "2d10+20",
            "i": "2d10+40",
            "ag": "2d10+30",
            "dex": "2d10+30",
            "int": "2d10+30",
            "wp": "2d10+30",
            "fel": "2d10+20"
        },

    }

    SWFFG.speciesSkills = {
        "human": [
            "Animal Care",
            "Charm",
            "Cool",
            "Evaluate",
            "Gossip",
            "Haggle",
            "Language (Bretonnian)",
            "Language (Wastelander)",
            "Leadership",
            "Lore (Reikland)",
            "Melee (Basic)",
            "Ranged (Bow)"
        ],
        "dwarf": [
            "Consume Alcohol",
            "Cool",
            "Endurance",
            "Entertain (Storytelling)",
            "Evaluate",
            "Intimidate",
            "Language (Khazalid)",
            "Lore (Dwarfs)",
            "Lore (Geology)",
            "Lore (Metallurgy)",
            "Melee (Basic)",
            "Trade (any one)"
        ],
        "halfling": [
            "Charm",
            "Consume Alcohol",
            "Dodge",
            "Gamble",
            "Haggle",
            "Intuition",
            "Language (Mootish)",
            "Lore (Reikland)",
            "Perception",
            "Sleight of Hand",
            "Stealth (Any)",
            "Trade (Cook)"
        ],
        "helf": [
            "Cool",
            "Entertain (Sing)",
            "Evaluate",
            "Language (Eltharin)",
            "Leadership",
            "Melee (Basic)",
            "Navigation",
            "Perception",
            "Play (any one)",
            "Ranged (Bow)",
            "Sail",
            "Swim"
        ],
        "welf": [
            "Athletics",
            "Climb",
            "Endurance",
            "Entertain (Sing)",
            "Intimidate",
            "Language (Eltharin)",
            "Melee (Basic)",
            "Outdoor Survival",
            "Perception",
            "Ranged (Bow)",
            "Stealth (Rural)",
            "Track"
        ],
    }

    SWFFG.speciesTalents = {
        "human": [
            "Doomed",
            "Savvy, Suave",
            3
        ],
        "dwarf": [
            "Magic Resistance",
            "Night Vision",
            "Read/Write, Relentless",
            "Resolute, Strong-minded",
            "Sturdy",
            0
        ],
        "halfling": [
            "Acute Sense (Taste)",
            "Night Vision",
            "Resistance (Chaos)",
            "Small",
            2
        ],
        "helf": [
            "Acute Sense (Sight)",
            "Coolheaded, Savvy",
            "Night Vision",
            "Second Sight, Sixth Sense",
            "Read/Write",
            0
        ],
        "welf": [
            "Acute Sense (Sight)",
            "Hardy, Second Sight",
            "Night Vision",
            "Read/Write, Very Resilient",
            "Rover",
            0
        ] 
    }

    SWFFG.speciesMovement = {
        "human": 4,
        "dwarf": 3,
        "halfling": 3,
        "helf": 5,
        "welf": 5
    }

    SWFFG.speciesFate = {
        "human": 2,
        "dwarf": 0,
        "halfling": 0,
        "helf": 0,
        "welf": 0
    }

    SWFFG.speciesRes = {
        "human": 1,
        "dwarf": 2,
        "halfling": 2,
        "helf": 0,
        "welf": 0
    }

    SWFFG.speciesExtra = {
        "human": 3,
        "dwarf": 2,
        "halfling": 3,
        "helf": 2,
        "welf": 2
    }

    SWFFG.speciesAge = {
        "human": "15+1d10",
        "dwarf": "15+10d10",
        "halfling": "15+5d10",
        "helf": "30+10d10",
        "welf": "30+10d10"
    }

    SWFFG.speciesHeight = {
        "human": {
            feet: 4,
            inches: 9,
            die: "2d10"
        },
        "dwarf": {
            feet: 4,
            inches: 3,
            die: "1d10"
        },
        "halfling": {
            feet: 3,
            inches: 1,
            die: "1d10"
        },
        "helf": {
            feet: 5,
            inches: 11,
            die: "1d10"
        },
        "welf": {
            feet: 5,
            inches: 11,
            die: "1d10"
        }
    }

    SWFFG.classTrappings = {
        "Academics": "ClassTrappings.Academics",
        "Burghers": "ClassTrappings.Burghers",
        "Courtiers": "ClassTrappings.Courtiers",
        "Peasants": "ClassTrappings.Peasants",
        "Rangers": "ClassTrappings.Rangers",
        "Riverfolk": "ClassTrappings.Riverfolk",
        "Rogues": "ClassTrappings.Rogues",
        "Warriors": "ClassTrappings.Warriors",
    }



    // Weapon Group Descriptions
    SWFFG.weaponGroupDescriptions = {
        "basic": "Basic",
        "cavalry": "WFRP4E.GroupDescription.Cavalry",
        "fencing": "Fencing",
        "brawling": "Brawling",
        "flail": "WFRP4E.GroupDescription.Flail",
        "parry": "WFRP4E.GroupDescription.Parry",
        "polearm": "Polearm",
        "twohanded": "Two-Handed",
        "blackpowder": "WFRP4E.GroupDescription.Blackpowder",
        "bow": "Bow",
        "crossbow": "WFRP4E.GroupDescription.Crossbow",
        "entangling": "Entangling",
        "engineering": "WFRP4E.GroupDescription.Engineering",
        "explosives": "WFRP4E.GroupDescription.Explosives",
        "sling": "Sling",
        "throwing": "WFRP4E.GroupDescription.Throwing",
    };

    // Weapon reach descriptions
    SWFFG.reachDescription = {
        "personal": "WFRP4E.Reach.PersonalDescription",
        "vshort": "WFRP4E.Reach.VShortDescription",
        "short": "WFRP4E.Reach.ShortDescription",
        "average": "WFRP4E.Reach.AverageDescription",
        "long": "WFRP4E.Reach.LongDescription",
        "vLong": "WFRP4E.Reach.VLongDescription",
        "massive": "WFRP4E.Reach.MassiveDescription",
    }

    // Weapon Quality Descriptions (Used in dropdown info)
    SWFFG.qualityDescriptions = {
        "accurate": "WFRP4E.Properties.Accurate",
        "blackpowder": "WFRP4E.Properties.Blackpowder",
        "blast": "WFRP4E.Properties.Blast",
        "damaging": "WFRP4E.Properties.Damage",
        "defensive": "WFRP4E.Properties.Defensive",
        "distract": "WFRP4E.Properties.Distract",
        "entangle": "WFRP4E.Properties.Entangle",
        "fast": "WFRP4E.Properties.Fast",
        "hack": "WFRP4E.Properties.Hack",
        "impact": "WFRP4E.Properties.Impact",
        "impale": "WFRP4E.Properties.Impale",
        "penetrating": "WFRP4E.Properties.Penetrating",
        "pistol": "WFRP4E.Properties.Pistol",
        "precise": "WFRP4E.Properties.Precise",
        "pummel": "WFRP4E.Properties.Pummel",
        "repeater": "WFRP4E.Properties.Repeater",
        "shield": "WFRP4E.Properties.Shield",
        "trapblade": "WFRP4E.Properties.Trapblade",
        "unbreakable": "WFRP4E.Properties.Unbreakable",
        "wrap": "WFRP4E.Properties.Wrap",
        "flexible": "WFRP4E.Properties.Flexible",
        "impenetrable": "WFRP4E.Properties.Impenetrable",
        "durable": "WFRP4E.Properties.Durable",
        "fine": "WFRP4E.Properties.Fine",
        "lightweight": "WFRP4E.Properties.Lightweight",
        "practical": "WFRP4E.Properties.Practical",
    };

    // Weapon Flaw Descriptions (used in dropdown info)
    SWFFG.flawDescriptions = {
        "dangerous": "WFRP4E.Properties.Dangerous",
        "imprecise": "WFRP4E.Properties.Imprecise",
        "reload": "WFRP4E.Properties.Reload",
        "slow": "WFRP4E.Properties.Slow",
        "tiring": "WFRP4E.Properties.Tiring",
        "undamaging": "WFRP4E.Properties.Undamaging",
        "partial": "WFRP4E.Properties.Partial",
        "weakpoints": "WFRP4E.Properties.Weakpoints",
        "ugly": "WFRP4E.Properties.Ugly",
        "shoddy": "WFRP4E.Properties.Shoddy",
        "unreliable": "WFRP4E.Properties.Unreliable",
        "bulky": "WFRP4E.Properties.Bulky"
    };

    SWFFG.loreEffect = {
        "petty": "None",
        "beasts": "WFRP4E.LoreDescription.Beasts",
        "death": "WFRP4E.LoreDescription.Death",
        "fire": "WFRP4E.LoreDescription.Fire",
        "heavens": "WFRP4E.LoreDescription.Heavens",
        "metal": "WFRP4E.LoreDescription.Metal",
        "life": "WFRP4E.LoreDescription.Life",
        "light": "WFRP4E.LoreDescription.Light",
        "shadow": "WFRP4E.LoreDescription.Shadow",
        "hedgecraft": "WFRP4E.LoreDescription.Hedgecraft",
        "witchcraft": "WFRP4E.LoreDescription.Witchcraft",
        "daemonology": "",
        "necromancy": "",
        "nurgle": "",
        "slaanesh": "",
        "tzeentch": "",
    };

    SWFFG.conditionDescriptions = {
        "ablaze": "WFRP4E.Conditions.Ablaze",
        "bleeding": "WFRP4E.Conditions.Bleeding",
        "blinded": "WFRP4E.Conditions.Blinded",
        "broken": "WFRP4E.Conditions.Broken",
        "deafened": "WFRP4E.Conditions.Deafened",
        "entangled": "WFRP4E.Conditions.Entangled",
        "fatigued": "WFRP4E.Conditions.Fatigued",
        "poisoned": "WFRP4E.Conditions.Poisoned",
        "prone": "WFRP4E.Conditions.Prone",
        "stunned": "WFRP4E.Conditions.Stunned",
        "surprised": "WFRP4E.Conditions.Surprised",
        "unconscious": "WFRP4E.Conditions.Unconscious",
        "grappling": "WFRP4E.Conditions.Grappling",
        "fear": "WFRP4E.Conditions.Fear",
    }

    SWFFG.symptoms = {
        "blight": "Blight",
        "buboes": "Buboes",
        "convulsions": "Convulsions",
        "coughsAndSneezes": "Coughs and Sneezes",
        "fever": "Fever",
        "flux": "Flux",
        "gangrene": "Gangrene",
        "lingering": "Lingering",
        "malaise": "Malaise",
        "nausea": "Nausea",
        "pox": "Pox",
        "wounded": "Wounded",
        "delirium": "Delirium",
        "swelling": "Swelling"
    }

    SWFFG.symptomDescriptions = {
        "blight": "WFRP4E.SymptomDescriptions.Blight",
        "buboes": "WFRP4E.SymptomDescriptions.Buboes",
        "convulsions": "WFRP4E.SymptomDescriptions.Convulsions",
        "coughsAndSneezes": "WFRP4E.SymptomDescriptions.CoughsandSneezes",
        "fever": "WFRP4E.SymptomDescriptions.Fever",
        "flux": "WFRP4E.SymptomDescriptions.Flux",
        "gangrene": "WFRP4E.SymptomDescriptions.Gangrene",
        "lingering": "WFRP4E.SymptomDescriptions.Lingering",
        "malaise": "WFRP4E.SymptomDescriptions.Malaise",
        "nausea": "WFRP4E.SymptomDescriptions.Nausea",
        "pox": "WFRP4E.SymptomDescriptions.Pox",
        "wounded": "WFRP4E.SymptomDescriptions.Wounded",
        "delirium": "WFRP4E.SymptomDescriptions.Delirium",
    }

    SWFFG.symptomTreatment = {
        "blight": "WFRP4E.SymptomTreatment.Blight",
        "buboes": "WFRP4E.SymptomTreatment.Buboes",
        "convulsions": "WFRP4E.SymptomTreatment.Convulsions",
        "coughsAndSneezes": "WFRP4E.SymptomTreatment.CoughsandSneezes",
        "fever": "WFRP4E.SymptomTreatment.Fever",
        "flux": "WFRP4E.SymptomTreatment.Flux",
        "gangrene": "WFRP4E.SymptomTreatment.Gangrene",
        "lingering": "WFRP4E.SymptomTreatment.Lingering",
        "malaise": "WFRP4E.SymptomTreatment.Malaise",
        "nausea": "WFRP4E.SymptomTreatment.Nausea",
        "pox": "WFRP4E.SymptomTreatment.Pox",
        "wounded": "WFRP4E.SymptomTreatment.Wounded",
        "delirium": "WFRP4E.SymptomTreatment.Delirium",
    }

    SWFFG.conditionDescriptions = {
        "ablaze": "WFRP4E.Conditions.Ablaze",
        "bleeding": "WFRP4E.Conditions.Bleeding",
        "blinded": "WFRP4E.Conditions.Blinded",
        "broken": "WFRP4E.Conditions.Broken",
        "deafened": "WFRP4E.Conditions.Deafened",
        "entangled": "WFRP4E.Conditions.Entangled",
        "fatigued": "WFRP4E.Conditions.Fatigued",
        "poisoned": "WFRP4E.Conditions.Poisoned",
        "prone": "WFRP4E.Conditions.Prone",
        "stunned": "WFRP4E.Conditions.Stunned",
        "surprised": "WFRP4E.Conditions.Surprised",
        "unconscious": "WFRP4E.Conditions.Unconscious",
        "grappling": "WFRP4E.Conditions.Grappling",
        "fear": "WFRP4E.Conditions.Fear",
    }*/

    // WFRP4E.conditionScripts = {
    //     ablaze : (actor) => {
    //             let effects =  actor.constructor.consolidateEffects(actor.data.effects)
    //             let ablaze = effects.find(e => getProperty(e, "flags.wfrp4e.key") == "ablaze")
    //             if (ablaze)
    //             {
    //                 ui.notifications.notify("Ablaze: " + ablaze.flags.wfrp4e.value)
    //             }
    //         }
    //     }

    // WFRP4E.activeEffects = {
    //     "ablaze" : {
    //         label: "Ablaze",
    //         icon: "systems/wfrp4e/icons/conditions/ablaze1.png",
    //         flags : {
    //             "wfrp4e.trigger" : "endTurn",
    //             "wfrp4e.value" : 1,
    //             "wfrp4e.key" : "ablaze",
    //             "wfrp4e.action" : (actor) => {
    //                 let effects =  actor.constructor.consolidateEffects(actor.data.effects)
    //                 let ablaze = effects.find(e => getProperty(e, "flags.wfrp4e.key") == "ablaze")
    //                 if (ablaze)
    //                 {
    //                     ui.notifications.notify("Ablaze: " + ablaze.flags.wfrp4e.value)
    //                 }
    //             }
    //         }
    //     }
    // }
})

Hooks.on("setup", () => {
    let SWFFG = game.swffg.config
    for (let obj in SWFFG)
    {
      for (let el in SWFFG[obj])
      {
        if (typeof SWFFG[obj][el] === "string")
        {
          SWFFG[obj][el] = game.i18n.localize(SWFFG[obj][el])
        }
      }
    }
})



Hooks.on("ready", () => {
    if (!game.settings.get("swffg-core", "initialized") && game.user.isGM)
        new SWFFGContentInitialization().render(true)
})

/*Hooks.once('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({ id: "wfrp-coin", name: "WFRP Coin" }, false);
    dice3d.addDicePreset({
        type: "dc",
        labels: [
            'modules/wfrp4e-core/art/other/coin-tails.png',
            'modules/wfrp4e-core/art/other/coin-heads.png',
        ],
        bumpMaps: [
            'modules/wfrp4e-core/art/other/coin-tails_bump.png',
            'modules/wfrp4e-core/art/other/coin-heads_bump.png',
        ],
        system: "wfrp-coin",
        colorset: "wfrp-coin"
    });
    dice3d.addColorset({
        name: 'wfrp-coin',
        description: "WFRP Coin",
        category: "WFRP",
        foreground: '#000000',
        background: "#988f86",
        texture: 'none',
        edge: '#988f86',
        material: 'metal'
    },"no");
})*/


async function createCareerJournals() 
{
    /*let eisitems = await game.packs.get("wfrp4e-eis.eisitems").getContent()
    let careers = await game.packs.get("wfrp4e-core.careers").getContent()
    let skills = await game.packs.get("wfrp4e-core.skills").getContent()
    let talents = await game.packs.get("wfrp4e-core.talents").getContent()

    careers = eisitems.filter( i => i.data.type == "career")
    talents = talents.concat(eisitems.filter( i => i.data.type == "talent"))

    let careerMap = {}
    careers.forEach(career => {
        if (!careerMap[career.data.data.careergroup.value])
        {
            careerMap[career.data.data.careergroup.value]= [career.data]
        }
        else
        {
            careerMap[career.data.data.careergroup.value].push(career.data)
        }
    })
    for(careerGroup in careerMap)
    {
        careerMap[careerGroup] = careerMap[careerGroup].sort((a, b) => Number(a.data.level.value) - Number(b.data.level.value))
    }

    let romanNumerals = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV"
    }
    for(careerGroup in careerMap)
    {
        console.log(careerGroup)
        let journalData = {};
        journalData.name = careerGroup

        let speciesAvailable = [];

        // let ranges = game.wfrp4e.tables.career.rows.find(r => r.name == careerGroup).range

        // for (let species in ranges)
        // {
        //     if (ranges[species].length > 0)
        //         speciesAvailable.push(game.wfrp4e.config.species[species])
        // }

        journalData.img = `modules/wfrp4e-core/art/careers/${careerGroup.toLowerCase()}.png`
        journalData.content = `
        <blockquote>
        <p>&nbsp;</p>
        </blockquote>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p><strong>Species:&nbsp;</strong>${speciesAvailable.join(", ")}</p>
        <p><strong>Class:&nbsp;</strong>${careerMap[careerGroup][0].data.class.value}</p>
        <h3 style="text-align: center">${careerGroup} Advance Scheme</h3>
        <table style="height: 34px;" border="1">
        <tbody>
        <tr style="height: 17px;">
        <td style="height: 17px; width: 60px; text-align: center;">WS</td>
        <td style="height: 17px; width: 60px; text-align: center;">BS</td>
        <td style="height: 17px; width: 60px; text-align: center;">S</td>
        <td style="height: 17px; width: 61px; text-align: center;">T</td>
        <td style="height: 17px; width: 61px; text-align: center;">I</td>
        <td style="height: 17px; width: 61px; text-align: center;">Agi</td>
        <td style="height: 17px; width: 61px; text-align: center;">Dex</td>
        <td style="height: 17px; width: 61px; text-align: center;">Int</td>
        <td style="height: 17px; width: 61px; text-align: center;">WP</td>
        <td style="height: 17px; width: 61px; text-align: center;">Fel</td>
        </tr>
        <tr style="height: 17px;">
        <td style="height: 17px; width: 60px; text-align: center;">@ws</td>
        <td style="height: 17px; width: 60px; text-align: center;">@bs</td>
        <td style="height: 17px; width: 60px; text-align: center;">@s</td>
        <td style="height: 17px; width: 61px; text-align: center;">@t</td>
        <td style="height: 17px; width: 61px; text-align: center;">@i</td>
        <td style="height: 17px; width: 61px; text-align: center;">@ag</td>
        <td style="height: 17px; width: 61px; text-align: center;">@dex</td>
        <td style="height: 17px; width: 61px; text-align: center;">@int</td>
        <td style="height: 17px; width: 61px; text-align: center;">@wp</td>
        <td style="height: 17px; width: 61px; text-align: center;">@fel</td>
        </tr>
        </tbody>
        </table>
        `
        let characteristicPlaced = [];

        for (career of careerMap[careerGroup])
        {
            for (char in game.wfrp4e.config.characteristics)
            {
                if (!characteristicPlaced.includes(char) && career.data.characteristics.includes(char))
                {
                    journalData.content = journalData.content.replace(`@${char}<`, romanNumerals[career.data.level.value]+"<")
                }
            }
            if (career.data.level.value == 4)
            {
                for (char in game.wfrp4e.config.characteristics)
                {
                    if (!characteristicPlaced.includes(char))
                    {
                        journalData.content = journalData.content.replace(`@${char}<`, '&nbsp;<')
                    }
                }
            }

            switch(Number(career.data.level.value))
            {
                case 1:
                break;
                case 2:
                    career.data.skills = career.data.skills.slice(8, 14)
                break;
                case 3:
                    career.data.skills = career.data.skills.slice(14, 18)
                break;
                case 4:
                    career.data.skills = career.data.skills.slice(18, 20)
                    break;
            }
            
            let linkedSkills = career.data.skills.map((sk, i) => {
                let skillText = createLink(sk, skills, "skills")
                if (career.data.incomeSkill.includes(i) && career.data.level.value == 1)
                    skillText = `<i>${skillText}</i>`
                return skillText
            }).join(", ")

            console.log(talents)
            let linkedTalents = career.data.talents.map(t => {
                return createLink(t, talents, "talents")
            }).join(", ")

            console.log(linkedSkills)
            let text = 
            `
            <h3><b>${romanNumerals[career.data.level.value]}. ${createLink(career.name, careers, "careers")}</b></h3>
            <b>Status</b>: ${game.wfrp4e.config.statusTiers[career.data.status.tier]} ${career.data.status.standing}<br>
            <b>Skills</b>: ${linkedSkills}<br>
            <b>Talents</b>: ${linkedTalents}<br>
            <b>Trappings</b>: ${career.data.trappings.join(", ")}<br>
            <br>
            `

            journalData.content = journalData.content.concat(text)
        }

        journalData.name = "Cult Magus of Tzeentch"
        JournalEntry.create(journalData)
    }*/


}

function createLink(itemName, list, type)
{
    /*if (type == "talents")
        console.log(itemName, type)
    let item;
    if (!list.find(i => i.data.name == itemName))
    {
        item = list.find(s => s.name.split("(")[0].trim() == itemName.split("(")[0].trim())
    }
    else 
        item = list.find(i => i.data.name == itemName)

    let id = item.data._id

    return `@Compendium[wfrp4e-core.${type}.${id}]{${itemName}}`*/
}