//deklarasi global variable
let game;
let orang;

function pause(){
	orang.css({'animation-play-state': 'paused'});
}

function berhentiLompat(){
	orang.on("animationend", function() {
	    $(this).removeClass("lompat");
	});
}

function jalan(){
	orang.css({'animation-play-state': 'running'});
	orang.addClass('jalan');
}

function bikinMotor(){
	game.append('<div class="motor"');
}

function init(){
	bikinMotor();
}

$(document).ready(function(){

	game = $('#game');
	orang = $('.orang');

	//berhenti
	$('#tombolBerhenti').on('click', function() {
		pause();
	});

	//Jalan
	$('#tombolJalan').on('click', function() {
		jalan();
	});

	//lompat
	$('#tombolLompat').on('click', function() {
		orang.addClass('lompat');
		berhentiLompat();
	});

	init();
});