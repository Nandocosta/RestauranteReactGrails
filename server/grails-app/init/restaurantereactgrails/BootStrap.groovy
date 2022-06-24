package restaurantereactgrails
import comum.RequestMap
import comum.Usuario
import comum.Permissao
import comum.UsuarioPermissao
import grails.gorm.transactions.Transactional

class BootStrap {

    def listUrl = [
            [ url: '/api/user', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/save', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/update/**', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/save/', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/query', configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/products',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/products/',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/products/**',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/categories',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/categories/',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/categories/**',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/oauth/access_token',    configAttribute: 'permitAll' ],
            [ url: '/j_spring_security_switch_user',  configAttribute: 'ROLE_SWITCH_USER,isFullyAuthenticated()' ],
    ]

    def init = {
        addTestUser()
    }

    @Transactional
    void addTestUser() {
        Permissao admin = Permissao.findByAuthority('ROLE_ADMIN')
        if ( admin == null ) {
            admin = new Permissao( authority: 'ROLE_ADMIN' ).save(flush: true)
        }

        Permissao usuario = Permissao.findByAuthority('ROLE_USER')
        if ( usuario == null ) {
            usuario = new Permissao( authority: 'ROLE_USER' ).save(flush: true)
        }

        Usuario administrador = Usuario.findByUsername("fernando")
        if (administrador == null){
            administrador = new Usuario(username: "fernando", password: "123",
                    enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush:true)
        }

        Usuario user = Usuario.findByUsername("nando")
        if (user == null){
            user = new Usuario(username: "nando", password: "123",
                    enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush:true)
        }

        if (UsuarioPermissao.findByUsuarioAndPermissao(administrador, admin) == null)
        {
            new UsuarioPermissao(Usuario: administrador, permissao: admin).save(flush:true)
        }
        if (UsuarioPermissao.findByUsuarioAndPermissao(user, usuario) == null)
        {
            new UsuarioPermissao(Usuario: user, permissao: usuario).save(flush:true)
        }

        for (String url in [
                '/', '/index', '/index.gsp', '/**/favicon.ico',
                '/assets/**', '/**/js/**', '/**/css/**', '/**/images/**',
                '/login', '/login.*', '/login/*',
                '/logout', '/logout.*', '/logout/*']) {
            if(RequestMap.findByUrl( url ) == null) {
                new RequestMap(url: url, configAttribute: 'permitAll').save()
            }
        }

        for (  item in listUrl  ) {
            if( RequestMap.findByUrl( item.url ) == null)  {
                new RequestMap(url: item.url, configAttribute: item.configAttribute).save()
            }
        }

    }

    def destroy = {
    }
}
