var express = require('express');
var router = express.Router();
var html2jade = require('html2jade');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index.html', { title: 'Express' });
  // res.sendFile(path.join(__dirname + '/index.html'));
});
router.post('/',function (req, res, next) {
    var model = JSON.parse(req.body.model);
    console.log(req.body);
    var template ="<html><head><meta http-equiv='Content-Type' content='text/html;charset=UTF-8'></head><p><b>Ім'я</b></p><p>" + req.body.name + "</p><p><b>Телефон</b></p><p>" + req.body.tel + "</p><p><b>Email</b></p><p>" + req.body.email + "</p><p><b>Коментар</b></p><p>" + req.body.comment + "</p><ol>"
    var list;
    for(var i=0; i<model.length; i++){
        if(model[i].quantity < 10) {
            list = "<li><span>" + model[i].name + "</span><span>  </span><span>" + model[i].quantity + "шт</span><span>  </span><span>" + model[i].cost + "грн</span><span>  </span><span>" + model[i].quantity * model[i].cost + "грн</span></li>"
        } else {
            list = "<li><span>" + model[i].name + "</span><span>  </span><span>" + model[i].quantity + "шт</span><span>  </span><span>" + model[i].optCost + "грн</span><span>  </span><span>" + model[i].quantity * model[i].optCost + "грн</span></li>"
        }
    }
    var resultJade;
    var result = template + list +"</ol></html>";
    
    res.mailer.send('email', {
        to: 'm.samokishuk@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
        subject: 'Замовлення', // REQUIRED.
        otherProperty: 'Other Property', // All additional properties are also passed to the template as local variables.
        html: result
    }, function (err) {
        if (err) {
            // handle error
            res.redirect('/');
            return;
        }
        res.redirect('/');
    });
});

module.exports = router;
