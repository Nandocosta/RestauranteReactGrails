package comum

import org.springframework.http.HttpMethod

class RequestMap implements Serializable {

    private static final long serialVersionUID = 1

    String configAttribute
    HttpMethod httpMethod
    String url

    static constraints = {
        configAttribute blank: false
        httpMethod nullable: true
        url blank: false, unique: 'httpMethod'
    }

    static mapping = {
        cache true
    }
}
