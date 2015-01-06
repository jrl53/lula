angular.module('lulaApp.services', [])

.factory('HelperService', function() {
	var s = {};
	
	s.mainImg = '../img/salchi (9).jpg';
	
	
	
	return s;
})

.filter('lulify', function() {
	
	
	return function(input) {
		input = input || '';
		var wordArr = input.split(" ");
		var out = "";
		
		angular.forEach(wordArr, function(word) {
			
			var wordOut = '';
			var upper = Math.random() > 0.9? true : false;
			for (var i = 0; i < word.length; i++) {
				switch(word.charAt(i)){
					case 'p':
						wordOut += 'f';break;
					case 'P':
						wordOut += 'F';break;
					case 't':
						wordOut += 'th';break;
					case 'T':
						wordOut += 'Th';break;
					case '!':
						//wordOut = wordOut.slice(0,wordOut.length-1);
						for(var j=0; j < 5; j++) 
							wordOut += wordOut.slice(wordOut.length-1, wordOut.length);
						wordOut += '!';
						
						break;
					case '?':
						//wordOut = wordOut.slice(0,wordOut.length-1);
						for(var j=0; j < 5; j++) 
							wordOut += wordOut.slice(wordOut.length-1, wordOut.length);
						wordOut += '?';
						
						break;
					default:
						wordOut += word.charAt(i);
				}
			}
			if(upper) {
				for(var j=0; j < 5; j++) 
							wordOut += wordOut.slice(wordOut.length-1, wordOut.length);
				out = out + wordOut.toUpperCase() + ' '; 
			}
			else
				out = out + wordOut + ' ';
			
		});
		
		
		// conditional based on optional argument

		return out.trim();;
	};
})