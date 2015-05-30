//GET quizes/question
exports.question=function(req,res){
	res.render("quizes/question",{pregunta:"Capital de Italia"});
};

//GET quizes/answer
exports.answer=function(req,res){
	//console.log("R: "+req.query.respuesta);
	if(req.query.respuesta && req.query.respuesta.toUpperCase()==="ROMA"){
		res.render("quizes/answer",{respuesta:"Correcto"});
	}else{
		res.render("quizes/answer",{respuesta:"Incorrecto"});
	}	
};