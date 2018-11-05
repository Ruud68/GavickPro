(function($) {
	$current_slide = 0;
	$currently_opened = 0;
	$(window).on('load', function() {
	    var add_form = $('#gk_tab_add_form');
	    var json_data_to_parse = $('#jform_params_image_show_data').html();
	    if(json_data_to_parse == '') {
	    	json_data_to_parse = '[]';
	    }
	    var tabs = JSON.parse(json_data_to_parse);
	    if (tabs == null || tabs == '')
	        tabs = [];
	    var json_config_to_parse = $('#jform_params_config').html();
	    if(json_config_to_parse == '') {
	    	json_config_to_parse = '[]';
	    }
	    var config = JSON.parse(json_config_to_parse);
	    if (config == null || config == '')
	        config = {};
	    if (parseFloat((jQuery('#gk_about_us').data('jversion')).substr(0, 3)) >= '4') {
	      jQuery('#module-form').addClass('j32 j4');
	    } else if (parseFloat((jQuery('#gk_about_us').data('jversion')).substr(0, 3)) >= '3.2') {
	      jQuery('#module-form').addClass('j32');
	    }
	    $('ul.nav a[href="#options-IMAGE_SHOW_MANAGER"]').on('click', function() {
	        setTimeout(function() {
	            if ($('ul.nav a[href=#options-IMAGE_SHOW_MANAGER]').parent().hasClass('active')) {
	                $('.pane-slider').css('height', 'auto');
	            }
	        }, 750);
	    });
	    var public_text = add_form.find('.gk_tab_add_content_access option').first().html();
	    var registered_text = add_form.find('.gk_tab_add_content_access option').eq(1).html();
	    var module_text = add_form.find('.gk_tab_add_type option').eq(1).html();
	    var article_text = add_form.find('.gk_tab_add_type option').first().html();
	    var published_text = $('#invisible').find('.gk_tab_item_state span').first().html();
	    var unpublished_text = $('#invisible').find('.gk_tab_item_state span').eq(1).html();
	    $('invisible').find('.gk_tab_item_state span').remove();
	    
	    if (add_form.find('.gk_tab_add_type').val() == 'article') {
	        add_form.find('.gk_tab_add_art').css('display', 'block');
	        add_form.find('.gk_tab_add_artK2').css('display', 'none');
	        add_form.find('.gk_tab_add_name').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_alt').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_content').parent().css('display', 'none');
	        add_form.find('.gk_tab_add_url').parent().css('display', 'none');
	    } else if (add_form.find('.gk_tab_add_type').val() == 'text') {
	        add_form.find('.gk_tab_add_art').css('display', 'none');
	        add_form.find('.gk_tab_add_name').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_alt').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_artK2').css('display', 'none');
	        add_form.find('.gk_tab_add_content').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_url').parent().css('display', 'block');
	    } else {
	        add_form.find('.gk_tab_add_artK2').css('display', 'block');
	        add_form.find('.gk_tab_add_art').css('display', 'none');
	        add_form.find('.gk_tab_add_name').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_alt').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_content').parent().css('display', 'none');
	        add_form.find('.gk_tab_add_url').parent().css('display', 'none');
	    }
	    add_form.find('.gk_tab_add_type').change(function() {
	        if (add_form.find('.gk_tab_add_type').val() == 'article') {
	            add_form.find('.gk_tab_add_art').css('display', 'block');
	            add_form.find('.gk_tab_add_artK2').css('display', 'none');
	            add_form.find('.gk_tab_add_name').parent().css('display', 'block');
	            add_form.find('.gk_tab_add_alt').parent().css('display', 'block');
	            add_form.find('.gk_tab_add_content').parent().css('display', 'none');
	            add_form.find('.gk_tab_add_url').parent().css('display', 'none');
	        } else if (add_form.find('.gk_tab_add_type').val() == 'text') {
	            add_form.find('.gk_tab_add_art').css('display', 'none');
	            add_form.find('.gk_tab_add_artK2').css('display', 'none');
	            add_form.find('.gk_tab_add_name').parent().css('display', 'block');
	            add_form.find('.gk_tab_add_alt').parent().css('display', 'block');
	            add_form.find('.gk_tab_add_content').parent().css('display', 'block');
	            add_form.find('.gk_tab_add_url').parent().css('display', 'block');
	        } else {
	            add_form.find('.gk_tab_add_artK2').css('display', 'block');
	            add_form.find('.gk_tab_add_art').css('display', 'none');
	            add_form.find('.gk_tab_add_name').parent().css('display', 'block');
	            add_form.find('.gk_tab_add_alt').parent().css('display', 'block');
	            add_form.find('.gk_tab_add_content').parent().css('display', 'none');
	            add_form.find('.gk_tab_add_url').parent().css('display', 'none');
	        }
	    });
	    var add_form_scroll_wrap = $('#gk_tab_add_form').find('.height_scroll');
	    $('#gk_tab_add_header').find('a').on('click', function(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        
	        add_form_scroll_wrap.animate({
	        		height: add_form.find('.gk_tab_add').outerHeight() + "px"
	        	}, 
	        	250, 
	        	function() {
                	if (add_form_scroll_wrap.outerHeight() > 0)
                    	add_form_scroll_wrap.css('height', 'auto');
            	}
            );
	    });
	    $('#gk_tab_add_header').on('click', function(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        
	        add_form_scroll_wrap.animate({
	        		height: add_form.find('.gk_tab_add').outerHeight() + "px"
	        	}, 
	        	250, 
	        	function() {
	            	if (add_form_scroll_wrap.outerHeight() > 0)
	                	add_form_scroll_wrap.css('height', 'auto');
	        	}
	        );
	    });
	    var add_form_btns = add_form.find('.gk_tab_add_submit a');
	    add_form_btns.eq(1).on('click', function(e) {
	        if (e) {
	        	e.preventDefault();
	        	e.stopPropagation();
	        }
	            
	        add_form.find('.gk_tab_add_art').css('display', 'none');
	        add_form.find('.gk_tab_add_artK2').css('display', 'none');
	        add_form.find('.gk_tab_add_name').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_alt').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_content').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_url').parent().css('display', 'block');
	        add_form.find('.gk_tab_add_name').val('');
	        add_form.find('.gk_tab_add_alt').val('');
	        add_form.find('.gk_tab_add_type').val('text');
	        add_form.find('.gk_tab_add_image').val( '');
	        add_form.find('.gk_tab_add_stretch').val('nostretch');
	        add_form.find('.gk_tab_add_content_access').val('public');
	        add_form.find('.gk_tab_add_published').val('1');
	        add_form.find('.gk_tab_add_content').val('');
	        add_form.find('.gk_tab_add_url').val('');
	        add_form.find('#jform_request_art_name').val('');
	        add_form.find('#jform_request_art_add').val('');
	        add_form.find('#jform_request_artK2_name').val('');
	        add_form.find('#jform_request_artK2_add').val('');
	        add_form_scroll_wrap.css('height', add_form_scroll_wrap.outerHeight() + 'px');
	        
	        add_form_scroll_wrap.animate({
	        		height: 0
	        	}, 
	        	250
	        );
	    });
	    add_form_btns.eq(0).on('click', function(e) {
	      create_item('new');

	      bindMediafield();

	    });
	    function create_item(source) {
	        var item = $('#invisible').find('.gk_tab_item').clone();
	        var name = (source == 'new') ? add_form.find('.gk_tab_add_name').val() : source.name;
	        var alt = (source == 'new') ? add_form.find('.gk_tab_add_alt').val() : source.alt || '';
	        var type = (source == 'new') ? add_form.find('.gk_tab_add_type').val() : source.type;
	        var image = (source == 'new') ? add_form.find('.gk_tab_add_image').val() : source.image;
	        var stretch = (source == 'new') ? add_form.find('.gk_tab_add_stretch').val() : source.stretch;
	        var access = (source == 'new') ? add_form.find('.gk_tab_add_content_access').val() : source.access;
	        var published = (source == 'new') ? add_form.find('.gk_tab_add_published').val() : source.published;
	        var content = (source == 'new') ? add_form.find('.gk_tab_add_content').val() : source.content;
	        var url = (source == 'new') ? add_form.find('.gk_tab_add_url').val() : source.url;
	        var artK2_id = (source == 'new') ? add_form.find('#jform_request_artK2_add').val() : source.artK2_id;
	        var artK2_title = (source == 'new') ? add_form.find('#jform_request_artK2_name').val() : source.artK2_title;
	        var art_id = (source == 'new') ? add_form.find('#jform_request_art_add').val() : source.art_id;
	        var art_title = (source == 'new') ? add_form.find('#jform_request_art_name').val() : source.art_title;
	        item.find('.gk_tab_item_name').html(name);
	        item.find('.gk_tab_item_type').html((type == 'text') ? module_text : article_text);
	        item.find('.gk_tab_item_state').attr('class', (published == 1) ? 'gk_tab_item_state published' : 'gk_tab_item_state unpublished');
	        item.find('.gk_tab_item_state').attr('title', (published == 1) ? published_text : unpublished_text);
	        item.find('.gk_tab_item_access').html((access == 'public') ? public_text : registered_text);
	        item.find('.gk_tab_edit_name').val(name);
	        item.find('.gk_tab_edit_alt').val(alt);
	        item.find('.gk_tab_edit_type').val(type);
	        item.find('.gk_tab_edit_image').val(image);
	        item.find('.gk_tab_edit_stretch').val(stretch);
	        item.find('.gk_tab_edit_content_access').val(access);
	        item.find('.gk_tab_edit_published').val(published);
	        item.find('.gk_tab_edit_content').val(htmlspecialchars_decode(content));
	        item.find('.gk_tab_edit_url').val(url);
	        item.find('.jform_request_edit_art').val(art_id);
	        item.find('.jform_request_edit_artK2').val(artK2_id);
	        item.find('.modal-art-name').val(art_title);
	        item.find('.modal-artK2-name').val(artK2_title);
	        item.find('.gk_tab_item_edit').on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	                
	            item.find('.gk_tab_item_desc').trigger('click');
	        });
	        item.find('.gk_tab_item_desc').on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	            var scroller = item.find('.gk_tab_editor_scroll');
	            scroller.css('height', scroller.outerHeight() + "px");
	            
	            if (scroller.outerHeight() > 0) {
	                scroller.animate({
	                	height: 0
	                }, 250);
	            } else {
	                var items = item.parent().find('.gk_tab_item');
	                items.each(function(i, it) {
	                	it = $(it);
	                    if (it != item)
	                        it.find('.gk_tab_edit_submit a').eq(1).trigger('click');
	                });
	                
	                scroller.animate({
		                	height: scroller.find('div').outerHeight() + "px"
		                }, 
		                250, 
		                function() {
	                        if (scroller.outerHeight() > 0)
	                            scroller.css('height', 'auto');
	                    }
	                );
	                
	                var temp_id = item.find('.modal-art-name').attr('id');
	                $currently_opened = temp_id.replace('jform_request_edit_art_name_', '');
	            }
	        });
	        item.find('.gk_tab_item_state').on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	            var btn = item.find('.gk_tab_item_state');
	            if (btn.hasClass('published')) {
	                item.find('.gk_tab_edit_published').val(0);
	                btn.attr('class', 'gk_tab_item_state unpublished');
	                btn.attr('title', unpublished_text);
	                item.find('.gk_tab_edit_submit a').eq(0).trigger('click');
	            } else {
	                item.find('.gk_tab_edit_published').val(1);
	                btn.attr('class', 'gk_tab_item_state published');
	                btn.attr('title', published_text);
	                item.find('.gk_tab_edit_submit a').eq(0).trigger('click');
	            }
	        });
	        if (item.find('.gk_tab_edit_type').val() == 'article') {
	            item.find('.gk_tab_edit_art').css('display', 'block');
	            item.find('.gk_tab_edit_name').parent().css('display', 'block');
	            item.find('.gk_tab_edit_alt').parent().css('display', 'block');
	            item.find('.gk_tab_edit_content').parent().css('display', 'none');
	            item.find('.gk_tab_edit_url').parent().css('display', 'none');
	            item.find('.gk_tab_edit_artK2').css('display', 'none');
	        } else if (item.find('.gk_tab_edit_type').val() == 'text') {
	            item.find('.gk_tab_edit_artK2').css('display', 'none');
	            item.find('.gk_tab_edit_art').css('display', 'none');
	            item.find('.gk_tab_edit_name').parent().css('display', 'block');
	            item.find('.gk_tab_edit_alt').parent().css('display', 'block');
	            item.find('.gk_tab_edit_content').parent().css('display', 'block');
	            item.find('.gk_tab_edit_url').parent().css('display', 'block');
	        } else {
	            item.find('.gk_tab_edit_artK2').css('display', 'block');
	            item.find('.gk_tab_edit_name').parent().css('display', 'block');
	            item.find('.gk_tab_edit_alt').parent().css('display', 'block');
	            item.find('.gk_tab_edit_art').css('display', 'none');
	            item.find('.gk_tab_edit_content').parent().css('display', 'none');
	            item.find('.gk_tab_edit_url').parent().css('display', 'none');
	        }
	        item.find('.gk_tab_edit_type').change(function() {
	            if (item.find('.gk_tab_edit_type').val() == 'article') {
	                item.find('.gk_tab_edit_art').css('display', 'block');
	                item.find('.gk_tab_edit_artK2').css('display', 'none');
	                item.find('.gk_tab_edit_name').parent().css('display', 'block');
	                item.find('.gk_tab_edit_alt').parent().css('display', 'block');
	                item.find('.gk_tab_edit_content').parent().css('display', 'none');
	                item.find('.gk_tab_edit_url').parent().css('display', 'none');
	            } else if (item.find('.gk_tab_edit_type').val() == 'text') {
	                item.find('.gk_tab_edit_artK2').css('display', 'none');
	                item.find('.gk_tab_edit_art').css('display', 'none');
	                item.find('.gk_tab_edit_name').parent().css('display', 'block');
	                item.find('.gk_tab_edit_alt').parent().css('display', 'block');
	                item.find('.gk_tab_edit_content').parent().css('display', 'block');
	                item.find('.gk_tab_edit_url').parent().css('display', 'block');
	            } else {
	                item.find('.gk_tab_edit_artK2').css('display', 'block');
	                item.find('.gk_tab_edit_name').parent().css('display', 'block');
	                item.find('.gk_tab_edit_alt').parent().css('display', 'block');
	                item.find('.gk_tab_edit_art').css('display', 'none');
	                item.find('.gk_tab_edit_content').parent().css('display', 'none');
	                item.find('.gk_tab_edit_url').parent().css('display', 'none');
	            }
	        });
	        item.find('.gk_tab_item_remove').on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	            var items = item.parent().find('.gk_tab_item');
	            var item_id = items.index(item);
	            tabs.splice(item_id, 1);
	            item.remove();
	            $('#jform_params_image_show_data').html(JSON.stringify(tabs));
	        });
	        item.find('.gk_tab_edit_submit > a').eq(1).on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	            var scroller = item.find('.gk_tab_editor_scroll');
	            scroller.css('height', scroller.outerHeight() + "px");
	            scroller.animate({height: 0}, 250);
	        });
	        item.find('.gk_tab_edit_submit a').eq(0).on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	            var name = item.find('.gk_tab_edit_name').val();
	            var alt = item.find('.gk_tab_edit_alt').val();
	            var type = item.find('.gk_tab_edit_type').val();
	            var image = item.find('.gk_tab_edit_image').val();
	            var stretch = item.find('.gk_tab_edit_stretch').val();
	            var access = item.find('.gk_tab_edit_content_access').val();
	            var published = item.find('.gk_tab_edit_published').val();
	            var content = item.find('.gk_tab_edit_content').val();
	            var url = item.find('.gk_tab_edit_url').val();
	            var art_id = item.find('.jform_request_edit_art').val();
	            var art_title = item.find('.modal-art-name').val();
	            var artK2_id = item.find('.jform_request_edit_artK2').val();
	            var artK2_title = item.find('.modal-artK2-name').val();
	            var items = item.parent().find('.gk_tab_item');
	            var item_id = items.index(item);
	            tabs[item_id] = {"name": name,"alt": alt,"type": type,"image": image,"stretch": stretch,"access": access,"published": published,"content": htmlspecialchars(content),"url": url,"art_id": art_id,"art_title": art_title,"artK2_id": artK2_id,"artK2_title": artK2_title};
	            item.find('.gk_tab_item_name').html(name);
	            item.find('.gk_tab_item_type').html((type == 'text') ? module_text : article_text);
	            item.find('.gk_tab_item_state').attr('class', (published == 1) ? 'gk_tab_item_state published' : 'gk_tab_item_state unpublished');
	            item.find('.gk_tab_item_state').attr('title', (published == 1) ? published_text : unpublished_text);
	            item.find('.gk_tab_item_access').html((access == 'public') ? public_text : registered_text);
	            item.find('.modal-img').attr('href', '../' + image);
	            item.find('.gk_tab_edit_submit a').eq(1).trigger('click');
	            $('#jform_params_image_show_data').html(JSON.stringify(tabs));
	        });
	        item.find('.gk_tab_item_order_up').on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	            var wrap = item.parent();
	            var items = item.parent().find('.gk_tab_item');
	            var item_id = items.index(item);
	            if (item_id > 0) {
	                var tmp = tabs[item_id - 1];
	                tabs[item_id - 1] = tabs[item_id];
	                tabs[item_id] = tmp;
	                item.insertBefore(item.prev());
	                if (items.length > 0) {
	                    wrap.find('.gk_tab_item_order_down').css('opacity', 1);
	                    wrap.find('.gk_tab_item_order_up').css('opacity', 1);
	                    wrap.find('.gk_tab_item_order_up').eq(0).css('opacity', 0.3);
	                    wrap.find('.gk_tab_item_order_down').eq(items.length - 1).css('opacity', 0.3);
	                }
	                $('#jform_params_image_show_data').html(JSON.stringify(tabs));
	            }
	        });
	        item.find('.gk_tab_item_order_down').on('click', function(e) {
	            if (e) {
	            	e.preventDefault();
	            	e.stopPropagation();
	            }
	            var wrap = item.parent();
	            var items = wrap.find('.gk_tab_item');
	            var item_id = items.index(item);
	            
	            if (item_id < items.length - 1) {
	                var tmp = tabs[item_id + 1];
	                tabs[item_id + 1] = tabs[item_id];
	                tabs[item_id] = tmp;
	                item.insertAfter(item.next());
	                if (items.length > 0) {
	                    wrap.find('.gk_tab_item_order_down').css('opacity', 1);
	                    wrap.find('.gk_tab_item_order_up').css('opacity', 1);
	                    wrap.find('.gk_tab_item_order_up').eq(0).css('opacity', 0.3);
	                    wrap.find('.gk_tab_item_order_down').eq(items.length - 1).css('opacity', 0.3);
	                }
	                $('#jform_params_image_show_data').html(JSON.stringify(tabs));
	            }
	        });
	        if (source == 'new') {
	            tabs.push({"name": name,"alt": alt,"type": type,"image": image,"stretch": stretch,"access": access,"published": published,"content": htmlspecialchars(content),"url": url,"art_id": art_id,"art_title": art_title,"artK2_id": artK2_id,"artK2_title": artK2_title});
	            add_form_btns.eq(1).trigger('click');
	            $('#jform_params_image_show_data').html(JSON.stringify(tabs));

	            if (!$('#module-form').hasClass('j4')) {
					    	SqueezeBox.assign(item.find('.gk-modal'), {parse: 'rel'});
					    }
	        }
	        item.appendTo($('#tabs_list'));
	        var wrap = item.parent();
	        var items = wrap.find('.gk_tab_item');
	        if (items.length > 0) {
	            wrap.find('.gk_tab_item_order_down').css('opacity', 1);
	            wrap.find('.gk_tab_item_order_up').css('opacity', 1);
	            wrap.find('.gk_tab_item_order_up').eq(0).css('opacity', 0.3);
	            wrap.find('.gk_tab_item_order_down').eq([items.length - 1]).css('opacity', 0.3);
	        }
	        item.find('.modal-img').attr('href', '../' + image);
	        $current_slide++;
	        item.find('.gk_tab_edit_image').attr('id', 'jform_params_edit_img_' + $current_slide);
	        item.find('.modal-media').attr('href', 'index.php?option=com_media&view=images&tmpl=component&asset=&author=&fieldid=jform_params_edit_img_' + $current_slide + '&folder=');
	        item.find('.modal-media-clear').attr('onclick', 'javascript:document.getElementById(\'jform_params_edit_img_' + $current_slide + '\').value=\'\';return false;');
	        item.find('.modal-art-name').attr('id', 'jform_request_edit_art_name_' + $current_slide);
	        item.find('.jform_request_edit_art').attr('id', 'jform_request_edit_art_' + $current_slide);
	        item.find('.modal-artK2-name').attr('id', 'jform_request_edit_artK2_name_' + $current_slide);
	        item.find('.jform_request_edit_artK2').attr('id', 'jform_request_edit_artK2_' + $current_slide);
	    }

	    if ($('#module-form').hasClass('j4')) {
	    	for (let tab in tabs) {
	        create_item(tabs[tab]);
	    	}
	    } else {
	    	tabs.each(function(tab) {
	    		create_item(tab);
	    	});

	    	SqueezeBox.assign('.gk-modal', {parse: 'rel'});
	    }
	    
	    
	    $('.module_style').each(function(i,el) {
	    	el = $(el);
	        var style_name = el.attr('id').replace('module_style_', '');
	        if (config[style_name]) {
	            el.find('.field').each(function(i,field) {
	            	field = $(field);
	            	
	                if (config[style_name][field.attr('id')]) {
	                    field.val(config[style_name][field.attr('id')]);
	                } else {
	                    config[style_name][field.attr('id')] = field.val();
	                }
	            });
	        } else {
	            config[style_name] = {};
	            el.find('.field').each(function(i,field) {
	            	field = $(field);
	                config[style_name][field.attr('id')] = field.val();
	            });
	        }
	        el.find('.field').each(function(i, elm) {
	        	elm = $(elm);
	            elm.change(function() {
	                config[style_name][elm.attr('id')] = elm.val();
	                $('#jform_params_config').html(JSON.stringify(config));
	            });
	            elm.blur(function() {
	                config[style_name][elm.attr('id')] = elm.val();
	                $('#jform_params_config').html(JSON.stringify(config));
	            });
	        });
	        $('#jform_params_config').html(JSON.stringify(config));
	    });
	    
	    setInterval(function() {
	      $('#jform_params_last_modification').val(Math.round(new Date().getTime() / 1000));
	    },3000);
	    
	    $('.module_style').css('display', 'none');
	    $('#module_style_' + $('#jform_params_module_style').val()).css('display', 'block');
	    $('#jform_params_module_style').change(function() {
	        $('.module_style').css('display', 'none');
	        $('#module_style_' + $('#jform_params_module_style').val()).css('display', 'block');
	    });
	    $('#jform_params_module_style').blur(function() {
	        $('.module_style').css('display', 'none');
	        $('#module_style_' + $('#jform_params_module_style').val()).css('display', 'block');
	    });
	    $('#gk_tab_manager').parent().css('margin-left', '5px');
	    $('#gk_about_us').parent().css('margin-left', '15px');
	    if (!$('#module-form').hasClass('j32')) {
	        $('#moduleOptions').find('.module_style').parent().css('margin-left', '5px');
	    }
	});
	function htmlspecialchars(string) {
			if (typeof string == 'undefined') return '';
	    string = string.toString();
	    string = string.replace(/&/g, '[ampersand]').replace(/</g, '[leftbracket]').replace(/>/g, '[rightbracket]');
	    return string;
	}
	function htmlspecialchars_decode(string) {
			if (typeof string == 'undefined') return '';
	    string = string.toString();
	    string = string.replace(/\[ampersand\]/g, '&').replace(/\[leftbracket\]/g, '<').replace(/\[rightbracket\]/g, '>');
	    return string;
	}
})(jQuery);

