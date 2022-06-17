package restaurantereactgrails

class Cliente {
    String nome, email, senha;

    static hasMany = [pedidos: Pedido, produtosPreferido:Produto]
    static constraints = {
        nome nullable:false, blank:false;
        email email: true, unique:true;
        senha size: 6..10;
    }
    static mapping = {
        produtosPreferido joinTable:[name:"preferencias_clientes", key: "id_cliente", column: "id_produto"];
    }
}
