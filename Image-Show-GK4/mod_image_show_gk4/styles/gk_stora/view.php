<?php

/**
* GK Image Show - view file
* @package Joomla!
* @Copyright (C) 2009-2012 Gavick.com
* @ All rights reserved
* @ Joomla! is Free Software
* @ Released under GNU/GPL License : http://www.gnu.org/copyleft/gpl.html
* @ version $Revision: GK4 1.0 $
**/

// no direct access
defined('_JEXEC') or die;

jimport('joomla.utilities.string');

if($this->config['random_slides'] == 1) {
	shuffle($this->config['image_show_data']);
}
?>

<div id="gkIs-<?php echo $this->config['module_id'];?>" class="gkIsWrapper-gk_stora">
	<div class="gkIsPreloader">Loading&hellip;</div>
	
	<?php for($i = 0; $i < count($this->config['image_show_data']); $i++) : ?>
	<?php if($this->config['image_show_data'][$i]->published) : ?>
		<?php 
			
			unset($path, $title, $link, $content);
			// creating slide path
			$path = '';
			// check if the slide have to be generated or not
			if($this->config['generate_thumbnails'] == 1) {
				$path = $uri->root().'modules/mod_image_show_gk4/cache/'.GKIS_StoreFront_Image::translateName($this->config['image_show_data'][$i]->image, $this->config['module_id']);
			} else {
				$path = $uri->root();
				$path .= $this->config['image_show_data'][$i]->image;
			}
			$content = '';
			
            if($this->config['image_show_data'][$i]->type == "k2"){
              	if(isset($this->articlesK2[$this->config['image_show_data'][$i]->artK2_id])) {
              		$title = htmlspecialchars($this->articlesK2[$this->config['image_show_data'][$i]->artK2_id]["title"]);
              		$content = $title;
                	$link =  $this->articlesK2[$this->config['image_show_data'][$i]->artK2_id]["link"];
                } else {
                	$title = 'Selected article doesn\'t exist!';
                	$content = $title;
                	$link = '#';
                }
            } else {
                // creating slide title
				$title = htmlspecialchars(($this->config['image_show_data'][$i]->type == "text") ? $this->config['image_show_data'][$i]->name : $this->articles[$this->config['image_show_data'][$i]->art_id]["title"]);
				// creating slie content
				$content = ($this->config['image_show_data'][$i]->type == "text") ? $this->config['image_show_data'][$i]->content : $title;
				$content = str_replace(array('[leftbracket]', '[rightbracket]', '[ampersand]'), array('<', '>', '&amp;'), $content);
				// creating slide link
				$link = ($this->config['image_show_data'][$i]->type == "text") ? $this->config['image_show_data'][$i]->url : $this->articles[$this->config['image_show_data'][$i]->art_id]["link"];	
			}
		?>
		<figure data-url="<?php echo $path; ?>" data-link="<?php echo $link; ?>" data-zindex="<?php echo $i+1; ?>" data-title="<?php echo $title; ?>">
			<figcaption>
				<?php if($this->config['config']->gk_stora->gk_stora_show_title_block && $title != '') : ?>	
				<h2><?php echo $title; ?></h2>
				<?php echo $content; ?>
				<?php endif; ?>
			</figcaption>
		</figure>
	<?php endif; ?>
	<?php endfor; ?>

	<?php if($this->config['config']->gk_stora->gk_stora_show_pagination && (count($this->config['image_show_data']) > 1) ): ?>	
	<ul class="gkIsPagination">
	<?php 
	$j = 0;
	for($i = 0; $i < count($this->config['image_show_data']); $i++) : ?>
		<?php if($this->config['image_show_data'][$i]->published) : ?>
		<li<?php if($j == 0) : ?> class="active"<?php endif; ?>><?php echo $j++; ?></li>
		<?php endif; ?>
	<?php endfor; ?>
	</ul>
	<?php endif; ?>
</div>
