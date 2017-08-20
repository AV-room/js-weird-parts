//creates a new execution context with the variables we need => safe code, can be reused by anyone
(
    function(global, $) {

        var Greetr = function(firstName, lastName, language){
            
            //return function constructor that builds and object and gives it 3 properties
            return new Greetr.init(firstName, lastName, language);
        
        }

        //this is where we'll put methods that we'll want to use inside the object returned from Greetr
        //we want this to be the prototype for all objects created from the Greetr.init function
        Greetr.prototype = {};

        //ok to create this after actual call as return statement above won't be called until Greetr is actually used
        //this Greetr.init code should have been run by then
        Greetr.init = function(firstName, lastName, language){

            //set some default values for args
            //remember that 'self' points to the empty object created by the 'new' operator above 
            var self = this;
            self.firstName = firstName || '';
            self.lastName = lastName || '';
            self.language = language || 'en';
        
        }

        //configuring Greetr.init's prototype 
        Greetr.init.prototype = Greetr.prototype;

        //set up the Greetr and G$ references to the Greetr function so we can use our library
        global.Greetr = global.G$ = Greetr;

    }(window, jQuery)
);