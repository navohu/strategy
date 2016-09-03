
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

	cardDeck.shuffle();
	$('#draw').click(function(){
		draw_card();
	});
});