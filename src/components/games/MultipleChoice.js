import React, { useRef, useState, useEffect } from "react";
import './../../css/multipleChoice.css';
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useVocabulary } from "../../contexts/Vocabulary";

const SHOWN_SIDE_ENUM = {
    front: "front",
    back: "back"
}

const POPUP_STATE = {
    disable: "disable",
    deck: "deck",
    side: "side"
}

const timerFeedback = 1000

const MultipleChoice = () => {
    //# context
    const vocabulary = useVocabulary();

    //# variable
    const decks = vocabulary.decks;
    const minNumberCards = 7

    // get decks with enough cards
    const getPossibleDecks = () => decks.filter(x => vocabulary.getCardsFromDeckId(x._id).length >= minNumberCards)

    //# state
    const [possible_decks, set_possible_decks] = useState(getPossibleDecks())
    const [selected_deck, set_selected_deck] = useState(null);
    const [cards, set_cards] = useState([]);
    const [tmpCards, setTmpCards] = useState([]);
    const [show_card_question_side, set_show_card_question_side] = useState(SHOWN_SIDE_ENUM.back);
    const [popup_state, set_popup_state] = useState(POPUP_STATE.deck);
    const [possible_answers, set_possible_answers] = useState([])
    const [show_feedback, set_show_feedback] = useState("")

    //# logic
    //## selecting Decks
    const handleDeckSelection = deck_id => e => {
        // set cards
        const cardsFromDeck = vocabulary.getCardsFromDeckId(deck_id)
        set_cards(cardsFromDeck)

        // change popup state
        set_popup_state(POPUP_STATE.side)
    }

    //## selecting hidden side
    const handleSideSelection = side => e => {
        // set
        set_show_card_question_side(side)

        // change popup state
        set_popup_state(POPUP_STATE.disable)
    }

    //## get new rounds of cards
    const getBadRankedCards = () => cards
        // sort by rank
        .sort((a, b) => a.rank - b.rank)
        // max 7 cards
        .slice(0, 7)
        // shuffle
        .sort(() => Math.random() - 0.5)

    //## set one correct and one wrong solution to choose
    const setSolutions = () => {
        const right_solution_side = SHOWN_SIDE_ENUM.front ? tmpCards[0].back : tmpCards[0].front

        const random_cards = cards.sort(() => Math.random() - 0.5)

        // search for wrong solution
        const wrong_solution_index = random_cards
            .findIndex(x => {
                const nase = SHOWN_SIDE_ENUM.front ? x.back : x.front

                return nase !== right_solution_side
            })

        let wrong_solution
        // EXIT: when no wrong solution found then return Kartoffel
        if (wrong_solution_index === -1) {
            wrong_solution = {
                _id: tmpCards[0]._id,
                name: "Kartoffel",
                match: false
            }
        } else {
            const new_name = SHOWN_SIDE_ENUM.front ? random_cards[wrong_solution_index].back : random_cards[wrong_solution_index].front

            wrong_solution = {
                _id: tmpCards[0]._id,
                name: new_name,
                match: false
            }
        }

        const new_right_solution = {
            _id: tmpCards[0]._id,
            name: right_solution_side,
            match: true
        }

        const all_solutions = [new_right_solution, wrong_solution]

        // shuffle and save
        set_possible_answers(all_solutions.sort(() => Math.random() - 0.5))
    }

    //# user choose solution
    const handleUserChooseSolution = solution => e => {
        const find_index = cards.findIndex(x => x._id === solution._id)

        if (find_index === -1) return

        // is answer correct
        if (solution.match) {
            set_show_feedback("Correct =)")
            cards[find_index].rank++
        } else {
            set_show_feedback("Wrong =(")
            cards[find_index].rank--
        }

        vocabulary.updateCard(cards[find_index])
    }

    //## new round
    const startNewRound = () => {
        const new_tmp_cards = getBadRankedCards()
        setTmpCards(new_tmp_cards)
    }

    //# then
    //## create tmp cards
    useEffect(() => {
        // EXIT: 
        if (!cards.length) return

        startNewRound()
    }, [cards])

    //## 
    useEffect(() => {
        if (!tmpCards.length) return

        setSolutions()
    }, [tmpCards])

    //## disable feedback after time
    useEffect(() => {
        // EXIT: 
        if (!show_feedback.length) return

        const interval = setInterval(() => {
            set_show_feedback("")
            startNewRound()
        }, timerFeedback)

        return () => clearInterval(interval);
    }, [show_feedback])

    //# render
    const renderFront = () => !tmpCards.length
        ? null
        : (
            <div className="cards">
                <h2>{show_card_question_side === SHOWN_SIDE_ENUM.front ? tmpCards[0].front : tmpCards[0].back}</h2>
            </div>
        )

    const renderPossibleSolutions = () => !tmpCards.length
        ? null
        : (
            <>
                {possible_answers.map(x => <button className="lightBlue cards" onClick={handleUserChooseSolution(x)}><h2>{x.name}</h2></button>)}
            </>
        )

    const renderPossibleDecks = () => (
        <div class='darkBackground'>
            <div className="popup">
                <div className='popupContentGames'>
                    <h2 className='gamesPopupDeckSelectionH2'>Which Deck would you like to learn?</h2>

                    {
                        possible_decks.map((x, i) => <div onClick={handleDeckSelection(x._id)} id={i}>{x.name}</div>)
                    }

                </div>
            </div>
        </div>
    )

    const renderSelectCardSide = () => (
        <div class='darkBackground'>
            <div className="popup">
                <div className='popupContentGames'>
                    <h2 className='gamesPopupDeckSelectionH2'>Which side should be shown?</h2>

                    <div className="selectSideContainer">
                        <div className="sides" onClick={handleSideSelection(SHOWN_SIDE_ENUM.front)}>
                            {cards[0]?.front}
                        </div>
                        <div className="sides" onClick={handleSideSelection(SHOWN_SIDE_ENUM.back)}>
                            {cards[0]?.back}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

    const renderPopup = () => {
        switch (popup_state) {
            case POPUP_STATE.deck: return renderPossibleDecks()
            case POPUP_STATE.side: return renderSelectCardSide()
            case POPUP_STATE.disable: return null
        }
    }

    const renderFeedback = () => !show_feedback
        ? null
        : <div className="feedback">
            <div className="card">
                <div>{show_feedback}</div>
            </div>
        </div>


    return (
        <div className='ContainerForHeaderAndMain'>

            <Header />

            <div className='mainContent multipleChoice'>

                {renderPopup()}

                {renderFeedback()}

                <div className="layout">

                    {renderFront()}

                    <br />

                    {renderPossibleSolutions()}

                </div>

            </div>

            <Footer />

        </div>
    );
}

export default MultipleChoice;