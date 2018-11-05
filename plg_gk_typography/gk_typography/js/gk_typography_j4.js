function gkclick(tag){
	Joomla.editors.instances[$GKEditor].replaceSelection(tag);
	jQuery('#GKTypographyModal').modal('hide');
}

function gkhideTab(val) {
	if(jQuery('#GKTypographyModal .gkTypoTable')) {
		jQuery('#GKTypographyModal .gkTypoTable').each(function(i, el){
			el = jQuery(el);
			if(i==val){
				el.css('display', 'block');
			} else {
				el.css('display', 'none');
			}
		});

		jQuery('#GKTypographyModal .gkTypoMenu li').attr('class', '');
		if(jQuery('#GKTypographyModal .gkTypoMenu li')[val])jQuery(jQuery('#GKTypographyModal .gkTypoMenu li')[val]).attr('class', 'active');
	}
}

jQuery(window).on('load', function() {
	jQuery('i.gk-typo').parent().on('click', function() {
		jQuery('#GKTypographyModal').modal('show');
		setTimeout(function(){
			$('#mce-modal-block, .mce-container.mce-panel.mce-window').remove();
		}, 100);
		setTimeout(function(){
			gkhideTab(0);
			jQuery('#GKTypographyModal').css('padding', '0px');
			jQuery('#GKTypographyModal .gkTypoMenu li').first().attr('class', 'active');
			jQuery('#GKTypographyModal .gkTypoContent').first().css('height', jQuery('#GKTypographyModal .gkTypoMenu').first().height() + 'px');	
		}, 300);
	});
});