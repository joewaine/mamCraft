<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

	'*' => array(
	),

	'localhost:8888' => array(
		'siteUrl' => 'http://localhost:8888/',
		'devMode' => true,
		'cache'   => true,
		'environmentVariables' => array(
			'basePath' => $_SERVER['DOCUMENT_ROOT'].'/',
			'siteUrl'  => 'http://localhost:8888/',
		)
	),

	'mamnoon.craft.dev' => array(
		'siteUrl' => 'http://mamnoon.craft.dev/',
		'devMode' => true,
		'cache'   => true,
		'environmentVariables' => array(
			'basePath' => $_SERVER['DOCUMENT_ROOT'].'/',
			'siteUrl'  => 'http://mamnoon.craft.dev/',
		)
	),

	'm.wrkbkt.com' => array(
		'siteUrl' => 'http://m.wrkbkt.com/',
		'devMode' => true,
		'cache'   => true,
		'environmentVariables' => array(
			'basePath' => $_SERVER['DOCUMENT_ROOT'].'/',
			'siteUrl'  => 'http://m.wrkbkt.com/',
		)
	),

	'mamnoonrestaurant.com' => array(
		'siteUrl' => 'http://mamnoonrestaurant.com/',
		'devMode' => false,
		'cache'   => true,
		'environmentVariables' => array(
			'basePath' => $_SERVER['DOCUMENT_ROOT'].'/',
			'siteUrl'  => 'http://mamnoonrestaurant.com/',
		)
	),

	'mamnoon.webfactional.com' => array(
		'siteUrl' => 'http://mamnoon.webfactional.com/',
		'devMode' => false,
		'cache'   => true,
		'environmentVariables' => array(
			'basePath' => $_SERVER['DOCUMENT_ROOT'].'/',
			'siteUrl'  => 'http://mamnoon.webfactional.com/',
		)
	),

);
