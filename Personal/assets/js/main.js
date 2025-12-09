(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '#navbar .nav-link', function (e) {
        let section = select(this.hash)
        if (section) {
            e.preventDefault()

            let navbar = select('#navbar')
            let header = select('#header')
            let sections = select('section', true)
            let navlinks = select('#navbar .nav-link', true)

            navlinks.forEach((item) => {
                item.classList.remove('active')
            })

            this.classList.add('active')

            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }

            if (this.hash == '#header') {
                header.classList.remove('header-top')
                sections.forEach((item) => {
                    item.classList.remove('section-show')
                })
                return;
            }

            if (!header.classList.contains('header-top')) {
                header.classList.add('header-top')
                setTimeout(function () {
                    sections.forEach((item) => {
                        item.classList.remove('section-show')
                    })
                    section.classList.add('section-show')
                }, 350);
            } else {
                sections.forEach((item) => {
                    item.classList.remove('section-show')
                })
                section.classList.add('section-show')
            }

            scrollto(this.hash)
        }
    }, true)

    /**
     * Activate/show sections on load with hash links
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            let initial_nav = select(window.location.hash)

            if (initial_nav) {
                let header = select('#header')
                let navlinks = select('#navbar .nav-link', true)

                header.classList.add('header-top')

                navlinks.forEach((item) => {
                    if (item.getAttribute('href') == window.location.hash) {
                        item.classList.add('active')
                    } else {
                        item.classList.remove('active')
                    }
                })

                setTimeout(function () {
                    initial_nav.classList.add('section-show')
                }, 350);

                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function (direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    /**
     * Portfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
            }, true);
        }
    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Initiate portfolio details lightbox 
     */
    const portfolioDetailsLightbox = GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Initiate Pure Counter 
     */
    new PureCounter();

    /*
    // code for the Interests section
    */
    const interestsSection = select('#interests');
    const interestItems = select('.interest-item', true);
    const interestDetails = select('.interest-details', true);
    const backLinks = select('.back-link', true);


    // Main Interests logic
    interestItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');

            // For Music, open the modal and return
            if (targetId === "#music-details") {
                const musicModal = document.getElementById('music-modal');
                if (musicModal) musicModal.style.display = 'flex';
                return;
            }

            // For Gym, open the modal and return
            if (targetId === "#gym-details") {
                const gymModal = document.getElementById('gym-modal');
                if (gymModal) gymModal.style.display = 'flex';
                return;
            }


            const targetDetails = document.querySelector(targetId);

            if (interestsSection) {
                interestsSection.style.display = 'none';
                interestsSection.classList.remove('section-show');
            }

            interestDetails.forEach(details => {
                details.style.display = 'none';
                details.classList.remove('section-show');
            });

            if (targetDetails) {
                targetDetails.style.display = 'block';
                targetDetails.classList.add('section-show');
                // If there is a swiper in this section, update it
                setTimeout(() => {
                    if (targetDetails.querySelector('.book-gallery')) {
                        if (window.bookGallerySwiper && typeof window.bookGallerySwiper.update === 'function') {
                            window.bookGallerySwiper.update();
                        }
                    }
                }, 100);
            }
        });
    });
    // Back to Interests logic
    backLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const detailsSection = link.closest('.interest-details');
            detailsSection.style.display = 'none';
            detailsSection.classList.remove('section-show');
            if (interestsSection) {
                interestsSection.style.display = 'block';
                interestsSection.classList.add('section-show');
            }
        });
    });

    // Also handle the circular back button in interest details
    const circleBackBtns = document.querySelectorAll('.circle-back-btn');
    circleBackBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const detailsSection = btn.closest('.interest-details');
            detailsSection.style.display = 'none';
            detailsSection.classList.remove('section-show');
            if (interestsSection) {
                interestsSection.style.display = 'block';
                interestsSection.classList.add('section-show');
            }
        });
    });

    // Reset Interests section when navigating
    function resetInterestsSection() {
        document.querySelectorAll('.interest-details.container').forEach(function(detail) {
            detail.style.display = 'none';
            detail.classList.remove('section-show');
        });
        if (interestsSection) {
            interestsSection.style.display = '';
            interestsSection.classList.add('section-show');
        }
    }
    document.querySelectorAll('a.nav-link[href="#interests"]').forEach(function(link) {
        link.addEventListener('click', function() {
            resetInterestsSection();
        });
    });

    // Swiper initialization (global for update)
    window.bookGallerySwiper = new Swiper('.book-gallery', {
        loop: true,
        pagination: {
            el: '.book-gallery .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.book-gallery .swiper-button-next',
            prevEl: '.book-gallery .swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            }
        }
    });
    
    /*
      <======Modal Logic======>
*/
    document.addEventListener('DOMContentLoaded', () => {
        //========for Music modal========== 
        const musicModal = document.getElementById('music-modal');
        const closeMusicModal = document.getElementById('close-music-modal');

        // --- Close Modal Logic ---
        // 1. Close modal when the close button is clicked
        if (closeMusicModal) {
            closeMusicModal.addEventListener('click', function (e) {
                e.stopPropagation(); // Stop the click event from bubbling up
                musicModal.style.display = 'none';
            });
        }

        // 2. Close modal when clicking outside the modal content
        if (musicModal) {
            musicModal.addEventListener('click', function (e) {
                // Check if the click occurred directly on the modal's background
                if (e.target === musicModal) {
                    musicModal.style.display = 'none';
                }
            });
        }

        //===========for gym modal==========
        const gymModal = document.getElementById('gym-modal');
        const closeGymModal = document.getElementById('close-gym-modal');

        // --- Close Modal Logic ---

        // 1. Close modal when the close button is clicked
        if (closeGymModal) {
            closeGymModal.addEventListener('click', function (e) {
                e.stopPropagation(); // Stop the click event from bubbling up
                gymModal.style.display = 'none';
            });
        }

        // 2. Close modal when clicking outside the modal content
        if (gymModal) {
            gymModal.addEventListener('click', function (e) {
                // Check if the click occurred directly on the modal's background
                if (e.target === gymModal) {
                    gymModal.style.display = 'none';
                }
            });
        }

    });
    // Initialize EmailJS
    emailjs.init("ALas8v3bWz0W54D8W"); // Your actual public key from EmailJS


    // Contact Form Logic
    document.addEventListener("DOMContentLoaded", () => {
        // Target form and feedback elements
        const form = document.getElementById("contact-form");     
        const successMessage = document.querySelector(".sent-message");

        // Handle form submission
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            // Native HTML validation check
            if (!form.checkValidity()) {
                form.reportValidity(); // Shows browser's built-in validation messages
                return;
            }

            // Proceed with EmailJS submission
            emailjs.sendForm("contactform_smtp", "template_1p8r2kf", form)
                .then(() => {
                    //Reset form fields
                    form.reset();
                    // Show success message
                    successMessage.style.display = "block";
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 4000);                
                })                  
        })    
        .catch(() => {
            // Step 2: Show Error Message                  
            console.error("Message failed to send.");                     
        })           
    });
})();

