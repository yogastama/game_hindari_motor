//deklarasi global variable
let game;
let orang;
let motor = false;
let durasi = 500;
let timerId = false;

function pause(){
	orang.addClass('pause');
	motor.addClass('pause');
	clearTimeout(timerId);
}

function lompat(){
	orang.addClass('lompat');

	//berhenti lompat
	orang.on("animationend", function() {
	    $(this).removeClass("lompat");
	});
}

function jalan(){
	orang.removeClass('pause');

	//cek lagi ada motor atau gak
	if(motor !== false){
		motor.removeClass('pause');
		intervalMotor();
	}
}

function bikinMotor(){
	game.append('<div class="motor">');
	motor = $('.motor');

	motor.css({'animation' : 'maju 20s infinite,  motor2 .3s steps(3) infinite'});
}

function range(min, max){
 	/*	karena Javascript tidak punya fungsi range, maka kita buat range sendiri

 		math floor lakukan pembulatan angka
 		math random mendapatkan angka acak, contohnya : 1.28911
	*/
 	durasi = Math.floor(Math.random() * (max-min) + min);

 	return durasi;
}

function intervalMotor(){
	timerId = setTimeout(function(){
				 	//bikin motor
				 	bikinMotor();
				  	
				  	//clear timeout saatini
				  	clearTimeout(timerId);
				 	
				 	//atur durasi keluar motor antara 3 detik sampai 6 detk
				 	durasi = range(5000, 6000);
				 	// durasi = 3000;
				 	console.log(durasi);

				  	intervalMotor();
			  }, durasi);
}

function tombol(){
	$(document).on('keydown', function(e){
		
		//32 adalah spasi
		if(e.keyCode == 32){
			if(orang.hasClass('pause')){
				//pertama kali spasi jalan
				jalan(); 

				//pertama kali mulai remove class start
				if(game.hasClass('start')){
					intervalMotor();
					game.removeClass('start');
				}

			}else{
				//spasi selanjutnya lompat
				lompat();
			}
		}
		else if(e.keyCode == 80){
			//80 adalah huruf p
			pause();
		}

	});
}

function init(){
	tombol();
}

$(document).ready(function(){
	//simpan selector di global variable
	game = $('#game');
	orang = $('#orang');

	//awal game, tambahin class start
	game.addClass('start');

	init();
});