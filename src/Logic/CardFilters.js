import getLanguage from "../Logic/Language";

class CardFilters {
    checkQuery (query, card) {
        return card["name"][getLanguage()].toLowerCase().includes(query) || card["text"][getLanguage()].toLowerCase().includes(query);
    }

    checkClass (filterClass, card) {
        return filterClass.length === 0 || filterClass.includes(card["cardClass"]);
    }

    // As the cost filter only reaches 10, any card with cost higher than 10 will be shown if the filter "10+" is active.
    checkCost (filterCost, card) {
        if (filterCost.length === 0) {
            return true;
        }
        else {
            if (card["cost"] < 10) {
                return filterCost.includes(card["cost"]);
            }
            else {
                return filterCost.includes(10);
            }
        }
    }

    // "free" rarity is treated as "common".
    checkRarity (filterRarity, card) {
        if (filterRarity.length === 0) {
            return true;
        }
        else if (card["rarity"] === "FREE") {
            return filterRarity.includes("COMMON");
        }
        else {
            return filterRarity.includes(card["rarity"]);
        }
    }

    checkType (filterType, card) {
        return filterType.length === 0 || filterType.includes(card["type"]);
    }

    // cards of type "all" are always shown because they belong to _every_ race.
    checkTribe (filterTribe, card) {
        return filterTribe.length === 0 || card["race"] === "ALL" || filterTribe.includes(card["race"]);
    }
}

export default CardFilters;