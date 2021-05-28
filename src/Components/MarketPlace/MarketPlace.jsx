import { Link } from 'react-router-dom'
import style from './MarketPlace.css'


function MarketPlace(params) {
    return <div className={style['main']}>
       <Link to={'./tictactoe'}> <div className={style['Game']}>
           <img src={'./src/Assets/tictactoelogo.png'}/>
           TicTacToe</div> </Link>
        {/* <Link to={'./connect4'}> <div className={style['Game']}>Connect 4</div> </Link> */}
    </div>
}


export default MarketPlace