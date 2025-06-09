
// Import page components
import { HomeComponent } from './pages/HomeComponent.js';
import { Unit3Component } from './pages/Unit3Component.js';
import { Unit4Component } from './pages/Unit4Component.js';
import { AssessmentPrepComponent } from './pages/AssessmentPrepComponent.js';
import { GlossaryComponent } from './pages/GlossaryComponent.js';
import { NotFoundComponent } from './pages/NotFoundComponent.js';
import { Unit3SAC2PrepComponent } from './components/Unit3SAC2PrepComponent.js';
import { Unit3QuizComponent } from './pages/Unit3QuizComponent.js';
import { Unit3FlashcardsComponent } from './pages/Unit3FlashcardsComponent.js';
import { Unit3PracticeQuestionsComponent } from './pages/Unit3PracticeQuestionsComponent.js';
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

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden')
        ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>'
        : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';
      }
    });
  });

  if (scrollToTopBtn) {
    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.classList.remove('hidden');
      } else {
        scrollToTopBtn.classList.add('hidden');
      }
    };
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));

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
    'keyskillshub': {
      title: 'Key Skills Hub | Activities',
      description: 'Comprehensive activities for Unit 3 AoS 2 key skills.',
      component: () => {
        root.render(<KeySkillsHub />);
        return '<div id="root"></div>';
      }
    },
    'unit3-sac2-prep': {
      title: 'Unit 3 SAC 2 Prep | VCE HHD Hub',
      description: 'Interactive tools and activities for Unit 3 SAC 2 preparation, focusing on Outcome 2.',
      component: Unit3SAC2PrepComponent
    },
    'unit3-quiz': {
      title: 'Unit 3 Quiz | VCE HHD Hub',
      description: 'Self-check quiz for key Unit 3 concepts.',
      component: Unit3QuizComponent
    },
    'unit3-flashcards': {
      title: 'Unit 3 Flashcards | VCE HHD Hub',
      description: 'Interactive flashcards for Unit 3 glossary terms.',
      component: Unit3FlashcardsComponent
    },
    'unit3-practice': {
      title: 'Unit 3 Practice Questions | VCE HHD Hub',
      description: 'Sample practice questions for Unit 3 SACs.',
      component: Unit3PracticeQuestionsComponent
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

    if (appContent && typeof route.component === 'function') {
      appContent.innerHTML = route.component();
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
