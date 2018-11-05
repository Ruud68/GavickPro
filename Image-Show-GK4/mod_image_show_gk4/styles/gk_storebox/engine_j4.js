jQuery(window).on("load",function(){
	setTimeout(function() {
	    jQuery(".gkIsWrapper-gk_storebox").each(function(i, el){
	        var elID = jQuery(el).attr("id");
	        var wrapper = jQuery('#'+elID);
	        var $G = $Gavick[elID];
	        // var slides = [];
	        var links = [];
	        var imagesToLoad = [];
	        var loadedImages = 0;
	        var swipe_min_move = 30;
	        var swipe_max_time = 500;
	        // animation variables
	        $G['animation_timer'] = false;
	        // blank flag
	        $G['blank'] = false;
	        // load the images
	        wrapper.find('.gkIsSlide').each(function(i, _el){
			    let el = jQuery(_el);
	            var newImg = jQuery('<img/>',{
	                "title": el.attr('title'),
	                "alt": el.attr('data-alt'),
	                "class": el.attr('class'),
	                "style": el.attr('style')
	            });
	            newImg.data('num', i);
	            links[i] = el.attr('data-link');
	            newImg.attr("src", el.attr('data-path'));
	            imagesToLoad.push(newImg);
	            newImg.appendTo(el.parent());
	            el.remove();
	        });

            setTimeout(function(){
    			jQuery(wrapper).find('.gkIsPreloader').fadeOut();
    		}, $G['anim_interval']);

            $G['actual_slide'] = 0;

            wrapper.animate({'height': wrapper.find('figure').height()}, 350, function(){
				wrapper.find('figure').fadeIn();
        		wrapper.find('figure').eq(0).addClass('active');
        		wrapper.css('height', 'auto');
			});

            wrapper.addClass('loaded');

       //      wrapper.find(".gkIsSlide").each(function(i, elmt){
			    // slides[i] = jQuery(elmt);
       //      });

            setTimeout(function() {
                var initfig = wrapper.find(".gkIsSlide").eq(0).parent().find('figcaption');
                if(initfig) {
                	initfig.animate({
                		'margin-top': 0,
						'opacity': 1
					}, 250);
                }
            }, 250);

            if($G['slide_links']){
                wrapper.find('.gkIsOverlay').on("click", function(e){
                    window.location = links[$G['actual_slide']];
                });
                wrapper.find('.gkIsOverlay').css('cursor', 'pointer');
            }

            // auto-animation
            if($G['autoanim'] == 1) {
            	$G['animation_timer'] = setTimeout(function() {
            		gk_storebox_autoanimate($G, wrapper, 'next', null);
            	}, $G['anim_interval']);
            }

            // prev / next
            if(wrapper.find('.gkIsPrev')) {
           		wrapper.find('.gkIsPrev').on('click', function(e) {
           			e.preventDefault();
            		$G['blank'] = true;
            		gk_storebox_autoanimate($G, wrapper, 'prev', null);
            	});

            	wrapper.find('.gkIsNext').on('click', function(e) {
            		e.preventDefault();
            		$G['blank'] = true;
            		gk_storebox_autoanimate($G, wrapper, 'next', null);
            	});

            	var slide_pos_start_x = 0;
            	var slide_pos_start_y = 0;
            	var slide_time_start = 0;
            	var slide_swipe = false;

            	wrapper.on('touchstart', function(e) {
            		slide_swipe = true;

            		if(e.changedTouches.length > 0) {
            			slide_pos_start_x = e.changedTouches[0].pageX;
            			slide_pos_start_y = e.changedTouches[0].pageY;
            			slide_time_start = new Date().getTime();
            		}
            	});

            	wrapper.on('touchmove', function(e) {
            		if(e.changedTouches.length > 0 && slide_swipe) {
            			if(
            				Math.abs(e.changedTouches[0].pageX - slide_pos_start_x) > Math.abs(e.changedTouches[0].pageY - slide_pos_start_y)
            			) {
            				e.preventDefault();
            			} else {
            				slide_swipe = false;
            			}
            		}
            	});

            	wrapper.on('touchend', function(e) {
            		if(e.changedTouches.length > 0 && slide_swipe) {
            			if(
            				Math.abs(e.changedTouches[0].pageX - slide_pos_start_x) >= swipe_min_move &&
            				new Date().getTime() - slide_time_start <= swipe_max_time
            			) {
            				if(e.changedTouches[0].pageX - slide_pos_start_x > 0) {
            					$G['blank'] = true;
            					gk_storebox_autoanimate($G, wrapper, 'prev', null);
            				} else {
            					$G['blank'] = true;
            					gk_storebox_autoanimate($G, wrapper, 'next', null);
            				}
            			}
            		}
            	});
            }

            // events
            wrapper.on({
            	"mouseenter": function() {
            		wrapper.addClass('hover');
            	},
            	"mouseleave": function() {
            		wrapper.removeClass('hover');
            	}
            });
	    });
    }, 2000);
});

var gk_storebox_animate = function($G, wrapper, imgPrev, imgNext) {
	var prevfig = imgPrev.find('figcaption');
	//
	if(prevfig) {
		prevfig.animate({
			'margin-top': 50,
			'opacity': 0
		}, 150);
	}
	//
	imgNext.attr('class', 'animated');

	//imgPrev.fade('out');
	imgPrev.animate({'opacity': 0}, $G['anim_speed'], function(){
		imgPrev.attr('class', '');
	});

	//imgNext.fade('in');
	imgNext.animate({'opacity': 1}, $G['anim_speed'], function(){
		imgNext.attr('class', 'active');
		var nextfig = imgNext.find('figcaption');

		if(nextfig) {
			nextfig.animate({
				'margin-top': 0,
				'opacity': 1
			}, 150);
		}

		if($G['autoanim'] == 1) {
			// clearTimeout($G['animation_timer']);

			$G['animation_timer'] = setTimeout(function() {
				if($G['blank']) {
					$G['blank'] = false;
					clearTimeout($G['animation_timer']);

					$G['animation_timer'] = setTimeout(function() {
						gk_storebox_autoanimate($G, wrapper, 'next', null);
					}, $G['anim_interval']);
				} else {
					gk_storebox_autoanimate($G, wrapper, 'next', null);
				}
			}, $G['anim_interval']);
		}
	});
};

var gk_storebox_autoanimate = function($G, wrapper, dir, next) {
	var i = $G['actual_slide'];
	var imgs = wrapper.find('figure');

	if(next == null) {
		next = (dir == 'next') ? ((i < imgs.length - 1) ? i+1 : 0) : ((i == 0) ? imgs.length - 1 : i - 1); // dir: next|prev
	}

	gk_storebox_animate($G, wrapper, imgs.eq(i), imgs.eq(next));
	$G['actual_slide'] = next;
};