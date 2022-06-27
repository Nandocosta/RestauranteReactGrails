import com.restaurantereactgrails.UserPasswordEncoderListener

// Place your Spring DSL code here
beans = {
//    userPasswordEncoderListener(UserPasswordEncoderListener)
    userPasswordEncoderListener(UserPasswordEncoderListener, ref('hibernateDatastore'))
}