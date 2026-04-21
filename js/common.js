// Image lightbox functions
var lightboxImages = [];
var lightboxIndex = 0;

function openLightbox(el) {
	var img = el.querySelector('img');
	if (!img) return;
	// Build array of all client images
	lightboxImages = [];
	var allItems = document.querySelectorAll('.clients-slider .clients__image img');
	allItems.forEach(function (item) { lightboxImages.push(item.src); });
	// Find current index
	lightboxIndex = lightboxImages.indexOf(img.src);
	if (lightboxIndex === -1) lightboxIndex = 0;
	showLightboxImage();
	var lightbox = document.getElementById('imageLightbox');
	// Move to body root to escape stacking context
	document.body.appendChild(lightbox);
	lightbox.classList.add('active');
	document.body.style.overflow = 'hidden';
}
function showLightboxImage() {
	var lightboxImg = document.getElementById('lightboxImg');
	var counter = document.getElementById('lightboxCounter');
	lightboxImg.src = lightboxImages[lightboxIndex];
	if (counter) counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
}
function navigateLightbox(dir, e) {
	if (e) { e.stopPropagation(); e.preventDefault(); }
	lightboxIndex += dir;
	if (lightboxIndex < 0) lightboxIndex = lightboxImages.length - 1;
	if (lightboxIndex >= lightboxImages.length) lightboxIndex = 0;
	showLightboxImage();
}
function closeLightbox(e) {
	if (e.target.classList.contains('image-lightbox') || e.target.classList.contains('image-lightbox__close')) {
		var lightbox = document.getElementById('imageLightbox');
		lightbox.classList.remove('active');
		document.body.style.overflow = '';
	}
}
document.addEventListener('keydown', function (e) {
	var lightbox = document.getElementById('imageLightbox');
	if (!lightbox || !lightbox.classList.contains('active')) return;
	if (e.key === 'Escape') {
		lightbox.classList.remove('active');
		document.body.style.overflow = '';
	} else if (e.key === 'ArrowLeft') {
		navigateLightbox(1, e);
	} else if (e.key === 'ArrowRight') {
		navigateLightbox(-1, e);
	}
});

