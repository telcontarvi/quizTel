var models=require("../models/models.js");


exports.index=function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render("quizes/index.ejs",{quizes:quizes});
	});
};

exports.show=function(req,res){
	/*models.Quiz.findAll().then(function(quizes){
		var i;
		for(i=0;i<quizes.length;i++){
			console.log(quizes[i]);
		}
	});*/
	models.Quiz.findById(req.params.quizId).then(function(quiz_){
		res.render("quizes/show",{quiz:quiz_});
	});			
};

//GET quizes/answer
exports.answer=function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if(req.query.respuesta && req.query.respuesta.toUpperCase()===quiz.respuesta.toUpperCase()){
			res.render("quizes/answer",{quiz:quiz, respuesta:"Correcto"});
		}else{
			res.render("quizes/answer",{quiz:quiz, respuesta:"Incorrecto"});
		}
	});	
	//console.log("R: "+req.query.respuesta);
	
};