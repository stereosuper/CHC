// générique

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(callback){
            window.setTimeout(callback, 1000/60);
          };
})();


function fixBloc(id_string, scrollBegin, scrollEnd){
	var myScroll = $(document).scrollTop();
	if(myScroll>=scrollBegin && myScroll<scrollEnd){
		$(id_string).css({"position": "fixed", "top": "0"});
	}else{
		$(id_string).css("position", "absolute");
		myScroll<scrollBegin ? $(id_string).css("top", scrollBegin+"px") : $(id_string).css("top",scrollEnd+"px");
	}
}

function scrollBehavior(){
	fixBloc(".no-touch #sidebar", 200, 40000);
	$(window).width() > 1660 ? fixBloc(".no-touch .home #sidebar", 670, 40000) : fixBloc(".no-touch .home #sidebar", 740, 40000);
	fixBloc(".no-touch #avatar", 200, 40000);
}

function animer(myScroll){
	if($('body').hasClass('home'))
		scrollBehavior();
	requestAnimFrame(function(){
		animer(myScroll);
	});
}

$(document).scroll(function(){
	if($(window).width() > 768){
		myScroll = $(document).scrollTop();
		myScroll>180 ? $("body").addClass("on") : $("body").removeClass("on");
	}
});

/*function initSaisons(){
	$('ul#saisonspaint').is(':hidden') ? $("ul#saisonspaint").show().addClass("ouvert") : $("ul#saisonspaint").hide().removeClass("ouvert");
}*/

function initMenu(){
	$('.contenu').is(':hidden') ? $(".contenu").show().addClass("ouvert") : $(".contenu").hide().removeClass("ouvert");
	if($(window).width() <= 768){
		$('#menu').is(':hidden') ? $("#menu").show() : $("#menu").hide();
	}
	$(window).resize(function(){
		if($(window).width() <= 768){
			$("#menu").css({'opacity': 0, 'height': 'toggle', 'display': 'none'});
		}else{
			$("#menu").css({'opacity': 1, 'display': 'table', 'height': 'toggle'});
		}
	});
	$("#burger").click(function(){
		$('#menu').is(':hidden') ? $("#menu").animate({opacity: 1, height: "toggle"}, 500) : $("#menu").animate({opacity: 0, height: "toggle"}, 400);
	});
}

function accordion(that, contenu){
	if(contenu.is(':hidden')){
		contenu.animate({height: "toggle"}, 800);
		$('html, body').animate({scrollTop: that.offset().top -100}, 1000);
		that.addClass("ouvert");
	}else{
		contenu.animate({height: "toggle"}, 500);
		that.removeClass("ouvert");
	}
}

function initMap(){
    var mapOptions = {
        	zoom: 12,
			center: new google.maps.LatLng(47.446054, -0.540285),
			styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
    },
    mapElement = document.getElementById('map'),
    map = new google.maps.Map(mapElement, mapOptions),
    imagetoto = new google.maps.MarkerImage("layoutImg/pin-googlemap.png", new google.maps.Size(90,50), new google.maps.Point(0,0), new google.maps.Point(45,50));
    
    marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(47.417179, -0.523545),
        icon: imagetoto,
        map: map
    });
    
    google.maps.event.addListener(marker1, 'click', function() {
        window.open("https://www.google.fr/maps/place/47%C2%B025'01.8%22N+0%C2%B031'24.8%22W/@47.4182384,-0.5262058,15z/data=!4m2!3m1!1s0x0:0x0");
    });
}

$(function(){

	animer();

	initMenu();

	//initSaisons();

	$("#compub-cp").click(function(){ accordion($(this), $(".contenu-com")); });
	
	$("#accroitre").click(function(){ accordion($(this), $('.contenu-accroitre')); });
	$("#optimiser").click(function(){ accordion($(this), $('.contenu-optimiser')); });
	$("#mettre").click(function(){ accordion($(this), $(".contenu-mettre")); });
	$("#entretien").click(function(){ accordion($(this), $('.contenu-entretien')); });
	$("#comint").click(function(){ accordion($(this), $('.contenu-comint')); });
	$("#relation").click(function(){ accordion($(this), $('.contenu-relation')); });

	// Ouverture par classe //
	$(".content-cp").click(function(){ accordion($(this), $('.contenu', this)); });
	$(".content-m").click(function(){ accordion($(this), $('.contenu', this)); });

	$("#management-cp").click(function(){
	   if ($('.contenu-mana').is(':hidden')) {
		 	  $(".contenu-mana").animate({height: "toggle"},800);
		 	  $('html, body').animate({scrollTop: $("#management-cp").offset().top -100}, 1000);
		 	  $(this).addClass("ouvert");
	   } else {
		  $(".contenu-mana").animate({height: "toggle"},500);
		  $(this).removeClass("ouvert");
	   }
	});

	// Saisons detect
	/*var today = new Date(),
		spring = new Date(today.getFullYear(), 2, 21),
		summer = new Date(today.getFullYear(), 5, 21),
		autumn = new Date(today.getFullYear(), 8, 21),
		winter = new Date(today.getFullYear(), 11, 21);
	
	if(today < summer && today >= spring){
	  	$('body').addClass('printemps');
	}else if(today < autumn && today >= summer){
	  	$('body').addClass('ete');
	}else if(today < winter && today >= autumn){
	  	$('body').addClass('automne');
	}else{
	  	$('body').addClass('hiver');
	}

	$("#paint").click(function(){
		if($('ul#saisonspaint').is(':hidden')){
			$("ul#saisonspaint").animate({width: 'toggle'},600);
			$(this).addClass("turn");
		}else{
			$("ul#saisonspaint").animate({width: 'toggle'},500);
			$(this).removeClass("turn");
		}
	});
	$("#automne").click(function(){
		$('body').removeClass('printemps ete hiver').addClass('automne');
	});
	$("#ete").click(function(){
		$('body').removeClass('printemps automne hiver').addClass('ete');
	});
	$("#printemps").click(function(){
		$('body').removeClass('automne ete hiver').addClass('printemps');
	});
	$("#hiver").click(function(){
		$('body').removeClass('printemps ete automne').addClass('hiver');
	});*/
	
	// Google map
	if($('body').hasClass('contact'))
		google.maps.event.addDomListener(window, 'load', initMap);
});