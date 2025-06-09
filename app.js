// No changes needed here if it was correctly importing and calling components before.
// The key change is how Unit3SAC2PrepComponent handles its children's initialization.

// Import page components
import { HomeComponent } from './pages/HomeComponent.js';
import { Unit3Component } from './pages/Unit3Component.js';
import { Unit4Component } from './pages/Unit4Component.js';
import { AssessmentPrepComponent } from './pages/AssessmentPrepComponent.js';
import { GlossaryComponent } from './pages/GlossaryComponent.js';
import { NotFoundComponent } from './pages/NotFoundComponent.js';
// Import SAC Prep component
import { Unit3SAC2PrepComponent } from './components/Unit3SAC2PrepComponent.js';
// Import Key Skills Hub component
import KeySkillsHub from "./components/KeySkillsHub";
import ReactDOM from 'react-dom/client';


document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.nav-link'); 
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link'); 
    const currentYearSpan = document.getElementById('currentYear');
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    const defaultDescription = "A comprehensive study resource for VCE Health and Human Development students, covering Unit 3 and Unit 4, including key knowledge, assessment preparation, and a glossary of terms.";
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const hash = window.location.hash;

const root = ReactDOM.createRoot(document.getElementById("root"));
if (hash === "#keyskills") {
  root.render(<KeySkillsHub />);
}
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') ? 
                `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>` : 
                `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
            }
        });
    });

    if (scrollToTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        };
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    const routes = {
        'home': { 
            title: 'VCE HHD Study Hub | Home', 
            description: 'Welcome to the HHD Study Hub, your central resource for VCE Health and Human Development. Explore Units 3 & 4, assessment prep, and key terms.',
            component: HomeComponent 
        },
        'unit3': { 
            title: 'Unit 3: Australia\'s Health | VCE HHD Hub', 
            description: 'Explore VCE HHD Unit 3: Australia\'s Health in a Globalised World. Covers health concepts, status indicators, influencing factors, and health promotion in Australia.',
            component: Unit3Component 
        },
        'unit4': { 
            title: 'Unit 4: Global Health & Development | VCE HHD Hub', 
            description: 'VCE HHD Unit 4 placeholder: Health and Human Development in a Global Context. Content coming soon.',
            component: Unit4Component 
        },
        'assessment-prep': { 
            title: 'Assessment Prep | VCE HHD Hub', 
            description: 'Prepare for VCE HHD SACs and exams. Understand assessment structure, task types, command words, and study strategies.',
            component: AssessmentPrepComponent 
        },
        'glossary': { 
            title: 'VCE HHD Glossary | Key Terms & Definitions', 
            description: 'A comprehensive glossary of key terms and definitions for VCE Health and Human Development Units 3 and 4.',
            component: GlossaryComponent 
        },
        'unit3-sac2-prep': {
            title: 'Unit 3 SAC 2 Prep | VCE HHD Hub',
            description: 'Interactive tools and activities for Unit 3 SAC 2 preparation, focusing on Outcome 2.',
            component: Unit3SAC2PrepComponent // This function now handles its children's init
        },
        '404': { 
            title: 'Page Not Found | VCE HHD Hub', 
            description: 'The page you were looking for could not be found on the VCE HHD Study Hub.',
            component: NotFoundComponent 
        }
    };

    function navigateTo(hash) {
        const routeName = hash.startsWith('#') ? hash.substring(1) : (hash || 'home');
        const route = routes[routeName] || routes['404'];

        if (appContent) {
            appContent.innerHTML = route.component(); // This calls the main component function which returns HTML
                                                    // AND also now handles initialization of its children inside its own setTimeout/requestAnimationFrame
        }
        
        document.title = route.title;
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute('content', route.description || defaultDescription);
        }

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${routeName}` || (routeName === 'home' && (linkHref === '#home' || linkHref === '#'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        if (window.location.hash === '' || window.location.hash === '#') {
            document.querySelector('a.nav-link[href="#home"]')?.classList.add('active');
        }
        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', () => {
        navigateTo(window.location.hash);
    });

    navigateTo(window.location.hash || '#home');
});
