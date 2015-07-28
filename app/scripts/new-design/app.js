$(document).ready(function(){
	$(document).foundation({
		offcanvas : {
			open_method: 'overlap',
			close_on_click : true
		},
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){  
		    $('.header_container').addClass("fixed");
		  }
		  else{
		    $('.header_container').removeClass("fixed");
		  }
	});

	// smooth scroll
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
	      	var target = $(this.hash);
	      	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      	if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	});

	// Viewpoint
	$('.block').viewportChecker({
	    classToAdd: 'active_block', // Class to add to the elements when they are visible
	    // offset: [100 OR 10%], // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
	    // invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
	    repeat: true, // Add the possibility to remove the class if the elements are not visible
	    scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
	});

	$('.blog_container').rssfeed('http://innovatorylife.com/feed/', {
		limit: 2,
		header: false,
		date: false,
		titletag: 'h5',
		snippet: true,
		sort: 'date',
		linktarget: '_blank'
	});

});