jQuery(document).ready(function($) {

	// Vars
	/////////////////////////////////////////////

	var ACTIVE_CLASS			= "active",
		LAZY_LOAD_DEFAULT_DELAY	= 4;

	var $menuNavItems    = $("#menu .menu-nav li:not(:last-child)");
	var $menus           = $("#menu .menu");
	var $menuItems       = $("#menu .menu-items li");

	var $slideshowSlides = $("#slideshow .slides");
	var $storySlides     = $("#people .slides");

	var slideshow,
		story;

	var timer;
	var slideshowPlaying = false;

	var resizeTimeout,
		lazyLoadTimeout;


	// Setup
	/////////////////////////////////////////////

	setup();

	if ($(".image-slides").length > 0) {
		$(".image-slides img:hidden").show();
		$(".image-slides").unslider({ dots: true, fluid: true, delay: false }).stop();
	}

	$("#nav").sticky();

	$("#nav-toggle").click(function(e){
		if ($("#nav ul").is(":hidden")) {
			$("#nav ul").stop().slideDown();
		} else {
			$("#nav ul").stop().slideUp();
		}
		e.preventDefault();
	});


	// Setup
	/////////////////////////////////////////////

	function setup() {
		setupLazyLoad();
		setupSlideshow();
		setupMenus();
		setupStory();
		setupResize();
		setupGoogleEvents();
	}

	function setupResize() {
		$(window).resize(onPageResize);
	}

	function onPageResize() {
		clearTimeout(resizeTimeout);
		resizeTimeout	= setTimeout(onPageResizeDelay, 250);
		console.log("onPageResize");
		var viewportWidth = $( window ).width();
		if ($("#nav-toggle").is(":hidden") && $("#nav ul").is(":hidden") && viewportWidth > 845) {
			$("#nav ul").show();
		}
	}

	function onPageResizeDelay() {
		console.log("onPageResizeDelay");
		clearTimeout(resizeTimeout);
		updateStoryHeight();
	}

	function setupLazyLoad() {
		$(window).load(loadLazyImgs);
		clearTimeout(lazyLoadTimeout);
		lazyLoadTimeout	= setTimeout(loadLazyImgs, LAZY_LOAD_DEFAULT_DELAY * 1000);
	}

	function loadLazyImgs() {
		clearTimeout(lazyLoadTimeout);
		$("img.lazy").each(function(index) {
			var $img	= $(this);
			if ($img.data("src") != undefined) {
				$img.attr("src", $img.data("src"));
			}
		});
	}

	function setupSlideshow() {

		var $prev = $slideshowSlides.find(".prev");
		var $next = $slideshowSlides.find(".next");

		if ($slideshowSlides.find("li").length <= 1) {
			$prev.hide();
			$next.hide();
			return;
		}

		slideshow = new Swipe($slideshowSlides.get(0), {
			callback: function(e) {
				var pos = slideshow.getPos(),
					total = $slideshowSlides.find("li").length - 1;
				_gaq.push(['_trackEvent', 'content', 'slideshow', 'slideshow-swipe-' + pos + '/' + total ]);
			}
		});

		$prev.click(function(e) {
			e.preventDefault();
			var first	= 0,
				last	= $slideshowSlides.find("li").length - 1;
			if (slideshow.getPos() == 0) {
				slideshow.slide(last);
			} else {
				slideshow.prev();
			}

			if (slideshowPlaying) {
				disableAutoplay();
			}
		});

		$next.click(function(e) {
			e.preventDefault();
			slideshow.next();

			if (slideshowPlaying) {
				disableAutoplay();
			}
		});

		enableAutoplay();
	}

	function enableAutoplay() {
		slideshowPlaying = true;
		timer = window.setInterval(advanceSlideshow, 7000);
	}

	function advanceSlideshow() {
		slideshow.next();
	}

	function disableAutoplay() {
		slideshowPlaying = false;
		clearInterval(timer);
	}

	function setupStory() {

		var $prev = $storySlides.find(".prev");
		var $next = $storySlides.find(".next");

		if ($storySlides.find("li").length <= 1) {
			$prev.hide();
			$next.hide();
			return;
		}

		story = new Swipe($storySlides.get(0), {
			callback: function(e) {
				var pos = story.getPos(),
					total = $storySlides.find("li").length - 1;
				_gaq.push(['_trackEvent', 'content', 'story', 'story-swipe-' + pos + '/' + total ]);
				updateStoryHeight();
			}
		});

		$prev.click(function(e) {
			e.preventDefault();
			var first = 0,
				last  = $storySlides.find("li").length - 1;
			if (story.getPos() == 0) {
				story.slide(last);
			} else {
				story.prev();
			}
		});

		$next.click(function(e) {
			e.preventDefault();
			story.next();
		});

		$storySlides.find("img").one('load', function() {
			updateStoryHeight(true);
		}).each(function() {
			if (this.complete) $(this).load();
		});

		updateStoryHeight(true);

	}

	function updateStoryHeight(doNotAnimate) {
		var index = story.getPos();
		var $item = $storySlides.find("li").eq(index).find(".slide-content");
		var itemH = $item.height();
		if (!doNotAnimate) {
			$storySlides.stop(true).animate({
				height: itemH
			});
		} else {
			$storySlides.stop(true).css({
				height: itemH
			})
		}
	}

	function setupMenus() {

		$menuNavItems.children("a").click(function(e) {
			e.preventDefault();
			var $onMenu  = $menus.filter(":visible");
			var $navItem = $(this).closest("li");
			var $menu    = $("#" + $navItem.data("menu-id"));

			if ($menu.get(0) == $onMenu.get(0)) return;

			$menuNavItems.removeClass(ACTIVE_CLASS);
			$navItem.addClass(ACTIVE_CLASS);
			$menus.find(".menu-item-popover").slideUp();
			$menus.hide();
			$menu.fadeIn(750, "swing");
		});

		$menuItems.find("a.menu-item-info-btn").click(function(e) {
			e.preventDefault();
			var $menuItem = $(this).closest("li");
			var $popover  = $menuItem.find(".menu-item-popover");
			$popover.slideToggle();
		});

		$menuItems.find(".menu-item-popover .close").click(function(e) {
			e.preventDefault();
			var $popover = $(this).closest(".menu-item-popover");
			$popover.slideUp();
		});

	}

	function setupGoogleEvents() {
		_gaq.push( ['_trackEvent', 'page', 'load' ] );
		if ( $.scrollDepth ) {
			$.scrollDepth();
		}
	}

});



