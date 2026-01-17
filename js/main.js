
    // Dropdown on mouse hover (Vanilla JS)
    document.addEventListener("DOMContentLoaded", function () {
        function toggleNavbarMethod() {
            const dropdowns = document.querySelectorAll(".navbar .dropdown");
        if (window.innerWidth > 992) {
            dropdowns.forEach(function (dropdown) {

                // mouseover
                dropdown._mouseoverHandler = function () {
                    const toggle = dropdown.querySelector(".dropdown-toggle");
                    if (toggle) toggle.click();
                };

                // mouseout
                dropdown._mouseoutHandler = function () {
                    const toggle = dropdown.querySelector(".dropdown-toggle");
                    if (toggle) {
                        toggle.click();
                        toggle.blur();
                    }
                };

                dropdown.addEventListener("mouseover", dropdown._mouseoverHandler);
                dropdown.addEventListener("mouseout", dropdown._mouseoutHandler);
            });

        } else {
            // remove events on small screens
            dropdowns.forEach(function (dropdown) {
                if (dropdown._mouseoverHandler) {
                    dropdown.removeEventListener("mouseover", dropdown._mouseoverHandler);
                    dropdown.removeEventListener("mouseout", dropdown._mouseoutHandler);
                }
            });
        }
    }

    toggleNavbarMethod();
    window.addEventListener("resize", toggleNavbarMethod);

    });

    document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.querySelector(".back-to-top");
    if (!backToTop) return;

    /* Show / hide button on scroll */
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";
            backToTop.style.transition = "opacity 0.6s ease";
        } else {
            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";
        }
    });

    /* Scroll to top with smooth animation */
    backToTop.addEventListener("click", function (e) {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    });

    // Service carousel 
    document.addEventListener("DOMContentLoaded", function () {
        const serviceCarousel = document.querySelector(".service-carousel");

        if (serviceCarousel && typeof jQuery !== "undefined") {
            jQuery(serviceCarousel).owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="fa fa-angle-left"></i>',
                    '<i class="fa fa-angle-right"></i>'
                ],
                responsive: {
                    0: { items: 1 },
                    576: { items: 1 },
                    768: { items: 2 },
                    992: { items: 2 }
                }
            });
        }
    });
// Portfolio Isotope
document.addEventListener("DOMContentLoaded", function () {
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== "undefined") {
        const portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        const filterButtons = document.querySelectorAll('#portfolio-flters li');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filterValue = this.getAttribute('data-filter');
                portfolioIsotope.arrange({ filter: filterValue });
            });
        });
    }
});

// Partners Carousel
document.addEventListener("DOMContentLoaded", function () {
    const partnersCarousel = document.querySelector('.partners-carousel');
    if (partnersCarousel && typeof jQuery !== "undefined") {
        jQuery(partnersCarousel).owlCarousel({
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            loop: true,
            margin: 30,
            dots: false,
            nav: false,
            responsive: {
                0: { items: 2 },
                576: { items: 3 },
                768: { items: 4 },
                992: { items: 5 }
            }
        });
    }
});

// Team Carousel
document.addEventListener("DOMContentLoaded", function () {
    const teamCarousel = document.querySelector('.team-carousel');
    if (teamCarousel && typeof jQuery !== "undefined") {
        jQuery(teamCarousel).owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    }
});

// Testimonials Carousel
window.addEventListener('load', function () {
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel && typeof jQuery !== "undefined") {
        jQuery(testimonialCarousel).owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ]
        });
    }
});

// Show/hide form based on scroll
window.addEventListener("scroll", function() {
    const quickContact = document.getElementById("quickContact");
    if (!quickContact) return;

    if (window.scrollY <= 500) {
        quickContact.style.opacity = 1;        
        quickContact.style.pointerEvents = "auto";
    } else {
        quickContact.style.opacity = 0;        
        quickContact.style.pointerEvents = "none";
    }
});

// Close form if click outside
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("quickContact");
    const form = document.getElementById("qcForm");

    if (!container || !form) return;

    let closed = false;

    // Initial hidden state
    container.style.opacity = "0";
    container.style.transform = "translateY(40px)";
    container.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    // Show once on page load
    setTimeout(() => {
        if (!closed) {
            container.style.opacity = "1";
            container.style.transform = "translateY(0)";
        }
    }, 600);

    // Click outside closes permanently
    document.addEventListener("click", function (e) {
        if (closed) return;

        if (!form.contains(e.target)) {
            closeForm();
        }
    });

    // Prevent close on inside click
    form.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    function closeForm() {
        closed = true;
        container.style.opacity = "0";
        container.style.transform = "translateY(40px)";

        // HARD STOP — prevents scroll reappearance
        setTimeout(() => {
            container.style.display = "none";
        }, 400);
    }
});

// Form submit
document.getElementById("quickContactForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
    this.reset();
});
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("waPopup");
    const button = document.querySelector(".whatsapp-float");

    // Toggle popup
    window.toggleWA = function () {
        popup.classList.toggle("show");
    };

    // Close popup when clicking outside
    document.addEventListener("click", function (e) {
        if (
            popup.classList.contains("show") &&
            !popup.contains(e.target) &&
            !button.contains(e.target)
        ) {
            popup.classList.remove("show");
        }
    });
});
