VCE HHD Study Website - Technology Stack & Development Practices
This document outlines the technology stack, tools, and development practices used for building the VCE HHD Study Website.

Core Client-Side Technologies
HTML5: Semantic HTML for structuring the content of the Single Page Application (SPA).

CSS3: Custom styles for layout, theming, and specific component appearances.

JavaScript (ES6+): Core logic for the SPA, including:

Client-side routing (hash-based).

Dynamic content rendering using a component-based approach (functions generating HTML strings).

Event handling and DOM manipulation.

Styling
Tailwind CSS (v3.x via CDN):

Usage: Utilized for rapid UI development through utility-first classes. Integrated via the official CDN link in index.html for ease of setup and development.

Future Consideration: For production, plan to install Tailwind CSS as a Node.js package and integrate it with PostCSS for purging unused styles and enabling advanced customization.

Custom CSS (style.css):

Used for global styles (e.g., font imports, base body styling, scrollbar styling) and for styles that are more complex or reusable than what's practical with inline Tailwind classes alone (e.g., .content-section "glossy bubble" effect, specific heading hierarchies).

Development Environment & Tools
Node.js & npm/yarn (Recommended for Local Development):

Local Server: While the SPA can run by opening index.html directly, using a Node.js based local development server is highly recommended.

Example: live-server (npm install -g live-server then run live-server in the project root).

Benefit: Provides features like live reloading, which significantly speeds up development.

Package Management (Future): npm or yarn will be used for managing development dependencies if/when we set up a build process for Tailwind, linters, or other tools.

Version Control:

Git: For tracking changes, managing branches, and version history.

GitHub/GitLab/Bitbucket: For remote repository hosting, collaboration, and potentially CI/CD in the future. (User has indicated a repo is already created).

Code Editor: Any modern code editor (e.g., VS Code, Sublime Text, Atom) with good support for HTML, CSS, and JavaScript.

Browser Developer Tools: Essential for debugging JavaScript, inspecting HTML/CSS, and monitoring network requests.

Recommended Best Practices (To be implemented/maintained)
Code Linters & Formatters:

ESLint (for JavaScript): To enforce code quality, identify potential errors, and maintain consistent JavaScript style.

Prettier (for HTML, CSS, JS, Markdown): To automatically format code for consistent styling across the project.

Benefit: Improves code readability, reduces bugs, and makes collaboration easier. Consider integrating with the code editor and as a pre-commit hook.

Modular JavaScript: Continue with the component-based functions for different views/pages to keep the JavaScript organized and maintainable.

Semantic HTML: Use HTML tags appropriately for their meaning to improve accessibility and SEO.

Accessibility (A11y): Strive to follow WCAG guidelines (e.g., keyboard navigation, sufficient color contrast, alt text for meaningful images).

Responsive Design: Ensure the website is usable and looks good on all device sizes (desktops, tablets, mobile phones). Tailwind CSS's responsive prefixes will be key here.

Clear Commit Messages: Write descriptive Git commit messages to make the project history understandable.

Content Management (Initial Approach)
HTML within JavaScript Components: Currently, page content (study notes, explanations) is embedded as HTML strings within the JavaScript component functions (e.g., Unit3Component()).

Future Consideration (if content becomes unwieldy):

Markdown Files: Writing extensive text content in Markdown (.md) files.

Static Site Generator (SSG): Tools like Eleventy, Astro, Hugo, or Jekyll could be used to compile Markdown content and templates into a static site. This separates content from presentation and can simplify content updates.

Future Enhancements & Technologies (Post-Initial Launch)
Advanced Tailwind CSS Setup: As mentioned, installing via npm and using PostCSS for purging and customization.

JavaScript Libraries (if needed): For specific complex interactivity (e.g., Chart.js for data visualization, Mermaid.js for diagrams).

Testing Frameworks: For more complex JavaScript logic, unit or integration tests might be considered (e.g., Jest, Vitest).

Deployment Platforms: Netlify, Vercel, GitHub Pages for hosting the static site, offering CI/CD capabilities.

This document serves as a living guide to the project's technical foundation and will be updated as the project evolves.