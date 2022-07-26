import './../css/myDecks.css';
import Header from './Header';
import Footer from './Footer';
import dummyDataArray from './dummyDataArray';
import emptyHeart from './../images/emptyHeart.svg';
import filledHeart from './../images/filledHeart.svg';

const MyDecks = () => {
    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />

            <div className='mainContent'>
                {
                    dummyDataArray.map((card) => {
                        return(
                            <div className='card lightBlue' key={card.id} >
                                <div className='heartContainer'><img src={card.liked ? filledHeart : emptyHeart} alt="" /></div>
                                <h2>{card.name}</h2>
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