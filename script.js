// ── Typewriter effect ─────────────────────────────────────────────────────────

const roles = [
    'Project Quality Engineer @ Volvo Trucks',
    'Mechatronics & CS Student',
    'Embedded Systems Builder',
    'Edge AI Researcher',
];

let roleIndex = 0;
let charIndex  = 0;
let deleting   = false;

const typedEl = document.getElementById('typed-role');

function type() {
    const current = roles[roleIndex];

    if (!deleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(type, 2200);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting  = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(type, deleting ? 35 : 65);
}

type();

// ── Fade-in sections on scroll ────────────────────────────────────────────────

const observer = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once
        }
    }),
    { threshold: 0.1 }
);

document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));

// ── Highlight active nav link on scroll ───────────────────────────────────────

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    },
    { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => navObserver.observe(s));
