package restaurantereactgrails

import grails.converters.JSON

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
        println("teste")

        respond "ok"
    }
    Map getParametros() {
        def parameters = JSON.parse(request.getReader()) as Map
        return parameters
    }
}