$(function () {

	// vh fix

	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// We listen to the resize event
	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});


	// scroll anim
	$("#goToSolutions").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 500, 'linear');
	});
	$("#goToTop").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 500, 'linear');
	});

	// header
	scrollFunction();
	scrollFunction2();

	// function topFunction() {
	// 	document.body.scrollTop = 0; // For Safari
	// 	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	// }

	// Side Menu Control
	var myDir = ($("html").attr('dir') == 'rtl' ? 'right' : 'left');
	var mySlidebars = new $.slidebars();
	$('.mobile-menu-btn').on('click', function () {
		mySlidebars.slidebars.toggle(myDir);
	});


	$(window).on("resize", function () {
		if ($(window).width() < 998) {
			if ($('html').hasClass('sb-active')) {
				$('.mobile-menu-btn').addClass('is-active');
			}
		}
	});

	$(window).on("scroll", scrollFunction);
	// $(window).on("scroll", scrollFunction2);

	function scrollFunction() {
		if ($(window).scrollTop() > 20) {
			$(".main-header").addClass("scrolling");
		} else {
			$(".main-header").removeClass("scrolling");
		}

		if ($(window).scrollTop() > 800) {
			$(".back-to-top").addClass("showen");
		} else {
			$(".back-to-top").removeClass("showen");
		}

		// if ($(window).scrollTop() > 100) {
		// $(".contact-side-btn").addClass("showen");
		// } else {
		// $(".contact-side-btn").removeClass("showen");
		// }

	}

	function scrollFunction2() { }

	// end header

	// side menu
	// $(".hasSub > img").click(function(e) {
	$(".hasSub > a").click(function (e) {
		e.preventDefault();
		//$(".sb-left .sb-menu li.hasSub, .sb-right .sb-menu li.hasSub").removeClass("hasSub-open");
		// $(this).parent("li").toggleClass("hasSub-open");
		$(this).parent("li").toggleClass("hasSub-open");
		return false;
	});
	// end side menu

	// pleloader
	// console.log($('#video1 source')[0].attr('data-src'));

	// $('#video1 source')[0].attr('src', $('#video1 source')[0].attr('data-src'));

	// $('#video1').on('loadstart', function (event) {
	// 	console.log('start');
	// 	$('.video-preloader').addClass('showed');
	// 	// $(this).attr("poster", "/your/loading.gif");
	// });

	// if ($('#video1').length > 0) {		
	// 	setTimeout(() => {
	// 		$('.video-preloader').removeClass('showed');
	// 		AOS.init({
	// 			// disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	// 			// startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	// 			// initClassName: 'aos-init', // class applied after initialization
	// 			// animatedClassName: 'aos-animate', // class applied on animation
	// 			useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	// 			// disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	// 			// debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	// 			// throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


	// 			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	// 			// offset: 200, // offset (in px) from the original trigger point
	// 			delay: 0, // values from 0 to 3000, with step 50ms
	// 			// duration: 400, // values from 0 to 3000, with step 50ms
	// 			// easing: 'ease', // default easing for AOS animations
	// 			once: true, // whether animation should happen only once - while scrolling down
	// 			// mirror: false, // whether elements should animate out while scrolling past them
	// 			// anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

	// 		});
	// 		checkVisability();
	// 	}, 2000);
	// }

	if ($('#video1').length > 0) {

		setTimeout(() => {
			// console.log('else');
			$('.video-preloader').removeClass('showed');
			AOS.init({
				useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
				delay: 0, // values from 0 to 3000, with step 50ms
				once: true, // whether animation should happen only once - while scrolling down

			});
			checkVisability();
		}, 3000);

		const video = document.querySelector('#video1');
		const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);


		if (isVideoPlaying(video)) {
			// console.log('isVideoPlaying(video) ', isVideoPlaying(video));

			setTimeout(() => {
				$('.video-preloader').removeClass('showed');
				AOS.init({
					useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
					delay: 0, // values from 0 to 3000, with step 50ms
					once: true, // whether animation should happen only once - while scrolling down

				});
				checkVisability();
			}, 2000);


			$('#video1').on('canplay', function (event) {
				$('.video-preloader').removeClass('showed');
				// start animations
				AOS.init({
					// disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
					// startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
					// initClassName: 'aos-init', // class applied after initialization
					// animatedClassName: 'aos-animate', // class applied on animation
					useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
					// disableMutationObserver: false, // disables automatic mutations' detections (advanced)
					// debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
					// throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


					// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
					// offset: 200, // offset (in px) from the original trigger point
					delay: 0, // values from 0 to 3000, with step 50ms
					// duration: 400, // values from 0 to 3000, with step 50ms
					// easing: 'ease', // default easing for AOS animations
					once: true, // whether animation should happen only once - while scrolling down
					// mirror: false, // whether elements should animate out while scrolling past them
					// anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

				});
				checkVisability();
				// $(this).removeClass('background');
				// $(this).removeAttr("poster");
			});
		} else {

		}

	} else {
		AOS.init({
			// disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
			// startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
			// initClassName: 'aos-init', // class applied after initialization
			// animatedClassName: 'aos-animate', // class applied on animation
			useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
			// disableMutationObserver: false, // disables automatic mutations' detections (advanced)
			// debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
			// throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
			// offset: 200, // offset (in px) from the original trigger point
			delay: 0, // values from 0 to 3000, with step 50ms
			// duration: 400, // values from 0 to 3000, with step 50ms
			// easing: 'ease', // default easing for AOS animations
			once: true, // whether animation should happen only once - while scrolling down
			// mirror: false, // whether elements should animate out while scrolling past them
			// anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

		});
		checkVisability();
	}

	// var isInView = $('.anim-text').inView('bottomOnly', 100);
	// if ($('.banner-btns').length > 0) {
	// 	var isInView2 = $('.banner-btns').inView('bottomOnly', 100);
	// }

	// function checkVisability() {
	// 	$('.anim-text').each(function() {
	// 		if ($(this).inView("both")) {
	// 			$(this).addClass("visible");
	// 		} else {
	// 			// $(this).removeClass("visible");
	// 		}
	// 	});
	// 	if ($('.banner-btns').length > 0) {
	// 		$('.banner-btns').each(function() {
	// 			if ($(this).inView("both")) {
	// 				$(this).addClass("visible");
	// 			} else {
	// 				// $(this).removeClass("visible");
	// 			}
	// 		});
	// 	}
	// }

	// checkVisability();


	// bind to window scroll event
	$(window).scroll(function () {
		checkVisability();
	});

	// animation init 

	var isInView = $('.anim-text').inView('topOnly', 0);
	if ($('.banner-btns').length > 0) {
		var isInView2 = $('.banner-btns').inView('topOnly', 0);
	}

	function checkVisability() {
		$('.anim-text').each(function () {
			if ($(this).inView("topOnly")) {
				$(this).addClass("visible");
			} else {
				// $(this).removeClass("visible");
			}
		});
		if ($('.banner-btns').length > 0) {
			$('.banner-btns').each(function () {
				if ($(this).inView("topOnly")) {
					$(this).addClass("visible");
				} else {
					// $(this).removeClass("visible");
				}
			});
		}
	}

	// checkVisability();


	// bind to window scroll event
	$(window).scroll(function () {
		checkVisability();
	});


	// scroll

	$('.scroll-down').on("click", function () {
		var percentageToScroll = 100;
		var height = $('.banner-video').innerHeight();
		// console.log($('.banner-video').innerHeight());
		var scrollAmount = (height * percentageToScroll / 100) - 80;
		$("html, body").animate({
			scrollTop: scrollAmount
		}, 1000);
	});



	// brands slider


	var dirRtlFlag = false;
	if ($("html").attr('dir') == 'rtl') {
		dirRtlFlag = true;
	}

	// brands

	$('.brands-slider').slick({
		dots: false,
		arrows: false,
		infinite: true,
		rtl: dirRtlFlag,
		slidesToShow: 10,
		autoplaySpeed: 0,
		speed: 2000,
		cssEase: 'linear',
		autoplay: true,
		pauseOnHover: false,
		accessibility: false,
		draggable: false,
		pauseOnFocus: false,
		swipe: false,
		swipeToSlide: false,
		touchMove: false,
		// centerMode: true,
		// centerPadding: '200px',
		responsive: [{
			breakpoint: 1750,
			settings: {
				slidesToShow: 9,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1600,
			settings: {
				slidesToShow: 8,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 7,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 6,
				slidesToScroll: 1,
				// centerMode: false,
				// centerPadding: '0px',
			}
		},
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				// centerMode: false,
				// centerPadding: '0px',
			}
		},
		{
			breakpoint: 980,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				// centerMode: false,
				// centerPadding: '0px',
			}
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				// centerMode: false,
				// centerPadding: '0px',
			}
		},
		{
			breakpoint: 490,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				centerMode: true,
				centerPadding: '70px',
			}
		},
		]
	});

	// reviews

	$('.clients-slider').slick({
		dots: false,
		arrows: false,
		infinite: true,
		autoplaySpeed: 0,
		speed: 3000,
		cssEase: 'linear',
		autoplay: true,
		rtl: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		pauseOnHover: false,
		accessibility: false,
		draggable: false,
		pauseOnFocus: false,
		swipe: false,
		swipeToSlide: false,
		touchMove: false,
		responsive: [{
			breakpoint: 1550,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 980,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		]
	});

	$('.clients-arrows__prev').click(function () {
		$('.clients-slider').slick('slickPrev');
		return false;
	});

	$('.clients-arrows__next').click(function () {
		$('.clients-slider').slick('slickNext');
		return false;
	});


	$('.logos-slider').slick({
		dots: false,
		arrows: false,
		infinite: true,
		autoplaySpeed: 0,
		speed: 3000,
		cssEase: 'linear',
		autoplay: true,
		rtl: false,
		slidesToShow: 8,
		slidesToScroll: 1,
		pauseOnHover: false,
		accessibility: false,
		draggable: false,
		pauseOnFocus: false,
		swipe: false,
		swipeToSlide: false,
		touchMove: false,
		responsive: [{
			breakpoint: 1550,
			settings: {
				slidesToShow: 7,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 980,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},
		]
	});


	$('.products-slider').slick({
		dots: false,
		arrows: false,
		infinite: true,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 15000,
		rtl: true,
		slidesToShow: 2,
		pauseOnHover: false,
		centerMode: true,
		centerPadding: '14%',
		responsive: [{
			breakpoint: 1550,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 980,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 480,
			settings: {
				// slidesToShow: 1.5,
				slidesToShow: 1,
				slidesToScroll: 1,
				// infinite: false,

			}
		},
		]
	});

	$('.clients-arrows__prev').click(function () {
		$('.products-slider').slick('slickPrev');
		return false;
	});

	$('.clients-arrows__next').click(function () {
		$('.products-slider').slick('slickNext');
		return false;
	});

	// faq

	$('.faq-gallery').slick({
		slidesToShow: 1,
		fade: true,
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 3000,
		rtl: true,
		pauseOnHover: false,
		// responsive: [{
		// 		breakpoint: 1550,
		// 		settings: {
		// 			slidesToShow: 2,
		// 			slidesToScroll: 1
		// 		}
		// 	},
		// ]
	});

	// parallax icons

	// document.addEventListener("mousemove", parallax);
	if ($(window).width() > 992) {
		$('.about-moving-icons').on('mousemove', parallax);
	}

	function parallax(event) {
		this.querySelectorAll(".parallax-wrap span").forEach((shift) => {
			const position = shift.getAttribute("value");
			const x = (window.innerWidth - event.pageX * position) / 90;
			const y = (window.innerHeight - event.pageY * position) / 90;

			shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
		});
	}


	// form

	$(function () {
		$('#datetimepicker1').datetimepicker({
			format: 'L',
			// keepOpen: true,
			// debug: true,
		});
		$('#datetimepicker2').datetimepicker({
			format: 'LT',
			// keepOpen: true,
			// debug: true,
		});
	});


});


