function setMobileHandlers() {

	$('.mobile-slide-box').click(function() {
		let name = $(this).attr('data-window-id');
		animateWindow(name)
	})

	$('.mobile-home-note').click(function() {
		let name = $(this).attr('data-window-id');
		animateWindow(name);
	})

	$('.mobile-next-btn').click(function() {
		if($('.show').hasClass('return-email')) {
			$('.return-email').removeClass('unfilled').addClass('filled');
			animateEmailIcon('mobile');
		} else if ($('.show').hasClass('name')) {
			$('.name').removeClass('unfilled').addClass('filled');
			animateUserIcon('mobile');
		}
		if (!$('.message').hasClass('show')) {
			animateForm('mobile');
		}
	});

	$('.bars').click(function() {

		function toggleSlides() {

			const mainContentStyler = popmotion.styler(document.getElementById('main-content'));
			const headerStyler = popmotion.styler(document.getElementById('mobile-header'));
			const mobileSlides = document.getElementById('mobile-sidebar')
			const mobileHomeNoteStyler = popmotion.styler(document.querySelector('.mobile-home-note'));
			
			const mobileStylers = Array
				.from(mobileSlides.children)
				.map(popmotion.styler)

			if ($('#mobile-sidebar').hasClass('unslid')) {

				$('#mobile-sidebar').css('pointer-events', 'auto');

				$('.mobile-slide-box').click(function() {
					let name = $(this).attr('data-window-id');
					animateWindow(name)
				});
				$('.bars').off('click');
				setTimeout(() => {$('.bars').click(toggleSlides)}, 850);
				$('#mobile-sidebar').removeClass('unslid').addClass('slid');

				const mobileAnimations = Array(mobileStylers.length)
					.fill(popmotion.spring({ from: 0, to: -150, stiffness: 200, damping: 15, mass: .7}))				

				popmotion.stagger(mobileAnimations, 150)
					.start((v) => v.forEach((x, i) => mobileStylers[i].set('x', x)));

				popmotion.tween({
					from: {y: 50},
					to: {y: 200},
					ease: popmotion.easing.easeIn,
					duration: 300,
				}).start(headerStyler.set);

				popmotion.tween({
					from: 0,
					to: {y: 150},
					ease: popmotion.easing.easeIn,
					duration: 300,
				}).start(mainContentStyler.set);

				popmotion.tween({
					from: {
						x: 0,
						y: 0,
						scale: 1
					},
					to: {
						x: 30,
						y: 60,
						scale: 3
					},
					ease: popmotion.easing.easeInOut,
					duration: 400,
				}).start(mobileHomeNoteStyler.set);
			}
			else if($('#mobile-sidebar').hasClass('slid')) {

				$('#mobile-sidebar').css('pointer-events', 'none');
				
				$('.bars').off('click');
				$('.mobile-slide-box').off('click')
				setTimeout(() => {$('.bars').click(toggleSlides)}, 650);
				$('#mobile-sidebar').removeClass('slid').addClass('unslid');

				
				$('.mobile-slide-box').unbind('mouseenter mouseleave');
				$('.mobile.slide-box').attr('background-color', 'transparent');
				
				const mobileAnimations = Array(mobileStylers.length)
					.fill(popmotion.spring({ from: -150, to: 0, stiffness: 400}))


				for (let i=0; i<mobileStylers.length; i++) {
					popmotion.tween({
						from: {opacity: 1},
						to: {opacity: 0},
						ease: popmotion.easing.easeIn,
						duration: 200
					}).start(mobileStylers[i].set);
					setTimeout(() => popmotion.tween({
						from: {
							x: -150,
							opacity: 0
						},
						to: {
							x: 0,
							opacity: 1
						},
						duration: 0
					}).start(mobileStylers[i].set), 600)
				}
				

				popmotion.tween({
					from: {y: 200},
					to: {y: 50},
					ease: popmotion.easing.easeIn,
					duration: 350,
				}).start(headerStyler.set);

				popmotion.tween({
					from: {y: 150},
					to: {y: 0},
					ease: popmotion.easing.easeIn,
					duration: 300,
				}).start(mainContentStyler.set);

				popmotion.tween({
					from: {
						x: 30,
						y: 60,
						scale: 3
					},
					to: {
						x: 0,
						y: 0,
						scale: 1
					},
					ease: popmotion.easing.easeInOut,
					duration: 400,
				}).start(mobileHomeNoteStyler.set);

			}
		}

		toggleSlides();
	});
}

function animateMobileContentIn() {

	const bars = document.querySelector('.bars')
	const mobileNoteStyler = popmotion.styler(document.querySelector('.mobile-home-note'));
	const mobileHeaderStyler = popmotion.styler(document.getElementById('mobile-header'));

	const barStylers = Array
		.from(bars.children)
		.map(popmotion.styler)

	const barAnimations = Array(barStylers.length)
		.fill(popmotion.spring({ from: 0, to: -50}))

	setTimeout(() => {popmotion.stagger(barAnimations, 150)
		.start((v) => v.forEach((x, i) => barStylers[i].set('x', x)))}, 200);

	setTimeout(() => {popmotion.tween({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		duration: 400,
		ease: popmotion.easing.easeIn
	}).start(mobileNoteStyler.set)}, 200);

	popmotion.tween({
		from: 0,
		to: {
			y: 50
		},
		duration: 600,
		ease: popmotion.easing.easeInOut
	}).start(mobileHeaderStyler.set);

}