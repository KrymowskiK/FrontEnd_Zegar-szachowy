var wysokosc = $('.bialy').css('width');
var innerHeight = $('.zawodnik').css('width');
var wysokosc_ekranu_startowego = (.85 * parseInt(wysokosc)) + 'px';
var p_width = $('p').css('width');
var bialy = true;
var bialy_interwal;
var czarny_interwal;
var gra_trwa = true;
var ilosc_ruchow = 1;

$('.bialy').css('height', wysokosc);
$('.czarny').css('height', wysokosc);
$('.zawodnik').css('height', innerHeight);
$('.zawodnik').css('line-height', innerHeight);
$('.ekran_startowy').css('height', wysokosc_ekranu_startowego);
$('czas_rozgrywki').css('width', (parseInt(p_width) + 40) + 'px' );

var minRayWhite = [];
var secRayWhite = [];
var minRayBlack = [];
var secRayBlack = [];
for(var i = 59; i >= 0; i--) { 
	secRayWhite[59 - i] = i;
	secRayBlack[59 - i] = i;
}

function startujZegar() {
	var minInit = parseInt($('p').text());
	var white_date = new Date();
	var black_date = new Date();
	for(var i = minInit; i >= 0; i--){
		minRayWhite[minInit - i] = i;
		minRayBlack[minInit - i] = i;
	}
	$('.ekran_startowy').css('display', 'none');
	$('h1').text($('p').text());
	tickWhite();
}

function koniec_ruchu(kto_wcisnal) {
	if(gra_trwa) {		
		if(bialy && kto_wcisnal === 'bialy') {
			$('#liczba_ruchow').css('visibility', 'visible').css('color', 'white').text(ilosc_ruchow++);
			bialy = false;
			//console.log('\u2407');
			clearInterval(bialy_interwal);
			$('#widok_bialy').removeClass('aktywny');
			$('#widok_bialy').addClass('pauza');
			$('#widok_czarny').removeClass('pauza');
			$('#widok_czarny').addClass('aktywny');
			$('.bialy .zawodnik').removeClass('zawodnik_gra');
			$('.bialy .zawodnik').addClass('zawodnik_czeka');
			$('.czarny .zawodnik').removeClass('zawodnik_czeka');
			$('.czarny .zawodnik').addClass('zawodnik_gra');
			tickBlack();
		} else if(!bialy && kto_wcisnal === 'czarny'){
			bialy = true;
			$('#liczba_ruchow').text(ilosc_ruchow++).css('color', 'black');
			//console.log('\u2407');
			clearInterval(czarny_interwal);
			$('#widok_czarny').removeClass('aktywny');
			$('#widok_czarny').addClass('pauza');
			$('#widok_bialy').removeClass('pauza');
			$('#widok_bialy').addClass('aktywny');
			$('.czarny .zawodnik').removeClass('zawodnik_gra');
			$('.czarny .zawodnik').addClass('zawodnik_czeka');
			$('.bialy .zawodnik').removeClass('zawodnik_czeka');
			$('.bialy .zawodnik').addClass('zawodnik_gra');
			tickWhite();
		}
	}
}


function tickBlack() {
	czarny_interwal = setInterval(function(){
		oneSecond();
	}, 1000)	
}

function tickWhite() {
	bialy_interwal = setInterval(function(){
		oneSecond();
	}, 1000)
}

function wiecejCzasu() {
	var minutes = getMinutes() + 1;	
	$('p').text(minutes + ':00');
}

function mniejCzasu() {
	var minutes = getMinutes() - 1;
	if(minutes < 1) minutes = 1;
	$('p').text(minutes + ':00');
}

function getMinutes() {
	return parseInt($('p').text());
}

function oneSecond() {
	var secRay = secRayBlack.slice(0);
	var minRay = minRayBlack.slice(0);
	if(bialy) {
		secRay = secRayWhite.slice(0);
		minRay = minRayWhite.slice(0);
	}
	var sec = secRay.shift();
	secRay.push(sec);
	if (sec === 59) minRay.shift();	
	if (minRay.length !== 0) { 
		if(minRay[0] > 100) {
			$('h1').css('font-size', '100px');
		}else {
			$('h1').css('font-size', '150px');
		}
		if(sec < 10) sec = '0' + sec;	
		$('h1.aktywny').text(minRay[0] + ':' + sec);
		if(bialy) {
			secRayWhite = secRay.slice(0);
			minRayWhite = minRay.slice(0);
		} else {
			secRayBlack = secRay.slice(0);
			minRayBlack = minRay.slice(0);
		}	
	} else {
		$('h1.aktywny').css('font-size', '50px').text('Koniec czasu!!!');
		gra_trwa = false;
	}
}