module.exports = function(app){
    const Usuario = app.models.usuarios;
    const  validacao = require('../validacoes/autenticacao');
    const HomeController = {
        index: function(req,res){
            res.render('home/index')
        },
        login: function(req,res){
            res.render('home/login')
        },
        autenticacao: function(req,res){
			var usuario  = new Usuario();
			var email    = req.body.email;
			var password = req.body.password;

			if(validacao(req,res)){
				Usuario.findOne({'email': email}, function(err,data){
					if(err){
						req.flash('erro', 'Erro ao entrar no sistema: '+err);
						res.redirect('/');
					}else if(!data){
						req.flash('erro', 'E-mail não encontrado!');
						res.redirect('/');
					}else if(!usuario.validPassword(password, data.password)){
						req.flash('erro', 'Senha não confere!');
						res.redirect('/');
					}else{
						req.session.usuario = data;
						res.redirect('/home');
					}
				});
			}else{
				res.redirect('/');
			}
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},
    }
    return HomeController
}