(function($) {
	$(window).on('load', function() {
		if (parseFloat((jQuery('#gk_about_us').data('jversion')).substr(0, 3)) >= '3.2' && parseFloat((jQuery('#gk_about_us').data('jversion')).substr(0, 3)) < '4') {
			jQuery('.j32 .switcher').addClass('btn-group btn-group-yesno');

			// Turn radios into btn-group
			jQuery('.radio.btn-group label').addClass('btn');

			jQuery('fieldset.btn-group').each(function () {
				// Handle disabled, prevent clicks on the container, and add disabled style to each button
				if (jQuery(this).prop('disabled')) {
					jQuery(this).css('pointer-events', 'none').off('click');
					jQuery(this).find('.btn').addClass('disabled');
				}
			});

			jQuery('.btn-group label:not(.active)').off().unbind().click(function ()
			{
				var label = jQuery(this);
				var input = jQuery('#' + label.attr('for'));

				if (!input.prop('checked'))
				{
					label.closest('.btn-group').find('label').removeClass('active btn-success btn-danger btn-primary');

					if (label.closest('.btn-group').hasClass('btn-group-reversed'))
					{
						if (input.val() == '')
						{
							label.addClass('active btn-primary');
						} else if (input.val() == 0)
						{
							label.addClass('active btn-success');
						} else
						{
							label.addClass('active btn-danger');
						}
					} else
					{
						if (input.val() == '')
						{
							label.addClass('active btn-primary');
						} else if (input.val() == 0)
						{
							label.addClass('active btn-danger');
						} else
						{
							label.addClass('active btn-success');
						}

					}
					input.prop('checked', true);
					input.trigger('change');
				}
			});
			jQuery('.btn-group input[checked=checked]').each(function ()
			{
				var $self = jQuery(this);
				var attrId = $self.attr('id');

				if ($self.parent().hasClass('btn-group-reversed'))
				{
					if ($self.val() == '')
					{
						jQuery('label[for=' + attrId + ']').addClass('active btn-primary');
					} else if ($self.val() == 0)
					{
						jQuery('label[for=' + attrId + ']').addClass('active btn-success');
					} else
					{
						jQuery('label[for=' + attrId + ']').addClass('active btn-danger');
					}
				} else
				{
					if ($self.val() == '')
					{
						jQuery('label[for=' + attrId + ']').addClass('active btn-primary');
					} else if ($self.val() == 0)
					{
						jQuery('label[for=' + attrId + ']').addClass('active btn-danger');
					} else
					{
						jQuery('label[for=' + attrId + ']').addClass('active btn-success');
					}
				}
			});
    }

		bindMediafield();
		let $media = $('.field-media-preview');
		$.each($media, function() {
			$(this).find('img').attr('src', '..'+$(this).find('img').attr('src') );
		});
	});
})(jQuery);

