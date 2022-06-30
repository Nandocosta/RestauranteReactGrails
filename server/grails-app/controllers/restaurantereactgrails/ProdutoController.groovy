package restaurantereactgrails

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import grails.validation.ValidationException

@Transactional
class ProdutoController {
	static responseFormats = ['json', 'xml']

    def index() {
        def model = [:]
        List<Produto> listaDeProdutos =  Produto.list()
        model.put("listaDeProdutos", listaDeProdutos)
        respond model
    }

    def save(){
        params.putAll(getParametros())
        String nome = params.nome
        Double preco = params.double("preco")
        Produto produto = new Produto()
        produto.nome = nome
        produto.preco = preco
        produto.validate()
        println(produto.errors)
        produto.save(failOnError: true)

        respond "ok"
    }

    @Transactional
    def update() {
        params.putAll(getParametros())
        Produto produto = Produto.get(params.id)
        String nome = params.nome
        Double preco = params.double("preco")
        produto.nome = nome
        produto.preco = preco
        produto.validate()
        produto.save(flush: true)
        respond "ok"
    }
    Map getParametros() {
        def parameters = JSON.parse(request.getReader()) as Map
        return parameters
    }
}
