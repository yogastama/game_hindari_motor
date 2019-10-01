//deklarasi global variable
let game;
let orang;
let frameMotor;
let motor = false;
let durasi = 500;
let timerBikinMotor = false;
let timerCollision = false;
let papanNilai;
let nilai;
let strNilai = 0;
let info;
let namaGame;
let instruksi;
let strNamaGame = 'HINDARI MOTOR';
let strInstruksi = 'TEKAN (space) untuk mulai dan lompat, tekan (p) untuk pause';

/*jarak dari ukuran gambar .jalan / .lompat dari kanan sampai kaki
  supaya mati hanya ketika ketabrak kaki, bukan box nya
  ini dilakukan karena kepala lebih maju dari kaki 
	
  aturLebarOrang akan menjadi dinamis agar bisa lebih dalam ketika melompat
  supaya real seperti hanya mati ketika tabrak stang motor

  dibuat json agar sewaktu-waktu bisa di tambah atribut lainy, misalnya tinggi
*/
let aturOrang = {'lebar' : 50, 'tinggi' : 80};

function range(min, max){
 	/*	karena Javascript tidak punya fungsi range, maka kita buat range sendiri

 		math floor lakukan pembulatan angka
 		math random mendapatkan angka acak, contohnya : 1.28911
	*/
 	durasi = Math.floor(Math.random() * (max-min+1) + min);

 	return durasi;
}

function motorSudahAda(){
	if(motor !== false){
		return true;
	}

	return false;
}

function pause(){
	orang.addClass('pause');
	tampilkanInfo();
	if(motorSudahAda()){
		motor.addClass('pause');
		window.clearTimeout(timerBikinMotor);
		window.clearTimeout(timerCollision);
	}
}

function jalan(){	
	intervalMotor();
	orang.removeClass('pause');
	
	//cek lagi ada motor atau gak
	if(motorSudahAda()){
		motor.removeClass('pause');
	}

	//delay sebelum mulai mengeluarkan motor
	setTimeout(collisionMotor, 1000);
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

function tampilkanInfo(){
	// namaGame.show();
	// instruksi.show();
	return info.animate({'top' : '25'}, 1000).promise();
}

function hilangkanInfo(){
	return info.animate({'top' : '-150'}, 1000).promise();
}

function tampilkanPapanNilai(){
	// nilai.show();
	return papanNilai.animate({'top' : '120'}, 700).promise();
}

function mati(){
	tampilkanInfo();
	window.clearTimeout(timerBikinMotor);
	window.clearTimeout(timerCollision);
	orang.addClass('mati');
	game.addClass('reset');
}

function reset(){
	// info.hide();

	// window.clearTimeout(timerBikinMotor);
	// window.clearTimeout(timerCollision);
	// orang.removeClass('mati');

	// frameMotor.html(''); //hapus semua motor
	
	// strNilai = 0;
	// nilai.text(strNilai);

	location.reload();
}

function collisionMotor(){
	timerCollision = setTimeout(function(){
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

							//50 karena kepala lebih besar dari badan, padahal yang di tabrak badan, jadi kurangin 50
							let lebarOrang = posOrang.x + posOrang.lebar - aturOrang.lebar;
							let lebarMotor = posMotor.x + posMotor.lebar;
							
							let tinggiOrang = posOrang.y + posOrang.tinggi - aturOrang.tinggi;
							let tinggiMotor = posMotor.y + posMotor.tinggi;

							if (lebarOrang >= posMotor.x && posOrang.x <= lebarMotor && tinggiOrang >= posMotor.y){				
								// if() {
									$(this).removeClass('tantangan');
									mati();
								// }
							}
							else if(posOrang.x > lebarMotor){
								if($(this).hasClass('tantangan')){
									$(this).removeClass('tantangan');
									
									//nilai
									strNilai = strNilai + 1;
									nilai.text(strNilai);
									hapusMotor();
								}
							}
						});

		collisionMotor();
	}, 100);
}

function bikinMotor(){
	//bikin emelement motor
	frameMotor.prepend('<div class="motor">');

	//isi variable motor sebagai selector
	motor = $('.motor');

	//animasi motor
	let jeniMotor = range(1, 3);
	let pilihMotor = 'motor' + jeniMotor;
	motor.first().addClass(pilihMotor + ' tantangan detect');
	motor.first().css({'animation' : 'maju 18s forwards,  '+ pilihMotor +' .3s steps(3) infinite'});
}

function intervalMotor(){
	timerBikinMotor = setTimeout(function(){
				 	//bikin motor
				 	bikinMotor();
				  	
				  	//clear timeout saatini
				  	window.clearTimeout(timerBikinMotor);
				 	
				 	//atur durasi keluar motor antara 3 detik sampai 6 detk
				 	durasi = range(3000, 5000);

				  	intervalMotor();
			 }, durasi);
}

function kontrol(){
	$(document).on('keydown', function(e){
		//32 adalah spasi
		if(e.keyCode == 32){
			if(game.hasClass('start')){
				//pertama kali spasi jalan
				jalan();
				hilangkanInfo().then(function(){ 
					tampilkanPapanNilai();
				});

				//game sudah jalan, hapus class start
				game.removeClass('start');
			}
			else if(game.hasClass('reset')){
				reset();
				jalan();
			}
			else if(orang.hasClass('pause')){
				hilangkanInfo();
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
	
	//simpan selector di global variable
	game = $('#game');
	orang = $('#orang');
	info = $('#info');
	papanNilai = $('#papanNilai');
	frameMotor = $('#frameMotor');

	//bikin beberapa element di info
	info.append('<h3 class="namaGame"><h4 class="instruksi">');
	papanNilai.append('<h5 class="nilai">');
	
	//simpan selector yang ada di info ke global variable
	nilai = $('.nilai');
	namaGame = $('.namaGame');
	instruksi = $('.instruksi');

	nilai.text(strNilai);
	namaGame.text(strNamaGame);
	instruksi.text(strInstruksi);

	tampilkanInfo();
	pause();
	kontrol();
}

$(document).ready(function(){
	setTimeout(init(), 1000);
});