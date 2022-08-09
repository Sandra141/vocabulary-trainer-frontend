import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/findSharedDecks.css';
import Decks from './../images/decks.png';
import thumbsUp from './../images/thumbsUp.svg';
import thumbsDown from './../images/thumbsDown.svg';
import SearchIcon from './../images/searchIcon.svg';
import useFetch from '../hooks/useFetch';
import { useAuthentification } from '../contexts/Authentification'
import { url_search_public_decks } from '../services/vocabulary'
import Loading from './modals/Loading';
import Header from './layout/Header';
import Footer from './layout/Footer2';
import { getColorClassName } from '../utils/className.js'

const FindSharedDecks = () => {
    //# context
    const { token } = useAuthentification()

    //# variable
    const [page, set_page] = useState(1)

    //# state
    const [decks, set_decks] = useState([])
    const [has_more, set_has_more] = useState(true)
    const [visible, set_visible] = useState(false)
    const [search_term, set_search_term] = useState("")

    //# request
    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)

    //# ref
    const refScroll = useRef(null)
    const refObserver = useRef(null)
    const refInputSearchDecks = useRef(null)

    const reset_search = () => {
        set_page(1)
        set_decks([])
        set_has_more(true)
        set_search_term("")
        setRequest(null)
    }

    const handleSearchOnKeyDown = e => {
        // EXIT: not enter pressed
        if (e.key !== 'Enter') return

        const new_search_term = refInputSearchDecks.current.value

        // EXIT: alte suche gleich neue suche
        if (new_search_term === search_term) return

        e.preventDefault()

        // reset
        reset_search()

        // neue suche triggern
        set_search_term(new_search_term)
    }

    //# initial
    useEffect(() => {
        if (refScroll.current) {
            const callback = entries => {
                const [entry] = entries
                set_visible(entry.isIntersecting)
            }

            refObserver.current = new IntersectionObserver(callback)
            refObserver.current.observe(refScroll.current)
        }

        // wegen strict, wird ja jedes useEffect zweimal aufgerufen, mit return-arrow-function fürhren wir ein unmount durch. mount => unmount => mount 
        return () => {
            if (refScroll.current) refObserver.current.unobserve(refScroll.current)
        }
    }, [])

    //# reached end of scrolling
    useEffect(() => {
        // EXIT:
        if (!visible) return
        if (!has_more) return

        set_page(prev => ++prev)
    }, [visible])

    //# request
    useEffect(() => {
        const newRequest = url_search_public_decks(token, search_term, page)
        setRequest(newRequest)
    }, [page, search_term])

    //# handle result from db
    useEffect(() => {
        set_has_more(false)

        // EXIT: error
        if (error) return console.log(error)

        // EXIT: no data
        if (!data) return console.log("no data", data)

        // EXIT: authentification is not ok
        if (!data.success) return console.log("authentification is not ok")

        // Exit: no more data to fetch from the server
        if (!data.data.length) return

        //TODO: irgendwie ist alles immer doppelt. deshalb prüfen wir hier ob ein elemt bereits im array enthalten ist
        set_decks(prev => {
            // EXIT:
            if (!data.data.length) return prev
            if (!prev.length) return data.data

            const check = data.data.map(x => x._id)
            const res = prev.find(x => check.includes(x._id))

            // EXIT:
            if (res) return prev

            // EXIT:
            return [...prev, ...data.data]
        })

        set_has_more(true)
    }, [data, error, isLoading])

    const renderCards = () => decks.map((card, i) =>
    (
        <div className='findSharedDecks publicDeckContainer' key={card._id}>
            <NavLink to={'/find-Decks/search?_id=' + card._id} className={getColorClassName(i) + " publicDeck"} >
                <div className='publicDeckTop'>
                    <h2>{card.name}</h2>
                    <p>{card.cards_size + ' words'}</p>
                </div>
                <div className='publicDeckBottom'>

                </div>
            </NavLink>
            <div className='thumbsContainer'>
                <div className='publicDeckThumbs'>
                    <img src={thumbsUp} alt='thumbs up icon' />
                    <p>102</p>
                </div>
                <div className='publicDeckThumbs'>
                    <img src={thumbsDown} alt='thumbs down icon' />
                    <p>21</p>

                </div>
            </div>
        </div>
    ))

    const renderScrollObserver = () => <div ref={refScroll}>
        {!isLoading ? null : "Loading..."}
    </div>

    return (
        <>
            <div className='ContainerForHeaderAndMain'>

                <Header />

                <div className='mainContent'>

                    <div className='searchFieldContainer'>
                        <div className="cardSearchField">
                            <input ref={refInputSearchDecks} type='text' onKeyDown={handleSearchOnKeyDown} />
                            <img src={SearchIcon} alt='search icon' />
                        </div>
                    </div>

                    {renderCards()}

                    {renderScrollObserver()}
                </div>

                <Footer />
            </div>
        </>
    )
}

export default FindSharedDecks;