document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Component Functions ---
    // Each function returns an HTML string for a "page" or "view"
    // These are wrapped in a .content-section div for styling

    function HomeComponent() {
        return `
            <section class="content-section text-center">
                <h1 class="text-5xl font-bold mb-6">Welcome to the HHD Study Hub!</h1>
                <p class="text-xl mb-8">Your central resource for VCE Health and Human Development.</p>
                <img src="https://placehold.co/800x400/1e293b/e2e8f0?text=HHD+Concept+Image" alt="HHD Concept Image" class="mx-auto rounded-lg shadow-lg mb-8" onerror="this.src='https://placehold.co/800x400/1e293b/e2e8f0?text=Image+Not+Available'; this.alt='Image Not Available'">
                <p class="mb-4">This website is designed to help you navigate the complexities of the VCE HHD curriculum, starting with Unit 3 and expanding to Unit 4.</p>
                <p>Explore key knowledge, practice skills, and prepare for your assessments with our curated content.</p>
                <div class="mt-10">
                    <a href="#unit3" class="button-style">
                        Explore Unit 3
                    </a>
                </div>
            </section>
        `;
    }

    function Unit3Component() {
        return `
            <section class="content-section">
                <h1>Unit 3: Australia's Health in a Globalised World</h1>
                <p>This unit explores health and wellbeing, disease, and illness as multidimensional, dynamic, and subject to different interpretations and contexts. It examines health and wellbeing as a global concept and highlights its importance as an individual and a collective resource.</p>
                
                <h2>Area of Study 1: Understanding Health and Wellbeing</h2>
                <p>Focuses on understanding health and wellbeing, disease, and illness as complex, dynamic, and subjective concepts. Students reflect on the universality of public health goals and the increasing influence of global conditions on Australians. They develop their understanding of indicators used to measure and evaluate health status and the factors contributing to variations between population groups.</p>
                <ul>
                    <li>Concepts of health and wellbeing (physical, social, emotional, mental, spiritual)</li>
                    <li>Benefits of optimal health and wellbeing as a resource</li>
                    <li>Indicators used to measure health status (Incidence, prevalence, DALYs, etc.)</li>
                    <li>Factors contributing to variations in health status (Biological, Sociocultural, Environmental)</li>
                    <li>Contribution of specific factors: smoking, alcohol, obesity, nutrition</li>
                </ul>

                <h2>Area of Study 2: Promoting Health in Australia</h2>
                <p>Examines different approaches to public health over time, focusing on changes and strategies that have improved health outcomes. It covers the progression of public health in Australia since 1900, global influences like the Ottawa Charter, and the Australian health system's role.</p>
                <ul>
                    <li>Reasons for improvements in Australia's health status since 1900</li>
                    <li>'Old' public health, Biomedical approach, Social model of health, Ottawa Charter</li>
                    <li>Role of health promotion</li>
                    <li>Programs for Aboriginal and Torres Strait Islander Peoples' health</li>
                    <li>Initiatives for healthy eating and challenges</li>
                    <li>Australia's health system (Medicare, PHI, PBS, NDIS)</li>
                </ul>
                <p class="mt-6"><em>More detailed content and interactive elements for each Key Knowledge point will be added here.</em></p>
            </section>
        `;
    }

    function Unit4Component() {
        return `
            <section class="content-section">
                <h1>Unit 4: Health and Human Development in a Global Context</h1>
                <p>This unit examines health and human development in a global context. Students use data to investigate health status and human development in different countries. They explore factors that contribute to inequalities in health and human development outcomes between and within countries, including Australia.</p>
                <h2>Area of Study 1: Global Health and Human Development</h2>
                <p>Focuses on concepts of human development, global trends, and factors affecting health and human development globally.</p>
                 <h2>Area of Study 2: Health and the Sustainable Development Goals</h2>
                <p>Focuses on the United Nations' Sustainable Development Goals (SDGs), the work of the World Health Organization (WHO), and Australia's role in promoting global health and sustainable development.</p>
                <p class="mt-6"><em>Detailed content for Unit 4 will be added in a future phase. This is a placeholder.</em></p>
            </section>
        `;
    }

    function AssessmentPrepComponent() {
        return `
            <section class="content-section">
                <h1>Assessment Preparation</h1>
                <p>This section will provide resources and guidance to help you prepare for your School-Assessed Coursework (SACs) and the end-of-year examination.</p>
                <h2>Key Areas:</h2>
                <ul>
                    <li>Understanding SAC task types (e.g., written reports, data analysis, extended responses)</li>
                    <li>Exam structure and question styles</li>
                    <li>Tips for interpreting command words</li>
                    <li>Strategies for effective study and revision</li>
                    <li>Practice questions and sample responses (to be added)</li>
                </ul>
                <p class="mt-6"><em>Detailed guides and practice materials are coming soon!</em></p>
            </section>
        `;
    }

    function GlossaryComponent() {
        return `
            <section class="content-section">
                <h1>Glossary of Key Terms</h1>
                <p>A comprehensive list of important VCE HHD terminology will be available here. Understanding these terms is crucial for success.</p>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 class="font-semibold text-lg text-purple-300">Health and Wellbeing</h3>
                        <p class="text-sm text-slate-300 mt-1">A state of complete physical, social, emotional, mental, and spiritual existence, characterised by an equilibrium in which the individual feels happy, healthy, capable, and engaged.</p>
                    </div>
                    <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 class="font-semibold text-lg text-purple-300">DALY (Disability-Adjusted Life Year)</h3>
                        <p class="text-sm text-slate-300 mt-1">A measure of burden of disease. One DALY equals one year of healthy life lost due to premature death and time lived with illness, disease or injury.</p>
                    </div>
                    <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 class="font-semibold text-lg text-purple-300">Biomedical Model of Health</h3>
                        <p class="text-sm text-slate-300 mt-1">Focuses on the physical or biological aspects of disease and illness. It is a medical model of care practised by doctors and health professionals and is associated with the diagnosis, cure and treatment of disease.</p>
                    </div>
                    </div>
                <p class="mt-6"><em>An interactive and searchable glossary is planned.</em></p>
            </section>
        `;
    }

    function NotFoundComponent() {
        return `
            <section class="content-section text-center">
                <h1>404 - Page Not Found</h1>
                <p>Oops! The page you're looking for doesn't seem to exist.</p>
                <a href="#home" class="button-style mt-6">Go to Homepage</a>
            </section>
        `;
    }

    // --- Router Logic ---
    const routes = {
        'home': { title: 'Home | HHD Hub', component: HomeComponent },
        'unit3': { title: 'Unit 3 | HHD Hub', component: Unit3Component },
        'unit4': { title: 'Unit 4 | HHD Hub', component: Unit4Component },
        'assessment-prep': { title: 'Assessment Prep | HHD Hub', component: AssessmentPrepComponent },
        'glossary': { title: 'Glossary | HHD Hub', component: GlossaryComponent },
        '404': { title: 'Page Not Found | HHD Hub', component: NotFoundComponent }
    };

    function navigateTo(hash) {
        const routeName = hash.startsWith('#') ? hash.substring(1) : (hash || 'home');
        const route = routes[routeName] || routes['404'];

        if (appContent) {
            // Render the component's HTML into the app-content div
            appContent.innerHTML = route.component();
            document.title = route.title;
        }

        // Update active class on nav links
        navLinks.forEach(link => {
            // Handle base case for home link if hash is empty or just '#'
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${routeName}` || (routeName === 'home' && (linkHref === '#home' || linkHref === '#'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
         // Special case for initial load if hash is empty or just "#", ensure "Home" is active
        if (window.location.hash === '' || window.location.hash === '#') {
            document.querySelector('a.nav-link[href="#home"]')?.classList.add('active');
        }


        // Scroll to top of page on navigation
        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', () => {
        navigateTo(window.location.hash);
    });

    // Initial page load
    navigateTo(window.location.hash || '#home');
});
