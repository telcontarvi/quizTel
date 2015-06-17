exports.loginRequired=function(req,res,next){
	if(req.session.user){
		next();
	}else{
		res.redirect("/login");
	}
};

exports.new=function(req,res){
	var errors=req.session.errors||{};
	req.session.errors={};
	res.render("sessions/new",{errors:errors});
};

exports.create=function(req,res){
	var login=req.body.login;
	var password=req.body.password;

	var userController=require("./user_controller");
	userController.autenticar(login,password, function(error,user){
		if(error){
			req.session.errors=[{"message":"Se ha producido un error:"+error}];
			res.redirect("/login");
		}
		req.session.user={id:user.id, username:user.username};		
		req.session.lastActivity=new Date().getTime();		
		res.redirect(req.session.redir.toString());
	});	
};

exports.destroy=function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};

exports.checkTimeOut=function(req,res){
	if(req.session){
		if(req.session.lastActivity){
			var currTimeMillis=new Date().getTime();			
			if((currTimeMillis-req.session.lastActivity)>(1000*60*2)){
				delete req.session.user;	
			}else{
				req.session.lastActivity=currTimeMillis;				
			}
		}
	}
}