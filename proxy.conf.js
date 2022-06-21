const proxy = [
    {
        context : '/api',
        target : 'http://localhost/biblioteca_backend/',
        pathRewrite : {'^/api' : ''}
    }
];
module.exports = proxy;