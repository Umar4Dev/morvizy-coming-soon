

(function () {
    "use strict";


    const navbar = document.getElementById("navbar");
    const SCROLL_THRESHOLD = 24;

    function updateNavbarOnScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add("is-scrolled");
        } else {
            navbar.classList.remove("is-scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
    updateNavbarOnScroll(); // run once on load in case page is restored mid-scroll

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    function closeMenu() {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    }

    navToggle.addEventListener("click", toggleMenu);

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });


    const navHeight = navbar.offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            const targetPosition =
                target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        });
    });


    const fadeElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {

        fadeElements.forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    /* ------------------------------------------------------------------
       5. Footer year
       Keeps the copyright year current without manual edits.
    ------------------------------------------------------------------- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();