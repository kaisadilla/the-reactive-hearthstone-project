import React from 'react';
import CardContainerGallery from '../Components/Cards/CardContainerGallery';
import CardFilterPanel from '../Components/Cards/CardFilterPanel';
import CardNavBar from '../Components/Cards/CardNavBar';
import CreateDeckForm from '../Components/CreateDeckForm';
import AutoLoadForm from '../Components/Decks/AutoLoadForm';
import DeckCardDeleteArea from '../Components/Decks/DeckCardDeleteArea';
import DeckDisplayView from '../Components/Decks/DeckDisplayView';
import HsData from '../Logic/HsData';
import HsDB from '../Logic/HsDB';

class DeckViewer extends React.Component {
    constructor () {
        super();

        this.MAX_CARDS = 30;
        this.MAX_NORMAL_COPIES = 2;
        this.MAX_LEGENDARY_COPIES = 1;

        this.setToggledFilter = this.setToggledFilter.bind(this);
        this.displayDeleteArea = this.displayDeleteArea.bind(this);
        this.displayDeckDropBorder = this.displayDeckDropBorder.bind(this);
        this.tryAddCard = this.tryAddCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.saveDeck = this.saveDeck.bind(this);
        this.saveDeckAndExit = this.saveDeckAndExit.bind(this);
        this._autoSave = this._autoSave.bind(this);
        this._autoLoad = this._autoLoad.bind(this);
        this.loadBackup = this.loadBackup.bind(this);
        this.closeBackupForm = this.closeBackupForm.bind(this);
        this.autoSaveInterval = undefined;

        this.state = {
            allowAutoSave: false,
            showAutoSaveImport: false,
            display: "list",
            chosenExp: "null",
            nameQuery: "",
            filterClass: [],
            filterCost: [],
            filterRarity: [],
            filterType: [],
            filterTribe: [],

            deckName: "",
            deckClass: "",
            deckCards: [],
            dragDeckToEliminate: false,
            deckDropBorder: false,
        };
        this.setState = this.setState.bind(this);
    }

    get deckBackupKey () {
        return `deck-backup-${this.state.deck["id"]}`;
    }

    componentDidMount () {
        document.title = "Deck viewer – the Hearthstone project";
        HsDB.openDatabase().then(() => this.setState({
            dbOpen: true,
        }));
        this.autoSaveInterval = setInterval(this._autoSave, 1000);
    }

    componentWillUnmount () {
        clearInterval(this.autoSaveInterval);
    }

    compareArrays (a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    componentDidUpdate () {
        if (this.state.dbOpen && !this.state.deck) {
            let deckId = parseInt(window.location.pathname.split("/").pop());
            HsDB.getDeckById(deckId).then(res => {
                this.setState({
                    deck: res,
                    filterClass: ["NEUTRAL", res.class]
                });

                this._autoLoad();
            });
        }
        if (this.state.deck) {
            document.title = `${this.state.deck.name} - the Hearthstone project`;
        }
    }

    setToggledFilter (filterName, value) {
        if (this.state[filterName].includes(value)) {
            let newFilter = this.state[filterName].filter(c => c !== value);
            this.setState({
                [filterName]: newFilter
            });
        }
        else {
            this.setState(prev => ({
                [filterName]: [...prev[filterName], value]
            }));
        }
    }

    displayDeleteArea (val) {
        this.setState({
            dragDeckToEliminate: val,
        });
    }

    displayDeckDropBorder (val) {
        this.setState({
            deckDropBorder: val,
        })
    }

    tryAddCard (cardId) {
        if (this.state.deckCards.length >= this.MAX_CARDS) {
            return false;
        }
        else {
            let copiesInDeck = this.state.deckCards.filter(c => c === cardId).length;
            if (HsData.getCardById(cardId).rarity === "LEGENDARY" && copiesInDeck >= this.MAX_LEGENDARY_COPIES) {
                return false;
            }
            else if (copiesInDeck >= this.MAX_NORMAL_COPIES) {
                return false;
            }
            else {
                this.setState(prevState => {
                    return {
                        deckCards: [...prevState.deckCards, cardId]
                    }
                });
                return true;
            }
        }
    }

    removeCard (cardId) {
        let removedIndex = this.state.deckCards.findIndex(c => c === cardId);
        let updatedDeck = [...this.state.deckCards]
        updatedDeck.splice(removedIndex, 1);
        this.setState({
            deckCards: updatedDeck,
        })
    }

    saveDeck () {
        HsDB.updateDeck(this.state.deck.id, {
            name: this.state.deckName,
            class: this.state.deckClass,
            cards: this.state.deckCards,
        })
        sessionStorage.setItem("deck-backup", null);
    }

    saveDeckAndExit () {
        this.saveDeck();
        this.props.history.push(`/decks`);
    }

    _autoSave () {
        if (this.state.allowAutoSave) {
            sessionStorage.setItem(this.deckBackupKey, JSON.stringify(this.state.deckCards));
            console.log("Deck backup saved!");
        }
    }

    _autoLoad () {
        let currentSave = JSON.parse(sessionStorage.getItem(this.deckBackupKey));
        if (currentSave && !this.compareArrays(this.state.deckCards, currentSave)) {
            this.setState({showAutoSaveImport: true});
        }
        else {
            this.setState({allowAutoSave: true});
        }
    }

    loadBackup () {
        let currentSave = JSON.parse(sessionStorage.getItem(this.deckBackupKey));
        this.setState({
            deckCards: currentSave,
        })
        this.closeBackupForm();
    }
    
    closeBackupForm () {
        this.setState({
            showAutoSaveImport: false,
            allowAutoSave: true,
        })
    }

    render () {
        let filters = {
            nameQuery: this.state.nameQuery,
            cardClass: this.state.filterClass,
            cost: this.state.filterCost,
            rarity: this.state.filterRarity,
            type: this.state.filterType,
            tribe: this.state.filterTribe,
        }

        return (
            <div>
                <CardFilterPanel
                    displayMode="list"
                    disableClassFilter="true"
                    filters={filters}
                    setToggledFilter={this.setToggledFilter}
                    setParentState={this.setState}
                />
                <main className="left-aside right-aside">
                    {this.state.dragDeckToEliminate && <DeckCardDeleteArea removeCard={this.removeCard} />}
                    <CardNavBar setParentState={this.setState} allowAllOption="true" />
                    <CardContainerGallery chosenExp={this.state.chosenExp} filters={filters} useDraggable="true" displayDeckDropBorder={this.displayDeckDropBorder} />
                </main>
                {this.state.deck &&
                    <DeckDisplayView
                        deck={this.state.deck}
                        parentState={this.state}
                        setParentState={this.setState}
                        displayDeleteArea={this.displayDeleteArea}
                        addCard={this.tryAddCard}
                        deckDropBorder={this.state.deckDropBorder}
                        saveDeck={this.saveDeck}
                        saveDeckAndExit={this.saveDeckAndExit}
                    />
                }
                {this.state.showAutoSaveImport && <AutoLoadForm loadBackup={this.loadBackup} discardBackup={this.closeBackupForm} />}
            </div>
        );
    }
}

export default DeckViewer;