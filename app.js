
// gets a new object (our Greetr architecture allows us not to have to use the 'new' keyword here)
var g = Greetr('Milly', 'Everett');
console.log(g);

var g2 = G$('Hugh', 'Banks');
console.log(g2);

//using our chainable methods
g.greet().setLang('es').greet(true).log().HTMLGreeting(greeting, true);

//using our framework with jQuery
//on login click,
$('#login').click(function(){

    //create new greetr function (with hardcoded name) and use it to set the content of our h1 according to selected language
    var loginGreetr = G$('Julia', 'Roberts');
    loginGreetr.setLang($('#lang').val()).HTMLGreeting('#greeting', true);

});
