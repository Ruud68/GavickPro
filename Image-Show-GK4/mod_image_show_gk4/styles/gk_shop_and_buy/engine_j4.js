jQuery(window).on("load",function(){
    jQuery(".gkIsWrapper-gk_shop_and_buy").each(function(i, el){
		var elID = jQuery(el).attr("id");
		var wrapper = jQuery('#'+elID);
        var $G = $Gavick[elID];
        var slides = [];
        var imagesToLoad = [];
        var loadedImages = 0;
        // animation variables
        $G['animation_timer']= false;
        $G['actual_slide'] = 0;
        $G['blank'] = false;
        $G['progress'] = false;
        $G['scrollarea'] = wrapper.find('.gkIsImageScroll');
        // load the images
        wrapper.find('div.gkIsSlide').each(function(i, _elm){
  			var elm = jQuery(_elm);
  			var newImg = jQuery('<img/>',{
                "title":elm.attr('title'),
                "alt":elm.attr('data-alt'),
                "class":elm.attr('class'),
                "style":elm.attr('style')
            });
        newImg.attr('data-url', elm.attr('data-link'));
        newImg.attr("src", elm.attr('data-path'));
        imagesToLoad.push(newImg);
        newImg.appendTo(elm);
        // elm.remove();
        });

        setTimeout(function(){
			wrapper.find('.gkIsPreloader').css('position', 'absolute');
			wrapper.find('.gkIsPreloader').fadeOut();
		}, 400);

        wrapper.find(".gkIsSlide").each(function(i, _elmt){
        	var elmt = jQuery(_elmt);
            slides[i] = elmt;
            if($G['slide_links']){
                elmt.on("click", function(e){
                    window.location = e.target.attr('data-url');
                });
                elmt.css("cursor", "pointer");
            }
        });

        // pagination
        if(wrapper.find('ol')) {
            wrapper.find('ol li').each(function(i, _btn) {
            	var btn = jQuery(_btn);
            	btn.on('click', function() {
            		if(i != $G['actual_slide']) {
            			$G['blank'] = true;
            			gk_shop_and_buy_autoanimate($G, wrapper, 'next', i);
            		}
            	});
            });
        }
        //
        var initText = wrapper.find('.figcaption');
        if(initText) { initText.css('margin-top', -0.5 * initText.height() + "px"); }
        // buttons
        if(wrapper.find('.gkIsBtnPrev')) {
        	wrapper.find('.gkIsBtnPrev').on('click', function() {
        		$G['blank'] = true;
        		gk_shop_and_buy_autoanimate($G, wrapper, 'prev', null);
        	});

        	wrapper.find('.gkIsBtnNext').on('click', function() {
        		$G['blank'] = true;
        		gk_shop_and_buy_autoanimate($G, wrapper, 'next', null);
        	});
        }

        wrapper.on('mouseenter', function() {
        	wrapper.addClass('hover');
        });

        wrapper.on('mouseleave', function() {
        	wrapper.removeClass('hover');
        });

        // auto animation
        if($G['autoanim'] == 1) {
        	$G['animation_timer'] = setTimeout(function() {
        	 	gk_shop_and_buy_autoanimate($G, wrapper, 'next');
        	}, $G['anim_interval']);
        }

        // pagination
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
    				Math.abs(e.changedTouches[0].pageX - slide_pos_start_x) >= 80 &&
    				new Date().getTime() - slide_time_start <= 500
    			) {
    				if(e.changedTouches[0].pageX - slide_pos_start_x > 0) {
    					$G['blank'] = true;
    					gk_shop_and_buy_autoanimate($G, wrapper, 'prev', null);
    				} else {
    					$G['blank'] = true;
    					gk_shop_and_buy_autoanimate($G, wrapper, 'next', null);
    				}
    			}
    		}
    	});
    });
});

var gk_shop_and_buy_animate = function($G, wrapper, imgPrev, imgNext, dir, next) {

	var imgPrev = jQuery(imgPrev);
	var imgNext = jQuery(imgNext);
	var prevText = imgPrev.find('.figcaption');
	var nextText = imgNext.find('.figcaption');

	if(prevText) {
		prevText.css('margin-top', -0.5 * prevText.height() + "px");
		nextText.css('margin-top', -0.5 * nextText.height() + "px");

		if(dir == 'next') {
			//
			imgPrev.find('img').animate({
				'margin-left': '300'
			}, $G['anim_speed']);
			//
			imgNext.find('img').animate({
				'margin-left': '0'
			}, $G['anim_speed']);
			//
		} else {
			//
			imgPrev.find('img').animate({
				'margin-left': '-300'
			}, $G['anim_speed']);
			//
			imgNext.find('img').animate({
				'margin-left': '0'
			}, $G['anim_speed']);
		}
	}
	//
	imgPrev.removeClass('active');
	imgNext.addClass('active');
	//
	$G['scrollarea'].animate({'margin-left': (next * -1 * 100) + '%'}, $G['anim_speed'], function(){
		$G['progress'] = false;
		if($G['autoanim'] == 1) {
			clearTimeout($G['animation_timer']);

			$G['animation_timer'] = setTimeout(function() {
				if($G['blank']) {
					$G['blank'] = false;
					clearTimeout($G['animation_timer']);

					$G['animation_timer'] = setTimeout(function() {
						gk_shop_and_buy_autoanimate($G, wrapper, 'next', null);
					}, $G['anim_interval']);
				} else {
					gk_shop_and_buy_autoanimate($G, wrapper, 'next', null);
				}
			}, $G['anim_interval']);
		}
	});
};

var gk_shop_and_buy_autoanimate = function($G, wrapper, dir, nextSlide) {
	if(!$G['progress']) {
		$G['progress'] = true;
		var i = $G['actual_slide'];
		var imgs = wrapper.find('.figure');
		var next = nextSlide;

		if(nextSlide == null) {
			next = (dir == 'next') ? ((i < imgs.length - 1) ? i+1 : 0) : ((i == 0) ? imgs.length - 1 : i - 1); // dir: next|prev
		}

		gk_shop_and_buy_animate($G, wrapper, imgs.eq(i), imgs.eq(next), ((next > $G['actual_slide']) ? 'next' : 'prev'), next);
		$G['actual_slide'] = next;
		if(wrapper.find('ol')) {
      wrapper.find('ol li').removeClass('active');
			wrapper.find('ol li').eq(next).addClass('active');
		}
	}
};
