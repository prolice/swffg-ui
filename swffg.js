
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
    if (!game.settings.get("swffg-ui", "initialized") && game.user.isGM)
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