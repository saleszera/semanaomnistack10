import React from 'react';
// import api from '../../services/api';

import './styles.css'

function DevItem({ dev, deleteDev }){
    
    async function handleDelete(e){
        e.preventDefault()
        const id = dev._id;        
        await deleteDev(id);
    }

    return(
        <li className="dev-item">

            <header>
                
                <img src={dev.avatar_url} alt={dev.nome}/>
                
                <div className="user-info">
                    
                    <strong>{dev.github_username}</strong>
                    <span>{dev.techs.join(', ')}</span>

                </div>               

            </header>

            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a> 
            <button onClick={ handleDelete }>Deletar</button>         
            
            

        </li>
    );
}

export default DevItem;