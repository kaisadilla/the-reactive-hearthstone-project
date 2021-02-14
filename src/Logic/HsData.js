//import varint from "varint";
import { encode, decode, FormatType } from "deckstrings";

class HsData {
    static collectibleCards;
    static expansions;

    static getCardById (id) {
        return HsData.collectibleCards.find(e => e.id === id);
    }

    static getCardByDbf (dbf) {
        return HsData.collectibleCards.find(e => e.dbfId === dbf);
    }

    static getExpSymbol (expId) {
        if (HsData.expansions[expId] === undefined) {
            return "unknown";
        }
        else {
            return HsData.expansions[expId]["symbol"];
        }
    }

    static getClassName (className) {
        if (className === "DEMONHUNTER") return "Demon hunter";
        if (className === "DRUID")       return "Druid";
        if (className === "HUNTER")      return "Hunter";
        if (className === "MAGE")        return "Mage";
        if (className === "PALADIN")     return "Paladin";
        if (className === "PRIEST")      return "Priest";
        if (className === "ROGUE")       return "Rogue";
        if (className === "SHAMAN")      return "Shaman";
        if (className === "WARLOCK")     return "Warlock";
        if (className === "WARRIOR")     return "Warrior";
        if (className === "NEUTRAL")     return "Neutral";
        return className;
    }

    static getTypeName (type) {
        if (type === "MINION") return "Minion";
        if (type === "SPELL")  return "Spell";
        if (type === "WEAPON") return "Weapon";
        if (type === "HERO")   return "Hero";
        return type;
    }
    
    static getRaceName (race) {
        console.log(race);
        if (race === "ALL")        return "All";
        if (race === "BEAST")      return "Beast";
        if (race === "DEMON")      return "Demon";
        if (race === "DRAGON")     return "Dragon";
        if (race === "ELEMENTAL")  return "Elemental";
        if (race === "MECHANICAL") return "Mech";
        if (race === "MURLOC")     return "Murloc";
        if (race === "PIRATE")     return "Pirate";
        if (race === "TOTEM")      return "Totem";
        if (race === undefined)    return "–";
        return race;
    }
    
    static getRarityName (rarity) {
        if (rarity === "FREE")      return "Basic";
        if (rarity === "COMMON")    return "Common";
        if (rarity === "RARE")      return "Rare";
        if (rarity === "EPIC")      return "Epic";
        if (rarity === "LEGENDARY") return "Legendary";
        return rarity;
    }

    /**
     * Returns the id of the card associated with the given hero (e.g. for the class "MAGE" returns the id "HERO_08" of the card "Jaina Proudmoore") for mage).
     * @param {*} hero The internal name of the hero (e.g. "DEMONHUNTER")
     */
    static getClassHeroId (hero) {
        switch (hero) {
            case "WARRIOR"     : return "HERO_01";
            case "SHAMAN"      : return "HERO_02";
            case "ROGUE"       : return "HERO_03";
            case "PALADIN"     : return "HERO_04";
            case "HUNTER"      : return "HERO_05";
            case "DRUID"       : return "HERO_06";
            case "WARLOCK"     : return "HERO_07";
            case "MAGE"        : return "HERO_08";
            case "PRIEST"      : return "HERO_09";
            case "DEMONHUNTER" : return "HERO_10";
        }
    }

    /**
     * Returns the name of the class corresponding to a certain hero card id.
     * @param {*} hero The id of the card that represents the hero of said deck (e.g. "HERO_01" for "WARRIOR")
     */
    static getClassNameFromId (hero) {
        switch (hero) {
            case "HERO_01" : return "WARRIOR"    ;
            case "HERO_02" : return "SHAMAN"     ;
            case "HERO_03" : return "ROGUE"      ;
            case "HERO_04" : return "PALADIN"    ;
            case "HERO_05" : return "HUNTER"     ;
            case "HERO_06" : return "DRUID"      ;
            case "HERO_07" : return "WARLOCK"    ;
            case "HERO_08" : return "MAGE"       ;
            case "HERO_09" : return "PRIEST"     ;
            case "HERO_10" : return "DEMONHUNTER";
        }
    }

    static decodeDeckCode (code) {
        try {
            const prototypeDeck = decode(code);
            const deck = {
                class: HsData.getClassNameFromId(HsData.getCardByDbf(prototypeDeck.heroes[0])["id"]),
                cards: [],
            }
            for (let c of prototypeDeck.cards) {
                // c[a, b] where a is the card dbf id and b is the amount of said card.
                for (let i = 0; i < c[1]; i++) {
                    deck.cards.push(HsData.getCardByDbf(c[0])["id"]);
                }
            }
            return deck;
        }
        catch {
            return null;
        }
    }

    static encodeDeckCode (className, cards) {
        if (!(className && cards)) return;
        const prototypeDeck = {
            cards: [],
            heroes: [HsData.getCardById(HsData.getClassHeroId(className))["dbfId"]],
            format: 1,
        }

        let i = 0;
        while (i < cards.length) {
            let cardId = cards[i];
            let totalAmount = cards.filter(c => c === cardId).length;

            let cardDbf = HsData.getCardById(cardId)["dbfId"];
            if (totalAmount === 1) prototypeDeck.cards.push([cardDbf, 1]);
            else prototypeDeck.cards.push([cardDbf, 2]);

            i += totalAmount;
        }

        console.log(encode(prototypeDeck));
        return encode(prototypeDeck);
    }

    static sortDeck (deckToSort) {
        let deck = deckToSort;
        if (deck === undefined) {
            return;
        };

        deck.sort((a, b) => {
            let cardA = HsData.getCardById(a);
            let cardB = HsData.getCardById(b);
            if (cardA["cost"] > cardB["cost"]) return 1;
            if (cardA["cost"] < cardB["cost"]) return -1;
            return cardA["name"] > cardB["name"];
        })

        return deck;
    }

    // TODO: This doesn't work at all.
    static stripTags (text) {
        if (typeof text === "string") {
            return HsData.normalizeCardText(text).replace("<b>", "").replace("</b>", "").replace(/<[^>]*>/, "");
        }
        else {
            return text;
        }
    }
    
    static normalizeCardText (text) {
        if (typeof text === "string") {
            return text.replace("$", "").replace("#", "").replace("[x]", "").replace(`'`, `"`);
        }
        else {
            return text;
        }
    }
}

export default HsData;