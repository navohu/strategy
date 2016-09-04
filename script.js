
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
	}

	var play = function(){
		var card = $('.front');
		var card_class = card.attr('class');
		var you = $('#you');
		var opponent = $('#opponent');
		if(eval(you.text()) + eval(opponent.text())>53){ alert("You have used all 52 cards"); return; } // Stop after 52 cards
		if(card_class.indexOf('red') !== -1 ) { //The card is red
			changeScore(opponent);
		}
		else{
			changeScore(you);
		}
	}

	var lead = function(){
		var you = $('#you');
		var opponent = $('#opponent');
		var result = parseInt(you.text()) - parseInt(opponent.text());
		$("#lead").text(result);
	}
	cardDeck.shuffle();
	$('#draw').click(function(){
		draw_card();
		play();
		lead();
	});
	$('#stop').click(function(){
		//write message of how much you earned
		//create a history of records of highest score
	});
	$('#restart').click(function(){
		//reset everything to the start
	});
});