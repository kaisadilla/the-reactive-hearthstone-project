class HsData {
    static collectibleCards;
    static expansions;

    static getCardById (id) {
        return HsData.collectibleCards.find(e => e.id === id);
    }

    static getExpSymbol (expId) {
        return HsData.expansions[expId]["symbol"];
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