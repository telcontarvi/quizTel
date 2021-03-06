var models=require("../models/models.js");

exports.load=function(req,res,next,quizId){	
	models.Quiz.find({
			where:{id: Number(quizId)},
			include:[{model:models.Comment}]
		}).then(
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
	var search="%";
	if(req.query.search && req.query.search.trim().length>0){
		search=req.query.search.replace(/\s/g,"%");
		search="%"+search+"%";
		search=search.toUpperCase();
	}
	var whereArray=["upper(pregunta) like ?",search];
	if(req.query.tema && req.query.tema.trim().length>0){
		whereArray[0]+=" and tema=?";
		whereArray[2]=req.query.tema;
	}

	models.Quiz.findAll({where:whereArray, order:"pregunta" }).then(function(quizes){
		res.render("quizes/index.ejs",{quizes:quizes, search:req.query.search, tema:req.query.tema, errors:[]});
	}).catch(function(error){next(error)});
};

exports.show=function(req,res){		
	res.render("quizes/show",{quiz:req.quiz, errors:[]});	
};

//GET quizes/answer
exports.answer=function(req,res){	
	var resultado="Incorrecto";
	if(req.query.respuesta && req.query.respuesta.toUpperCase()===req.quiz.respuesta.toUpperCase()){
		resultado="Correcto";
	}	
	res.render("quizes/answer",{quiz:req.quiz, respuesta:resultado, errors:[]});
};

exports.new=function(req,res){	
	var quiz=models.Quiz.build(
			{pregunta:"Pregunta",respuesta:"Respuesta"}
		);	
	res.render("quizes/new",{quiz:quiz, errors:[]});
};

exports.create=function(req,res){	
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.validate().then(
		function(err){
			if(err){
				res.render("quizes/new",{quiz:quiz, errors:err.errors});
			}else{
				quiz.save({fields:["pregunta","respuesta","tema"]}).then(function(){
					res.redirect("/quizes");
				});		
			}
		}
	);
};
exports.edit=function(req,res){
	var quiz=req.quiz;	
	console.log("pregunta a editar:"+quiz.id);
	res.render("quizes/edit",{quiz:quiz, errors:[]});
};

exports.update=function(req,res){
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz.tema=req.body.quiz.tema;
	req.quiz.validate().
		then(
			function(err){
				if(err){
					res.render("quizes/edit",{quiz:req.quiz, errors:err.errors});
				}else{
					req.quiz
					.save({fields:["pregunta","respuesta","tema"]})
					.then(function(){res.redirect("/quizes");});
				}
			}
		);
};
exports.destroy=function(req,res){
	req.quiz.destroy().then(function(){
		res.redirect("/quizes");
	}).catch(function(error){next(error)});	
};