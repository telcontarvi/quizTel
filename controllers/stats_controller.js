var models=require("../models/models.js");

exports.getStats=function(req,res,next){	
	models.Quiz.findAll({			
			include:[{model:models.Comment}]}).then(function(quizes){
		var stats={"N Preguntas":quizes.length, "N Comentarios":0, "N Comentarios por Pregunta":"N/A","N Preguntas con Comentarios":0, "N Preguntas sin Comentarios":0};

		for (var i in quizes){			
			if(quizes[i].Comments){
				stats["N Comentarios"]+=quizes[i].Comments.length;
				if(quizes[i].Comments.length>0){
					stats["N Preguntas con Comentarios"]++;
				}else{
					stats["N Preguntas sin Comentarios"]++;	
				}
			}else{
				stats["N Preguntas sin Comentarios"]++;
			}			
		}
		if(stats["N Preguntas"]>0){
			stats["N Comentarios por Pregunta"]=(stats["N Comentarios"]/stats["N Preguntas"]).toFixed(2);
		}		
		res.render("quizes/stats.ejs",{stats:stats, errors:[]});
	}).catch(function(error){next(error)});
}