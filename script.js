
$(document).ready(function(){
	var cardDeck = new playingCards();
	var hand = [];

	var tickIteration = 1;

	$('#draw').click(function(){
		drawCard();
		play();
		lead();
		updateGraph(parseInt(tickIteration), probability()*100);
		tickIteration++;
	});
	$('#stop').click(function(){
		//write message of how much you earned
		//create a history of records of highest score
	});
	$('#restart').click(function(){
		//reset everything to the start
	});

	var showError = function(msg){
		$('#error').html(msg).show();
		setTimeout(function(){
		    $('#error').fadeOut('slow');
		},3000);
	}
	var showHand = function(){
		var el = $('#currentCard')
		el.html('');
		el.append(hand[hand.length-1].getHTML());
		// for(var i=0;i<hand.length;i++){
		//     el.append(hand[i].getHTML());
		// }
	}
	
	var drawCard = function(){
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

	var probability = function(){
		var red_left = 28 - parseInt($('#you').text());
		return (red_left/54);
	}

});