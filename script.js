
$(document).ready(function(){
	var cardDeck = $('#cardDeck').playingCards();
	cardDeck.init();
	var hand = [];

	var showError = function(msg){
		$('#error').html(msg).show();
		setTimeout(function(){
		    $('#error').fadeOut('slow');
		},3000);
	}
	var showHand = function(){
		var el = $('#yourHand')
		el.html('');
		el.append(hand[hand.length-1].getHTML());
		// for(var i=0;i<hand.length;i++){
		//     el.append(hand[i].getHTML());
		// }
	}
	
	var draw_card = function(){
		var draw = cardDeck.draw();
		if(!draw){
			showError("No more cards.");
			return;
		}
		hand[hand.length] = draw;
		cardDeck.spread();
		showHand();
	}

	var changeScore = function(player){
		var score = player.text();
		score ++;
		player.text(score);
		console.log(score);
	}

	var play = function(){
		var card = $('.front');
		var card_class = card.attr('class');
		if (card_class.indexOf('red') !== -1) { //The card is red
			console.log("It's red.");
			changeScore($('#you'));
		}
		else{
			changeScore($('#opponent'));
		}
	}

	cardDeck.shuffle();
	$('#draw').click(function(){
		draw_card();
		play();
	});
});