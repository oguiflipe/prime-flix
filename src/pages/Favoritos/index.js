import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

import './favoritos.css';


function Favoritos(){

    //armazenando os dados retornados no localstorage
    const [filmes, setFilmes] = useState([]);

    //retornando os dados do localstorage
    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeFlix');

        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    //criando função para exluir os filmes
    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeFlix", JSON.stringify(filtroFilmes))
        toast.success('Filme removido com sucesso!')
    }

    return(
        <div className='favoritos'>
            <h1>Meus Favoritos</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo 😐 </span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
                
            </ul>
        </div>
    )
}

export default Favoritos;