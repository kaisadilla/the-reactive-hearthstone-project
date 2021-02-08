import { openDB, deleteDB, wrap, unwrap } from "idb";

class HsDB {
    static db = undefined;

    static DB_NAME = "hearth";
    static VERSION = 1;
    static STORE_NAME = "decks";

    static async openDatabase () {
        return new Promise (async (resolve, reject) => {
            HsDB.db = await openDB(HsDB.DB_NAME, HsDB.VERSION, {
                upgrade (db, oldVersion, newVersion, transaction) {
                    let store = db.createObjectStore(HsDB.STORE_NAME, {keyPath: "id", autoIncrement: true});
                    store.createIndex("class", "class", {unique: false});
                },
                blocked () { resolve(false); },
                terminated () { resolve (false) },
            });
            resolve(true);
        });
    }

    static async getDeckById (id) {
        return new Promise (async (resolve, reject) => {
            const deck = (await this._openDeckStore("readonly")).get(id);
            resolve(deck);
        });
    }

    static async getAllDecks () {
        return new Promise (async (resolve, reject) => {
            const deckStore = await this._openDeckStore("readonly");
            let decks = []
            let cursor = await deckStore.openCursor();
            while (cursor) {
                decks.push({id: cursor.key, ...cursor.value});
                cursor = await cursor.continue();
            }
            resolve(decks);
        });
    }

    /*static getAllDeckxxs () {
        let deckStore = Database._openDeckStore("readonly");

        let decks = []
        deckStore.openCursor().onsuccess = evt => {
            let cursor = evt.target.result;
            if (cursor) {
                decks.push({id: cursor.key, ...cursor.value});
                cursor.continue();
            }
            else {
                console.log(decks);
            }
        }
    }*/

    static async _openDeckStore(readMode = "readwrite") {
        return new Promise (async (resolve, reject) => {
            const deckStore = await HsDB.db.transaction(HsDB.STORE_NAME).objectStore(HsDB.STORE_NAME);
            resolve(deckStore);
        });
    }

    static async SayWhat () {
        return new Promise ((resolve, reject) => {
            setTimeout(() => resolve({content: "WHAT"}), 3000);
        });
    }
}

/*this.db = event.target.result;
let store = Database.db.createObjectStore(Database.STORE_NAME, {keyPath: "id", autoIncrement: true});
store.createIndex("class", "class", {unique: false});
store.transaction.oncomplete = evt => {
    let deckStore = Database.db.transaction(Database.STORE_NAME, "readwrite").objectStore(Database.STORE_NAME);
    deck.forEach(d => {
        deckStore.add(d);
    });
}*/

export default HsDB;