(function() {
		var cwhApp = angular.module('cwhApp', ['ngRoute']);
		cwhApp.config(['$routeProvider', '$locationProvider',
    	  function($routeProvider, $locationProvider) {
    	    $routeProvider.when('/dashboardPage', {
    	        templateUrl: '/dashboard.html',
    	        controller: 'Dashboard',
    	        controllerAs: 'dashboard'
    	    })
    	    $routeProvider.when('/mainPage', {
    	        templateUrl: '/main.html',
    	        controller: 'Main',
    	        controllerAs: 'main'
    	    })
    	    $routeProvider.when('/printersPage', {
    	        templateUrl: '/printers.html',
    	        controller: 'PrintersController',
    	        controllerAs: 'printersController'
    	    })
    	    $routeProvider.when('/printerControlsPage', {
    	        templateUrl: '/printerControls.html',
    	        controller: 'PrinterControlsController',
    	        controllerAs: 'printerControlsController'
    	    })
    	    $routeProvider.otherwise({
    	    	redirectTo: '/mainPage'
    	    });
    	    
    	    $locationProvider.html5Mode({enabled: true, requireBase: true, rewriteLinks: true});
    	}])//*/

angular.module('cwhApp').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('cwhApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});






    cwhApp.controller(
            "IndexController",
            function( $scope, modals ) {
                // I open an Alert-type modal.
                $scope.alertSomething = function() {
                    // The .open() method returns a promise that will be either
                    // resolved or rejected when the modal window is closed.
                    var promise = modals.open(
                        "alert",
                        {
                            message: "I think you are kind of beautiful!"
                        }
                    );
                    promise.then(
                        function handleResolve( response ) {
                            console.log( "Alert resolved." );
                        },
                        function handleReject( error ) {
                            console.warn( "Alert rejected!" );
                        }
                    );
                };
                // I open a Confirm-type modal.
                $scope.confirmSomething = function() {
                    // The .open() method returns a promise that will be either
                    // resolved or rejected when the modal window is closed.
                    var promise = modals.open(
                        "confirm",
                        {
                            message: "Are you sure you want to taste that?!"
                        }
                    );
                    promise.then(
                        function handleResolve( response ) {
                            console.log( "Confirm resolved." );
                        },
                        function handleReject( error ) {
                            console.warn( "Confirm rejected!" );
                        }
                    );
                };
                // I open a Prompt-type modal.
                $scope.promptSomething = function() {
                    // The .open() method returns a promise that will be either
                    // resolved or rejected when the modal window is closed.
                    var promise = modals.open(
                        "prompt",
                        {
                            message: "Who rocks the party the rocks the body?",
                            placeholder: "MC Lyte."
                        }
                    );
                    promise.then(
                        function handleResolve( response ) {
                            console.log( "Prompt resolved with [ %s ].", response );
                        },
                        function handleReject( error ) {
                            console.warn( "Prompt rejected!" );
                        }
                    );
                };
            }
        );
        
        
        cwhApp.controller("AlertModalController",
            function( $scope, modals ) {
    	                       // Setup default values using modal params.
                $scope.message = ( modals.params().message || "Whoa!" );
                // ---
                // PUBLIC METHODS.
                // ---
                // Wire the modal buttons into modal resolution actions.
                $scope.close = modals.resolve;


                // I jump from the current alert-modal to the confirm-modal.
                $scope.jumpToConfirm = function() {
                    // We could have used the .open() method to jump from one modal
                    // to the next; however, that would have implicitly "rejected" the
                    // current modal. By using .proceedTo(), we open the next window, but
                    // defer the resolution of the current modal until the subsequent
                    // modal is resolved or rejected.
                    modals.proceedTo(
                        "confirm",
                        {
                            message: "I just came from Alert - doesn't that blow your mind?",
                            confirmButton: "Eh, maybe a little",
                            denyButton: "Oh please"
                        }
                    )

                    .then(
                        function handleResolve() {
                            console.log( "Piped confirm resolved." );
                        },
                        function handleReject() {
                            console.warn( "Piped confirm rejected." );
                        }
                    );
                };
            }
        );
            

    	cwhApp.controller("IndexController", function ($scope, $http) {
    		this.changeCurrentPage = function (newPageName) {
    			this.currentPage = newPageName;
    		}



			$scope.$on("MachineResponse", function (event, args) {
				//args = machineResponse, successFunction, afterErrorFunction
            	if (!args.machineResponse.response) {
            		args.machineResponse.command = "Error On " + args.machineResponse.command;
            		$scope.currentError = args.machineResponse;
                	
                	$('#errorModal').modal().after
                	if (args.afterErrorFunction != null) {
                		args.afterErrorFunction(args.machineResponse);
                	}
            	} else if (args.successFunction != null) {
            		args.successFunction(args.machineResponse);
            	}
            });
			$scope.$on("HTTPError", function (event, args){
				//args = data, status, headers, config, statusText
        		var customMessage;
    			if (args.status == "401") {
    				customMessage = "You logged in wrong.";
    			} else if (args.status == "400") {
    				customMessage = args.statusText;
    			} else if (args.startText == null) {
    				customMessage = "Problem communicating with host printer.";
    			} else {
    				customMessage = "Problem communicating with host printer. (http:" + args.statusText + ")";
    			}
    			
    			$scope.currentError = {command:"Server Error " + args.status, message : customMessage};
    	    	$('#errorModal').modal();
    	    });
	        $http.get('/services/settings/visibleCards').success(function(data) {
            	$scope.visibleCards = data;
            });
	        $http.get('/services/settings/integerVersion').success(function(data) {
            	$scope.integerVersion = data;
            });
	        this.currentPage = 'dashboard';
	        
    	})
    	
	    bootcards.init( {
	        offCanvasHideOnMainClick : true,
	        offCanvasBackdrop : true,
	        enableTabletPortraitMode : true,
	        disableRubberBanding : true,
	        disableBreakoutSelector : 'a.no-break-out'
	      });
	    
    })();