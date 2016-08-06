var angMain = angular.module('myApp', ['ngRoute']);

angMain.controller('contactsController', ['$scope', function($scope, $routeParams){
    $scope.contacts = data.contacts;   
}]);

angMain.controller('showContactController', function($scope, $routeParams){
    
    $scope.contactId = $routeParams.contactId;    
    
    $scope.launch = function(type, value){
        console.log("type = "+ type+" & value = "+value);
        alert("type = "+ type+" & value = "+value);
        
        switch(type){
            case "Phone":
            case "Mobile":
                //alert("dialer code");
                phoneDialler(value);
                break;
            case "Whatsapp":
                //alert("whatsapp code");
                // Source - https://github.com/ranjitpandit/whatsapp-phonegap-plugin/blob/8a94fee/README.md
                cordova.plugins.Whatsapp.send(value);
                break;
            case "Email":
                openEmail(value);
                break;
            default:
                break;
        }
    };    
    
    function phoneDialler(number){
        phonedialer.dial("080 23596016", 
            function(err) {
                if (err == "empty"){
                    alert("Unknown phone number");
                }
                else{
                    alert("Dialer Error:" + err); 
                }    
            },
            function(success) {
                //alert('Dialing succeeded');
            }
        );
    };
    
    function openEmail(email){
        // Source - https://github.com/katzer/cordova-plugin-email-composer/blob/cab303d/README.md
        cordova.plugins.email.open({
            to: email
        });
    };
    
    function getDetails(id){
        var temp = data.contacts;
        for ( var c in temp){
            if (temp[c].id == id){
                $scope.connectionDetails = temp[c].connection;
                $scope.contactName = temp[c].name;
                break;
            }
        }
    };
    
    getDetails($routeParams.contactId);
});

angMain.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'templates/home.html',
            controller: 'contactsController'
        }).
        when('/ShowContact/:contactId', {
            templateUrl: 'templates/show_contact.html',
            controller: 'showContactController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

// id > name > tags > loction > source > connection
var data = { version: '0.0.1', contacts:[{id:1,name:'BBMP',tags:['utility','bengaluru','muncipality'],location:'Bengaluru, Karnataka',source:'',connection:[{type:"Phone",value:'080 22660000'},{type:'Whatsapp',value:'9480685700'},{type:'Facebook',value:'https://www.facebook.com/BBMP-Commissioner-628402897294978'},{type:'Twitter',value:'https://twitter.com/BBMPCOMM1'},{type:'Email',value:'contactusbbmp@gmail.com'},{type:'Website',value:'http://bbmp.gov.in/'}]},{id:2,name:'Commissioner, Bengaluru City Police',tags:['bengaluru','city police','police'],location:'Bengaluru, karnataka',source:'',connection:[{type:'Phone',value:'080 22942222'},{type:'Phone',value:'080 22943322'},{type:'Email',value:'compolbcp@ksp.gov.in'},{type:'Twitter',value:'https://twitter.com/cpblr'}]},{id:3,name:'President, India',tags:['president','india'],location:'',source:'http://presidentofindia.nic.in',connection:[{type:'Youtube',value:'http://www.youtube.com/RPBhavan'},{type:'Twitter',value:'https://twitter.com/RashtrapatiBhvn'},{type:'Facebook',value:'http://www.facebook.com/presidentofindiarb'},{type:'Website',value:'http://presidentofindia.nic.in'}]},{id:4,name:'Vice President, India',tags:['vice president','india'],location:'',source:'http://vicepresidentofindia.nic.in',connection:[{type:'Phone',value:'011 23016422'},{type:'Phone',value:'011 23016344'},{type:'Email',value:'vpindia@nic.in'},{type:'Website',value:'http://vicepresidentofindia.nic.in'}]},{id:5,name:'Prime Minister, India',tags:['prime minister','india'],location:'',source:'http://www.pmindia.gov.in/en/',connection:[{type:'Twitter',value:'https://twitter.com/pmoindia'},{type:'Facebook',value:'https://www.facebook.com/PMOIndia'},{type:'Youtube',value:'https://www.youtube.com/pmoindia'},{type:'Website',value:'http://www.pmindia.gov.in/en/'}]},{id:6,name:'Government of India',tags:['government of india','india'],location:'',source:'https://www.mygov.in',connection:[{type:'Phone',value:'011 24364706'},{type:'Twitter',value:'https://twitter.com/mygovindia'},{type:'Facebook',value:'https://facebook.com/MyGovIndia/'},{type:'Youtube',value:'https://www.youtube.com/channel/UCTJpJk8bqQQEqeX58z8eimA'},{type:'Email',value:'connect@mygov.nic.in'},{type:'Website',value:'https://www.mygov.in'}]}]};

document.addEventListener("deviceready", onDeviceReady, false);
		
function onDeviceReady() {
		
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
	
    //alert("hello there!!");
}

function onOnline(){
	alert("Hurray !!! Connected to network");;
}

function onOffline(){
	alert("Device isn't connected :( ");
}