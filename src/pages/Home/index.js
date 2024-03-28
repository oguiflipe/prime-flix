import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import para utilziar a api
import api from '../../services/api';

import './home.css';


function Home(){
    //Variável dotenv para proteção de dados sensiveis
    const key_api_env = process.env.REACT_APP_KEY_API;

    //armazenando os dados coletados da api no useState filmes.
    const [filmes, setFilmes] = useState([]);

    //criando a const para o loading da pagina
    const [loading, setLoading] = useState(true);

    //criando estado da aplicação para listar os filmes.
    useEffect(() => {
        async function loadFilmes(){

            //criando variável para armazenar os dados coletados da api
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: key_api_env,
                    language: 'pt-BR',
                    page: 1
                }
            })
            //console.log(response.data.results.slice(0, 10))

            //passando para o useState os filmes coletados da api
            setFilmes(response.data.results.slice(0, 10))
        }

        //precisa invocar a função sempre que iniciar.
        loadFilmes();

        //retirando o true do valor do load para mostrar os filmes
        setLoading(false);
    }, [])

    //verificando se os filmes ainda estão carregando
    if(loading){
        return(
            <h2 className="loading">Carregando os filmes... </h2>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {
                    //Renderizando via MAP os filmes da api
                    filmes.map((filme) => {
                        return(
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;