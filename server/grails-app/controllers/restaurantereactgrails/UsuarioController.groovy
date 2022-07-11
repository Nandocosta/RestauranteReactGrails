package restaurantereactgrails

import comum.Usuario
import grails.rest.*
import grails.converters.*

class UsuarioController {
	static responseFormats = ['json', 'xml']
	
    def index() {
        def model = [:]
        List<Usuario> listaDeUsuarios =  Usuario.list()
        model.put("listaDeUsuarios", listaDeUsuarios)
        respond model
    }

}
