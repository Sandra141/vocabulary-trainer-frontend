import './../css/myDecks.css';
import Header from './Header';
import Footer from './Footer';
import dummyDataArray from './dummyDataArray';
import emptyHeart from './../images/emptyHeart.svg';
import filledHeart from './../images/filledHeart.svg';

const MyDecks = () => {
    let counter = 0;
    let colourClass;

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />

            <div className='mainContent'>
                {
                    dummyDataArray.map((card) => {
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


                        console.log(counter, colourClass);
                        return(
                            <div className={colourClass} key={card.id} >
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