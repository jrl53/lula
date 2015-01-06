angular.module('lulaApp.controllers', [])

.controller('CompCtrl', function($scope, $ionicModal, $state, fbURL, HelperService, lulifyFilter) {
	var fb = new Firebase(fbURL);
	$scope.hS = HelperService;
	$scope.isLulified = false;
	$scope.message = {
		timeString : new Date().toLocaleString(),
	};
	
	$scope.hS.mainImg = '../img/default.png'
	
	$scope.lulify = function (){
		$scope.message.mainMessage2 = $scope.message.mainMessage;
		$scope.message.mainMessage = lulifyFilter($scope.message.mainMessage);
		
		$scope.message.user2 = $scope.message.user;
		$scope.message.user = lulifyFilter($scope.message.user);
		
		$scope.isLulified = true;
	};
	
	$scope.send = function(){
		var now = new Date();
		$scope.message = {
			time : now.getTime(),
			timeString : now.toLocaleString(),
			mainMessage : $scope.message.mainMessage,
			mainMessage2 : $scope.message.mainMessage2,
			user : $scope.message.user,
			user2 : $scope.message.user2,
			mainImg : $scope.hS.mainImg == '../img/default.png' ? 'none' : $scope.hS.mainImg
		};
		fb.child("messages").push($scope.message);
		$scope.clear();
		$state.go('tab.wall');
	};
	
	$scope.clear = function(){
		$scope.message = {
		timeString : new Date().toLocaleString()
		};
		$scope.hS.mainImg = '../img/default.png';
		$scope.isLulified = false;
		
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
	
  for(i=0; i<21; i++)
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

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('tab.compose');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})
