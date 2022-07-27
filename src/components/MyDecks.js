import { NavLink } from 'react-router-dom';
import './../css/myDecks.css';
import Header from './Header';
import Footer from './Footer';
import dummyDataArray from './dummyDataArray';
import emptyHeart from './../images/emptyHeart.svg';
import filledHeart from './../images/filledHeart.svg';
import Decks from './../images/decks.png';

const MyDecks = () => {
    let counter = 0;
    let colourClass;

    const handleHeartClick = (e) => {
        /*---- needs to be reworked ----*/
        const cardId = e.target.id.replace('heartOfCard', '');
        const positionInArray = dummyDataArray.findIndex(dummyDataArray => dummyDataArray.id === cardId);
        if(dummyDataArray[positionInArray].liked) {
            /*---- change: send to database ----*/
            dummyDataArray[positionInArray].liked = false;
        } else if (!dummyDataArray[positionInArray].liked) {
            /*---- change: send to database ----*/
            dummyDataArray[positionInArray].liked = true;
        } else {
            console.log('error when trying to like/unlike a deck');
        }
    }

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />

            <div className='mainContent'>
                {
                    dummyDataArray.length === 0
                    ?   <div className='noDecksContainer' >
                            <h2>You don't have any decks yet</h2>
                            <div className='noDecksImgContainer' ><img src={Decks} alt='no decks icon' /></div>
                        </div>
                    : dummyDataArray.map((card) => {
                        /*---- defining colour classNames ----*/
                        counter < 4 ? counter++ : counter = 1;
                        switch(counter) {
                            case 1:
                                colourClass = 'lightBlue card';
                                break;
                            case 2:
                                colourClass = 'darkBlue card';
                                break;
                            case 3:
                                colourClass = 'gray card';
                                break;
                            case 4:
                                colourClass = 'pink card';
                                break;
                            default:
                                colourClass = 'lightBlue card';
                        }

                        return(
                            <div className='deck' key={card.id}>
                                <NavLink to={'/decks/' + card.id} id='home' className='decksNavLinkContainer' >
                                    <div className={colourClass} >
                                        <h2>{card.name}</h2>
                                    </div>
                                </NavLink>
                                <div className='heartContainer' ><img src={card.liked ? filledHeart : emptyHeart} onClick={handleHeartClick} id={'heartOfCard' + card.id} alt="" /></div>
                            </div>
                        );
                    })
                }
            </div>
            
        </div>
        <Footer />
        </>
    );
}

export default MyDecks;