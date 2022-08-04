import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/publishedDecks.css';
import Header from './Header';
import Footer from './Footer2';
import dummyDataArray from './dummyDataArrayDecks';
import Decks from './../images/decks.png';
import thumbsUp from './../images/thumbsUp.svg';
import thumbsDown from './../images/thumbsDown.svg';
import SearchIcon from './../images/searchIcon.svg';
import useFetch from '../hooks/useFetch';
import { useAuthentification } from '../contexts/Authentification'
import { url_search_public_decks } from '../services/vocabulary'

const PublishedDecks = () => {
    //# context
    const { token } = useAuthentification()

    //# variable
    const [page, set_page] = useState(1)

    //# state
    const [decks, set_decks] = useState([])
    // const [scroll_limit, set_scroll_limit] = useState(false)
    const [has_more, set_has_more] = useState(true)

    //# request
    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)

    //# ref
    const refScroll = useRef(null)
    const refObserver = useRef(null)

    const [visible, set_visible] = useState(false)


    useEffect(() => {
        if (refScroll.current) {
            console.log("1111")
            const callback = entries => {
                console.log(66666666666666666666666666)
                const [entry] = entries
                set_visible(entry.isIntersecting)
            }

            refObserver.current = new IntersectionObserver(callback)
            refObserver.current.observe(refScroll.current)
        }

        return () => {
            if (refScroll.current) refObserver.current.unobserve(refScroll.current)
        }
    }, [])

    useEffect(() => {
        console.log(2222)
        // set_has_more(false)


        if (!visible) return
        console.log("GOOOFY", page, has_more)

        if (has_more)
            set_page(prev => ++prev)
    }, [visible])

    useEffect(() => {
        console.log(333)
        console.log("-------------------------------new page", page)

        const newRequest = url_search_public_decks(token, page)
        console.log("bannanne", newRequest)
        setRequest(newRequest)
    }, [page])

    //# handle result from db
    useEffect(() => {
        console.log(444441, data)
        console.log(444442, error)
        console.log(444443, isLoading)
        set_has_more(false)

        // EXIT: error
        if (error) return console.log(error)

        // EXIT: no data
        if (!data) return console.log("no data")

        // EXIT: authentification is not ok
        if (!data.success) return console.log("authentification is not ok")

        // Exit: no more data to fetch from the server
        if (!data.data.length) return

        console.log("NEUE DATE", data.data)

        //TODO: irgendwie ist alles immer doppelt. prüfe ob daten schon im array sind
        set_decks(prev => {
            console.log("----------------isdou", data.data)
            if (!data.data.length) return prev
            console.log(1)


            if (!prev.length) return data.data
            console.log(2, data.data)

            const check = data.data.map(x => x._id)
            console.log(3, check)

            const res = prev.find(x => check.includes(x._id))

            console.log("res", res)
            if (res) return prev

            console.log(4)
            return [...prev, ...data.data]

        })



        // set_decks(prev => [...prev, ...data.data])
        console.log("SETZE HAS MOREEEEEEEEEEEEEEEEEE")
        set_has_more(true)
    }, [data, error, isLoading])

    const renderScrollObserver = () => <div ref={refScroll}>LOADING..</div>

    return (
        <>
            <div className='ContainerForHeaderAndMain'>

                <Header />

                <button onClick={() => set_page(prev => ++prev)}>sss</button>
                <div className='mainContent' style={{ background: "red" }}>
                    {decks.map(x => <div><button onClick={() => set_page(prev => ++prev)}>{page} ddd {JSON.stringify(visible)}</button>{x.name}</div>)}
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    {renderScrollObserver()}
                </div>

                <Footer />
            </div>
        </>
    )

    // let counter = 0;
    // let colourClass;

    // return(
    //     <>
    //     <div className='ContainerForHeaderAndMain'>
    //         <Header />

    //         <div className='mainContent'>

    //         {
    //             dummyDataArray.length === 0
    //             /*---- if the user doesn't have decks ----*/
    //             ?  <div className='noContentContainer' >
    //                     <h2>There are currently no public decks</h2>
    //                     <div className='noContentImgContainer' ><img src={Decks} alt='no decks icon' /></div>
    //                 </div>

    //             : 
    //             <>
    //             <div className='searchFieldContainer'>
    //                 <div className="cardSearchField">
    //                     <input type='text' />
    //                     <img src={SearchIcon} alt='search icon' />
    //                 </div>
    //             </div>
    //             {dummyDataArray.map((card) => {
    //                 /*---- defining colour classNames ----*/
    //                 counter < 4 ? counter++ : counter = 1;
    //                 switch(counter) {
    //                     case 1:
    //                         colourClass = 'lightBlue publicDeck';
    //                         break;
    //                     case 2:
    //                         colourClass = 'darkBlue publicDeck';
    //                         break;
    //                     case 3:
    //                         colourClass = 'gray publicDeck';
    //                         break;
    //                     case 4:
    //                         colourClass = 'pink publicDeck';
    //                         break;
    //                     default:
    //                         colourClass = 'lightBlue publicDeck';
    //                 }
    //                 /*---- public decks were able to be fetched ----*/
    //                 return(
    //                 <div className='publicDeckContainer' key={card.id}>
    //                     <NavLink to={'/decks/' + card.id} className={colourClass} >
    //                         <div className='publicDeckTop'>
    //                             <h2>{card.name}</h2>
    //                             <p>{card.vocabNumber + ' words'}</p>
    //                         </div>
    //                         <div className='publicDeckBottom'>

    //                         </div>
    //                     </NavLink>
    //                     <div className='thumbsContainer'>
    //                         <div className='publicDeckThumbs'>
    //                             <img src={thumbsUp} alt='thumbs up icon' />
    //                             <p>{card.thumbsUp}</p>
    //                         </div>
    //                         <div className='publicDeckThumbs'>
    //                             <img src={thumbsDown} alt='thumbs down icon' />
    //                             <p>{card.thumbsDown}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 );
    //             })}</>
    //         }
    //         </div>

    //     </div>
    //     <Footer />
    //     </>
    // );
}

export default PublishedDecks;