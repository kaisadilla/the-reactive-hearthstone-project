import { openDB, deleteDB, wrap, unwrap } from "idb";

class HsDB {
    static db = undefined;

    static DB_NAME = "hearth";
    static VERSION = 1;
    static STORE_NAME = "decks";

    static async openDatabase () {
        return new Promise(async (resolve, reject) => {
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
        return new Promise(async (resolve, reject) => {
            const deck = (await HsDB._openDeckStore("readonly")).get(id);
            resolve(deck);
        });
    }

    static async getAllDecks () {
        return new Promise(async (resolve, reject) => {
            const deckStore = await HsDB._openDeckStore("readonly");
            let decks = []
            let cursor = await deckStore.openCursor();
            while (cursor) {
                decks.push({id: cursor.key, ...cursor.value});
                cursor = await cursor.continue();
            }
            resolve(decks);
        });
    }
    
    /**
     * Inserts a deck in the database and returns the id assigned to it.
     * @param {*} deck The Deck to insert in the database.
     */
    static async insertDeck (deck) {
        return new Promise(async (resolve, reject) => {
            let deckId = (await HsDB._openDeckStore()).add(deck);
            resolve(deckId);
        })
    }

    static async updateDeck (id, deck) {
        return new Promise(async (resolve, reject) => {
            const deckStore = await HsDB._openDeckStore();
            const req = unwrap(deckStore.get(id));
            req.onsuccess = evt => {
                let storedDeck = evt.target.result;

                if (storedDeck === undefined) {
                    resolve(false);
                    return;
                }

                if ("name" in deck) storedDeck.name = deck.name;
                if ("class" in deck) storedDeck.class = deck.class;
                if ("cards" in deck) storedDeck.cards = deck.cards;
                let reqUpdate = deckStore.put(storedDeck);
    
                reqUpdate.onsuccess = evt => console.log(`Deck of id ${id} updated with ${deck}`);
                resolve(true); //TODO: This
            }
        });
    }

    static async deleteDeck (id) {
        return new Promise(async (resolve, reject) => {
            (await HsDB._openDeckStore()).delete(id);
            resolve(true);
        });
    }

    static async _openDeckStore(readMode = "readwrite") {
        return new Promise(async (resolve, reject) => {
            const deckStore = await HsDB.db.transaction(HsDB.STORE_NAME, readMode).objectStore(HsDB.STORE_NAME);
            resolve(deckStore);
        });
    }
}

export default HsDB;