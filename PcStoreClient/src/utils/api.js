export const url = {
    products : 'http://localhost:8080/device/get-all-in-stock',
    productsCreate : 'http://localhost:8080/device/create',
    productsUpdate : 'http://localhost:8080/device/update',
    productsDelete : 'http://localhost:8080/device/delete',

    users: 'http://localhost:8080/user/get-all',
    createUser : 'http://localhost:8080/user/create',
    getOneUser: 'http://localhost:8080/user/get-one',
    updateUser: 'http://localhost:8080/user/update',
    deleteUser: 'http://localhost:8080/user/delete',

    addToCart: 'http://localhost:8080/shopping-cart-link/create',
    deleteFromCart: 'http://localhost:8080/shopping-cart-link/delete',
    cart: 'http://localhost:8080/shopping-cart-link/get-all-devices-by-user-id',

    payments: 'http://localhost:8080/payment/get-all',
    makePayment: 'http://localhost:8080/payment/create',
    userPayments: 'http://localhost:8080/payment/get-all-by-user-id',
}