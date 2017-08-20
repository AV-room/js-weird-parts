//creates a new execution context with the variables we need => safe code, can be reused by anyone
(
    function(global, $) {

        var Greetr = function(firstName, lastName, language){
            
            //return function constructor that builds and object and gives it 3 properties
            return new Greetr.init(firstName, lastName, language);
        
        }

        //private variables; hidden within the scope of this IIFE (e.g. can't be accessed by Greetr.supportedLangs)
        //accessible to created Greetr function by closure -- 2:30
        var supportedLangs = ['en', 'es'];

        var greetings = {
            en: 'Hello',
            es: 'Hola'
        };

        var formalGreetings = {
            en: 'Greetings',
            es: 'Saludos'
        };

        var logMessages = {
            en: 'Logged in',
            es: 'Inicio sesion'
        };

        //this is where we'll put methods that we'll want to use inside the object returned from Greetr
        //this is a more efficient way to set up functionality across all Greetr instances
        //  since they all share this prototype. We could define the methods inside Greetr.init but
        //  that means each instance of Greetr would take memory space to hold the same definitions.    
        //we want this to be the prototype for all objects created from the Greetr.init function
        Greetr.prototype = {
            fullName: function(){
                
                //'this' refers to the calling object at execution time
                return this.firstName + ' ' + this.lastName;
            },

            //throw error if given language is not supported by our function
            //references the externally inaccessible 'supportedLangs' within the closure
            validate: function(){
                if(supportedLangs.indexOf(this.language) === -1) {
                    throw 'Invalid language';
                }
            },

            greeting: function(){
                return greetings[this.language] + ' ' + this.firstName + '!';
            },

            formalGreeting: function(){
                return formalGreetings[this.language] + ', ' + this.fullName();
            },

            //chainable method (returns this)
            greet: function(formal){
                var msg;

                //if undefined or null it will be coerced to 'false'
                if(formal){
                    msg = this.formalGreeting();
                }
                else {
                    msg = this.greeting();
                }

                if(console){
                    console.log(msg);
                }

                //'this' refers to the calling object at execution time
                //makes the method chainable
                return this;
            },

            //chainable method (returns this)
            log: function(){
                
                //if we have a console
                if(console){
                    console.log(logMessages[this.language] + ': ' + this.fullName());
                }

                return this;
            },

            //chainable method (returns this)
            setLang: function(lang){
                this.language = lang;
                this.validate();

                return this;
            },

            //chainable method (returns this)
            HTMLGreeting: function(selector, formal){

                //check to see if jQuery if we even have jQuery
                if(!$){
                    throw 'jQuery not loaded!';
                }

                //check to see if we have a selector
                if(!selector){
                    throw 'missing jQuery selector';
                }

                var msg;
                if(formal){
                    msg = this.formalGreeting();
                }
                else{
                    msg = this.greeting();
                }

                //use jQuery to set the html on given selector
                // i.e. inject the message in the chosen place in the DOM
                $(selector).html(msg);

                return this;
                
            }
        };

        
        // the actual object is created here, allowing us to 'new' an object without calling 'new'
        //Greetr.init builds each new function object instance
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

        //attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
        // i.e. set up the Greetr and G$ references to the Greetr function so we can use our library
        global.Greetr = global.G$ = Greetr;

    }(window, jQuery)
);