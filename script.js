//deklarasi global variable
let game;
let orang;
let motor = false;
let durasi = 500;
let timer = false;
let timerCollision = false;

/*jarak dari ukuran gambar .jalan / .lompat dari kanan sampai kaki
  supaya mati hanya ketika ketabrak kaki, bukan box nya
  ini dilakukan karena kepala lebih maju dari kaki 
	
  aturLebarOrang akan menjadi dinamis agar bisa lebih dalam ketika melompat
  supaya real seperti hanya mati ketika tabrak stang motor
*/
let aturLebarOrang = 40;

function range(min, max){
 	/*	karena Javascript tidak punya fungsi range, maka kita buat range sendiri

 		math floor lakukan pembulatan angka
 		math random mendapatkan angka acak, contohnya : 1.28911
	*/
 	durasi = Math.floor(Math.random() * (max-min+1) + min);

 	return durasi;
}

function pause(){
	orang.addClass('pause');
	motor.addClass('pause');
	clearTimeout(timer);
	clearTimeout(timerCollision);
}

function jalan(){	
	intervalMotor();
	orang.removeClass('pause');
	
	//cek lagi ada motor atau gak
	if(motor !== false){
		motor.removeClass('pause');
	}

	//delay sebelum mulai menghitung collision
	setTimeout(collision, 1000);
}

function hapusMotor(){
	//hapus motor yang sudah selesai
	motor.on("animationend", function() {
	    $(this).remove();
	});
}

function lompat(){
	orang.addClass('lompat');

	//berhenti lompat
	orang.on("animationend", function() {
	    $(this).removeClass("lompat");
	});
}

function collision(){
	setTimeout(function(){
		motor.each(function(index, obj){
			//orang
			let posOrang = { 'lebar'	: orang.width(),
							 'tinggi'	: orang.height(),
							 'x'		: orang.offset().left,
							 'y'		: orang.offset().top };
			
			//motor
			let posMotor = { 'lebar'	: $(this).width(),
							 'tinggi'	: $(this).height(),
							 'x'		: $(this).offset().left,
							 'y'		: $(this).offset().top };

			// console.log((posOrang.y + posOrang.tinggi) +'--'+ posMotor.y);
			// console.log((posOrang.x + posOrang.lebar) +' -- '+ posMotor.x);


			//50 karena kepala lebih besar dari badan, padahal yang di tabrak badan, jadi kurangin 50
			let lebarOrang = posOrang.x + posOrang.lebar - aturLebarOrang;
			let lebarMotor = posMotor.x + posMotor.lebar;
			
			let tinggiOrang = posOrang.y + posOrang.tinggi;
			let tinggiMotor = posMotor.y + posMotor.tinggi;

			if(lebarOrang > posMotor.x && lebarOrang < lebarMotor){

				if(tinggiOrang < tinggiMotor){
					// console.log(lebarOrang + '--' + posMotor.x + ' && ' + lebarOrang + '--' + lebarMotor);
					// pause();
					// console.log('%cSuccess', 'color:green');
					hapusMotor();
				}else{
					// console.log(lebarOrang + '--' + posMotor.x + ' && ' + lebarOrang + '--' + lebarMotor);
					// console.log('%cgagal', 'color:red');
					// pause();
					orang.addClass('mati');
				}
			}
		});

		collision();
	}, 100);
}

function bikinMotor(){
	//bikin emelement motor
	game.prepend('<div class="motor">');

	//isi variable motor sebagai selector
	motor = $('.motor');

	//animasi motor
	let jeniMotor = range(1, 3);
	let pilihMotor = 'motor' + jeniMotor;
	motor.first().addClass(pilihMotor);
	motor.first().css({'animation' : 'maju 18s forwards,  '+ pilihMotor +' .3s steps(3) infinite'});
}

function intervalMotor(){
	timer = setTimeout(function(){
				 	//bikin motor
				 	bikinMotor();
				  	
				  	//clear timeout saatini
				  	clearTimeout(timer);
				 	
				 	//atur durasi keluar motor antara 3 detik sampai 6 detk
				 	durasi = range(3000, 5000);

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

	init();
});