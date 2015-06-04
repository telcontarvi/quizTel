var models=require("../models/models.js");
//GET quizes/question
exports.question=function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render("quizes/question",{pregunta:quiz[0].pregunta});
	});
	
};

//GET quizes/answer
exports.answer=function(req,res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta && req.query.respuesta.toUpperCase()===quiz[0].respuesta.toUpperCase()){
			res.render("quizes/answer",{respuesta:"Correcto"});
		}else{
			res.render("quizes/answer",{respuesta:"Incorrecto"});
		}
	});	
	//console.log("R: "+req.query.respuesta);
	
};