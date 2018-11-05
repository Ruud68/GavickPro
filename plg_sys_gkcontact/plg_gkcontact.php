<?php

/**
* GK Contact plugin
* @Copyright (C) 2013 Gavick.com
* @ All rights reserved
* @ Joomla! is Free Software
* @ Released under GNU/GPL License : http://www.gnu.org/copyleft/gpl.html
* @version $Revision: 1.0 $
**/

defined( '_JEXEC' ) or die();
jimport( 'joomla.plugin.plugin' );

class plgSystemPlg_GKContact extends JPlugin {
	// Prepare the form
	function onAfterRender() {
		$app = JFactory::getApplication();
		$config = JFactory::getConfig();

		// check if this is a front-end
		if ($app->getName() != 'site') {
			return true;
		}		
		// get the output buffer
		$buffer = $app->getBody();
		// prepare an output
		$output = '';
		
		if($this->params->get('use_recaptcha') == 1 && stripos($buffer, '{GKCONTACT}')) {
			$app = JFactory::getApplication();
			$lang   = $this->_getLanguage();
			$pubkey = $this->params->get('public_key', '');	
			$server = 'https://www.google.com/recaptcha';
	
			$output .= '<script type="text/javascript" src="'. $server . '/api.js"></script>';
		}
		// output the main wrapper
		$output .= '<div class="gkContactForm">';			
		//
		// output the form
		//
		// get the current page URL
		$cur_url = ((!empty($_SERVER['HTTPS'])) && ($_SERVER['HTTPS']!='off')) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$cur_url = preg_replace('@%[0-9A-Fa-f]{1,2}@mi', '', htmlspecialchars($cur_url, ENT_QUOTES, 'UTF-8'));
		//
		$output .= '<form action="'.$cur_url.'" method="post">';
			if(
				$this->params->get('name_field') == 1 ||
				$this->params->get('email_field') == 1 ||
				$this->params->get('title_field') == 1 ||
				$this->params->get('eu_protect_field', 1) == 1
			) {
				$output .= '<p class="gkcontact-fields">';
			} 
			
			if($this->params->get('email_field') == 1) {
				$output .= '<input type="email" class="required" placeholder="'.JText::_('PLG_GKCONTACT_EMAIL_PLACEHOLDER').'" name="gkcontact-email" />';
			}
			
			if($this->params->get('name_field') == 1) {
				$output .= '<input type="text" class="required" placeholder="'.JText::_('PLG_GKCONTACT_NAME_PLACEHOLDER').'" name="gkcontact-name" />';
			}
			
			if($this->params->get('title_field') == 1) {
				$output .= '<input type="text" class="required" placeholder="'.JText::_('PLG_GKCONTACT_TITLE_PLACEHOLDER').'" name="gkcontact-title" />';
			}

			if($this->params->get('eu_protect_field', 1) == 1) {
				$output .= '<input type="checkbox" class="required" name="gkcontact-eu-protect" /> '.JText::sprintf('PLG_GKCONTACT_EU_PROTECT_PLACEHOLDER', $config->get('sitename'));;
			}
			
			if(
				$this->params->get('name_field') == 1 ||
				$this->params->get('email_field') == 1 ||
				$this->params->get('title_field') == 1 ||
				$this->params->get('eu_protect_field', 1) == 1
			) {
				$output .= '</p>';
			} 
			
			$output .= '<p class="gkcontact-textarea"><textarea class="required" name="gkcontact-textarea" placeholder="'.JText::_('PLG_GKCONTACT_TEXT_PLACEHOLDER').'"></textarea></p>';
				
			if($this->params->get('use_recaptcha') == 1) {
				$output .= '<div class="g-recaptcha" data-sitekey="'.$pubkey.'"></div>';
			}	
			
			$output .= '<p><input type="submit" value="'.JText::_('PLG_GKCONTACT_SEND_BTN').'" class="submit button-border" /></p>';
			$output .= '<input type="hidden" value="'.base64_encode($cur_url).'" name="return" />';
			$output .= JHtml::_( 'form.token' );
		$output .= '</form>';
		// close the main wrapper
		$output .= '</div>';
		// replace the {GKCONTACT} string with the generated output
		$buffer = str_replace('{GKCONTACT}', $output, $buffer);
		// save the changes in the buffer
		$app->setBody($buffer);
		
		return true;
	}

