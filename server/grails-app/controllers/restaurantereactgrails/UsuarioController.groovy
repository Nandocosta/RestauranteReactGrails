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
            respond status: BAD_REQUEST, message: "Permissão não existe"
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
                    respond status: 400, message: "Usuario com essa permissão já existe"
                    return
                }
                respond status: 201, usuario: usuario
                return

            } catch (ValidationException e) {
                respond usuario.errors
                return
            }
        } else {
            respond status: 400, message: "Usuario já existe"
            return
        }
    }

    def show() {
        Usuario usuario = Usuario.get(params.id)
        if(usuario == null){
            render status: NOT_FOUND
            return
        }else{
            def model = [:]
            model.put("usuario", usuario)
            respond model
        }
    }

    @Transactional
    def update(){
        params.putAll(getParametros())

        String username = params.username
        String password = params.password
        List permissoes = params.permissoes
        List<Permissao> newPermissoes = []
        permissoes?.each{
            Permissao permissao = Permissao.findByAuthority(it)
            if(permissao){
                newPermissoes.add(permissao)
            }
        }

        Usuario usuario = Usuario.get(params.id)

        if (usuario == null) {
            render  status: NOT_FOUND
            return
        }
        if (usuario.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond usuario.errors
            return
        }

        usuario.username = username ?: usuario.username
        usuario.password = password ?: usuario.password
        usuario.authorities?.each{
            if(!newPermissoes.contains(it)){
                UsuarioPermissao.findByUsuarioAndPermissao(usuario, it).delete()
            }
        }

        newPermissoes.each {
            UsuarioPermissao usuarioPermissao = UsuarioPermissao.findByUsuarioAndPermissao(usuario, it)
            if(!usuarioPermissao){
                UsuarioPermissao newUsuarioPermissao = new UsuarioPermissao(usuario: usuario, permissao: it ).save(flush: true)
            }
        }

        usuario.validate()
        usuario.save(flush: true)
        respond "ok"
    }

    @Transactional
    def delete() {
        Long id = Long.parseLong(params.id ?: null)
        if (id) {
            try {
                Usuario usuario = Usuario.findById(id)
                UsuarioPermissao.findByUsuario(usuario).delete()
                usuario.delete()
                render "Usuario deletado"
            } catch (e) {
                render Error: e
            }
        } else {
            render status: NOT_FOUND
        }
    }
    Map getParametros() {
        def parameters = JSON.parse(request.getReader()) as Map
        return parameters
    }
}
