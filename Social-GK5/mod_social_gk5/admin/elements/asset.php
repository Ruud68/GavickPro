<?php

/**
* Social GK5 - main PHP file
* @package Joomla!
* @Copyright (C) 2009-2012 Gavick.com
* @ All rights reserved
* @ Joomla! is Free Software
* @ Released under GNU/GPL License : http://www.gnu.org/copyleft/gpl.html
* @ version $Revision: GK5 1.0 $
**/

defined('JPATH_BASE') or die;

if(!defined('DS')){
   define('DS',DIRECTORY_SEPARATOR);
}

jimport('joomla.form.formfield');

class JFormFieldAsset extends JFormField {
	protected $type = 'Asset';

    protected function getInput() {
    	JHtml::_('behavior.framework');
    	// get the handler for the back-end document
		$doc = JFactory::getDocument();
		// include the prefixfree for less work with CSS code
		//$doc->addScript(JURI::root().$this->element['path'].'prefixfree.js');
		// include the back-end scripts
		$doc->addScript(JURI::root().$this->element['path'].'script.js');
		// include the back-end styles
		$doc->addStyleSheet(JURI::root().$this->element['path'].'style.css');     
		$doc->addStyleSheet(JURI::root().$this->element['path'].'widget.css'); 
		//$doc->addStyleSheet(JURI::root().$this->element['path'].'/colorpicker/mooRainbow.css');     
		// include color picker script 
		$doc->addScript(JURI::root().$this->element['path'].'/colorpicker/mooRainbow.js');   
		// return null, because there is no HTML output
		return null;
	}
}

// EOF