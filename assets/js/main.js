/*
by Beno mezazem
*/

(function () {

    //====== close hamburger after click on one menu
    document.querySelectorAll('.navbar-nav .nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navbarSupportedContent');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
        bsCollapse.hide();
        }

        // Retirer aussi la classe .active pour que l'icône redevienne un hamburger
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        }
    });
    });

    //===== close hamburger menu after click on free space 
    document.addEventListener('click', function (event) {
        const navbarCollapse = document.getElementById('navbarSupportedContent');
        const isClickInsideNavbar = navbarCollapse.contains(event.target);
        const isClickOnToggler = event.target.closest('.navbar-toggler');

        if (navbarCollapse.classList.contains('show') && !isClickInsideNavbar && !isClickOnToggler) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
            bsCollapse.hide();

            // Si tu as une animation avec .active sur le hamburger
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            }
        }
    });


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        var logo = document.querySelector('.navbar-brand img')
        if (window.pageYOffset > sticky) {
          header_navbar.classList.add("sticky");
          logo.src = 'assets/logo/logo-wesen.svg';
        } else {
          header_navbar.classList.remove("sticky");
          logo.src = 'assets/logo/logo-wesen.svg';
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

    window.document.addEventListener('scroll', onScroll);
    
    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });


    let filterButtons = document.querySelectorAll('.portfolio-btn-wrapper button');
    filterButtons.forEach(e =>
        e.addEventListener('click', () => {

            let filterValue = event.target.getAttribute('data-filter');
            iso.arrange({
                filter: filterValue
            });
        })
    );

    var elements = document.getElementsByClassName("portfolio-btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            var el = elements[0];
            while (el) {
                if (el.tagName === "BUTTON") {
                    el.classList.remove("active");
                }
                el = el.nextSibling;
            }
            this.classList.add("active");
        };
    };

    //===== mobile-menu-btn
    let navbarToggler = document.querySelector(".mobile-menu-btn");
    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle("active");
    });


})();