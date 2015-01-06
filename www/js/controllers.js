angular.module('lulaApp.controllers', [])

.controller('CompCtrl', function($scope, $ionicModal, $state, fbURL, HelperService) {
	var fb = new Firebase(fbURL);
	$scope.hS = HelperService;
	
	$scope.message = {
		timeString : new Date().toLocaleString(),
	};
	
	$scope.hS.mainImg = '../img/default.png'

	$scope.send = function(){
		var now = new Date();
		$scope.message = {
			time : now.getTime(),
			timeString : now.toLocaleString(),
			mainMessage : $scope.message.mainMessage,
			user : $scope.message.user,
			mainImg : $scope.hS.mainImg == '../img/default.png' ? 'none' : $scope.hS.mainImg
		};
		fb.child("messages").push($scope.message);
		clear();
	};
	
	function clear(){
		$scope.message = {
		timeString : new Date().toLocaleString()
		};
		$scope.hS.mainImg = '../img/default.png'
		$state.go('tab.wall');
	};
	
	 $ionicModal.fromTemplateUrl('templates/swipecards.html', function($ionicModal) {
        $scope.cardsModal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });
	
})

.controller('WallCtrl', function($scope, $firebase, fbURL) {
	var fb = new Firebase(fbURL);
	$scope.messages = $firebase(fb.child("messages")).$asArray();
	console.log($scope.messages);
	
})

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
  var cardTypes = [];
	
  for(i=0; i<17; i++)
	  cardTypes.push({ title: 'Soy un salchi', image: '../img/salchi('+ i +').jpg' });
 


  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, $rootScope, $ionicSwipeCardDelegate, HelperService) {
  	$scope.hS = HelperService;
	$scope.choose = function(inImg) {
		console.log("chosen: ", inImg); 
		$scope.hS.mainImg = inImg;
		$scope.cardsModal.hide();
	};
	
	$scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
})
