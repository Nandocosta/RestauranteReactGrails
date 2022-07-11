package restaurantereactgrails

import comum.Permissao
import comum.Usuario
import comum.UsuarioPermissao
import grails.gorm.transactions.Transactional
import grails.rest.*
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
        params.putAll(JSON.parse(request.getReader()) as Map)
        Usuario usu = Usuario.findByUsername(params.username)
        Usuario user = new Usuario(
                username: params.username,
                password: params.password,
                enabled: true,
                accountExpired: false,
                accountLocked: false,
                passwordExpired: false
        )

        if (usu == null) {
            try {
                Usuario.save(user)
                if (user.hasErrors()) {
                    transactionStatus.setRollbackOnly()
                    respond user.errors
                    return
                }
                if (user.adm == true) {
                    Permissao admin = Permissao.findByAuthority('ROLE_ADMIN')
                    new UsuarioPermissao(user: user, role: admin).save(flush: true)

                } else {
                    Permissao user_comum = Permissao.findByAuthority('ROLE_USER')
                    new UsuarioPermissao(user: user, role: user_comum).save(flush: true)
                }

            } catch (ValidationException e) {
                respond user.errors
                return
            }
        } else {
            respond status: BAD_REQUEST, message: "Usuario já existe"
            return
        }

        respond user, [status: CREATED, view: "show"]
    }
}
