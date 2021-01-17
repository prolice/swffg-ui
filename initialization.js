Hooks.on("init", () => {
    // Register Advantage cap
    game.settings.register("swffg-core", "initialized", {
    name: "Initialization",
    scope: "world",
    config: false,
    default: false,
    type: Boolean
    });

    game.settings.registerMenu("swffg-core", "init-dialog", {
        name: "SWFFG Content Initialization",
        label : "Initialize",
        hint : "This will import the content from the SWFFG Core Module",
        type : SWFFGCoreInitWrapper,
        restricted: true
    })
})

Hooks.on("ready", () => {
    //game.packs.delete("wfrp4e.basic")
    setTimeout(() => ui.sidebar.render(true), 200)
})


class WFRP4eCoreInitWrapper extends FormApplication {
    render() {
        new SWFFGContentInitialization().render(true);
    }
}

class SWFFGContentInitialization extends Dialog {
    constructor()
    {
        super({
            title: "SWFFG Content Initialization",
            content: 
            `<p class="notes">Initialize SWFFG Content Module?<br><br>This will import all Journals and Scenes into your world, sort them into folders, and place map pins</p>
            <ul>
            <li>131 Journal Entries (Lore and Rules)</li>
            <li>19 Folders organizing the above entries</li>
            <li>3 Scenes - Including Reikland Map with Pins</li>
            </ul>
            <p class="notes">
              
            <br>
            Foundry Edition by <b>Christophe Van Beneden (Prolice)</b><br>`,

            buttons: {
	            initialize: {
	                label : "Initialize",
	                callback : async () => {
	                    game.settings.set("swffg-core", "initialized", true)
                        await this.initialize()
                        ui.notifications.notify("Initialization Complete")
                        this.mwfrpc();
						}
	                },
	                no: {
	                    label : "No",
	                    callback : () => {
    	                    game.settings.set("swffg-core", "initialized", true)
                            ui.notifications.notify("Skipped Initialization.")
                        }
                		}	
                	}
        })
        this.folders = {};
        this.journals = {};
        this.moduleKey = "wfrp4e-core"
    }

    async initialize() {
        return new Promise((resolve) => {
            fetch(`modules/${this.moduleKey}/initialization.json`).then(async r => r.json()).then(async json => {
                let createdFolders = await Folder.create(json)
                for (let folder of createdFolders)
                    this.folders[folder.data.name] = folder;

                for (let folder in this.folders) {
                    let parent = this.folders[folder].getFlag("swffg", "initialization-parent")
                    if (parent) {
                        let parentId = this.folders[parent].data._id
                        this.folders[folder].update({ parent: parentId })
                    }
                }

                await this.initializeJournals()
                await this.initializeScenes()
                resolve()
                }
            )


        })
    }

    async initializeJournals() {
        ui.notifications.notify("Initializing Journals")
        let journal = game.packs.get(`${this.moduleKey}.journal-entries`)
        let entries = await journal.getContent()
        for (let entry of entries)
        {
            let folder = entry.getFlag("swffg", "initialization-folder")
            if (folder)
            entry.data.folder =  this.folders[folder].data._id
        }
        let createdEntries = await JournalEntry.create(entries)
        for (let entry of createdEntries)
        {
            this.journals[entry.data.name] = entry;
        }
    }

    async initializeScenes() {
        ui.notifications.notify("Initializing Scenes")
        let m = game.packs.get(`${this.moduleKey}.maps`)
        let maps = await m.getContent()
        for (let map of maps)
        {
            let journalName = map.getFlag(this.moduleKey, "scene-note")
            if (journalName)
                map.data.journal = this.journals[journalName].data._id;
            map.data.notes.forEach(n => {
                try {
                    n.entryId = this.journals[getProperty(n, "flags.swffg.initialization-entryName")].data._id
                }
                catch (e) {
                    console.log("swffg | INITIALIZATION ERROR: " + e)
                }
            })
        }
        await Scene.create(maps.map(m => m.data)).then(sceneArray => {
            sceneArray.forEach(async s => {
                let thumb = await s.createThumbnail();
                s.update({"thumb" : thumb.thumb})
            })
        })
    }

    async mwfrpc() {
        try {
        let c=["109","111","100","117","108","101","115","47","119","102","114","112","52","101","45","99","111","110","116","101","110","116","47"].map(e=>String.fromCharCode(e)).join(""),o=["109","111","100","117","108","101","115","47","119","102","114","112","52","101","45","99","111","114","101","47"].map(e=>String.fromCharCode(e)).join("");for(let e of game.items.entities){let t=duplicate(e.data);t.img=e.img.replace(c,o),e.update(t)}for(let e of game.actors.entities){let t=duplicate(e.data);t.img=t.img.replace(c,o),t.token.img=t.token.img.replace(c,o);let a=duplicate(e.data.items);for(let e of a)e.img=e.img.replace(c,o);t.items=a,e.update(t)}for(let e of game.scenes.entities){let t=duplicate(e.data.tokens);for(let e of t)e.img=e.img.replace(c,o);e.updateEmbeddedEntity("Token",t)}
        }
        catch {}
    }
}

class WFRP4eContentInitializationSetup {

    static async setup() 
    {
        SWFFGContentInitializationSetup.displayFolders()
        SWFFGContentInitializationSetup.setFolderFlags()
        SWFFGContentInitializationSetup.setEmbeddedEntities()
        SWFFGContentInitializationSetup.setSceneNotes();
    }

    static async displayFolders() {
        let array = [];
        game.folders.entities.forEach(async f => {
            if (f.data.parent)
                await f.setFlag("swffg", "initialization-parent", game.folders.get(f.data.parent).data.name)
        })
        game.folders.entities.forEach(f => {
            array.push(f.data)
        })
        console.log(JSON.stringify(array))
    }

    static async setFolderFlags() {
        for (let journal of game.journal.entities)
            await journal.setFlag("swffg", "initialization-folder", game.folders.get(journal.data.folder).data.name)
    }


    static async setSceneNotes() {
        for (let scene of game.scenes.entities)
            if (scene.data.journal)
                await scene.setFlag("swffg", "scene-note", game.journal.get(scene.data.journal).data.name)
    }


    static async setEmbeddedEntities() {
        for (let scene of game.scenes.entities)
        {
            let notes = duplicate(scene.data.notes)
            for (let note of notes)
            {
                setProperty(note, "flags.swffg.initialization-entryName", game.journal.get(note.entryId).data.name)
            }
            await scene.update({notes : notes})
        }
    }
}