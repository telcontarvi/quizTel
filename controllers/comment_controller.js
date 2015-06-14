var models=require("../models/models.js");

exports.load=function(req,res,next,commentId){
	models.Comment.find({
		where:{id: Number(commentId)}
	}).then(function(comment){
		if(comment){
			req.comment=comment;
			next();
		}else{
			next(new Error("No existe el commentID="+commentId));
		}
	}
	).catch(function(error){next(error)});
};

exports.new=function(req,res){
	console.log("Nuevo Comentario");
	res.render("comments/new.ejs",{quiz:req.quiz,errors:[]})	;
};

exports.create=function(req,res){
	var comment=models.Comment.build(
		{
			texto: req.body.comment.texto,
			QuizId: req.params.quizId
		}
	);
	comment.validate().then(
		function(err){
			if(err){
				res.render("comments/new.ejs",{comment:comment, errors: err.errors});				
			}else{
				comment.save()
				.then(function(){res.redirect("/quizes/"+req.quiz.id)});
			}
		}
	).catch(function(error){next(error)});
};

exports.publish=function(req,res){
	req.comment.publicado=true;
	req.comment.save(
		{fields:["publicado"]})
	.then(function(){res.redirect("/quizes/"+req.params.quizId);})
	.catch(function(error){next(error)});
};