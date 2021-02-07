class HsData {
    static collectibleCards;
    static expansions;

    static getCardById (id) {
        return HsData.collectibleCards.find(e => e.id === id);
    }
}

export default HsData;