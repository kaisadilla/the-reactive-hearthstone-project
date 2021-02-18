/*
 * ESTA CLASE UTILIZA LAS FUNCIONES NATIVAS PARA INDEXEDDB Y == NO SE UTILIZA EN EL PROYECTO ==.
 * LAS FUNCIONES UTILIZADAS SE ENCUENTRAN EN EL ARCHIVO HsDB.js.
 * Este archivo está aquí únicamente porque ya que la hice en su momento, pues ahí se queda.
 */
class __DEPRECATED_Database {
    static db = undefined;
    static VERSION = 3;
    static STORE_NAME = "decks";

    static openDatabase () {

        const deck = [{
            name: "Readme Warrior",
            class: "WARRIOR",
            cards: [
                "UNG_001", "UNG_001", "UNG_002", "UNG_002", "UNG_070", "UNG_073", "UNG_075", "UNG_075", "UNG_085"
            ]
        },
        {
            name: "Hehe Mage",
            class: "MAGE",
            cards: [
                "OG_001", "OG_001", "OG_002", "OG_002", "OG_070", "OG_073", "OG_075", "OG_075", "OG_085"
            ]
        }]

        let req = window.indexedDB.open("hearthproj", Database.VERSION);

        req.onsuccess = event => {
            Database.db = event.target.result;
        };

        req.onupgradeneeded = event => {
            this.db = event.target.result;
            let store = Database.db.createObjectStore(Database.STORE_NAME, {keyPath: "id", autoIncrement: true});
            store.createIndex("class", "class", {unique: false});
            store.transaction.oncomplete = evt => {
                let deckStore = Database.db.transaction(Database.STORE_NAME, "readwrite").objectStore(Database.STORE_NAME);
                deck.forEach(d => {
                    deckStore.add(d);
                });
            }
        }
    }

    static getAllDecks () {
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
    }

    static getDeckById (id) {
        let req = Database._openDeckStore("readonly").get(id);
        req.onsuccess = evt => console.log(req.result);
    }

    static getDecksByClass (className) {
        let deckStore = Database._openDeckStore();
        let index = deckStore.index("class");

        let decks = [];
        index.openCursor(className).onsuccess = evt => {
            let cursor = evt.target.result;
            if (cursor) {
                decks.push({id: cursor.key, ...cursor.value});
                cursor.continue();
            }
            else {
                console.log(decks);
            }
        }
    }

    static updateDeck (id, data) {
        let deckStore = Database._openDeckStore();
        let req = deckStore.get(id);
        req.onsuccess = evt => {
            let deck = evt.target.result;
            if ("name" in data) deck.name = data.name;
            if ("cards" in data) deck.cards = data.cards;
            let reqUpdate = deckStore.put(deck);

            reqUpdate.onsuccess = evt => console.log(`Deck of id ${id} updated with ${data}`);
        }
    }
    
    static addDeck (deck) {
        let deckStore = Database._openDeckStore();
        let req = deckStore.add(deck);
        req.onsuccess = evt => console.log(`Deck ${deck.name} added.`);
    }

    static deleteDeck (id) {
        let req = Database._openDeckStore().delete(id);
        req.onsuccess = evt => console.log(`Deck with id ${id} deleted.`);
    }

    static _openDeckStore (readmode = "readwrite") {
        return Database.db.transaction([Database.STORE_NAME], readmode).objectStore(Database.STORE_NAME);
    }
}

export default Database;