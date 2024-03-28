import { Link } from 'react-router-dom';

import './notfound.css';

function NotFound(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Ops, página não encontrada.</h2>
            <Link to="/">Veja todos os filmes!</Link>
        </div>
    )
}

export default NotFound;