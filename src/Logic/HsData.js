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

    static getTypeName (type) {
        if (type === "MINION") return "Minion";
        if (type === "SPELL")  return "Spell";
        if (type === "WEAPON") return "Weapon";
        if (type === "HERO")   return "Hero";
        return type;
    }
    
    static getRaceName (race) {
        if (race === "ALL")        return "All";
        if (race === "BEAST")      return "Beast";
        if (race === "DEMON")      return "Demon";
        if (race === "DRAGON")     return "Dragon";
        if (race === "ELEMENTAL")  return "Elemental";
        if (race === "MECHANICAL") return "Mech";
        if (race === "MURLOC")     return "Murloc";
        if (race === "PIRATE")     return "Pirate";
        if (race === "TOTEM")      return "Totem";
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
     * Returns the id of the image associated with the given hero.
     * @param {*} hero The internal name of the hero (i.e. "DEMONHUNTER")
     */
    static getHeroImgId (hero) {
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