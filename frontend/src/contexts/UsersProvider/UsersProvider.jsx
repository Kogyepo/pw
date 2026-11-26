import React, {useMemo, useState} from "react"
import {UsersContext} from "./UsersContext"

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const value = useMemo(
        () => ({setUsers, countUsers: users.length}),
        [users]
    );

    return(
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

export * from './UsersContext';
export * from './UsersProvider';

// Em JS sempre que um componente faz render, objetos criados de raiz tem uma referencia de memoria diferente.
//Sem o memo, todos os componentes que consomem este contexto seriam forçados a re-render cada vez que o UsersProvider atualizasse por qualquer razao externa
//O userMemo garante que o objeto value só é recriado quando a dependencia users realmente muda
