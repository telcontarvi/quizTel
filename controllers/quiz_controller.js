var models=require("../models/models.js");

exports.load=function(req,res,next,quizId){
	models.Quiz.findById(req.params.quizId).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();	
			}else{
				next(new Error("No existe quizID="+quizId));
			}			
		}
	).catch(function(error){next(error)});	
}

exports.index=function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render("quizes/index.ejs",{quizes:quizes});
	}).catch(function(error){next(error)});
};

exports.show=function(req,res){		
	res.render("quizes/show",{quiz:req.quiz});	
};

//GET quizes/answer
exports.answer=function(req,res){	
	var resultado="Incorrecto";
	if(req.query.respuesta && req.query.respuesta.toUpperCase()===req.quiz.respuesta.toUpperCase()){
		resultado="Conrecto";
	}	
	res.render("quizes/answer",{quiz:req.quiz, respuesta:resultado});
};