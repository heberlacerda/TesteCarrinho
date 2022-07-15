var express = require('express');
var path = require('path');
const fs = require('fs');

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/index/', (req,res,next) => {

  if(req && req.query.tipo){
    let tipo = req.query.tipo;
    //abaixo de 10 reais
    tipo === '_1' ?
      fs.readFile("abaixo-10-reais.json", (err,data) =>{
        if(err) res.send({message: "Ocorreu erro", success:false})
          res.send(JSON.parse(data))
          })
          //acima de 10 reais
          : tipo =='_2' ? fs.readFile("acima-10-reais.json", (err,data) =>{
              if(err) res.send({message: "Ocorreu erro", success:false})
            res.send(JSON.parse(data))    
    }) 
    : res.send({success:false, message: "Não encontrou"}) 
  }
  else{
    res.send({success:false, message: "Não foi enviada!"})
  }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;