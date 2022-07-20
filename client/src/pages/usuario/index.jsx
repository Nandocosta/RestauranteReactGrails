import React from 'react'

import Body from "../../components/body";
import FormUser from "../../components/formUser";
import Api from "../../services/Api";
import Auth from "../../security/Auth";
import {notification} from "antd";

function Usuario(){

    const addUsuario = (values) => {
        const { username, permissao, password, confimarPassword } = values

        if(password != confimarPassword) {

            message.error('Senhas diferentes');
        }
        Api.post("usuario", values,{
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        })
            .then(()=>{
                notification["success"]({
                    message: 'Usuario criado'
                })
            })
            .catch(()=>{
                notification["error"]({
                    message: 'Erro ao tentar criar usuario'
                });
            })
    };

  return (
      <>
          <Body>
              <div>
                  <h1>Criar Usuario</h1>
              </div>
              <FormUser values={values}/>
          </Body>
      </>
  )
}
export default Usuario;