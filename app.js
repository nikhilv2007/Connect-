var angMain = angular.module('myApp', ['ngRoute']);

angMain.controller('contactsController', ['$scope', function($scope, $routeParams){
    $scope.contacts = data.contacts;   
}]);

angMain.controller('showContactController', function($scope, $routeParams){
    
    $scope.contactId = $routeParams.contactId;
    
    function getDetails(id){
        var temp = data.contacts;
        for ( var c in temp){
            if (temp[c].id == id){
                $scope.connectionDetails = temp[c].connection;
                $scope.contactName = temp[c].name;
                break;
            }
        }
    }
    
    getDetails($routeParams.contactId)
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

var data = { version: '0.0.1', contacts:[{id: 1, name: 'BBMP', tags:['utility', 'bengaluru', 'muncipality'], connection: [{type:"Phone", value: '080 - 22660000'}, {type: 'Whatsapp', value: '9480685700'}, {type: 'Facebook', value: 'https://www.facebook.com/BBMP-Commissioner-628402897294978'}, {type: 'Twitter', value: 'https://twitter.com/BBMPCOMM1'}, {type: 'Email', value:'contactusbbmp@gmail.com'}, {type: 'Website', value:'http://bbmp.gov.in/'}]}, { id: 2, name: 'Commissioner, Bengaluru City Police', connection:[{type: 'Phone', value:'080 22942222'}, {type: 'Phone', value: '080 22943322'}, {type: 'Email', value: 'compolbcp@ksp.gov.in'}, {type: 'Twitter', value: 'https://twitter.com/cpblr'}]}]};

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