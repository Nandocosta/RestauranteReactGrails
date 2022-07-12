package restaurantereactgrails

import comum.Permissao
import comum.Usuario
import comum.UsuarioPermissao
import grails.gorm.transactions.Transactional
import static org.springframework.http.HttpStatus.*

import grails.converters.*
import grails.validation.ValidationException

class UsuarioController {
	static responseFormats = ['json', 'xml']
	
    def index() {
        def model = [:]
        List<Usuario> listaDeUsuarios =  Usuario.list()
        model.put("listaDeUsuarios", listaDeUsuarios)
        respond model
    }
    @Transactional
    def save( ) {
        params.putAll(getParametros())
        Permissao permissao = Permissao.findByAuthority( params.permissao)
        Usuario usuario =  Usuario.findByUsername( params.username)
        if( permissao == null) {
            respond status: BAD_REQUEST, message: "Rule not exists"
            return
        }
        if( usuario == null ) {
            try {
                usuario = new Usuario(
                        username: params.username,
                        password: params.password,
                        enabled: true,
                        accountExpired: false,
                        accountLocked: false,
                        passwordExpired: false
                )
                usuario.save()
                if (usuario.hasErrors()) {
                    transactionStatus.setRollbackOnly()
                    respond usuario.errors
                    return
                }

                if (UsuarioPermissao.findByUsuarioAndPermissao(usuario, permissao) == null){
                    new UsuarioPermissao(usuario: usuario, permissao: permissao).save(flush:true)
                } else {
                    respond status: 400, message: "User with this Rule has exists"
                    return
                }
                respond status: 201, usuario: usuario
                return

            } catch (ValidationException e) {
                respond usuario.errors
                return
            }
        } else {
            respond status: 400, message: "User has exists"
            return
        }
    }
    @Transactional
    def buscarProdutoPorNome(){

    }

    def show() {
        params.putAll(getParametros())
        Usuario usuario = Usuario.get(params.id)
        if(usuario == null){
            render status: NOT_FOUND
            return
        }else{
            respond usuario
        }

    }
    Map getParametros() {
        def parameters = JSON.parse(request.getReader()) as Map
        return parameters
    }
}
