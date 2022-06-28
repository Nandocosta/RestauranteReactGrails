package restaurantereactgrails

class ProdutoController {
	static responseFormats = ['json', 'xml']

    def index() {
        def model = [:]
        Number atributo2 = 8
        String atributo1 = "valor do atributo 1"
        model.put("atributo2", atributo2)
        model.put("atributo1", atributo1)
        respond model
    }
}
