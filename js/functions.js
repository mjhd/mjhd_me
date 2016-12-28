$(document).ready(function(){

$(window).resize(resizeInnerElementHeight);
$(window).resize(skillResize);
var checkShow = 'close';
var innerElementHeight;
var elementsPadding;
var timeWidth;
var docCheck;

if ( $(window).width() > 860 ) { docCheck = true; }
if ( $(window).width() < 860 ) { docCheck = false; }

console.log(docCheck);
//  Swiper initialize and callbacks


var initSlideHeight;

var swiper_left = new Swiper('#slide-left', { 
	loop: true,
	calculateHeight: true,
	});


swiper_left.addCallback('Init', function(){

	$('#slide-right').height($('#slide-left').height());
	
});


$('#slide-left-left').on('click', function() { swiper_left.swipePrev(); });
	
$('#slide-left-right').on('click', function() { swiper_left.swipeNext(); });



swiper_left.addCallback('SlideNext', function(){
	
	if ($('#slide-left .swiper-slide img').length < $('#slide-left .swiper-slide').length) {
	
		if (swiper_left.activeLoopIndex == 1){ $('#slide-left .slide3').load('inc/img_links/main/img3.html'); }
		else if (swiper_left.activeLoopIndex == 2){ $('#slide-left .slide4').load('inc/img_links/main/img4.html'); }
		else if (swiper_left.activeLoopIndex == 3){ $('#slide-left .slide5').load('inc/img_links/main/img5.html'); }
		
	}
	
	});
	
swiper_left.addCallback('SlidePrev', function(){
	
	if ($('#slide-left .swiper-slide img').length < $('#slide-left .swiper-slide').length) {
		
		if (swiper_left.activeLoopIndex == 3){ $('#slide-left .slide3').load('inc/img_links/main/img3.html'); }
		else if (swiper_left.activeLoopIndex == 4){ $('#slide-left .slide4').load('inc/img_links/main/img4.html'); }
		else if (swiper_left.activeLoopIndex == 5){ $('#slide-left .slide5').load('inc/img_links/main/img5.html'); }

	}
	
	
	});
	
	
	
// Bind lazyload for site scroll container to swiper finalized size with images
swiper_left.addCallback('ImagesReady', function(){

	$("img.lazy").lazyload({ effect : "fadeIn", container: $("#site-slide-wrap") });
	initSlideHeight = $('#slider').height();

	});

// Reinitialize the swiper on window resize event to resize swiper container even on maximize or restore
$(window).bind('resize', function() { swiper_left.reInit(); initSlideHeight = $('#slider').height(); liLayout(); });

// Site scroll nav setup
$('#slide-nav a').on('click', function(event) { 

	event.preventDefault(); 
	
	
	
	});

	
/*function logoGrab(){

	var logoTop = $('header > aside').offset().top;
	var docPos = $(document).scrollTop();
		
	if(logoTop <= docPos && $('header > aside > img').hasClass('logo-fixed') != true){
		
		
		$('header > aside > img').css({'position' : 'absolute', 'bottom' : 0});
		if ($(document).width() >= 900) { $('header > aside > img').css('width', '15%'); }
		$('header > aside > img').stop(true, true).animate({width: '8%'}, 200);
		$('header > aside > img').addClass('logo-fixed');
		
		
		}
		
	if($('header > aside > img').hasClass('logo-fixed') && logoTop > docPos){
		
		
		$('header > aside > img').css({'position' : '', 'top' : ''});
		
		$('header > aside > img').stop(true, true).animate({width: '100%'}, 200);
		$('header > aside > img').removeClass('logo-fixed');
		
		
		}
			
	}*/

$(document).bind('scroll', function(){ if ($(window).width() > 900) { logoGrab(); } });
$(window).bind('resize', function(){ if ($(window).width() > 900) { logoGrab(); } });

function scrollClients() {
	
	$("img.lazy").lazyload({ event : 'loader' });
	
	var scrollValue = ($('#site-slide-wrap > img:first').offset().top -  $('#site-slide-wrap').offset().top + $('#site-slide-wrap > img:first').height()) * -1;
	$('#site-slide-wrap > h3:first').animate({marginTop : scrollValue}, 'slow', function(){ 
		
		$('#site-slide-wrap > h3:first').insertAfter($("#site-slide-wrap > img:last")); $('#site-slide-wrap > img:first').insertAfter($("#site-slide-wrap > h3:last"));
		$('#site-slide-wrap > h3:last').css('margin-top', '');
		window.setTimeout(function(){  $('#site-slide-wrap > img[src^="data"]:first').trigger('loader'); scrollClients(); }, 1000);

		});
	}	

window.setTimeout(function(){ scrollClients(); }, 1000);	

$('#bio').on('click', function(event){ 
	event.preventDefault(); 
	
		if(checkShow != 'bio')
			{ checkShow = 'bio'; loadBio(); }
		
		else if(checkShow == 'bio')
			{ checkShow = 'close'; showHide(); };
		
		function loadBio() {
		
			if($('.skills-inner-b').length == 0 && checkShow != 'close') { 
				$('#elements-canvas').animate({ opacity: 0 }).promise().done(function() { 
					$('#elements-canvas').load('inc/bio.html', 'html', function() { showHide(); openAjaxBind(); bioLink(); timeline(); }); 
				});
			}
			
			else if($('.skills-inner-b').length == 0 && checkShow == 'close') {
				$('#elements-canvas').css('opacity', 0).promise().done(function() {
					$('#elements-canvas').load('inc/bio.html', 'html', function() { showHide(); openAjaxBind(); bioLink(); timeline(); }); 
				}); 	
			} 
			
			else if($('.skills-inner-b').length == 1) { showHide(); }
		
			
		}
});


$('#skills').on('click', function(event){
	event.preventDefault();
	
		if(checkShow != 'skills')
			{ checkShow = 'skills'; loadSkills(); }
		
		else if(checkShow == 'skills')
			{ checkShow = 'close'; showHide(); };
		
		function loadSkills() {
		
			if($('.skills-inner').length == 0 && checkShow != 'close') {
				$('#elements-canvas').animate({ opacity: 0 }).promise().done(function() {
					$('#elements-canvas').load('inc/skills.html', 'html', function() { showHide(); openAjaxBind(); });
				});
			}

			else if($('.skills-inner').length == 0 && checkShow == 'close') { 
				$('#elements-canvas').css('opacity', 0).promise().done(function() { 
					$('#elements-canvas').load('inc/skills.html', 'html', function() { showHide(); openAjaxBind(); }); 
				}); 
			} 			
			
			else if($('.skills-inner').length == 1) { showHide(); }
		}
	
	
});


function showHide() {

	if( $('#elements-canvas:visible').length != $('#elements-canvas').length && checkShow != 'close' ) { skillResize(); $('#elements-canvas').css('display', 'block').promise().done(function() { openElements(); $('#elements-canvas').animate({ opacity: 1 }); }); }
	else if( $('#elements-canvas:visible').length == $('#elements-canvas').length && checkShow == 'close' ) { $('#elements-canvas').animate({ height: 0 }, 'slow'); $('.elements').animate({paddingBottom: '7%'}, 'slow').promise().done(function() { $('#elements-canvas').hide(); $('#elements-canvas').css('height', ''); }); }
	else if( $('#elements-canvas:visible').length == $('#elements-canvas').length && checkShow != 'close' ) { resizeInnerElementHeight(); skillResize(); $('#elements-canvas').animate({ opacity: 1 }); }
	scrollMe();
	
	}
	
 function scrollMe() {
	
	if(checkShow != 'close') {
		var elementTop = $('#elements-canvas').offset().top - 10;
		$('html, body').animate({scrollTop: elementTop}, '600');
		}
	}
 
 function openElements() { getInnerElementHeight(); $('.elements').animate({paddingBottom: innerElementHeight}, 'slow'); }
 
 function getInnerElementHeight() { innerElementHeight = $('#elements-canvas').height() + ( $('.elements').height() * 0.1 ) + ( $('#elements-canvas').height() * 0.2 ) + 'px'; }

 function resizeInnerElementHeight() { 
 
	if ($('#elements-canvas > section').length != 0 && $('#elements-canvas > section').height() != 0) {
		getInnerElementHeight(); $('.elements').css('padding-bottom', innerElementHeight); 
	}
		
 }
 
 // Bio swiper var is defined globally to allow resizeFix() to execute after animateIn() is finished and AJAX container is full size
 var swiper_bio_gallery;
 
 function openAjaxBind() {
 
	$('.sub > a').on('click', function(event) {
		event.preventDefault(); 
		
		//Select AJAX asset to call
		//var ajaxTarget;
		
		if( $(this).attr('id') == 'courses-treehouse') { ajaxTarget = 'inc/skills/cswrk_treehouse.html'; }
		if( $(this).attr('id') == 'courses-codecademy') { ajaxTarget = 'inc/skills/cswrk_codecademy.html'; }
		if( $(this).attr('id') == 'courses-palomar') { ajaxTarget = 'inc/skills/cswrk_palomar.html'; }
		if( $(this).attr('id') == 'courses-sdce') { ajaxTarget = 'inc/skills/cswrk_sdce.html'; }
		
		
		if( $(this).attr('id') == 'skills-treehouse') { ajaxTarget = 'inc/skills/sk_treehouse.html'; }
		if( $(this).attr('id') == 'skills-codecademy') { ajaxTarget = 'inc/skills/sk_codecademy.html'; }
		if( $(this).attr('id') == 'skills-smarter') { ajaxTarget = 'inc/skills/sk_smarterer.html'; }
		if( $(this).attr('id') == 'skills-99designs') { ajaxTarget = 'inc/skills/sk_99designs.html'; }
		
		if( $(this).attr('id') == 'web-desdev') { ajaxTarget = 'inc/portfolio/pf_dev.html'; }
		if( $(this).attr('id') == 'html-apps') { ajaxTarget = 'inc/portfolio/pf_apps.html'; }
		if( $(this).attr('id') == 'graphic-design') { ajaxTarget = 'inc/portfolio/pf_design.html'; }
		if( $(this).attr('id') == 'wordpress-themes') { ajaxTarget = 'inc/portfolio/pf_wordpress.html'; }
		
		var currentSelection = $(this).attr('id');
		//AJAX call and Fadein effects
		$('#inner-ajax').css('opacity', 0);
		$('#inner-ajax').load(ajaxTarget, 'html', function() {
				$(this).fadeTo('slow', 1); 
				
				liLayout();
				
				//Transfer functions
				$('#treehouse-courses-transfer').on('click', function(event) { event.preventDefault(); $('#closer').click(); $('#courses-treehouse').click(); });
				$('#treehouse-skills-transfer').on('click', function(event) { event.preventDefault(); $('#closer').click(); $('#skills-treehouse').click(); });
				
				$('#codecademy-courses-transfer').on('click', function(event){ event.preventDefault(); $('#closer').click(); $('#courses-codecademy').click(); });
				$('#codecademy-skills-transfer').on('click', function(event){ event.preventDefault(); $('#closer').click(); $('#skills-codecademy').click(); });
				
				//Attach gallery functions on AJAX load

				var preSelection = $('#side-select li.active').children('span').attr('class');
				var selection = 'inc/portfolio/frames/' + preSelection + '.html';
				var gallerySelector;
				
				
				$('#gallery-slide').load(selection, 'html', function(){
				
					// Load settings for graphic design galleries
					
					if(currentSelection == 'graphic-design') {
						swiper_bio_gallery = new Swiper('#inner-slide', {
							loop: true,
							calculateHeight: true,
							});
							
						$('#gallery-left').on('click', function() { swiper_bio_gallery.swipePrev(); });
						$('#gallery-right').on('click', function() { swiper_bio_gallery.swipeNext(); });
						
						swiper_bio_gallery.addCallback('SlideNext', function(){
										
							gallerySelector = '#gallery-slide .slide' + (swiper_bio_gallery.activeLoopIndex + 2);
							gallerySelectorCheck = gallerySelector + ' > img';
							
							if ($('#gallery-slide .swiper-slide img').length < $('#gallery-slide .swiper-slide').length) {
								
								if($(gallerySelectorCheck).length == 0 && $(gallerySelector).length == 1) { $(gallerySelector).load('inc/img_links/' + preSelection + '/img' + (swiper_bio_gallery.activeLoopIndex + 2) + '.html'); }

								}
						
							});
					
						swiper_bio_gallery.addCallback('SlidePrev', function(){
							
							gallerySelector = '#gallery-slide .slide' + swiper_bio_gallery.activeLoopIndex;
							gallerySelectorCheck = gallerySelector + ' > img';
											
							if ($('#gallery-slide .swiper-slide img').length < $('#gallery-slide .swiper-slide').length) {
							
								if($(gallerySelectorCheck).length == 0 && $(gallerySelector).length == 1) { $(gallerySelector).load('inc/img_links/' + preSelection + '/img' + swiper_bio_gallery.activeLoopIndex + '.html'); }

								}
						
						
							});
						}
					});
				
				
				if($('#side-select').length == 1) {
					$('#side-select li').on('click', function(){
						if($(this).hasClass('active') == false)	{
						
							if($('#side-select').height() <= 105){
								
								var checkContainer = $(this);
								var count = 0;
								var compressedLayout = false;
								
								$('#side-select li:not(.gone)').each(function(){ 
								
									count++; 
									if($(this).is(checkContainer) && count == 4){
									
										compressedLayout = true;
										
										}
										
									});
								
								if(compressedLayout){
								
									$('#side-select li:not(.gone):first').animate({width : 0}, {duration : 300, queue : false}).promise().done(function(){ $(this).css({ 'display' : 'none', 'width' : '' }); $(this).addClass('gone'); remainingClicks--; });
									$('#side-select li.active').not(this).animate({width: '24%'}, {duration : 300, queue : false});
									
									$(this).animate({width: '48%'}, 300);
									$('#side-select li.active').not(this).removeClass('active');
									$(this).addClass('active');
								}
								
								else{
									$('#side-select li.active').not(this).animate({width: '24%'}, 300);
									
									$(this).animate({width: '48%'}, 300);
									$('#side-select li.active').not(this).removeClass('active');
									$(this).addClass('active');
									}
								}
							
							else { 
								
								$('#side-select li.active').not(this).animate({height: '25%'}, 300);
								$('#side-select li.active').not(this).removeClass('active');
								
								if(resizeTrue == true && $(this).is($('#side-select li:last'))){ $('#side-select li:not(.gone):first').animate({height: 0}, { duration: 300, queue: false }).promise().done(function(){ $(this).css({'display' : 'none', 'height' : ''}); $(this).addClass('gone'); }); }
								if(resizeTrue == true){ resizeTrue = false; }
								$(this).animate({height: '50%'}, 300, function(){ $('#side-select li').each(function(){ if(($(this).offset().top + $(this).height() - 5 ) < $('#side-select ul').offset().top){ $(this).addClass('gone'); } }); });
								$(this).addClass('active');

								}
							
							
							

							
							$('#gallery-slide').fadeOut(400).promise().done(function() {
							
								preSelection = $('#side-select li.active').children('span').attr('class');
								selection = 'inc/portfolio/frames/' + preSelection + '.html';
								
								
								
								$('#gallery-slide').load(selection, 'html', function(){
									
									if(currentSelection == 'graphic-design') {							
										swiper_bio_gallery = new Swiper('#inner-slide', {
										loop: true,
										calculateHeight: true,
										});
										
										$('#gallery-left').on('click', function() { swiper_bio_gallery.swipePrev(); });
										$('#gallery-right').on('click', function() { swiper_bio_gallery.swipeNext(); });
										
										$(window).bind('resize', function() { swiper_left.reInit(); });
										
										swiper_bio_gallery.addCallback('SlideNext', function(){
										
											gallerySelector = '#gallery-slide .slide' + (swiper_bio_gallery.activeLoopIndex + 2);
											gallerySelectorCheck = gallerySelector + ' > img';
											
											if ($('#gallery-slide .swiper-slide img').length < $('#gallery-slide .swiper-slide').length) {
												
												if($(gallerySelectorCheck).length == 0 && $(gallerySelector).length == 1) { $(gallerySelector).load('inc/img_links/' + preSelection + '/img' + (swiper_bio_gallery.activeLoopIndex + 2) + '.html'); }

												}
										
											});
										
										swiper_bio_gallery.addCallback('SlidePrev', function(){
											
											gallerySelector = '#gallery-slide .slide' + swiper_bio_gallery.activeLoopIndex;
											gallerySelectorCheck = gallerySelector + ' > img';
											
											if ($('#gallery-slide .swiper-slide img').length < $('#gallery-slide .swiper-slide').length) {
											
												if($(gallerySelectorCheck).length == 0 && $(gallerySelector).length == 1) { $(gallerySelector).load('inc/img_links/' + preSelection + '/img' + swiper_bio_gallery.activeLoopIndex + '.html'); }

												}
										
										
											});
										}
									}).promise().done(function(){ $('#gallery-slide').fadeIn(400); });
								});
							}
						});
					}


var extraLi = $('#side-select li').length - 3;

var resizeTrue = false;
var shrinkCheck = false;

$('#select-up').on('click', function(){
	
	$('#side-select li').finish();
	
	if($('#side-select').hasClass('vertical')){
		var marginTopSet = $('#side-select li:not(.gone):not(.active):first').height() * -1;
		
		if($('#side-select li.gone:last').hasClass('active')){ marginTopSet *= 2; }
		
		marginTopSet += 3;
		
		$('#side-select li.gone:last').css({ 'display' : '', 'margin-top' : marginTopSet });
		
		if(resizeTrue && $('#side-select li.active').height() - $('#side-select li:not(.active):first').height() < 20){ $('#side-select li.gone:last').css({'display' : 'none', 'margin-top' : 0}); $('#side-select li.active').animate({height: '50%'}, 600); resizeTrue = false; }
		
		else{ $('#side-select li.gone:last').animate({marginTop: 0}, 600, function(){ $(this).removeClass('gone'); }); }
		
		}
	
	
	else if($('#side-select').hasClass('horizontal')){

		if($('#side-select li.gone').length > 0){ remainingClicks ++; }

		if($('#side-select li.gone:last').hasClass('active')){ var marginLeftSet = '-48%' }
		else{ var marginLeftSet = '-24%' }
		
		if(shrinkCheck){ $('#side-select li.active').animate({width : '48%'}, 600, function(){ shrinkCheck = false; }); }
		
		if(shrinkCheck == false){
		
			var count = 0; 
			$('#side-select li:not(.gone)').each(function(){
		
				count++; 
				if($(this).hasClass('active') && count == 3 && $('#side-select li.gone').length > 0){ $(this).animate({'width' : '23%'}, 600, function(){ $(this).addClass('contracted'); }); }
				
				});
			
			$('#side-select li.gone:last').css({'margin-left' : marginLeftSet, 'display' : ''});
			$('#side-select li.gone:last').animate({marginLeft: '1%'}, 600, function(){ $(this).removeClass('gone'); $('#side-select li:not(.active)').css('width', ''); $('#side-select li:not(.gone):eq(3)').css('width', '23%'); });
			
			}
			
		}
		
		
		
	});


var toatalLi = $('#side-select li').length;
var remainingClicks = toatalLi - 3;

$('#select-dn').on('click', function(){
	
	$('#side-select li').finish();
	
	
	if(($('#side-select li:last').offset().top + $('#side-select li:last').height()) - ($('#side-select ul').offset().top + $('#side-select ul').height()) > 20 && $('#side-select').hasClass('vertical')){
		
		var marginTopSet = ($('#side-select li:not(.gone):first').height() + 3) * -1;
		
		if($('#side-select li:last').offset().top  - ($('#side-select ul').offset().top + $('#side-select ul').height()) < 20 && Math.abs(marginTopSet) > 100){ $('#side-select li:not(.gone):first').animate({height: '25%'}, 600, function(){ resizeTrue = true; }); }
		
		else { $('#side-select li:not(.gone):first').animate({marginTop: marginTopSet}, 600, function(){ $(this).addClass('gone'); $(this).css({'display' : 'none', 'margin-top' : 0}); }); }
		
		}
	
	else if($('#side-select').hasClass('horizontal')){
		
		if($('#side-select li.active').hasClass('gone') == false && remainingClicks > 0){
		
			
			var marginLeftSet = ($('#side-select li:not(.gone):first').width() + ($('#side-select').width() * 0.1)) * -1;
			
			if(remainingClicks == 1 &&  $('#side-select li:not(.gone):first').hasClass('active')){ $('#side-select li:not(.gone):first').animate({'width' : '23%'}, 600); shrinkCheck = true; }
			
			else{ $('#side-select li:not(.gone):first').animate({marginLeft: marginLeftSet}, 600, function(){ $(this).addClass('gone'); $('#side-select li:not(.active)').css('width', ''); $('#side-select li:not(.gone):eq(3)').css('width', '23%'); $(this).css({'display' : 'none', 'margin-left' : 0}); }); }
			
			remainingClicks --;
			
			}
		
		else if($('#side-select li.active').hasClass('gone') && remainingClicks > 1){
		
			remainingClicks --;
			
			var marginLeftSet = ($('#side-select li:not(.gone):first').width() + ($('#side-select').width() * 0.1)) * -1;
			
			$('#side-select li:not(.gone):first').animate({marginLeft: marginLeftSet}, 600, function(){ $(this).addClass('gone'); $(this).css({'display' : 'none', 'margin-left' : 0}); });
		
			}
		
		
		var count = 0;
		
		$('#side-select li:not(.gone)').each(function(){
	
			count++; 
			if($(this).hasClass('contracted') && $(this).hasClass('active') && count == 4){ $(this).animate({'width' : '48%'}, 600, function(){ $(this).removeClass('contracted'); }); }
			else if($(this).hasClass('contracted') && $(this).hasClass('active') == false && count == 4){ $(this).removeClass('contracted'); }
			});
		
		}

	});


				});

		animateIn();




	});

		animateOut();

}


function animateIn() {

	$('#ajax-canvas').animate({ height: '90%', width: '90%'}).promise().done(function() {

		$('#backdrop').show(); $(this).css('overflow-y', 'scroll'); $('body').css('overflow', 'hidden').promise().done(function() {

				swiper_bio_gallery.resizeFix();

				if ( $('#backdrop:visible').length != 1 ) { animateIn(); console.log('err throw animIn'); }

				
			});

		});

	}

function animateOut() {

	$('#closer').on('click', function() {

		$('body').css('overflow', ''); $('#backdrop').hide(); $('#ajax-canvas').animate({ height: 0, width: 0}).promise().done(function() {

			$(this).scrollTop(0); $(this).css('overflow-y', '').promise().done(function() {

				if ( $('#backdrop:visible').length == 1 ) { animateOut(); console.log('err throw animOut'); }
				
				}); 
			
			});  
			
		});
	
	}


function skillResize() {

	var currentDocWidth = $(window).width();

	if( currentDocWidth < 860 ) { $('.skills-inner > .sub').css('width', '98%'); resizeInnerElementHeight(); docCheck = false; }

	if( currentDocWidth >= 860 && docCheck == false ) { $('.skills-inner > .sub').css('width', '48%'); resizeInnerElementHeight(); docCheck = true; }
 }

function bioLink() {

		$('.bio-sub > article > a').on('click', function(event){
		event.preventDefault(); 
		
		$('.bio-sub p').not('.bio-sub p:first').slideToggle(900).promise().done(function() { resizeInnerElementHeight(); });
		
		if($(this).hasClass('less') == false){ $(this).html('Show Less'); $(this).addClass('less'); }
		
		else if($(this).hasClass('less') == true) { $(this).html('Read More'); $(this).removeClass('less'); }
		
		
	});

}
 
function timeline(){

timeWidth = (parseInt($('.time-bottom .entry:last').css('left'))) + ($('.time-bottom .entry:last').outerWidth() * 1.9);
$('.timeline-sub > section > section').width(timeWidth);



// Bind timeline item animations and properties

$('.entry > div > div').on('click', function(){ 
	
	if ($(this).hasClass('active') != true) {
		
		$('.timeline-sub > h4').css('visibility', 'hidden');
		
		$('#shield').show();
		
		$(this).parent('div').css('border-right', 'none'); 
		$('.time-top').css('border-bottom', 'none');
		var senior = $(this).parent('div').parent('.entry');
		
		$('.entry').not(senior).animate({opacity: 0},300).hide().promise().done(function() {
			
			$('.time-bottom .entry:visible').animate({top:'-150px'},500);
			
		});
		
		$(this).css('position', 'relative');
		$(this).animate({ width : '300px', height : '200px' },500).promise().done(function(){ $(this).children('p').animate({ width : '100%' },500); $('#shield').hide(); });
		
		$(this).addClass('active');
		
		addActive(this, senior);
		
		}
		
	});

	function addActive(me, senior) {
		$(me).children('img').on('click.active', function() {
			
			$('#shield').show();
			
			
			$(me).children('p').animate({ width : '0px' },500);
			
			if ($(senior).hasClass('circle') != true) {
				
				$(me).animate({width:'120px', height:'60px'},500).promise().done(function() { returnItems(); });
				
				
				}
				
			else if ($(senior).hasClass('circle') == true) {
				
				$(me).animate({width:'60px', height:'60px'},500).promise().done(function() { returnItems(); });
				
				}
			
			
			function returnItems(){
				
				$(me).removeClass('active');
				$(me).css('position', 'absolute');
				$('.time-bottom .entry:visible').animate({top:'0px'},500).promise().done(function() {
					
					$('.time-top').css('border-bottom', '');
					$(me).parent('div').css('border-right', '');
					
					$('.entry').not(senior).css('display', 'block').animate({opacity: 100},300);
					
					$('#shield').delay(300).hide().promise().done(function(){ /*$(me).removeClass('active');*/ });
					
					$(me).children('img').off('click.active');
					});
					
				}
			
			
			
			});
			
		}
	
}

//setTimeout(function(){ $('#loadTest').append('<aside>TEST!</aside>'); }, 10000);


function liLayout(){
	
	var switchCheck;
	var containerExists = $('#select-up').length != 0;

	if(containerExists && Math.abs(parseInt($('#select-up').offset().top) - parseInt($('#select-dn').offset().top)) <= 5) {
		
		switchCheck = 'vertical';
		$('#side-select').addClass('horizontal');
	
		}
	
	if(containerExists && Math.abs(parseInt($('#select-up').offset().top) - parseInt($('#select-dn').offset().top)) > 5) {
		
		switchCheck = 'horizontal';
		$('#side-select').addClass('vertical');
	
		}
	
	if(containerExists && $('#side-select').hasClass('horizontal') && $('#side-select').hasClass('vertical')) {
		
		$('#side-select li').each(function(){ $(this).css({'height' : '', 'width' : '', 'margin-left' : ''}); });
		$('#side-select').removeClass(switchCheck);
		
		}	
	
	}
	
	
	$('.contact-bar > div a').on('click', function(event) {

	event.preventDefault();
	
	function attachCopy(){
	
		$('#phone-menu > p').zclip({
			path:'js/ZeroClipboard.swf',
			copy:'6199004917'
			});
			
		$('#email-menu > p').zclip({
			path:'js/ZeroClipboard.swf',
			copy:'thedesignlabproject@gmail.com'
			});
			
		}
	
	if($('.contact-bar > aside').height() == 0) {

		if ($(this).hasClass('email-menu')){ 
		
			$('#email-menu').css('display', 'block'); $('#email-menu').attr('class', 'open'); 
			
			}

		else if ($(this).hasClass('phone-menu')){
		
			$('#phone-menu').css('display', 'block'); $('#phone-menu').attr('class', 'open'); 
			
			}
		
		$('.contact-bar > aside').animate({ height : 50 }, 400, function(){ attachCopy(); });
		
		}
		
	else {
	
		if ($(this).hasClass('email-menu') && $('#email-menu').hasClass('closed')){ $('#phone-menu').attr('class', 'closed'); $('#email-menu').attr('class', 'open'); $('#phone-menu').animate({ opacity : 0 }, 200, function(){ $('#phone-menu').css({ 'display' : 'none', 'opacity' : '' }); $('#email-menu').css({ 'display' : 'none', 'width' : '' }); $('#email-menu').fadeIn(200); attachCopy(); }); }
		
		else if ($(this).hasClass('phone-menu') && $('#phone-menu').hasClass('closed')){ $('#email-menu').attr('class', 'closed'); $('#phone-menu').attr('class', 'open'); $('#email-menu').animate({ opacity : 0 }, 200, function(){ $('#email-menu').css({ 'display' : 'none', 'opacity' : '' }); $('#phone-menu').css({ 'display' : 'none', 'width' : '' }); $('#phone-menu').fadeIn(200); attachCopy(); }); }
		
		else if ($(this).hasClass('phone-menu') && $('#phone-menu').hasClass('open') || $(this).hasClass('email-menu') && $('#email-menu').hasClass('open')){ $('.contact-bar > aside').animate({ height : 0 }, 400, function(){ $('.contact-bar > aside > div').attr('class', 'closed'); $('.contact-bar > aside > div').css('display', ''); }); }
		
		}
		
	});
	
	
	openAjaxBind();

	$('#cafepress > a').on('click', function(event){ 
	
		event.preventDefault();
		
		if($('#cafepress > iframe').height() == 0){ $('#cafepress > iframe').animate({'height' : 500}, 'slow'); } 
		
		else if($('#cafepress > iframe').height() > 0) { $('#cafepress > iframe').animate({'height' : 0}, 'slow'); } 
	
	});
	
});


$(window).on('load', function(){ 

	var rightHeight = $('#slide-right').height();  
	
	$('#slider').animate({height : rightHeight}, function(){ $('#slider').css({'height' : ''}); }); 

	
	
	$('#cafepress').append('<iframe src="http://www.cafepress.com/thedesignlab"></iframe>').promise().done(function(){



	}); 
	
	
	
});