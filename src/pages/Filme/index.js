import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import {toast} from 'react-toastify';

import api from '../../services/api';
import './detalhe.css';



function Filme(){
    //Variável dotenv
    const key_api_env = process.env.REACT_APP_KEY_API;

    //coletando os parametros do id do filme
    const {id} = useParams();

    //navegando de volta ao home caso não encontre a pagina.
    const navigate = useNavigate();

    //armazenando os dados retornados da api.
    const [filme, setFilme] = useState({});

    //loading da page
    const [load, setLoad] = useState(true);

    //montando a página com a requisição.
    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: key_api_env,
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoad(false)
            })
            .catch(() => {
                console.log('ERRO')
                navigate('/', {
                    replace: true
                })
                return;
            })
        }

        //invocando a função
        loadFilme();

        //desmontando a página
        return() => {
            console.log('COMPONENTE DESMONTADO')
        }
    }, [id, navigate])

    //função para salvar o filme
    function salvarFilme(){
        const lista = localStorage.getItem('@primeFlix');

        let filmesSalvos = JSON.parse(lista) || [];

        //verificando se o filme já está salvo no local storage
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id )
        
        if(hasFilme){
            toast.warn('Esse filme já está salvo.')
            return;
        }

        //salvando o filme na lista com o push
        filmesSalvos.push(filme);
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso.')
    }


    //carregando o loading primeiro em caso de lentidão na resposta da api.
    if(load){
        return(
            <h1 className="filme-info">Carregando detalhes...</h1>
        )
    }
    

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external"> 
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;