function bindMediafield() {
	let modal = $('joomla-field-media');
	if (modal != null && modal.length) {
		$.each(modal, function() {
			let $self = $(this).find('.joomla-modal');
			let $id = $(this).find('input[type="text"]').attr('id');
			$self.attr('id', $id);
			$self.off('show.bs.modal').off('shown.bs.modal').off('hide.bs.modal');
			let $clone = $self.clone(false, false); // remove all the event attach to modal
			$self.remove();
			$(this).prepend($clone);
			$clone.on('show.bs.modal', function() {
				if ($clone.data('url')) {
					let modalBody = $clone.find('.modal-body');
					modalBody.find('iframe').remove();
					modalBody.prepend($clone.data('iframe'));
				}
			}).on('shown.bs.modal', function() {
				let modalHeight = $('div.modal:visible').outerHeight(true),
					modalHeaderHeight = $('div.modal-header:visible').outerHeight(true),
					modalBodyHeightOuter = $('div.modal-body:visible').outerHeight(true),
					modalBodyHeight = $('div.modal-body:visible').height(),
					modalFooterHeight = $('div.modal-footer:visible').outerHeight(true),
					padding = $clone.offsetTop,
					maxModalHeight = ($(window).height()-(padding*2)),
					modalBodyPadding = (modalBodyHeightOuter-modalBodyHeight),
					maxModalBodyHeight = maxModalHeight-(modalHeaderHeight+modalFooterHeight+modalBodyPadding);
				if ($clone.data('url')) {
					let iframeHeight = $('.iframe').height();
					if (iframeHeight > maxModalBodyHeight){
						$('.modal-body').css({'max-height': maxModalBodyHeight, 'overflow-y': 'auto'});
						$('.iframe').css('max-height', maxModalBodyHeight-modalBodyPadding);
					}
				}
			}).on('hide.bs.modal', function () {
				$('.modal-body').css({'max-height': 'initial', 'overflow-y': 'initial'});
				$('.modalTooltip').tooltip('dispose');
			}).on('hidden.bs.modal', function () {
				setTimeout(function(){
					$clone.parents('joomla-field-media').find('img').attr('src', '..'+$clone.parents('joomla-field-media').find('img').attr('src') );
				}, 1000);
				
			});
		});
	}
}