	// Prepare the form
	function onAfterInitialise() {	
		$this->loadLanguage('plg_system_plg_gkcontact');

		$post = JFactory::getApplication()->input->post;   
		if(!empty($post->get('gkcontact-textarea'))) {
			$app = JFactory::getApplication();
			// if reCaptcha is enabled
			if($this->params->get('use_recaptcha') == 1) {
				JPluginHelper::importPlugin('captcha');
// 				$dispatcher = JFactory::getApplication();
// 				$res = $dispatcher->triggerEvent('validateCaptcha', array($post->get('g-recaptcha-response')));
				
				if (empty($post->get('g-recaptcha-response', false))) {
				    $app->redirect(base64_decode($post->get('return')),JText::_('PLG_GKCONTACT_RECAPTCHA_ERROR'),"error");
				}
			}

			if($this->params->get('eu_protect_field') == 1) {
				if(empty($post->get('gkcontact-eu-protect'))) {
					JFactory::getApplication()->enqueueMessage(JText::_('PLG_GKCONTACT_EU_PROTECT_ERROR'),"error");
					$app->redirect(base64_decode($post->get('return')));
				}
			}

			// check the token
			JSession::checkToken() or die( 'Invalid Token' );
			// if the reCaptcha and token are correct - check the mail data:
			
			// get the mailing api
			$mailer = JFactory::getMailer();
			
			// set the sender
			$config = JFactory::getConfig();
			$sender = array( 
			    $config->get('mailfrom'),
			    $config->get('fromname') 
			);
			 
			$mailer->setSender($sender);
			
			// set the recipient
			if(trim($this->params->get('emails')) != '') {
				$mailer->addRecipient(explode(',', $this->params->get('emails')));
				
				// use XSS filters
				$filter = JFilterInput::getInstance(); 
				
				// NAME
				$name = '';
				
				if($this->params->get('name_field') == 1) {
					$name = $filter->clean($post->get('gkcontact-name', '', 'STRING')); 
				}
				// EMAIL
				$email = '';
				
				if($this->params->get('email_field') == 1) {
					$email = $filter->clean($post->get('gkcontact-email', '', 'STRING')); 
				}
				// TITLE
				$title = '';
				
				if($this->params->get('title_field') == 1) {
					$title = $filter->clean($post->get('gkcontact-title', '', 'STRING'));	
				} else {
					$title = JText::_('PLG_GKCONTACT_STANDARD_SUBJECT') . $config->get('sitename');
				}
				
				$text = trim(strip_tags($post->get('gkcontact-textarea', '', 'STRING')));
				
				if(
					$text != '' && 
					($this->params->get('name_field') == 0 || ($this->params->get('name_field') == 1 && $name != '')) &&
					($this->params->get('email_field') == 0 || ($this->params->get('email_field') == 1 && $email != '')) &&
					($this->params->get('title_field') == 0 || ($this->params->get('title_field') == 1 && $title != ''))
				) {
					// set the message body
					$body = "<html>";
					$body .= "<body>";
					$body .= "<h1 style=\"font-size: 24px; border-bottom: 4px solid #EEE; margin: 10px 0; padding: 10px 0; font-weight: normal; font-style: italic;\">".$title."</h1>";
			
					if($this->params->get('name_field') == 1) {
						$body .= "<div>";
						$body .= "<h2 style=\"font-size: 16px; font-weight: normal; border-bottom: 1px solid #EEE; padding: 5px 0; margin: 10px 0;\">".JText::_('PLG_GKCONTACT_NAME_LABEL')."</h2>";
						$body .= "<p>".$name."</p>";
						$body .= "</div>";
					}
			
					if($this->params->get('email_field') == 1) {
						$body .= "<div>";
						$body .= "<h2 style=\"font-size: 16px; font-weight: normal; border-bottom: 1px solid #EEE; padding: 5px 0; margin: 10px 0;\">".JText::_('PLG_GKCONTACT_EMAIL_LABEL')."</h2>";
						$body .= "<p>".$email."</p>";
						$body .= "</div>";
					}
			
					$body .= "<div>";
					$body .= "<h2 style=\"font-size: 16px; font-weight: normal; border-bottom: 1px solid #EEE; padding: 5px 0; margin: 10px 0;\">".JText::_('PLG_GKCONTACT_TEXT_LABEL')."</h2>";
					$body .= $text;
					$body .= "</div>";
					$body .= "</body>";
					$body .= "</html>";
					
					$mailer->isHTML(true);
					$mailer->Encoding = 'base64';
					$mailer->setBody($body);
					$mailer->addReplyTo($email);
					
					if(trim($this->params->get('title')) == '') {
						$mailer->setSubject(JText::_('PLG_GKCONTACT_STANDARD_SUBJECT') . $config->get('sitename'));
					} else {
						$mailer->setSubject($this->params->get('title'));
					}
					// sending and redirecting
					$send = $mailer->Send();
					//
					if ( $send !== true ) {
						$app->redirect(base64_decode($post->get('return')), JText::_('PLG_GKCONTACT_MESSAGE_SENT_ERROR') . $send->get('message'), "error");
					} else {
					    $app->redirect(base64_decode($post->get('return')), JText::_('PLG_GKCONTACT_MESSAGE_SENT_INFO'));
					}
				} else {
					$app->redirect(base64_decode($post->get('return')), JText::_('PLG_GKCONTACT_MESSAGE_EMPTY_ERROR'), "error");
				}
			} else {
				 $app->redirect(base64_decode($post->get('return')), JText::_('PLG_GKCONTACT_NO_RECIPENT_INFO'), "error");
			}
		}
	}
	
	private function _getLanguage() {
		$language = JFactory::getLanguage();

		$tag = explode('-', $language->getTag());
		$tag = $tag[0];
		$available = array('en', 'pt', 'fr', 'de', 'nl', 'ru', 'es', 'tr');

		if (in_array($tag, $available))
		{
			return "lang : '" . $tag . "',";
		}

		// If nothing helps fall back to english
		return '';
	}
}

/* EOF */