// mail send
$(function () {

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail

	// const mailPath = './mail.php'

	// document.querySelectorAll('.uniForm').forEach((e) => {

	// 	e.addEventListener('submit', function(e) {

	// 		let th = this,
	// 			params = new FormData(this),
	// 			request = new XMLHttpRequest()

	// 		request.open('POST', mailPath, true)
	// 		request.send(params)

	// 		request.onreadystatechange = function() {
	// 			if (this.readyState == 4 && this.status == 200) {
	// 				setTimeout(function() {
	// 					th.reset()
	// 				}, 1000)
	// 				alert('Thank you!')
	// 			}
	// 		}

	// 		e.preventDefault()

	// 	})

	// })


	// $("form").submit(function() { //Change
	// 	var th = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "./mail.php", //Change
	// 		data: th.serialize()
	// 	}).done(function() {
	// 		alert("Thank you!");
	// 		$('#contactModal').modal('hide');
	// 		setTimeout(function() {
	// 			// Done Functions
	// 			th.trigger("reset");
	// 		}, 1000);
	// 	});
	// 	return false;
	// });


	// read more

	document.querySelectorAll(".item").forEach(element => {
		element.querySelector(".read-more").addEventListener("click", function (e) {
			element.classList.toggle("active")
		})
	})

	// navigation
	const navigation = document.querySelector('.navigation');

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting === true) {
				const uid = entry.target.dataset.sectionName;

				const active = navigation.querySelector('li.active');
				if (active !== null) {
					active.classList.remove('active');
				}

				const button = navigation.querySelector('a[href="#' + uid + '"]');
				if (button !== null) {
					button.parentNode.classList.add('active');
				}
			}
		})
	}, {
		root: document, // iframe 대응, 보통 null
		rootMargin: '0% 0% 0% 0%',
		threshold: 1
	});

	const stickySection = document.querySelectorAll('[data-section-name]');
	stickySection.forEach((elm, idx) => {
		observer.observe(elm);
	});

	// tooltip

	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});

	// smooth anchor move
	if (navigation) {
		const buttons = navigation.querySelectorAll('a');
		buttons.forEach((elm, idx) => {
			elm.addEventListener('click', (e) => {
				e.preventDefault();
				const uid = elm.getAttribute('href').replace('#', '');
				document.querySelector('[data-section-name="' + uid + '"]').scrollIntoView({
					behavior: 'smooth',
					block: "start"
				});
			})
		});
	}

	// active links

	var url = window.location.href;
	var page = url.substr(url.lastIndexOf('/') + 1);
	var base = './'
	if (page) {
		$('.main-navi ul li [href="' + base + page + '"]').addClass('active');
	} else if (page) {
		$('.main-navi ul li [href=!"' + base + page + '"]').addClass('active');
	} else {
		$('.main-navi ul li:first').addClass('active')
	}

	// popup Video

	$('#videoModal').on('hide.bs.modal', function (e) {
		$('#presVideo')[0].pause();
	})


	// $('.projects').lightGallery({
	// 	thumbnail: true,
	// 	animateThumb: false,
	// 	showThumbByDefault: false,
	// 	selector: '.projects__image'
	// });

});

