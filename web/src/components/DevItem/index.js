import React from 'react';
// import api from '../../services/api';

import './styles.css'

function DevItem({ dev }){
    
    // async function handleDeleteDev(){
    //     const response = await api.delete(`/devs/${dev._id}`);
    //     console.log(dev._id);
    //     console.log(response.data)
    // }

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

            {/* <button onClick={handleDeleteDev}>Deletar</button> */}

        </li>
    );
}

export default DevItem;