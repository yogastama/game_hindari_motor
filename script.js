$(document).ready(function(){

	$('.tombolAnimation').on('click', function() { 

		let orang = $('.orang');
		let tombol = $(this).attr('command');

		if(tombol === 'jalan') {
			orang.css({'animation-play-state': 'running'});
			// orang.removeClass('lompat');
			orang.addClass('jalan');
		}
		else if(tombol === 'lompat') {
			// orang.removeClass('jalan');
			orang.addClass('lompat');
		} 
		else if(tombol === 'berhenti') {
			orang.css({'animation-play-state': 'paused'});
		}  
	});

});