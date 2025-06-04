document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link');
    const currentYearSpan = document.getElementById('currentYear');
    // Get the meta description tag
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    const defaultDescription = "A comprehensive study resource for VCE Health and Human Development students, covering Unit 3 and Unit 4, including key knowledge, assessment preparation, and a glossary of terms.";
const scrollToTopBtn = document.getElementById('scrollToTopBtn'); // Get the scroll to top button
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
            } else {
                mobileMenuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            }
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
// --- Scroll to Top Button Logic ---
    if (scrollToTopBtn) {
        // Show button when page is scrolled down
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        };

        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
    // --- Router Logic ---
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
            description: 'Detailed activities and strategies to prepare for your VCE HHD Unit 3 SAC 2.',
            component: Unit3SAC2PrepComponent
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
            appContent.innerHTML = route.component();
        }
        
        // Update title
        document.title = route.title;

        // Update meta description
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

const sampleSacMaterials = [
    {
        id: 'sample1',
        title: 'Sample 1: Youth Mental Health',
        question: "Analyse the impact of social media on the mental wellbeing of adolescents. Use Source A and your own knowledge.",
        stimulus: `<p><strong>Source A: The Digital Tightrope (Excerpt from a 2023 report)</strong></p>
                   <p>Adolescence is a period of significant brain development, making young people particularly susceptible to environmental influences, including the pervasive presence of social media. Platforms designed for constant engagement can foster comparison and anxiety, potentially impacting self-esteem. Furthermore, exposure to cyberbullying is a recognized risk factor for poor mental health outcomes.</p>
                   <p>However, social media can also provide avenues for connection and support, especially for marginalized youth. It allows for the formation of communities based on shared interests and experiences, which can be protective. The key challenge lies in promoting mindful usage and digital literacy.</p>`
    },
    {
        id: 'sample2',
        title: 'Sample 2: Healthy Eating Initiatives',
        question: "Evaluate the effectiveness of ONE government initiative and ONE non-government initiative aimed at promoting healthy eating in Australian youth. Use evidence to support your answer.",
        stimulus: `<p><strong>Exhibit 1: 'Go for 2&5' Campaign (Government Initiative)</strong></p>
                   <p>The 'Go for 2&5' campaign encourages Australians to consume two serves of fruit and five serves of vegetables daily. It utilizes television commercials, online resources, and school programs. While awareness of the campaign is high, recent national health surveys indicate only a marginal increase in fruit and vegetable consumption among young people over the past five years.</p>
                   <p><strong>Exhibit 2: Stephanie Alexander Kitchen Garden Program (Non-Government Initiative)</strong></p>
                   <p>This program aims to introduce pleasurable food education in primary schools. Students grow, harvest, prepare, and share fresh, seasonal food. Independent evaluations have shown participants are more willing to try new foods and have improved knowledge of healthy eating. However, the program's reach is limited by school funding and resources.</p>`
    },
    {
        id: 'sample3',
        title: 'Sample 3: Physical Activity Barriers',
        question: "Discuss the sociocultural factors that act as barriers to young people participating in regular physical activity in Australia. Refer to the provided data.",
        stimulus: `<p><strong>Figure 1: Physical Activity Levels in Australian Youth (13-17 years) by Socioeconomic Status (SES) Quintile (AIHW, 2022)</strong></p>
                   <p>[Imagine a simplified representation or description of a bar graph here showing lower participation in lower SES quintiles. For HTML, we'll use a text description:]</p>
                   <p><em>Data indicates that young people in the lowest SES quintile (Q1) have a 45% participation rate in recommended daily physical activity, compared to 75% in the highest SES quintile (Q5). Participation rates for Q2, Q3, and Q4 are 55%, 60%, and 68% respectively.</em></p>
                   <p><strong>Quote from a youth focus group:</strong> "It's hard to play sports around here if your parents can't afford the fees or the gear. Plus, the good ovals are always booked out by clubs."</p>`
    }
];

// --- Annotation Component ---
let annotationSpanCounter = 0; // Counter for unique annotation span IDs

function InteractiveAnnotationComponent() {
    // Using setTimeout to ensure DOM is ready for event listeners
    setTimeout(() => {
        const stimulusArea = document.getElementById('stimulus-content-area');
        const highlightButton = document.getElementById('highlight-btn');
        const underlineButton = document.getElementById('underline-btn');
        const commentButton = document.getElementById('comment-btn');
        let currentTooltip = null; // To manage the single tooltip

        // Deconstruction data store and input elements
        const deconstructionDataStore = {};
        const deconCommandWordsInput = document.getElementById('decon-command-words');
        const deconKeyConceptsInput = document.getElementById('decon-key-concepts');
        const deconContentAreasInput = document.getElementById('decon-content-areas');
        const deconConstraintsInput = document.getElementById('decon-constraints');

        // This component will now be managed more directly by Unit3SAC2PrepComponent for loading/saving
        // So, we'll make its core setup callable.

        const stimulusContentElement = stimulusArea.querySelector('div'); // Assuming stimulus text is in a direct child div

        const canvas = document.getElementById('annotation-canvas');
        const stimulusWrapper = document.getElementById('stimulus-wrapper');
        const toggleDrawingButton = document.getElementById('toggle-drawing-btn');
        const drawConnectorButton = document.getElementById('draw-connector-btn');
        const clearDrawingButton = document.getElementById('clear-drawing-btn');

        let ctx = null;
        let drawingModeActive = false;
        let connectorModeActive = false;
        let isDrawing = false;
        let lastX, lastY;
        let connectorPoints = [];

        if (!stimulusArea || !canvas || !stimulusWrapper) {
            console.error("Required elements for annotation/drawing component not found.");
            return;
        }

        const applyAnnotation = (styleClass) => {
            const selection = window.getSelection();
            if (!selection.rangeCount || selection.isCollapsed) return;

            const range = selection.getRangeAt(0);
            if (!stimulusArea.contains(range.commonAncestorContainer)) {
                 alert("Please select text within the stimulus content area only.");
                 return;
            }

            const span = document.createElement('span');
            span.id = `annotation-${annotationSpanCounter++}`;
            span.className = styleClass;

            // Basic handling: if selection has mixed styling, this might simplify it.
            // More complex scenarios (nested spans, partial overlaps) require more advanced logic.
            try {
                range.surroundContents(span);
            } catch (e) {
                // Fallback for complex selections that can't be simply surrounded
                // This is a basic fallback and might not cover all edge cases perfectly.
                // For instance, if selection spans across block elements.
                span.appendChild(range.extractContents());
                range.insertNode(span);
                console.warn("Complex selection, used extract/insert fallback for annotation.", e);
            }
            selection.removeAllRanges();
        };

        const addCommentToSelection = () => {
            const selection = window.getSelection();
            if (!selection.rangeCount || selection.isCollapsed) {
                alert("Please select text to comment on.");
                return;
            }

            const range = selection.getRangeAt(0);
            if (!stimulusArea.contains(range.commonAncestorContainer)) {
                 alert("Please select text within the stimulus content area only.");
                 return;
            }

            const commentText = prompt("Enter your comment:");
            if (commentText) {
                const span = document.createElement('span');
                span.id = `annotation-${annotationSpanCounter++}`;
                span.className = 'commented-text';
                span.dataset.comment = commentText;

                try {
                    range.surroundContents(span);
                } catch (e) {
                    span.appendChild(range.extractContents());
                    range.insertNode(span);
                    console.warn("Complex selection, used extract/insert fallback for comment.", e);
                }

                selection.removeAllRanges();
                addCommentEventListeners(span);
            }
        };

        const showTooltip = (event) => {
            if (currentTooltip) currentTooltip.remove(); // Remove existing tooltip

            const targetSpan = event.target.closest('.commented-text');
            if (!targetSpan || !targetSpan.dataset.comment) return;

            const comment = targetSpan.dataset.comment;
            const tooltip = document.createElement('div');
            tooltip.className = 'annotation-tooltip';
            tooltip.textContent = comment;
            document.body.appendChild(tooltip);
            currentTooltip = tooltip;

            // Position tooltip near the mouse/element
            const rect = targetSpan.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`; // 5px below the element
        };

        const hideTooltip = () => {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
        };

        const addCommentEventListeners = (element) => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
            // Could add click listener for mobile if hover is problematic
        };

        if (highlightButton) {
            highlightButton.addEventListener('click', () => applyAnnotation('highlighted-text'));
        }
        if (underlineButton) {
            underlineButton.addEventListener('click', () => applyAnnotation('underlined-text'));
        }
        if (commentButton) {
            commentButton.addEventListener('click', addCommentToSelection);
        }

        // Add event listeners to existing commented text (if any were part of initial HTML, though not in this basic setup)
        stimulusArea.querySelectorAll('.commented-text').forEach(addCommentEventListeners);

        // Event listeners for deconstruction inputs
        const setupDeconstructionEventListeners = () => {
            if (deconCommandWordsInput) {
                deconCommandWordsInput.addEventListener('input', (e) => {
                    deconstructionDataStore.commandWords = e.target.value;
                    // console.log('Deconstruction Data:', deconstructionDataStore); // For debugging
                });
            }
            if (deconKeyConceptsInput) {
                deconKeyConceptsInput.addEventListener('input', (e) => {
                    deconstructionDataStore.keyConcepts = e.target.value;
                    // console.log('Deconstruction Data:', deconstructionDataStore); // For debugging
                });
            }
            if (deconContentAreasInput) {
                deconContentAreasInput.addEventListener('input', (e) => {
                    deconstructionDataStore.contentAreas = e.target.value;
                    // console.log('Deconstruction Data:', deconstructionDataStore); // For debugging
                });
            }
            if (deconConstraintsInput) {
                deconConstraintsInput.addEventListener('input', (e) => {
                    deconstructionDataStore.constraints = e.target.value;
                    // console.log('Deconstruction Data:', deconstructionDataStore); // For debugging
                });
            }
        };
        setupDeconstructionEventListeners(); // This will be called after content is set.

        // Expose a function to re-attach comment listeners if stimulus is loaded from localStorage
        // This is a bit of a workaround for the current structure.
        // A more robust component would have a dedicated method for loading content and re-binding.
        if (typeof window.reAttachAnnotationCommentListeners !== 'function') {
            window.reAttachAnnotationCommentListeners = () => {
                const newStimulusArea = document.getElementById('stimulus-content-area');
                if (newStimulusArea) {
                    newStimulusArea.querySelectorAll('.commented-text').forEach(addCommentEventListeners);
                }
            };
        }

        const initializeCanvas = () => {
            if (canvas && stimulusArea && stimulusArea.parentElement === stimulusWrapper) { // Ensure it's the right canvas
                // Set canvas dimensions based on the scrollable content area
                // We need to ensure the stimulus content is loaded *before* this for accurate scrollHeight
                const contentDiv = stimulusArea.querySelector('div > div') || stimulusArea.querySelector('div'); // try to find the actual content wrapper
                if (contentDiv) {
                    canvas.width = contentDiv.scrollWidth;
                    canvas.height = contentDiv.scrollHeight;
                } else {
                    canvas.width = stimulusArea.scrollWidth;
                    canvas.height = stimulusArea.scrollHeight;
                }

                ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
                    ctx.lineWidth = 2;
                    ctx.lineJoin = 'round';
                    ctx.lineCap = 'round';
                } else {
                    console.error("Failed to get 2D context from canvas.");
                }
            } else {
                console.error("Canvas or stimulusArea not found for initialization");
            }
        };

        const activateDrawingMode = (activate) => {
            drawingModeActive = activate;
            if (canvas) {
                canvas.style.pointerEvents = activate ? 'auto' : 'none';
                // Ensure stimulusArea allows text interaction when drawing is off
                stimulusArea.style.userSelect = activate ? 'none' : 'auto';
            }
            if (toggleDrawingButton) {
                toggleDrawingButton.classList.toggle('bg-green-600', activate);
                toggleDrawingButton.classList.toggle('bg-red-500', !activate); // Default color if not active
                toggleDrawingButton.textContent = activate ? "Drawing ON" : "Toggle Drawing";
            }
            if (activate) {
                activateConnectorMode(false);
            }
        };

        const activateConnectorMode = (activate) => {
            connectorModeActive = activate;
            connectorPoints = [];
            if (canvas) {
                canvas.style.pointerEvents = activate ? 'auto' : 'none';
                stimulusArea.style.userSelect = activate ? 'none' : 'auto';
            }
            if (drawConnectorButton) {
                drawConnectorButton.classList.toggle('bg-green-600', activate);
                drawConnectorButton.classList.toggle('bg-blue-500', !activate); // Default color if not active
                const connectBtnText = document.getElementById('connect-nodes-btn-text');
                if (connectBtnText) connectBtnText.textContent = activate ? "Connecting (Select 2 Nodes)" : "Connect Nodes";
                if (mappingToolMessage) mappingToolMessage.textContent = activate ? "Click the first node to connect." : "";


            }
            if (activate) {
                activateDrawingMode(false);
                if (selectedNodeForConnection) { // Clear previous first selection if any
                    document.getElementById(selectedNodeForConnection)?.classList.remove('ring-2', 'ring-green-500');
                    selectedNodeForConnection = null;
                }
            } else {
                 if (mappingToolMessage) mappingToolMessage.textContent = ""; // Clear message when deactivating
            }
        };

        const draw = (e) => {
            if (!isDrawing || !drawingModeActive || !ctx) return;
            const rect = canvas.getBoundingClientRect();
            // Adjust for canvas position relative to stimulusArea's scroll position
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ctx.lineTo(x, y);
            ctx.stroke();
            [lastX, lastY] = [x, y];
        };

        const handleCanvasClick = (e) => {
            if (!connectorModeActive || !ctx) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            connectorPoints.push({ x, y });

            ctx.fillStyle = 'rgba(59, 130, 246, 0.9)'; // Brighter blue for points
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();

            if (connectorPoints.length === 2) {
                ctx.beginPath();
                ctx.moveTo(connectorPoints[0].x, connectorPoints[0].y);
                ctx.lineTo(connectorPoints[1].x, connectorPoints[1].y);
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; // Reset to default drawing color
                connectorPoints = [];
                // activateConnectorMode(false); // Optionally turn off after one connector
            }
        };

        const clearCanvas = () => {
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        if (toggleDrawingButton) {
            toggleDrawingButton.addEventListener('click', () => activateDrawingMode(!drawingModeActive));
        }
        if (drawConnectorButton) {
            drawConnectorButton.addEventListener('click', () => activateConnectorMode(!connectorModeActive));
        }
        if (clearDrawingButton) {
            clearDrawingButton.addEventListener('click', clearCanvas);
        }

        if (canvas) {
            canvas.addEventListener('mousedown', (e) => {
                if (drawingModeActive && ctx) {
                    isDrawing = true;
                    const rect = canvas.getBoundingClientRect();
                    [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                } else if (connectorModeActive) { // Allow click for connector even if not drawing mode
                    handleCanvasClick(e);
                }
            });
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', () => {
                if(drawingModeActive) isDrawing = false;
            });
            canvas.addEventListener('mouseout', () => {
                if(drawingModeActive) isDrawing = false;
            });
            // Removed canvas.addEventListener('click', handleCanvasClick); as mousedown now handles it for connector
        }

        requestAnimationFrame(initializeCanvas);

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === stimulusArea) {
                    if(canvas && stimulusArea) {
                         const oldWidth = canvas.width;
                         const oldHeight = canvas.height;
                         if (oldWidth !== stimulusArea.scrollWidth || oldHeight !== stimulusArea.scrollHeight) {
                            console.log("Stimulus area resized. Canvas dimensions updated. Drawings will be cleared.");
                            // Store drawing paths if persistence on resize is needed (complex)
                            clearCanvas(); // Clear before resize to avoid distortion if redrawing paths
                            initializeCanvas();
                         }
                    }
                }
            }
        });
        if(stimulusArea) resizeObserver.observe(stimulusArea);

    }, 0); // setTimeout with 0ms to run after current call stack, ensuring DOM elements are available.

    return `
        <div id="annotation-interface" class="p-4 bg-slate-800 rounded-lg shadow-md my-4">
            <h2 class="text-2xl font-semibold text-purple-300 mb-4">Interactive Annotation Tool</h2>

            <div id="annotation-toolbar" class="mb-4 p-2 bg-slate-700 rounded flex flex-wrap gap-2">
                <button id="highlight-btn" class="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400 text-sm">Highlight</button>
                <button id="underline-btn" class="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-400 text-sm">Underline</button>
                <button id="comment-btn" class="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-400 text-sm">Comment</button>
                <button id="toggle-drawing-btn" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 text-sm">Toggle Drawing</button>
                <button id="draw-connector-btn" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 text-sm">Draw Connector</button>
                <button id="clear-drawing-btn" class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm">Clear Drawings</button>
                {/* Clear specific annotation data button will be in Unit3SAC2PrepComponent near the dropdown */}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div id="sac-question-display" class="p-3 bg-slate-700 rounded">
                    <h4 class="text-lg font-medium text-purple-200 mb-2">Sample SAC Question:</h4>
                    <p class="text-slate-300 text-sm">Analyse the factors that influence the health and wellbeing of young people in Australia, using information from the provided sources and your own knowledge.</p>
                </div>

                <div id="sac-question-deconstruction-area" class="p-3 bg-slate-700 rounded">
                    <h4 class="text-lg font-medium text-purple-200 mb-2">Deconstruct the Question:</h4>
                    <div class="space-y-3">
                        <div>
                            <label for="decon-command-words" class="block text-xs font-medium text-slate-300 mb-1">Command Word(s):</label>
                            <input type="text" id="decon-command-words" name="decon-command-words" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Analyse, Explain, Discuss...">
                        </div>
                        <div>
                            <label for="decon-key-concepts" class="block text-xs font-medium text-slate-300 mb-1">Key Concepts:</label>
                            <textarea id="decon-key-concepts" name="decon-key-concepts" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Health and wellbeing, Young people, Factors..."></textarea>
                        </div>
                        <div>
                            <label for="decon-content-areas" class="block text-xs font-medium text-slate-300 mb-1">Required Content Areas (from Study Design):</label>
                            <textarea id="decon-content-areas" name="decon-content-areas" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Factors influencing h&w, Australia's health status..."></textarea>
                        </div>
                        <div>
                            <label for="decon-constraints" class="block text-xs font-medium text-slate-300 mb-1">Constraints/Specifics:</label>
                            <textarea id="decon-constraints" name="decon-constraints" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Use provided sources, Own knowledge, Young people in Australia..."></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div id="stimulus-wrapper" class="relative border border-slate-600 rounded">
                <canvas id="annotation-canvas" class="absolute top-0 left-0 pointer-events-none z-10"></canvas>
                <div id="stimulus-content-area" class="p-3 bg-slate-700 rounded h-64 overflow-y-auto text-slate-300 text-sm relative z-0">
                    {/* <!-- Ensure this div is focusable for scrolling if needed, or manage scroll on wrapper --> */}
                    <h4 class="text-lg font-medium text-purple-200 mb-2">Stimulus Material:</h4>
                    <p><strong>Source 1: Youth Mental Health Report Snippet (2023)</strong></p>
                <p>Recent studies indicate a growing concern regarding the mental health of young Australians. Approximately one in seven young people aged 12-17 years experience a mental disorder each year. The impact of social media, academic pressure, and societal expectations are frequently cited as significant contributors. <strong class="font-bold">Early intervention and accessible support services are crucial</strong>, yet many young individuals face barriers such as stigma, lack of awareness about available help, or long waiting lists for services.</p>
                <p>Furthermore, the transition from adolescence to adulthood presents unique challenges. Young people navigating changes in education, employment, and personal relationships may experience heightened stress and anxiety. <em class="italic">Community-based programs that foster resilience and coping skills have shown promising results</em> in mitigating some of these negative impacts.</p>
                <p><strong>Source 2: Physical Activity Guidelines Extract</strong></p>
                <p>National guidelines recommend that young people aged 13–17 years should accumulate at least 60 minutes of moderate to vigorous intensity physical activity every day. Regular physical activity is linked to improved physical health, better mental wellbeing, and enhanced cognitive function. However, current data suggests that <strong class="font-bold">only a small percentage of Australian youth are meeting these guidelines</strong>. Factors such as increased screen time, reliance on passive transport, and limited access to safe recreational spaces in some communities contribute to this trend. Encouraging participation in a variety of enjoyable physical activities is key.</p>
            </div>
            <div id="comment-display-area" class="mt-4">
                <!-- Comments might be displayed here or via tooltips -->
            </div>
        </div>
    `;
}

// --- Component Functions ---

function InteractiveMappingComponent() {
    setTimeout(() => {
        const mappingContainer = document.getElementById('mapping-tool-container');
        const nodesContainer = document.getElementById('mapping-nodes-container');
        const canvas = document.getElementById('mapping-canvas');
        const addNodeButton = document.getElementById('add-node-btn');
        const connectNodesButton = document.getElementById('connect-nodes-btn');
        // const clearConnectionsButton = document.getElementById('clear-connections-btn'); // Future

        if (!mappingContainer || !nodesContainer || !canvas || !addNodeButton || !connectNodesButton) {
            console.error("Mapping component elements not found.");
            return;
        }

        const ctx = canvas.getContext('2d');
        let nodes = [];
        let connections = [];
        let nodeIdCounter = 0;
        let selectedNodeForConnection = null;
        let connectingModeActive = false;

        const resizeCanvas = () => {
            canvas.width = mappingContainer.offsetWidth;
            canvas.height = mappingContainer.offsetHeight;
            drawConnections(); // Redraw connections when canvas resizes
        };

        const drawConnections = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#a78bfa'; // purple-400
            ctx.lineWidth = 2;
            ctx.lineCap = "round";

            connections.forEach(conn => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);

                if (fromNode && toNode) {
                    const fromElem = document.getElementById(fromNode.id);
                    const toElem = document.getElementById(toNode.id);

                    if(fromElem && toElem){
                        // Calculate center points more accurately based on actual element dimensions
                        const fromX = fromNode.x + fromElem.offsetWidth / 2;
                        const fromY = fromNode.y + fromElem.offsetHeight / 2;
                        const toX = toNode.x + toElem.offsetWidth / 2;
                        const toY = toNode.y + toElem.offsetHeight / 2;

                        ctx.beginPath();
                        ctx.moveTo(fromX, fromY);
                        ctx.lineTo(toX, toY);
                        ctx.stroke();

                        // Simple arrowhead
                        const angle = Math.atan2(toY - fromY, toX - fromX);
                        const headlen = 10; // length of head in pixels
                        ctx.beginPath();
                        ctx.moveTo(toX, toY);
                        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
                        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
                        ctx.closePath();
                        ctx.fillStyle = '#a78bfa';
                        ctx.fill();
                    }
                }
            });
        };

        const createNode = (x = 50, y = 50, content = 'New Node') => {
            nodeIdCounter++;
            const nodeId = `map-node-${nodeIdCounter}`;
            const nodeElement = document.createElement('div');
            nodeElement.id = nodeId;
            nodeElement.className = 'p-3 bg-slate-700 border border-purple-500 rounded shadow-lg absolute cursor-move min-w-[120px] min-h-[60px] text-xs text-slate-200 flex flex-col justify-center items-center';
            nodeElement.style.left = `${x}px`;
            nodeElement.style.top = `${y}px`;

            const textElement = document.createElement('div');
            textElement.contentEditable = "true";
            textElement.className = "w-full h-full outline-none focus:ring-1 focus:ring-purple-400 p-1";
            textElement.textContent = content;

            nodeElement.appendChild(textElement);
            nodesContainer.appendChild(nodeElement);

            const newNodeData = { id: nodeId, x, y, content };
            nodes.push(newNodeData);

            let isDragging = false;
            let dragOffsetX, dragOffsetY;

            nodeElement.addEventListener('mousedown', (e) => {
                // Prevent dragging when clicking on contentEditable area for editing
                if (e.target === textElement && !connectingModeActive) { // Allow selection if connecting
                    // e.stopPropagation(); // Stop mousedown from initiating drag immediately
                    return;
                }

                if (connectingModeActive) {
                    e.stopPropagation(); // Prevent drag while in connect mode
                    if (selectedNodeForConnection === null) {
                        selectedNodeForConnection = nodeId;
                        nodeElement.classList.add('ring-2', 'ring-green-500'); // Visual cue
                    } else if (selectedNodeForConnection !== nodeId) {
                        connections.push({ from: selectedNodeForConnection, to: nodeId });
                        document.getElementById(selectedNodeForConnection)?.classList.remove('ring-2', 'ring-green-500');
                        selectedNodeForConnection = null;
                        // connectingModeActive = false; // Optionally turn off after one connection
                        // connectNodesButton.classList.remove('bg-green-600');
                        // connectNodesButton.classList.add('hover:bg-blue-400');
                        drawConnections();
                    }
                    return;
                }

                isDragging = true;
                // Calculate offset from top-left of node to mouse click
                dragOffsetX = e.clientX - nodeElement.getBoundingClientRect().left;
                dragOffsetY = e.clientY - nodeElement.getBoundingClientRect().top;
                nodeElement.classList.add('shadow-xl', 'border-purple-300');
                e.preventDefault(); // Prevent text selection during drag
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                let newX = e.clientX - mappingContainer.getBoundingClientRect().left - dragOffsetX;
                let newY = e.clientY - mappingContainer.getBoundingClientRect().top - dragOffsetY;

                // Boundary checks
                newX = Math.max(0, Math.min(newX, mappingContainer.offsetWidth - nodeElement.offsetWidth));
                newY = Math.max(0, Math.min(newY, mappingContainer.offsetHeight - nodeElement.offsetHeight));

                nodeElement.style.left = `${newX}px`;
                nodeElement.style.top = `${newY}px`;
                newNodeData.x = newX;
                newNodeData.y = newY;
                drawConnections();
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    nodeElement.classList.remove('shadow-xl', 'border-purple-300');
                }
            });

            textElement.addEventListener('blur', () => {
                newNodeData.content = textElement.textContent;
            });
             textElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) { // Enter to finish editing, Shift+Enter for newline
                    e.preventDefault();
                    textElement.blur();
                }
            });
        };

        addNodeButton.addEventListener('click', () => createNode());

        connectNodesButton.addEventListener('click', () => {
            connectingModeActive = !connectingModeActive;
            connectNodesButton.classList.toggle('bg-green-600', connectingModeActive);
            connectNodesButton.classList.toggle('hover:bg-blue-400', !connectingModeActive);
            if (!connectingModeActive && selectedNodeForConnection) { // Clear selection if mode is turned off
                document.getElementById(selectedNodeForConnection)?.classList.remove('ring-2', 'ring-green-500');
                selectedNodeForConnection = null;
            }
        });

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas); // Adjust canvas on window resize

        // Create a couple of initial nodes for demonstration
        createNode(50, 50, "Central Idea");
        createNode(250, 150, "Related Concept");

        // --- TEEL Planner Logic ---
        const teelParagraphsContainer = document.getElementById('teel-paragraphs-container');
        const addTeelParagraphButton = document.getElementById('add-teel-paragraph-btn');
        const removeTeelParagraphButton = document.getElementById('remove-teel-paragraph-btn');
        const mappingToolMessage = document.getElementById('mapping-tool-message');
        const clearMappingDataButton = document.getElementById('clear-mapping-data-btn');

        let teelPlanData = [];

        const MAPPING_STORAGE_KEY = 'mappingToolData_v1';

        const showMappingMessage = (message, duration = 3000) => {
            if(mappingToolMessage) {
                mappingToolMessage.textContent = message;
                if (duration > 0) { // Allow indefinite messages if duration is 0 or less
                    setTimeout(() => {
                        if(mappingToolMessage && mappingToolMessage.textContent === message) mappingToolMessage.textContent = '';
                    }, duration);
                }
            }
        };

        const saveMappingData = () => {
            const dataToSave = {
                nodes: nodes,
                connections: connections,
                teelPlan: teelPlanData,
                nodeIdCounter: nodeIdCounter
            };
            try {
                localStorage.setItem(MAPPING_STORAGE_KEY, JSON.stringify(dataToSave));
                // showMappingMessage("Progress saved!", 1500); // Can be too noisy, enable for debugging
            } catch (error) {
                console.error("Error saving mapping data to local storage:", error);
                showMappingMessage("Error saving data. Storage might be full.", 5000);
            }
        };

        const loadMappingData = () => {
            const savedData = localStorage.getItem(MAPPING_STORAGE_KEY);
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    nodes = data.nodes || []; // Assign loaded nodes directly

                    // Recreate DOM elements for nodes
                    nodesContainer.innerHTML = ''; // Clear any existing DOM nodes first
                    nodes.forEach(nodeData => {
                        // Call a modified createNode or directly create and setup node elements here
                        // For now, assuming createNode can handle being called with full data
                        // This needs createNode to be refactored to not auto-push to 'nodes' if loading
                        recreateNodeElement(nodeData);
                    });

                    connections = data.connections || [];
                    teelPlanData = data.teelPlan || [];
                    nodeIdCounter = data.nodeIdCounter || 0;

                    drawConnections();
                    renderTeelParagraphs(); // This will populate TEEL and attach its listeners
                    showMappingMessage("Saved data loaded.", 2000);
                    return true;
                } catch (e) {
                    console.error("Error parsing saved mapping data:", e);
                    localStorage.removeItem(MAPPING_STORAGE_KEY);
                    return false;
                }
            }
            return false;
        };

        const clearAllMappingData = () => {
            if (confirm("Are you sure you want to clear all your saved mapping and TEEL plan data? This cannot be undone.")) {
                localStorage.removeItem(MAPPING_STORAGE_KEY);
                nodes = [];
                connections = [];
                teelPlanData = [];
                nodeIdCounter = 0;
                nodesContainer.innerHTML = '';
                drawConnections();
                renderTeelParagraphs();
                // Add back default nodes after clearing
                originalCreateNode(50, 50, "Central Idea");
                originalCreateNode(250, 150, "Related Concept");
                showMappingMessage("All mapping data cleared.", 2000);
            }
        };

        if(clearMappingDataButton) {
            clearMappingDataButton.addEventListener('click', clearAllMappingData);
        }

        const renderTeelParagraphs = () => {
            if (!teelParagraphsContainer) return;
            teelParagraphsContainer.innerHTML = ''; // Clear existing paragraphs

            if (teelPlanData.length === 0) {
                teelParagraphsContainer.innerHTML = '<p class="text-slate-400 text-sm italic">No TEEL paragraphs added yet. Click "Add Paragraph" to start planning.</p>';
            }

            teelPlanData.forEach((paraData, index) => {
                const paraNumber = index + 1;
                const paraBlock = document.createElement('div');
                paraBlock.className = 'teel-paragraph-block mb-4 p-3 border border-slate-600 rounded-lg bg-slate-700/50';
                paraBlock.innerHTML = `
                    <h4 class="text-lg font-semibold text-purple-200 mb-2 flex justify-between items-center">
                        <span>Paragraph <span class="paragraph-number">${paraNumber}</span></span>
                    </h4>
                    <div class="space-y-2">
                        <div><label class="block text-xs font-medium text-slate-300">Topic Sentence:</label><textarea data-index="${index}" data-field="topicSentence" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200" rows="2">${paraData.topicSentence}</textarea></div>
                        <div><label class="block text-xs font-medium text-slate-300">Evidence:</label><textarea data-index="${index}" data-field="evidence" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200" rows="3">${paraData.evidence}</textarea></div>
                        <div><label class="block text-xs font-medium text-slate-300">Explanation:</label><textarea data-index="${index}" data-field="explanation" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200" rows="4">${paraData.explanation}</textarea></div>
                        <div><label class="block text-xs font-medium text-slate-300">Link:</label><textarea data-index="${index}" data-field="link" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200" rows="2">${paraData.link}</textarea></div>
                    </div>
                `;
                teelParagraphsContainer.appendChild(paraBlock);
            });

            // Add event listeners to all textareas
            teelParagraphsContainer.querySelectorAll('.teel-input').forEach(textarea => {
                textarea.addEventListener('input', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    const field = e.target.dataset.field;
                    if (teelPlanData[index]) {
                        teelPlanData[index][field] = e.target.value;
                        saveMappingData(); // Save on change
                    }
                });
            });
        };

        // Renamed original createNode to make a new one that saves
        const internalCreateNodeSetup = (x = 50, y = 50, content = 'New Node', existingId = null) => {
            const nodeId = existingId || `map-node-${++nodeIdCounter}`;
            if(!existingId) { // only increment if it's a truly new node not from load
                 // Ensure nodeIdCounter is always ahead of any loaded IDs
                const numericId = parseInt(nodeId.split('-')[2]);
                if (numericId > nodeIdCounter) nodeIdCounter = numericId;
            }


            const nodeElement = document.createElement('div');
            nodeElement.id = nodeId;
            nodeElement.className = 'p-3 bg-slate-700 border border-purple-500 rounded shadow-lg absolute cursor-move min-w-[120px] min-h-[60px] text-xs text-slate-200 flex flex-col justify-center items-center';
            nodeElement.style.left = `${x}px`;
            nodeElement.style.top = `${y}px`;

            const textElement = document.createElement('div');
            textElement.contentEditable = "true";
            textElement.className = "w-full h-full outline-none focus:ring-1 focus:ring-purple-400 p-1";
            textElement.textContent = content;

            nodeElement.appendChild(textElement);
            nodesContainer.appendChild(nodeElement);

            const newNodeData = { id: nodeId, x, y, content };

            // If loading, nodes array is already populated. Only add if it's a new node.
            const existingNodeIndex = nodes.findIndex(n => n.id === nodeId);
            if (existingNodeIndex === -1) {
                 nodes.push(newNodeData);
            } else {
                // If recreating (e.g. from load), ensure the data in 'nodes' array is the one we use
                // and update it if necessary, though it should match nodeData from load.
                nodes[existingNodeIndex] = newNodeData;
            }

            attachNodeEventListeners(nodeElement, newNodeData, textElement);
            return newNodeData;
        };

        recreateNodeElement = (nodeData) => { // Used by loadMappingData
            internalCreateNodeSetup(nodeData.x, nodeData.y, nodeData.content, nodeData.id);
        };

        const attachNodeEventListeners = (nodeElement, nodeData, textElement) => {
            let isDragging = false;
            let dragOffsetX, dragOffsetY;

            nodeElement.addEventListener('mousedown', (e) => {
                if (e.target === textElement && !connectingModeActive) return;
                if (connectingModeActive) {
                    e.stopPropagation();
                    if (selectedNodeForConnection === null) {
                        selectedNodeForConnection = nodeData.id;
                        nodeElement.classList.add('ring-2', 'ring-green-500');
                        showMappingMessage("Node 1 selected. Click another node to connect.", 0);
                    } else if (selectedNodeForConnection !== nodeData.id) {
                         const connExists = connections.some(c => (c.from === selectedNodeForConnection && c.to === nodeData.id) || (c.from === nodeData.id && c.to === selectedNodeForConnection));
                        if (!connExists) {
                            connections.push({ from: selectedNodeForConnection, to: nodeData.id });
                            saveMappingData();
                        } else {
                            showMappingMessage("Connection already exists.", 2000);
                        }
                        document.getElementById(selectedNodeForConnection)?.classList.remove('ring-2', 'ring-green-500');
                        selectedNodeForConnection = null;
                        // Deactivate connector mode after a successful connection
                        activateConnectorMode(false);
                        drawConnections();
                    }
                    return;
                }
                isDragging = true;
                dragOffsetX = e.clientX - nodeElement.getBoundingClientRect().left;
                dragOffsetY = e.clientY - nodeElement.getBoundingClientRect().top;
                nodeElement.classList.add('shadow-xl', 'border-purple-300', 'z-20');
                e.preventDefault();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                let newX = e.clientX - mappingContainer.getBoundingClientRect().left - dragOffsetX;
                let newY = e.clientY - mappingContainer.getBoundingClientRect().top - dragOffsetY;
                newX = Math.max(0, Math.min(newX, mappingContainer.offsetWidth - nodeElement.offsetWidth));
                newY = Math.max(0, Math.min(newY, mappingContainer.offsetHeight - nodeElement.offsetHeight));
                nodeElement.style.left = `${newX}px`;
                nodeElement.style.top = `${newY}px`;
                nodeData.x = newX;
                nodeData.y = newY;
                drawConnections();
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    nodeElement.classList.remove('shadow-xl', 'border-purple-300', 'z-20');
                    saveMappingData();
                }
            });

            textElement.addEventListener('blur', () => {
                nodeData.content = textElement.textContent; // nodeData is a direct reference to an object in 'nodes'
                saveMappingData();
            });
            textElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    textElement.blur(); // Which will trigger save
                }
            });
        };

        createNode = (x = 50, y = 50, content = 'New Node') => {
            internalCreateNodeSetup(x,y,content);
            saveMappingData();
        }


        if (addTeelParagraphButton) {
            addTeelParagraphButton.addEventListener('click', () => {
                teelPlanData.push({ topicSentence: '', evidence: '', explanation: '', link: '' });
                renderTeelParagraphs();
                saveMappingData();
            });
        }

        if (removeTeelParagraphButton) {
            removeTeelParagraphButton.addEventListener('click', () => {
                if (teelPlanData.length > 0) {
                    teelPlanData.pop();
                    renderTeelParagraphs();
                    saveMappingData();
                }
            });
        }

        // Initial Load or Setup
        if (!loadMappingData()) {
            renderTeelParagraphs();
            createNode(50, 50, "Central Idea");
            createNode(250, 150, "Related Concept");
            // saveMappingData(); // Save this default state if desired
        }


    }, 0);

    return `
        <div id="mapping-tool-wrapper" class="p-4 bg-slate-800 rounded-lg shadow-md my-4">
            <h2 class="text-2xl font-semibold text-purple-300 mb-4">Interactive Relationship Mapping & Planning Tool</h2>
            <div id="mapping-toolbar" class="mb-2 flex space-x-2">
                <button id="add-node-btn" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-400 text-sm">Add Node</button>
                <button id="connect-nodes-btn" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 text-sm">Connect Nodes</button>
                {/* <button id="clear-connections-btn" class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-400 text-sm">Clear Connections</button> */}
            </div>
            <div id="mapping-tool-container" class="relative w-full h-[500px] border border-slate-600 rounded-lg bg-slate-800/50 overflow-hidden mb-6">
                <canvas id="mapping-canvas" class="absolute top-0 left-0 w-full h-full z-0"></canvas>
                <div id="mapping-nodes-container" class="absolute top-0 left-0 w-full h-full z-10">
                    {/* Nodes will be appended here */}
                </div>
            </div>

            <div id="teel-planner-section" class="p-4 bg-slate-800/70 rounded-lg shadow-inner mt-6 border border-slate-700">
                <h3 class="text-xl font-semibold text-purple-300 mb-3">TEEL Paragraph Planner</h3>
                <div id="teel-toolbar" class="mb-3 flex space-x-2">
                    <button id="add-teel-paragraph-btn" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-400 text-sm">Add Paragraph</button>
                    <button id="remove-teel-paragraph-btn" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 text-sm">Remove Last Paragraph</button>
                </div>
                <div id="teel-paragraphs-container" class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {/* TEEL paragraph blocks will be rendered here */}
                </div>
            </div>
        </div>
    `;
}

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

function Unit3SAC2PrepComponent() {
    // Using setTimeout to ensure this runs after the main DOM of Unit3SAC2PrepComponent is potentially rendered by the router.
    setTimeout(() => {
        const selectElement = document.getElementById('sample-material-select');
        const annotationContainer = document.getElementById('annotation-component-container');
        const mappingContainer = document.getElementById('mapping-component-container');
        const clearSampleAnnotationsButton = document.getElementById('clear-sample-annotations-btn'); // Added button

        if (!selectElement || !annotationContainer || !mappingContainer || !clearSampleAnnotationsButton) {
            console.error("Required elements for Unit3SAC2PrepComponent not fully found.");
            return;
        }

        const ANNOTATION_STORAGE_KEY_PREFIX = 'annotationData_';

        // Populate dropdown only if it's empty
        if (selectElement.options.length === 0) {
            sampleSacMaterials.forEach(sample => {
                const option = document.createElement('option');
                option.value = sample.id;
                option.textContent = sample.title;
                selectElement.appendChild(option);
            });
        }

        const saveCurrentAnnotationData = () => {
            const currentSampleId = selectElement.value;
            if (!currentSampleId) return;

            const deconstructionData = {};
            const deconInputs = { // Assuming these IDs are within the rendered InteractiveAnnotationComponent
                commandWords: document.getElementById('decon-command-words'),
                keyConcepts: document.getElementById('decon-key-concepts'),
                contentAreas: document.getElementById('decon-content-areas'),
                constraints: document.getElementById('decon-constraints')
            };
            for (const key in deconInputs) {
                if (deconInputs[key]) deconstructionData[key] = deconInputs[key].value;
            }

            const stimulusContentArea = document.getElementById('stimulus-content-area');
            // Find the actual div holding the stimulus paragraphs, not the scroll container itself.
            // This assumes a structure like: <div id="stimulus-content-area"><h4>...</h4><div> paragraphs... </div></div>
            const stimulusHTMLHolder = stimulusContentArea ? stimulusContentArea.querySelector('div') : null;
            const stimulusHTML = stimulusHTMLHolder ? stimulusHTMLHolder.innerHTML : "";

            const dataToSave = {
                deconstruction: deconstructionData,
                stimulusHTMLWithAnnotations: stimulusHTML,
                // Not saving canvas drawings for now.
            };
            try {
                localStorage.setItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId, JSON.stringify(dataToSave));
            } catch (e) {
                console.error("Error saving annotation data:", e);
            }
        };

        const loadAnnotationToolWithContent = (sampleId, isLoadingFromStorage = false) => {
            const selectedSample = sampleSacMaterials.find(s => s.id === sampleId);
            if (!selectedSample) {
                console.error("Selected sample not found for loading:", sampleId);
                return;
            }

            // Render the annotation component's base HTML
            // This will effectively reset the annotation component including its internal state like deconstructionDataStore
            annotationContainer.innerHTML = InteractiveAnnotationComponent();

           
            if (!isLoadingFromStorage) { // Only inject component HTML if not just loading from storage into existing
                 annotationContainer.innerHTML = InteractiveAnnotationComponent();
            }

            setTimeout(() => {
                const questionDisplayP = document.querySelector('#sac-question-display p');
                const stimulusContainer = document.getElementById('stimulus-content-area');

                if (questionDisplayP) {
                    questionDisplayP.textContent = selectedSample.question;
                } else {
                    const qd = document.getElementById('sac-question-display');
                    if(qd) qd.innerHTML = `<h4 class="text-lg font-medium text-purple-200 mb-1">Sample SAC Question:</h4><p class="text-slate-300 text-sm">${selectedSample.question}</p>`;
                }

                // Prepare stimulus display area
                let stimulusHTMLHolder;
                if (stimulusContainer) {
                    let headingToPreserve = stimulusContainer.querySelector('h4');
                    stimulusContainer.innerHTML = '';
                    if (headingToPreserve) {
                        stimulusContainer.appendChild(headingToPreserve);
                    } else {
                        const newHeading = document.createElement('h4');
                        newHeading.className = "text-lg font-medium text-purple-200 mb-2";
                        newHeading.textContent = "Stimulus Material:";
                        stimulusContainer.appendChild(newHeading);
                    }
                    stimulusHTMLHolder = document.createElement('div'); // Create the actual holder for stimulus
                    stimulusContainer.appendChild(stimulusHTMLHolder);
                } else {
                    console.error("Stimulus content area not found for sample loading.");
                    return; // Stop if stimulus area is missing
                }


                // Load from localStorage or use default sample stimulus
                const savedDataRaw = localStorage.getItem(ANNOTATION_STORAGE_KEY_PREFIX + sampleId);
                let savedData;
                if (savedDataRaw) {
                    try { savedData = JSON.parse(savedDataRaw); } catch(e) { console.error("Error parsing saved annotation data:", e); }
                }

                if (savedData && savedData.stimulusHTMLWithAnnotations) {
                    stimulusHTMLHolder.innerHTML = savedData.stimulusHTMLWithAnnotations;
                } else {
                    stimulusHTMLHolder.innerHTML = selectedSample.stimulus; // Default
                }

                // Repopulate deconstruction fields
                const deconstructionInputsIds = ['decon-command-words', 'decon-key-concepts', 'decon-content-areas', 'decon-constraints'];
                deconstructionInputsIds.forEach(id => {
                    const input = document.getElementById(id);
                    if (input) {
                        input.value = (savedData && savedData.deconstruction && savedData.deconstruction[id.substring(6)]) ? savedData.deconstruction[id.substring(6)] : '';
                        // Add event listener to save on input for these fields
                        input.removeEventListener('input', saveCurrentAnnotationData); // Avoid duplicates
                        input.addEventListener('input', saveCurrentAnnotationData);
                    }
                });

                // Re-attach listeners for comments if loaded from storage
                if (typeof window.reAttachAnnotationCommentListeners === 'function') {
                    window.reAttachAnnotationCommentListeners();
                }
                 // Add listeners to annotation buttons to save data after action
                ['highlight-btn', 'underline-btn', 'comment-btn'].forEach(btnId => {
                    const btn = document.getElementById(btnId);
                    if (btn) {
                        // Remove listener before adding to prevent duplicates if this function is called multiple times
                        // This is a temporary fix; ideally, listeners are managed more centrally.
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);
                        newBtn.addEventListener('click', () => setTimeout(saveCurrentAnnotationData, 50)); // Delay to allow action to complete
                    }
                });


                // Clear and re-initialize canvas
                const canvas = document.getElementById('annotation-canvas');
                if (canvas && canvas.getContext) {
                    const ctx = canvas.getContext('2d');
                    if(ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const stimulusAreaForCanvas = document.getElementById('stimulus-content-area');
                    const contentDiv = stimulusAreaForCanvas ? (stimulusAreaForCanvas.querySelector('div > div') || stimulusAreaForCanvas.querySelector('div')) : null;
                    if (contentDiv) {
                        canvas.width = contentDiv.scrollWidth;
                        canvas.height = contentDiv.scrollHeight;
                    } else if (stimulusAreaForCanvas) {
                        canvas.width = stimulusAreaForCanvas.scrollWidth;
                        canvas.height = stimulusAreaForCanvas.scrollHeight;
                    }
                }
                 // Ensure drawing mode is off by default
                const toggleDrawingBtn = document.getElementById('toggle-drawing-btn');
                if (toggleDrawingBtn && toggleDrawingBtn.classList.contains('bg-green-600')) { // If drawing was ON
                    toggleDrawingBtn.click(); // Simulate click to turn it OFF
                }
                 const connectNodesBtn = document.getElementById('draw-connector-btn'); // Annotation component uses 'draw-connector-btn'
                 if (connectNodesBtn && connectNodesBtn.classList.contains('bg-green-600')) { // If connecting was ON
                     connectNodesBtn.click();
                 }


            }, 50);
        };

        const newSelectElement = selectElement.cloneNode(true);
        selectElement.parentNode.replaceChild(newSelectElement, selectElement);

        newSelectElement.addEventListener('change', (event) => {
            loadAnnotationToolWithContent(event.target.value);
        });

        clearSampleAnnotationsButton.addEventListener('click', () => {
            const currentSampleId = newSelectElement.value;
            if (currentSampleId && confirm(`Are you sure you want to clear your saved annotations and deconstruction for "${sampleSacMaterials.find(s=>s.id===currentSampleId)?.title}"?`)) {
                localStorage.removeItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId);
                loadAnnotationToolWithContent(currentSampleId); // Reload to show clean version
            }
        });

        if (sampleSacMaterials.length > 0) {
            // Check if there's a previously selected sample ID in sessionStorage or a default
            let initialSampleId = sessionStorage.getItem('lastSelectedAnnotationSampleId') || sampleSacMaterials[0].id;
            if (!sampleSacMaterials.find(s => s.id === initialSampleId)) { // if stored id is invalid
                initialSampleId = sampleSacMaterials[0].id;
            }
            newSelectElement.value = initialSampleId;
            loadAnnotationToolWithContent(initialSampleId, true); // true to indicate it might be loading from storage

            // Save last selected sample to session storage to persist across page reloads (but not browser close)
            newSelectElement.addEventListener('change', (event) => {
                 sessionStorage.setItem('lastSelectedAnnotationSampleId', event.target.value);
                 loadAnnotationToolWithContent(event.target.value);
            });
        }

        if (mappingContainer && !mappingContainer.hasChildNodes()) {
            mappingContainer.innerHTML = InteractiveMappingComponent();
        }

    }, 0);

    return `
        <section id="unit3-sac2-prep" class="content-section">
            <h2 class="text-3xl font-bold text-purple-400 mb-6 text-center">Unit 3 SAC 2 Preparation</h2>
            <p class="text-center text-slate-400 mb-8">This section provides structured activities and tools to help you prepare for your Unit 3 SACs, particularly focusing on question deconstruction and stimulus annotation.</p>

            <article id="interactive-activity-1" class="mb-8 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Interactive Activity: SAC Annotation Practice</h3>
                <p class="mb-4 text-slate-300">Select a sample SAC material below, then use the annotation tools to practice deconstructing the question and annotating the stimulus. Your work for each sample is saved locally in your browser.</p>

                <div id="sample-loader-controls" class="mb-4 p-3 bg-slate-800 rounded-lg flex flex-wrap gap-2 items-center">
                    <div>
                        <label for="sample-material-select" class="block text-sm font-medium text-slate-200 mb-1">Select Sample Material:</label>
                        <select id="sample-material-select" class="w-full md:w-auto p-2 bg-slate-600 border border-slate-500 rounded text-slate-200 focus:border-purple-500 focus:ring-purple-500">
                            {/* Options will be populated by JavaScript */}
                        </select>
                    </div>
                    <button id="clear-sample-annotations-btn" class="self-end px-3 py-2 bg-red-700 text-white rounded hover:bg-red-600 text-sm">Clear Saved Work for this Sample</button>
                </div>

                <div id="annotation-component-container">
                    {/* InteractiveAnnotationComponent will be rendered here */}
                </div>
            </article>

            <article id="interactive-activity-2" class="mt-12 mb-8 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Interactive Activity 2: Relationship Mapping & TEEL Planning</h3>
                <p class="mb-4 text-slate-300">Use the tools below to create visual maps of relationships between key concepts from the stimulus or your own knowledge, and then structure your arguments using the TEEL paragraph planner.</p>
                <div id="mapping-component-container">
                    {/* InteractiveMappingComponent will be rendered here */}
                </div>
            </article>

            {/* Original static content articles are below, but could be integrated or removed if this tool replaces them */}
            {/*
            <article class="mb-8 p-6 bg-slate-800 rounded-lg shadow">
                <h3 class="text-2xl font-semibold text-purple-300 mb-4">Activity 1: The "Full Practice SAC Simulation &amp; Deconstruction"</h3>
                <p class="mb-3 text-slate-300">This is the most direct practice of the SAC task.</p>
                <h4 class="text-xl font-medium text-purple-200 mb-2">How to do it:</h4>
                <ol class="list-decimal list-inside space-y-2 text-slate-300">
                    <li>
                        <strong>Source Practice Questions &amp; Stimuli:</strong> Obtain practice SAC questions or extended response questions that include multiple sources (stimuli) related to Unit 3 AOS 1 content. These can come from your textbook, practice SAC packs, past VCAA exams (be mindful of study design changes, but the skill is transferable), or resources like ATAR Notes or Health Resources Hub materials. Ensure the stimuli are varied (data, text excerpts, images, case studies).
                    </li>
                    <li>
                        <strong>Set the Scene:</strong> Simulate SAC conditions as much as possible (timed, limited resources). For a 50-mark SAC, this might be around 1 hour 45 minutes, potentially split into annotation/planning and writing.
                    </li>
                    <li>
                        <strong>Active Question Deconstruction:</strong> Before looking at sources, read the question carefully. Actively break it down by highlighting or underlining command words (analyse, discuss, explain, evaluate, justify), key concepts (health status, burden of disease, specific factors, population groups, models of health), and explicit requirements (e.g., "using information from sources A, B, and C," "using your own knowledge," "analyse two factors"). Create a checklist of everything the response must include.
                    </li>
                    <li>
                        <strong>Active Stimuli Annotation &amp; Linking:</strong> Read each source. Actively annotate it. Circle or highlight information relevant to your question checklist. Use different colours for different checklist items if it helps. Crucially, write notes on the stimuli or a separate planning sheet showing explicit links you see:
                        <ul class="list-disc list-inside pl-6 space-y-1 mt-1">
                            <li>Between Source A and Source B (e.g., "Source B's explanation aligns with the trend shown in Source A's data").</li>
                            <li>Between a source and your own knowledge (e.g., "Source C mentions SES, which links to my knowledge of how income impacts access to healthcare").</li>
                            <li>Between sources and the question's requirements (e.g., "Source D provides data on life expectancy, which is a key health status indicator required by the question").</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Active Planning (Synthesis Focus):</strong> Use your deconstructed question and annotated sources to create a detailed response plan. This is where synthesis happens on paper. For each planned paragraph (using a structure like TEEL), note:
                        <ul class="list-disc list-inside pl-6 space-y-1 mt-1">
                            <li>The main point (Topic Sentence).</li>
                            <li>Which specific information from which sources you will use as evidence (e.g., "Source A, para 2; Source C, Figure 1"). Explicitly plan to use multiple sources together if they relate.</li>
                            <li>How you will use your own knowledge to explain, elaborate on, or link the source information to HHD concepts and the question. Plan how you will explain the relationship between the source info and your own knowledge/the question.</li>
                            <li>How you will link back to the question.</li>
                            <li>Ensure your plan explicitly incorporates the relationships you identified in step 4.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Write the Response:</strong> Write your extended response, following your detailed plan. Focus on clear language, accurate HHD terminology, and seamlessly integrating information from sources (citing them) and your own knowledge.
                    </li>
                    <li>
                        <strong>Active Review &amp; Refine:</strong> After writing, go back to your checklist from step 3. Did you include everything? Read through your response specifically looking for where you used sources, where you used your own knowledge, and critically assess if you demonstrated synthesis – did you just mention sources, or did you weave them together and use your knowledge to explain why the information matters in relation to the question?. Identify areas for improvement.
                    </li>
                </ol>
            </article>

            <article class="mb-8 p-6 bg-slate-800 rounded-lg shadow">
                <h3 class="text-2xl font-semibold text-purple-300 mb-4">Activity 2: The "Stimuli Relationship Mapping" Sprint</h3>
                <p class="mb-3 text-slate-300">This activity isolates and focuses specifically on the crucial analysis and synthesis step.</p>
                <h4 class="text-xl font-medium text-purple-200 mb-2">How to do it:</h4>
                <ol class="list-decimal list-inside space-y-2 text-slate-300">
                    <li>
                        <strong>Gather Stimuli &amp; Question:</strong> Use the same types of materials as Activity 1, but perhaps focus on shorter sets (e.g., 2-3 sources) and a specific section of a question.
                    </li>
                    <li>
                        <strong>Focus on Relationships:</strong> Give yourself a shorter time limit (e.g., 20-30 minutes). Your only task is to read the question and stimuli and map out the relationships between them.
                    </li>
                    <li>
                        <strong>Visual Mapping:</strong> Use a large sheet of paper or a digital tool. Draw the question in the centre. Draw each source around it. Draw lines connecting:
                        <ul class="list-disc list-inside pl-6 space-y-1 mt-1">
                            <li>Sources to the question (indicating what information from that source is relevant to which part of the question).</li>
                            <li>Sources to other sources (indicating connections or contrasts in information).</li>
                            <li>Sources to relevant areas of your own knowledge (e.g., "Source A [data] -&gt; My Knowledge [definition of the indicator, relevant factor theory]").</li>
                            <li>Write brief notes on the lines or next to the sources/knowledge points explaining the nature of the relationship (e.g., "Source B explains why data in Source A looks like this").</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Verbal Explanation:</strong> After mapping, verbally explain the map to yourself, a study partner, or even record it. Articulate how the sources relate to each other and the question, and how your own knowledge fits in. This reinforces the synthesis thinking process.
                    </li>
                </ol>
            </article>

            <article class="mb-8 p-6 bg-slate-800 rounded-lg shadow">
                <h3 class="text-2xl font-semibold text-purple-300 mb-4">Activity 3: The "Factor-Condition-Population Link Chain"</h3>
                <p class="mb-3 text-slate-300">This activity helps solidify the links between factors, specific health outcomes, and population groups often required in synthesis questions, especially for Unit 3 AOS 1. While not always using stimuli, it builds the foundational knowledge needed to apply to stimuli.</p>
                <h4 class="text-xl font-medium text-purple-200 mb-2">How to do it:</h4>
                <ol class="list-decimal list-inside space-y-2 text-slate-300">
                    <li>
                        <strong>Choose:</strong> Select a population group comparison (e.g., Aboriginal and Torres Strait Islander Peoples vs. non-Indigenous Australians, Males vs. Females, High SES vs. Low SES).
                    </li>
                    <li>
                        <strong>Choose:</strong> Select a relevant factor category (Biological, Sociocultural, or Environmental).
                    </li>
                    <li>
                        <strong>Choose:</strong> Select a specific health condition or health status indicator that shows variation between the groups.
                    </li>
                    <li>
                        <strong>Build the Chain:</strong> Draw or write a step-by-step chain, explaining how the chosen factor contributes to the difference in the health condition/indicator between the two groups. Be specific and use HHD terminology.
                        <ul class="list-disc list-inside pl-6 space-y-1 mt-1">
                            <li>Example (incorporating past VCAA examples): Low SES (Sociocultural factor) -&gt; Lower education levels -&gt; Lower health literacy -&gt; Less likely to understand/act on preventative health messages (e.g., around smoking) -&gt; Higher smoking rates -&gt; Increased risk of lung cancer -&gt; Higher mortality from lung cancer -&gt; Contributes to lower life expectancy and higher burden of disease (YLL/DALY) in low SES groups compared to high SES groups.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Practice Variations:</strong> Repeat with different factors, conditions, and population groups. Incorporate how these factors might link through dimensions of health and wellbeing as well.
                    </li>
                </ol>
            </article>
            */}
        </section>
    `;
}

function Unit3Component() {
    // Content for Unit 3, Area of Study 1
    const aos1Content = `
        <h2>Area of Study 1: Understanding Health and Wellbeing</h2>
        <p class="italic text-slate-400">This area of study focuses on understanding health and wellbeing, disease, and illness as complex, dynamic, and subjective concepts. Students reflect on the universality of public health goals and the increasing influence of global conditions on Australians. They develop their understanding of indicators used to measure and evaluate health status and the factors contributing to variations between population groups.</p>

        <h3>1. Concepts of Health and Wellbeing, Illness, and their Dynamic and Subjective Nature</h3>
        <p><strong>Health and Wellbeing:</strong> For the VCE HHD study, 'health and wellbeing' is defined as the overall state of a person's physical, social, emotional, mental, and spiritual existence, characterised by an equilibrium in which the individual feels happy, healthy, capable, and engaged. Wellbeing is considered an implicit element of health.</p>
        <p>The World Health Organization (WHO) defined health in 1946 as "a state of complete physical, mental and social well-being and not merely the absence of disease or infirmity." This definition acknowledges the holistic nature of health.</p>
        
        <h4>The Five Dimensions of Health and Wellbeing:</h4>
        <p>These dimensions are interrelated; a change in one dimension typically affects others.</p>
        <ul>
            <li><strong>Physical Health and Wellbeing:</strong> Relates to the functioning of the body and its systems, including the physical capacity to perform daily activities or tasks. It's supported by factors like regular physical activity, a balanced diet, adequate rest/sleep, maintaining an ideal body weight, and the absence of illness, disease, or injury. Characteristics include adequate energy levels, ability to complete physical tasks, appropriate fitness, and freedom from illness.</li>
            <li><strong>Social Health and Wellbeing:</strong> Concerns the ability to form meaningful and satisfying relationships with others and to manage or adapt appropriately to different social situations. It involves having supportive networks (family, friends), effective communication, and a sense of connection to the community.</li>
            <li><strong>Emotional Health and Wellbeing:</strong> Relates to the ability to express feelings in a positive way, manage emotional actions and reactions appropriately, and display resilience. It involves recognizing, understanding, and effectively managing emotions.</li>
            <li><strong>Mental Health and Wellbeing:</strong> Relates to the current state of the mind or brain and the ability to think and process information. It includes having positive self-esteem, confidence, optimism, and low levels of stress and anxiety. It's about the wellness of the mind and the capacity to make decisions and use logic.</li>
            <li><strong>Spiritual Health and Wellbeing:</strong> Relates to ideas, beliefs, values, and ethics that arise in the minds and conscience of human beings. It includes concepts of hope, peace, a guiding sense of meaning or value, and reflection on one's place in the world. It can be highly individualized and may relate to organized religion, morals, a sense of purpose, connection, or belonging.</li>
        </ul>

        <p><strong>Illness:</strong> A subjective concept related to a person's personal experience of a disease or unhealthy condition. Disease, on the other hand, refers to a physical or mental disturbance involving symptoms, dysfunction or tissue damage.</p>

        <h4>Dynamic and Subjective Nature:</h4>
        <ul>
            <li><strong>Dynamic:</strong> Health and wellbeing are constantly changing. Changes can occur rapidly due to various factors like illness, stress, or positive life events. An individual's level of health and wellbeing can fluctuate along a continuum.</li>
            <li><strong>Subjective:</strong> Health and wellbeing are influenced by personal opinions, beliefs, feelings, and experiences. How a person perceives their health can differ significantly from another person with the same condition or even from their own perception at a different time.</li>
        </ul>
        <hr class="my-6 border-slate-700">
        
        <h3>2. Benefits of Optimal Health and Wellbeing as a Resource</h3>
        <p>Optimal health and wellbeing is not just an end goal; it's a vital resource that empowers individuals and benefits communities and the world at large. It's the foundation upon which people can build fulfilling lives and contribute meaningfully to society.</p>

        <h4>Individual Benefits:</h4>
        <p>Optimal health and wellbeing allows individuals to:</p>
        <ul>
            <li>Perform daily activities effectively (e.g., go to school, work, care for oneself and others).</li>
            <li>Work productively and earn an income, which allows them to afford resources like food, shelter, healthcare, and education.</li>
            <li>Engage in social activities, exercise, and pursue hobbies and interests.</li>
            <li>Maintain healthy body weight and fitness levels.</li>
            <li>Sleep well, leading to better concentration and mood.</li>
            <li>Gain an education and develop skills.</li>
            <li>Experience increased life expectancy and a greater sense of self-fulfilment and self-esteem.</li>
            <li>Cope with the stresses of daily life and demonstrate resilience.</li>
        </ul>
        <p>For example, being free from chronic disease allows an individual to maintain employment, support their family, and actively participate in their community.</p>

        <h4>National Benefits:</h4>
        <p>A healthy population is a significant asset to a nation, leading to:</p>
        <ul>
            <li><strong>Increased Productivity:</strong> Healthy individuals are more likely to be employed and productive, contributing to economic growth.</li>
            <li><strong>Higher Average Incomes & Tax Revenue:</strong> A productive workforce earns more, leading to increased taxation revenue for the government. This revenue can be reinvested in essential services like infrastructure (roads, public transport), social services (public housing, welfare), education, healthcare, and law and order.</li>
            <li><strong>Reduced Healthcare Costs:</strong> A healthier population places less strain on the healthcare system, reducing expenditure on treating preventable diseases.</li>
            <li><strong>Increased Social Participation:</strong> Healthy individuals are more likely to engage in civic duties, volunteer, and participate in community life, strengthening social cohesion.</li>
            <li><strong>Longer Working Lives:</strong> Improved health can lead to people working for longer, contributing to the economy and reducing reliance on social security.</li>
            <li><strong>Improved National Security & Reduced Social Segregation.</strong></li>
        </ul>
        <p>For instance, a reduction in smoking rates leads to fewer cases of lung cancer, meaning more people are well enough to work, contributing more to tax revenue and reducing healthcare burdens.</p>

        <h4>Global Benefits:</h4>
        <p>Optimal health and wellbeing on a global scale contributes to:</p>
        <ul>
            <li><strong>Reduced Risk of Disease Transmission:</strong> Healthier populations are less susceptible to communicable diseases, reducing the risk of pandemics and cross-border infections (e.g., measles, COVID-19).</li>
            <li><strong>Promotion of Global Economic Development:</strong> Healthy populations are more productive, fostering economic growth and stability in and between countries.</li>
            <li><strong>Increased Capacity to Address Global Challenges:</strong> When people are healthy, they are better equipped to collaborate on solving global issues like climate change, poverty, and conflict.</li>
            <li><strong>Promotion of Peace and Stability:</strong> Healthier populations can lead to more stable societies with less conflict over resources.</li>
            <li><strong>Increased Social Interactions and Tourism:</strong> Healthy individuals are more likely to travel and engage in cultural exchange.</li>
        </ul>
        <p>For example, global efforts to eradicate diseases like polio not only save lives but also free up resources and enable affected populations to become more economically productive, benefiting the global community.</p>
        <hr class="my-6 border-slate-700">

        <h3>3. Indicators Used to Measure and Understand Health Status</h3>
<p>Health status refers to an individual's or a population's overall level of health and wellbeing, taking into account various aspects such as life expectancy, amount of disability, and levels of disease risk factors. Health indicators are standard statistics used to measure and compare health status, identify trends, and evaluate interventions.</p>

<h4>Key Health Status Indicators:</h4>
<ul>
    <li>
        <strong>Incidence:</strong>
        <p>The number or rate of new cases of a particular condition (e.g., disease or injury) in a population during a specific period (usually a year).</p>
    </li>
    <li>
        <strong>Prevalence:</strong>
        <p>The total number or proportion of cases of a particular condition present in a population at a given time, or over a given period.</p>
    </li>
    <li>
        <strong>Morbidity:</strong>
        <p>Refers to ill health in an individual and the levels of ill health in a population or group. It's often measured by incidence, prevalence, and hospitalisation rates.</p>
    </li>
    <li>
        <strong>Mortality:</strong>
        <p>Refers to death, particularly at a population level. The mortality rate is the number of deaths (usually per 100,000 people) in a population from a specific cause or all causes over a period.</p>
        <ul>
            <li><strong>Maternal Mortality Rate:</strong> The number of deaths of women who are pregnant or in the first 42 days after giving birth or termination of pregnancy, per 100,000 live births.</li>
            <li><strong>Infant Mortality Rate:</strong> The rate of deaths of infants between birth and their first birthday, usually expressed per 1,000 live births.</li>
            <li><strong>Under-Five Mortality Rate (U5MR):</strong> The rate of deaths of children under five years of age, usually expressed per 1,000 live births.</li>
        </ul>
    </li>
    <li>
        <strong>Life Expectancy:</strong>
        <p>An indication of how long a person can expect to live if current death rates do not change. It's the number of years of life, on average, remaining to an individual at a particular age.</p>
    </li>
    <li>
        <strong>Health-Adjusted Life Expectancy (HALE):</strong>
        <p>An estimate of the average number of years that a person can expect to live in full health, by taking into account years lived with disability due to illness or injury. It is life expectancy minus the number of years spent in unhealthy states.</p>
    </li>
    <li>
        <strong>Burden of Disease (BoD):</strong>
        <p>A measure of the impact of diseases and injuries. Specifically, it measures the gap between current health status and an ideal situation where everyone lives to an old age free of disease and disability. It is measured in a unit called Disability-Adjusted Life Years (DALYs).</p>
        <ul>
            <li><strong>Disability-Adjusted Life Years (DALYs):</strong> One DALY represents one year of healthy life lost due to premature death (Years of Life Lost - YLL) and time lived with illness, disease, or injury (Years Lived with Disability - YLD). The formula is: DALY = YLL + YLD.</li>
            <li><strong>Years of Life Lost (YLL):</strong> The fatal component of DALYs. It measures how many years of expected life are lost due to premature death from a particular condition or cause.</li>
            <li><strong>Years Lived with Disability (YLD):</strong> The non-fatal component of DALYs. It measures how many healthy years of life are lost due to living with the negative impacts (e.g., illness, injury, disability) of a disease or health condition.</li>
        </ul>
    </li>
    <li>
        <strong>Self-Assessed Health Status:</strong>
        <p>A measure based on an individual's own perception of their health and wellbeing. It's often collected from population surveys where people are asked to rate their health as excellent, very good, good, fair, or poor.</p>
    </li>
</ul>
<p>Understanding and interpreting data related to these indicators is a key skill in VCE HHD.</p>
<hr class="my-6 border-slate-700">
        <h3>4. Factors Contributing to Variations in Health Status</h3>
<p>Variations in health status exist between different population groups in Australia. These differences are often due to the complex interplay of biological, sociocultural, and environmental factors. It's important to analyse how these factors can influence health outcomes and contribute to these variations.</p>

<h4>a) Biological Factors</h4>
<p>These factors relate to the structure and functioning of the body and its cells, tissues, and systems. They can influence health both positively and negatively.</p>
<ul>
    <li><strong>Genetics (including sex and age):</strong>
        <ul>
            <li>Inherited conditions (e.g., cystic fibrosis, haemophilia) can impact health from birth.</li>
            <li>Genetic predisposition can increase the risk of developing certain diseases (e.g., some cancers, cardiovascular disease, type 2 diabetes).</li>
            <li>Sex can influence the likelihood of certain conditions (e.g., females are more prone to osteoporosis, males to certain types of hernias).</li>
            <li>Ageing leads to natural physiological changes that can increase susceptibility to illness and injury.</li>
        </ul>
    </li>
    <li><strong>Body Weight (BMI):</strong>
        <ul>
            <li>Being overweight or obese (high BMI) is a major risk factor for many conditions, including cardiovascular disease, type 2 diabetes, some cancers, and arthritis.</li>
            <li>Being underweight can also lead to health problems like malnutrition and osteoporosis.</li>
        </ul>
    </li>
    <li><strong>Blood Pressure:</strong>
        <ul>
            <li>Hypertension (high blood pressure) is a significant risk factor for heart attack, stroke, and kidney disease. It often has no symptoms.</li>
        </ul>
    </li>
    <li><strong>Blood Cholesterol:</strong>
        <ul>
            <li>High levels of LDL ('bad') cholesterol can lead to atherosclerosis (hardening and narrowing of arteries), increasing the risk of heart disease and stroke.</li>
        </ul>
    </li>
    <li><strong>Glucose Regulation:</strong>
        <ul>
            <li>Impaired glucose regulation or diabetes (where the body cannot effectively process glucose) can lead to numerous health complications affecting the eyes, kidneys, nerves, and cardiovascular system.</li>
        </ul>
    </li>
    <li><strong>Birth Weight:</strong>
        <ul>
            <li>Low birth weight (less than 2.5kg) is associated with a higher risk of developing health problems later in life, including cardiovascular disease and diabetes, and can also indicate poorer health outcomes in infancy.</li>
        </ul>
    </li>
</ul>

<h4>b) Sociocultural Factors</h4>
<p>These factors relate to the social and cultural conditions in which people are born, grow, live, work, and age. They significantly impact health behaviours, access to resources, and overall health status.</p>
<ul>
    <li><strong>Socioeconomic Status (SES):</strong> Comprises education, occupation, and income.
        <ul>
            <li><strong>Income:</strong> Affects access to resources like nutritious food, adequate housing, healthcare, and recreation. Low income can lead to stress and limit healthy choices.</li>
            <li><strong>Occupation:</strong> Can influence income, stress levels, physical activity levels, and exposure to workplace hazards. Unemployment is linked to poorer health outcomes.</li>
            <li><strong>Education:</strong> Higher levels of education are often linked to better health literacy, healthier behaviours, higher income potential, and better understanding of health messages.</li>
        </ul>
    </li>
    <li><strong>Social Connections and Social Exclusion/Isolation:</strong>
        <ul>
            <li>Strong social networks (family, friends, community groups) provide support, reduce stress, and promote mental wellbeing.</li>
            <li>Social exclusion or isolation can lead to loneliness, depression, and reduced access to support and resources.</li>
        </ul>
    </li>
    <li><strong>Food Security:</strong>
        <ul>
            <li>The state in which all persons obtain nutritionally adequate, culturally appropriate, safe food regularly through local non-emergency sources. Lack of food security (food insecurity) can lead to malnutrition and related health problems. This is a sociocultural discussion when it relates to affordability, access due to social factors, etc.</li>
        </ul>
    </li>
    <li><strong>Early Life Experiences:</strong>
        <ul>
            <li>Experiences during gestation, infancy, and childhood (e.g., maternal health, nutrition, exposure to stress or trauma, quality of parenting) can have long-lasting effects on health and development.</li>
        </ul>
    </li>
    <li><strong>Access to Healthcare (as a sociocultural factor):</strong>
        <ul>
            <li>Cultural barriers, language difficulties, discrimination, or lack of knowledge about available services can prevent people from accessing healthcare, even if it's geographically available.</li>
        </ul>
    </li>
    <li><strong>Cultural Norms and Traditions:</strong>
        <ul>
            <li>Cultural beliefs, practices, and attitudes can influence dietary habits, health-seeking behaviours, and views on illness (e.g., gender roles, attitudes towards smoking or alcohol).</li>
        </ul>
    </li>
    <li><strong>Discrimination (including racism):</strong>
        <ul>
            <li>Experiencing discrimination can lead to stress, anxiety, depression, and reduced access to opportunities and resources, negatively impacting health.</li>
        </ul>
    </li>
    <li><strong>Commercial Factors:</strong>
        <ul>
            <li>The marketing and promotion of products like tobacco, alcohol, processed foods, and sugary drinks can heavily influence consumption patterns and contribute to unhealthy behaviours.</li>
        </ul>
    </li>
</ul>

<h4>c) Environmental Factors</h4>
<p>These factors relate to the physical surroundings in which people live, work, and play. They can directly impact physical health and also influence behaviours.</p>
<ul>
    <li><strong>Housing:</strong>
        <ul>
            <li>Poor quality housing (e.g., overcrowding, dampness, lack of ventilation, presence of hazards like lead or asbestos) can increase the risk of respiratory diseases, injuries, and mental health problems. Homelessness has severe health impacts.</li>
        </ul>
    </li>
    <li><strong>Work Environment:</strong>
        <ul>
            <li>Exposure to hazards (e.g., chemicals, noise, machinery), physical demands, stress levels, and safety practices in the workplace can affect health.</li>
        </ul>
    </li>
    <li><strong>Urban Design and Infrastructure:</strong>
        <ul>
            <li>Availability of public transport, green spaces (parks, recreational areas), walking and cycling paths, and proximity to shops and services can influence physical activity levels, access to healthy food, and social interaction.</li>
        </ul>
    </li>
    <li><strong>Geographical Location (Access to Resources/Transport):</strong>
        <ul>
            <li>People living in rural and remote areas often have poorer access to healthcare services, healthy food options, educational opportunities, and employment compared to those in major cities. This can contribute to poorer health outcomes. Distance to services is an environmental factor.</li>
        </ul>
    </li>
    <li><strong>Climate and Climate Change:</strong>
        <ul>
            <li>Extreme weather events (heatwaves, floods, bushfires) can directly impact health and safety. Climate change can also affect food security, water quality, and the spread of vector-borne diseases.</li>
        </ul>
    </li>
    <li><strong>Air and Water Quality:</strong>
        <ul>
            <li>Exposure to air pollution (e.g., from traffic or industry) can cause respiratory problems and cardiovascular disease. Access to clean, safe drinking water is essential for health.</li>
        </ul>
    </li>
</ul>
<hr class="my-6 border-slate-700">
        <h3>5. Contribution of Specific Factors to Australia's Health Status</h3>
<p>Several specific, largely modifiable, lifestyle factors and behaviours significantly contribute to Australia's burden of disease and impact overall health status. Understanding these is crucial for developing effective health promotion strategies.</p>

<h4>a) Smoking and Vaping</h4>
<ul>
    <li><strong>Smoking (Tobacco):</strong> A leading preventable cause of death and disease in Australia.
        <ul>
            <li>Increases the risk of numerous conditions including various cancers (lung, mouth, throat, stomach, bladder), cardiovascular disease (heart attack, stroke), respiratory diseases (emphysema, chronic bronchitis), and negative pregnancy outcomes.</li>
            <li>Contributes significantly to YLL and YLD.</li>
            <li>Chemicals in tobacco smoke damage nearly every organ in the body.</li>
        </ul>
    </li>
    <li><strong>Vaping (E-cigarettes):</strong> While often marketed as a safer alternative, vaping also poses health risks.
        <ul>
            <li>E-cigarette liquids can contain nicotine (highly addictive) and other harmful chemicals and toxins.</li>
            <li>Potential risks include lung damage, nicotine addiction, and exposure to carcinogens.</li>
            <li>There is concern about uptake by young people and the potential for vaping to be a gateway to tobacco smoking.</li>
            <li>Long-term health effects are still being researched.</li>
        </ul>
    </li>
</ul>

<h4>b) Alcohol</h4>
<ul>
    <li>Excessive alcohol consumption is a major risk factor for ill health and injury.</li>
    <li><strong>Short-term effects:</strong> Can include injuries from accidents or violence, alcohol poisoning, risky behaviours.</li>
    <li><strong>Long-term effects:</strong> Can lead to liver disease (cirrhosis), various cancers (mouth, throat, oesophagus, liver, breast), cardiovascular disease, mental health conditions, and alcohol dependence.</li>
    <li>Contributes to burden of disease through both YLL (e.g., from alcohol-related accidents or chronic disease) and YLD (e.g., from alcohol dependence or liver disease).</li>
</ul>

<h4>c) Overweight and Obesity (High Body Mass Index - BMI)</h4>
<ul>
    <li>Defined as abnormal or excessive fat accumulation that presents a risk to health. BMI is a common measure (though it has limitations).</li>
    <li>A major risk factor for many chronic diseases, including:
        <ul>
            <li>Type 2 diabetes</li>
            <li>Cardiovascular disease (high blood pressure, high cholesterol, heart disease, stroke)</li>
            <li>Some types of cancer (e.g., colorectal, kidney, breast post-menopause)</li>
            <li>Musculoskeletal conditions (e.g., osteoarthritis)</li>
            <li>Sleep apnoea</li>
        </ul>
    </li>
    <li>Contributes significantly to the burden of disease in Australia.</li>
    <li>Often results from an energy imbalance (consuming more kilojoules than expended).</li>
</ul>

<h4>d) Nutritional Imbalance (Dietary Risks)</h4>
<p>An unhealthy diet, characterized by imbalances in nutrient intake, is a significant contributor to poor health and chronic disease.</p>
<ul>
    <li><strong>Under-consumption of Fruits and Vegetables:</strong>
        <ul>
            <li>Fruits and vegetables are rich in vitamins, minerals, antioxidants, and fibre.</li>
            <li>Low intake is linked to an increased risk of cardiovascular disease, some cancers (e.g., colorectal), and type 2 diabetes. Antioxidants help protect against cell damage.</li>
        </ul>
    </li>
    <li><strong>Under-consumption of Dairy Foods:</strong>
        <ul>
            <li>Dairy foods are a key source of calcium, important for bone health and density.</li>
            <li>Low intake, particularly during growth years and later in life, increases the risk of osteoporosis and fractures.</li>
        </ul>
    </li>
    <li><strong>High Intake of Fat (particularly saturated and trans fats):</strong>
        <ul>
            <li>Can lead to high blood cholesterol, increasing the risk of cardiovascular disease.</li>
            <li>Contributes to excess kilojoule intake and weight gain/obesity.</li>
        </ul>
    </li>
    <li><strong>High Intake of Salt (Sodium):</strong>
        <ul>
            <li>Linked to high blood pressure (hypertension), a major risk factor for cardiovascular disease and stroke.</li>
            <li>Much of the salt intake comes from processed foods.</li>
        </ul>
    </li>
    <li><strong>High Intake of Sugar (especially added sugars):</strong>
        <ul>
            <li>Contributes to excess kilojoule intake, leading to weight gain and obesity.</li>
            <li>Increases the risk of type 2 diabetes and dental caries (tooth decay).</li>
            <li>Often found in sugary drinks and processed foods with low nutritional value.</li>
        </ul>
    </li>
    <li><strong>Low Intake of Fibre:</strong>
        <ul>
            <li>Fibre is important for digestive health, helps regulate blood glucose levels, and can reduce cholesterol.</li>
            <li>Low fibre intake is linked to an increased risk of colorectal cancer, cardiovascular disease, type 2 diabetes, and constipation. It contributes significantly to DALYs for some diseases.</li>
        </ul>
    </li>
</ul>
    `;

    // Content for Unit 3, Area of Study 2
    const aos2Content = `
        <h2>Area of Study 2: Promoting Health in Australia</h2>
        <p class="italic text-slate-400">This area of study examines different approaches to public health over time, focusing on changes and successful strategies that have improved health outcomes. It covers the progression of public health in Australia since 1900, including influences like the Ottawa Charter for Health Promotion and the shift towards focusing on population groups.</p>

        <h3>1. Reasons for Improvements in Australia's Health Status Since 1900</h3>
        <p>Australia's health status has significantly improved since 1900. Life expectancy has increased, and mortality rates, particularly for infants and young children, have declined dramatically. This progress is due to a combination of evolving public health approaches and advancements in medical care.</p>
        
        <h4>Overview of Health Status Shift:</h4>
        <p>In the early 1900s, infectious and parasitic diseases (like tuberculosis, polio, and smallpox) were the leading causes of death and illness. Over time, due to public health interventions and improved living conditions, these have largely been controlled. Today, chronic, lifestyle-related diseases (such as cardiovascular disease, cancers, and type 2 diabetes) are the main causes of ill health and mortality.</p>

        <h4>Key Approaches Contributing to Improvements:</h4>
        
        <h4>a) 'Old' Public Health</h4>
        <p>This refers to government actions that focused on improving the physical environment and living conditions to prevent the spread of infectious diseases. Key initiatives included:</p>
        <ul>
            <li>Improved water and sanitation (e.g., providing clean water supplies, sewage disposal systems).</li>
            <li>Better housing conditions to reduce overcrowding and improve hygiene.</li>
            <li>Improved food and nutrition standards.</li>
            <li>Quarantine laws to prevent the spread of diseases from overseas.</li>
            <li>Basic public hygiene education.</li>
        </ul>
        <p>These measures led to substantial reductions in deaths from infectious diseases like cholera, typhoid, and diphtheria.</p>

        <h4>b) The Biomedical Approach to Health</h4>
        <p>This approach focuses on the physical or biological aspects of disease and illness. It is a medical model of care practiced by doctors and health professionals and is primarily associated with the diagnosis, cure, and treatment of disease once symptoms are present. Key characteristics include:</p>
        <ul>
            <li>Focus on individuals rather than whole populations.</li>
            <li>Emphasis on disease, illness, and disability.</li>
            <li>Relies on medical professionals (doctors, specialists) and technology (X-rays, blood tests, scans).</li>
            <li>Involves interventions like medication, surgery, and other medical treatments.</li>
        </ul>
        <p><strong>Improvements in Medical Technology:</strong> Discoveries like vaccines (for polio, measles, tetanus), antibiotics (like penicillin to treat bacterial infections), and advancements in surgery, diagnostic tools (e.g., MRI, CT scans), and pharmaceuticals have been crucial in treating diseases and extending life expectancy.</p>
        <p><strong>Strengths:</strong> Effective in treating common illnesses, extends life expectancy, improves quality of life for many.</p>
        <p><strong>Limitations:</strong> Can be costly due to reliance on technology and professionals, doesn't always promote equity (not all can access), focuses on treatment rather than prevention, and may not address underlying causes of ill health related to social or environmental factors.</p>

        <h4>c) The Social Model of Health (and the New Public Health)</h4>
        <p>Emerged in the late 20th century, recognizing that improvements in health and wellbeing cannot be achieved by focusing solely on treating individuals. It addresses the broader determinants of health (social, cultural, environmental, and economic factors) that influence health outcomes. Key aspects include:</p>
        <ul>
            <li>Focuses on policies, education, and health promotion activities.</li>
            <li>Aims to prevent illness and promote health for the whole population.</li>
            <li>Addresses the wider reasons for ill health, such as poverty, lack of education, and unemployment.</li>
            <li>Emphasizes community participation and empowerment.</li>
            <li>Advocates for equity in health outcomes.</li>
        </ul>
        <p>This approach led to the development of the "new public health," which incorporates health promotion strategies.</p>
        <p><strong>Strengths:</strong> Promotes good health and wellbeing and assists in preventing diseases, relatively inexpensive (as it can reach large numbers), focuses on vulnerable population groups, promotes overall wellbeing by addressing broader determinants.</p>
        <p><strong>Limitations:</strong> Not all conditions can be prevented (e.g., genetic conditions), doesn't address health concerns of individuals (not a treatment model), health promotion messages may be ignored by individuals.</p>
        
        <h4>d) The Ottawa Charter for Health Promotion</h4>
        <p>Developed by the WHO in 1986, the Ottawa Charter provides a framework for health promotion. It builds upon the social model of health and outlines key action areas to achieve "Health For All." (This will be detailed further in a subsequent Key Knowledge point).</p>

        <h4>Relationship between Biomedical and Social Models of Health:</h4>
        <p>Both the biomedical and social models are essential and often work together to achieve improvements in health status. The biomedical model is crucial for treating existing illnesses and conditions, while the social model addresses the underlying determinants that cause ill health and aims to prevent illness from occurring. An integrated approach is often most effective.</p>
        <p>For example, to reduce cardiovascular disease (CVD):</p>
        <ul>
            <li><strong>Biomedical approach:</strong> Provides medication to lower blood pressure, surgery to repair heart damage.</li>
            <li><strong>Social model approach:</strong> Health promotion campaigns to encourage healthy eating and physical activity, policies to reduce salt in processed foods, creating safe environments for exercise.</li>
        </ul>
        <hr class="my-6 border-slate-700">

        <h3>2. The Role of Health Promotion in Improving Population Health</h3>
        <p><strong>Health Promotion:</strong> According to the WHO, health promotion is the process of enabling people to increase control over, and to improve, their health. It goes beyond focusing on individual behaviour towards a wide range of social and environmental interventions.</p>
        <p>The Ottawa Charter for Health Promotion is a foundational framework for guiding health promotion efforts. It outlines five key action areas (strategies) to achieve health for all. These action areas are often remembered by the mnemonic "<strong>B</strong>ad <strong>C</strong>ats <strong>S</strong>mell <strong>D</strong>ead <strong>R</strong>ats."</p>

        <h4>The Five Action Areas of the Ottawa Charter:</h4>

        <h4>a) Build Healthy Public Policy (Bad)</h4>
        <p>This action area relates to the decisions made by governments and organisations regarding laws and policies that make it more difficult for people to undertake unhealthy behaviours and easier to make healthy choices. It extends beyond the health sector and includes legislation, fiscal measures, taxation, and organisational change.</p>
        <ul>
            <li><strong>Examples:</strong>
                <ul>
                    <li>Laws requiring seatbelts in cars or helmets on bikes.</li>
                    <li>Banning smoking in public places.</li>
                    <li>Imposing taxes on tobacco and alcohol.</li>
                    <li>Workplace policies promoting occupational health and safety.</li>
                    <li>Removing the goods and services tax (GST) on unprocessed foods (like fresh fruit and vegetables).</li>
                </ul>
            </li>
        </ul>

        <h4>b) Create Supportive Environments (Cats)</h4>
        <p>This action area aims to promote health and wellbeing by creating physical and social environments that are safe, stimulating, satisfying, and enjoyable. It recognizes the links between people and their environment and helps people to support each other in their communities to live healthy lives.</p>
        <ul>
            <li><strong>Examples:</strong>
                <ul>
                    <li>Establishing Quitline services (social support) for smokers wanting to quit.</li>
                    <li>Providing shaded areas in school playgrounds and public parks (physical environment).</li>
                    <li>Ensuring safe workplaces and healthy working conditions.</li>
                    <li>Building cycling paths and walking tracks.</li>
                    <li>Support groups for conditions like cancer or mental illness.</li>
                </ul>
            </li>
        </ul>

        <h4>c) Strengthen Community Action (Smell)</h4>
        <p>This action area focuses on building links between individuals and the community, and centres around the community working together to achieve a common goal. It requires communities to be involved in setting priorities, making decisions, planning strategies, and implementing them to improve health outcomes.</p>
        <ul>
            <li><strong>Examples:</strong>
                <ul>
                    <li>Community-run immunisation programs.</li>
                    <li>Local councils working with community groups to develop recreational facilities.</li>
                    <li>Road safety initiatives involving schools, police, and local community members (e.g., driver reviver stations run by volunteers).</li>
                    <li>Aboriginal Community Controlled Health Organisations (ACCHOs) developing and delivering culturally appropriate health services.</li>
                </ul>
            </li>
        </ul>

        <h4>d) Develop Personal Skills (Dead)</h4>
        <p>This action area is about supporting personal and social development through providing information, education for health, and enhancing life skills. This increases options available to people to exercise more control over their own health and their environments, and to make choices conducive to health.</p>
        <ul>
            <li><strong>Examples:</strong>
                <ul>
                    <li>Health education programs in schools (e.g., on nutrition, drug use, sexual health).</li>
                    <li>Providing information on healthy eating, physical activity, and quitting smoking through brochures, websites, and campaigns.</li>
                    <li>Teaching practical skills like cooking healthy meals or performing self-examinations.</li>
                    <li>Online courses or workshops on managing stress or mental health.</li>
                </ul>
            </li>
        </ul>

        <h4>e) Reorient Health Services (Rats)</h4>
        <p>This action area aims to shift the health system and its components towards a focus on health promotion, rather than solely on curative services. It involves health professionals, community groups, and individuals working together to achieve a healthcare system that promotes health. It requires a change in attitude and organisation of health services.</p>
        <ul>
            <li><strong>Examples:</strong>
                <ul>
                    <li>Doctors discussing diet and physical activity with patients, not just prescribing medication.</li>
                    <li>Hospitals offering preventative health checks and health education programs.</li>
                    <li>Funding health promotion initiatives within healthcare settings.</li>
                    <li>Training health professionals to address the broader determinants of health.</li>
                    <li>Pharmacists providing advice on quitting smoking or managing minor ailments.</li>
                </ul>
            </li>
        </ul>
        <hr class="my-6 border-slate-700">

        <h3>3. Programs to Improve Aboriginal and Torres Strait Islander Peoples' Health</h3>
        <p>Addressing the health inequities experienced by Aboriginal and Torres Strait Islander peoples is a significant focus in Australia. Effective programs aim to be culturally appropriate, involve community control and participation, and promote social justice.</p>

        <h4>Promoting Social Justice:</h4>
        <p>Social justice in this context means ensuring that all people have equal rights and opportunities, regardless of their background. Programs should aim to:</p>
        <ul>
            <li><strong>Address Equity:</strong> Provide targeted support and resources to overcome specific disadvantages and ensure fair access to health services and outcomes.</li>
            <li><strong>Uphold Human Rights:</strong> Recognize health as a human right and ensure services are respectful and non-discriminatory.</li>
            <li><strong>Enable Participation:</strong> Involve Aboriginal and Torres Strait Islander peoples in the design, delivery, and evaluation of health programs that affect them. Community control is a key aspect of this.</li>
        </ul>

        <h4>Connection to Ottawa Charter Action Areas:</h4>
        <p>Many successful programs reflect the action areas of the Ottawa Charter:</p>
        <ul>
            <li><strong>Strengthen Community Action:</strong> Aboriginal Community Controlled Health Organisations (ACCHOs) are prime examples, where the local community controls the health service.</li>
            <li><strong>Develop Personal Skills:</strong> Programs often include health education and skill development tailored to the community (e.g., nutrition, managing chronic conditions).</li>
            <li><strong>Create Supportive Environments:</strong> Ensuring services are culturally safe and welcoming, and addressing social determinants like housing and employment.</li>
            <li><strong>Reorient Health Services:</strong> Shifting from a purely clinical focus to holistic and preventative care that incorporates cultural understanding.</li>
            <li><strong>Build Healthy Public Policy:</strong> Advocating for policies that address systemic issues and support Indigenous self-determination in health.</li>
        </ul>

        <h4>Examples of Programs and Initiatives:</h4>
        <ul>
            <li><strong>National Aboriginal Community Controlled Health Organisation (NACCHO):</strong> The national peak body representing local ACCHSs. ACCHSs provide holistic, comprehensive, and culturally appropriate primary healthcare services initiated and operated by the local Aboriginal community.</li>
            <li><strong>'Care for Kids' Ears' initiative:</strong> Addresses the high rates of otitis media (ear infections) in Indigenous children. It provides culturally appropriate information resources for health professionals, communities, and schools, including apps and kiosks in Indigenous languages. This initiative helps develop personal skills and creates supportive environments.</li>
            <li><strong>'Move it Mob Style' program:</strong> A dance-based fitness program for television and online platforms, showcasing Aboriginal and Torres Strait Islander music and dance, led by Indigenous people. It promotes physical activity in a culturally engaging way (Develop Personal Skills, Create Supportive Environments).</li>
            <li><strong>'Aboriginal Road to Good Health' program:</strong> A Type 2 Diabetes prevention program that educates Indigenous people about healthy eating and lifestyles, reflecting the Develop Personal Skills action area.</li>
        </ul>

        <h4>Evaluating Initiatives:</h4>
        <p>When evaluating programs, consider factors such as:</p>
        <ul>
            <li>Cultural appropriateness and safety.</li>
            <li>Level of community control and stakeholder involvement.</li>
            <li>Whether they address specific health needs identified by the community.</li>
            <li>Adequacy and sustainability of funding.</li>
            <li>Whether they target significant health issues and have measurable outcomes.</li>
            <li>How effectively they promote social justice and reflect Ottawa Charter principles.</li>
        </ul>
        <hr class="my-6 border-slate-700">

        <h3>4. Initiatives to Promote Healthy Eating in Australia & Challenges</h3>
        <p>Promoting healthy eating is a key public health goal in Australia to address issues like overweight, obesity, and diet-related chronic diseases. Various initiatives provide guidance and support, but there are also significant challenges in changing dietary behaviours.</p>

        <h4>Key Initiatives to Promote Healthy Eating:</h4>
        <ul>
            <li>
                <strong>The Australian Dietary Guidelines (ADGs):</strong>
                <p>Developed by the National Health and Medical Research Council (NHMRC), the ADGs provide evidence-based advice on the types and amounts of foods that Australians should eat for health and wellbeing. They aim to promote health, reduce the risk of diet-related conditions (like high cholesterol, high blood pressure, obesity) and chronic diseases (like type 2 diabetes, cardiovascular disease, some cancers).</p>
                <p>There are five main guidelines:</p>
                <ol class="list-decimal ml-6">
                    <li>To achieve and maintain a healthy weight, be physically active and choose amounts of nutritious food and drinks to meet your energy needs.</li>
                    <li>Enjoy a wide variety of nutritious foods from these five groups every day: plenty of vegetables (including different types and colours), and legumes/beans; fruit; grain (cereal) foods, mostly wholegrain and/or high cereal fibre varieties; lean meats and poultry, fish, eggs, tofu, nuts and seeds, and legumes/beans; milk, yoghurt, cheese and/or their alternatives, mostly reduced fat. And drink plenty of water.</li>
                    <li>Limit intake of foods containing saturated fat, added salt, added sugars and alcohol.</li>
                    <li>Encourage, support and promote breastfeeding.</li>
                    <li>Care for your food; prepare and store it safely.</li>
                </ol>
            </li>
            <li>
                <strong>The Australian Guide to Healthy Eating (AGHE):</strong>
                <p>A practical, visual food selection guide that reflects the Australian Dietary Guidelines. It presents a plate (circle graph) showing the proportions of the five food groups that should be consumed daily for good health. It aims to help Australians choose a healthy diet by providing a simple visual representation of these proportions.</p>
                <p>It also advises limiting discretionary foods (those high in saturated fat, added salt, and added sugars).</p>
            </li>
            <li>
                <strong>The Healthy Eating Pyramid:</strong>
                <p>Developed by Nutrition Australia, this is another visual guide that layers foods according to the proportion in which they should be consumed. It encourages Australians to enjoy a variety of foods from the five core food groups every day.</p>
                <p>The pyramid is based on the ADGs and shows plant-based foods (vegetables, fruits, grains) as the foundation layers, followed by dairy and alternatives, then lean meats/poultry/fish/eggs/nuts/seeds/legumes. Healthy fats are included in small amounts, and it reminds people to limit salt and added sugar, and drink water.</p>
            </li>
            <li>
                <strong>Nutrition Australia:</strong>
                <p>A non-government, non-profit, community-based organisation that aims to promote optimal health and wellbeing for all Australians by encouraging food variety and physical activity. They provide services such as:</p>
                <ul>
                    <li>The Healthy Eating Advisory Service (supporting organisations like schools and hospitals to provide healthy food choices).</li>
                    <li>National Nutrition Week (an annual event to raise awareness).</li>
                    <li>Development and dissemination of educational resources.</li>
                    <li>Webinars and workshops for health professionals and the public.</li>
                </ul>
            </li>
        </ul>

        <h4>Challenges in Bringing About Nutritional Change:</h4>
        <p>Despite these initiatives, achieving widespread nutritional improvements is difficult due to several factors:</p>
        <ul>
            <li>
                <strong>Sociocultural Factors:</strong>
                <ul>
                    <li><strong>Food marketing and media:</strong> Extensive marketing of energy-dense, nutrient-poor foods, especially to children and young people, can heavily influence food choices (e.g., junk food advertising linked to increased energy consumption).</li>
                    <li><strong>Time constraints and convenience:</strong> Busy lifestyles can lead to reliance on convenient, processed foods that may be less healthy.</li>
                    <li><strong>Education and knowledge:</strong> Lack of nutritional knowledge or skills in preparing healthy meals can be a barrier. Health literacy levels play a role.</li>
                    <li><strong>Cultural influences and traditions:</strong> Family eating patterns and cultural food norms can sometimes conflict with dietary guidelines.</li>
                    <li><strong>Social norms and peer influence:</strong> Eating habits can be influenced by friends and social settings.</li>
                    <li><strong>Income/Socioeconomic status:</strong> Healthy foods like fresh fruits and vegetables can be perceived as more expensive than processed alternatives, particularly for low-income families.</li>
                </ul>
            </li>
            <li>
                <strong>Environmental Factors:</strong>
                <ul>
                    <li><strong>Accessibility of healthy foods:</strong> Availability of fresh, healthy food options can vary, especially in remote or low socioeconomic areas ("food deserts").</li>
                    <li><strong>Food security:</strong> Not all individuals or families have consistent access to adequate, safe, and nutritious food.</li>
                </ul>
            </li>
            <li>
                <strong>Commercial (Personal/Individual) Factors:</strong>
                <ul>
                    <li><strong>Personal preference and taste:</strong> Individuals may prefer the taste of unhealthy foods high in fat, salt, and sugar.</li>
                    <li><strong>Habit:</strong> Established eating habits can be difficult to change.</li>
                    <li><strong>Willpower and motivation:</strong> Making sustained dietary changes requires effort and commitment.</li>
                </ul>
            </li>
        </ul>
        <hr class="my-6 border-slate-700">

        <h3>5. Australia's Health System</h3>
        <p>Australia's health system is a complex network of public and private services and providers. It aims to promote, restore, or maintain health for all Australians. Key components include Medicare, private health insurance, the Pharmaceutical Benefits Scheme (PBS), and the National Disability Insurance Scheme (NDIS). We will examine these in terms of their role in promoting health via <strong>F</strong>unding, <strong>S</strong>ustainability, <strong>A</strong>ccess, and <strong>E</strong>quity (FSAE).</p>

        <h4>a) Medicare</h4>
        <p>Medicare is Australia's universal health insurance scheme. It aims to provide all Australians (and some overseas visitors) with access to affordable and high-quality healthcare.</p>
        <ul>
            <li><strong>Funding:</strong>
                <ul>
                    <li><strong>Medicare Levy:</strong> An additional 2% tax placed on the taxable income of most taxpayers.</li>
                    <li><strong>Medicare Levy Surcharge (MLS):</strong> An additional levy (1-1.5%) on higher-income earners who do not have an appropriate level of private hospital insurance. This aims to encourage high-income earners to take out private cover, reducing demand on the public system.</li>
                    <li><strong>General Taxation:</strong> The revenue collected from the levy and surcharge does not cover the full cost of Medicare, so a significant portion is funded from general income tax revenue.</li>
                </ul>
            </li>
            <li><strong>Sustainability:</strong>
                <ul>
                    <li>Aims to be sustainable by controlling costs (e.g., schedule fees for services, not covering all services).</li>
                    <li>The MLS encourages use of the private system, potentially reducing strain on public resources.</li>
                    <li>Focus on preventative health measures (though primarily a treatment system) can reduce long-term costs.</li>
                </ul>
            </li>
            <li><strong>Access:</strong>
                <ul>
                    <li>Provides access to essential medical services, including free or subsidised treatment by doctors (GPs, specialists), optometrists, and in public hospitals (as a public patient).</li>
                    <li>Aims to remove cost as a barrier to accessing healthcare for many services.</li>
                    <li>Available to all Australian citizens and permanent residents.</li>
                </ul>
            </li>
            <li><strong>Equity:</strong>
                <ul>
                    <li>Aims to provide healthcare access to all, regardless of age, income, location, or cultural background.</li>
                    <li>The Medicare Safety Net provides additional financial relief for those with high out-of-pocket medical costs for out-of-hospital services.</li>
                    <li>Bulk billing (where the doctor accepts the Medicare benefit as full payment) improves affordability for low-income earners.</li>
                </ul>
            </li>
            <li><strong>Services Covered:</strong> GP consultations, specialist consultations (partial), tests and examinations (e.g., X-rays, blood tests), most surgical procedures performed by doctors, eye tests by optometrists, public patient hospital care.</li>
            <li><strong>Services NOT Covered (typically):</strong> Most dental examinations and treatment, ambulance services, home nursing, physiotherapy, chiropractic services, cosmetic surgery, hearing aids, glasses/contact lenses (unless medically necessary in hospital).</li>
        </ul>

        <h4>b) Private Health Insurance (PHI)</h4>
        <p>PHI is an optional additional health insurance that individuals can choose to purchase to cover health services not fully covered by Medicare, or to access private hospital care. It gives individuals more choice regarding their healthcare.</p>
        <ul>
            <li><strong>Funding:</strong> Funded by individuals through premiums paid to private health insurance companies. The government also provides a private health insurance rebate (income-tested) to make premiums more affordable.</li>
            <li><strong>Sustainability:</strong>
                <ul>
                    <li>Reduces the burden on the public health system by encouraging individuals to use private hospitals and services.</li>
                    <li>Government incentives (rebate, MLS, Lifetime Health Cover loading) aim to encourage uptake and keep the system viable.</li>
                </ul>
            </li>
            <li><strong>Access:</strong>
                <ul>
                    <li>Provides access to private hospital care, choice of doctor in hospital, and potentially shorter waiting times for elective surgeries.</li>
                    <li>Can cover services like dental, physiotherapy, and optical (ancillary/extras cover).</li>
                </ul>
            </li>
            <li><strong>Equity:</strong>
                <ul>
                    <li>Can improve choice for those who can afford it.</li>
                    <li>However, it can also create inequities, as access to these additional benefits is largely dependent on the ability to pay premiums. The government rebate aims to improve affordability for some.</li>
                </ul>
            </li>
        </ul>

        <h4>c) Pharmaceutical Benefits Scheme (PBS)</h4>
        <p>The PBS is an Australian Government program that subsidises the cost of a wide range of essential prescription medicines, making them more affordable for all Australians.</p>
        <ul>
            <li><strong>Funding:</strong> Primarily funded by the Australian Government through general taxation, with patients paying a co-payment for most subsidised medicines.</li>
            <li><strong>Sustainability:</strong>
                <ul>
                    <li>The Pharmaceutical Benefits Advisory Committee (PBAC) assesses medicines for clinical effectiveness and cost-effectiveness before they are listed on the PBS. This helps ensure value for money.</li>
                    <li>Regular price reviews and negotiations with pharmaceutical companies.</li>
                    <li>Patient co-payments contribute to funding.</li>
                </ul>
            </li>
            <li><strong>Access:</strong>
                <ul>
                    <li>Provides timely and affordable access to necessary and life-saving medicines for all Australians.</li>
                    <li>Without the PBS, many essential medicines would be unaffordable for a large portion of the population.</li>
                </ul>
            </li>
            <li><strong>Equity:</strong>
                <ul>
                    <li>Aims to ensure all Australians have access to essential medicines regardless of their ability to pay.</li>
                    <li>Concessional co-payments are available for eligible individuals (e.g., pensioners, low-income earners), further improving affordability.</li>
                    <li>The PBS Safety Net protects individuals and families from high overall costs for PBS medicines in a calendar year.</li>
                </ul>
            </li>
        </ul>

        <h4>d) National Disability Insurance Scheme (NDIS)</h4>
        <p>The NDIS is a national scheme that provides support to Australians under 65 years of age who have a permanent and significant disability. It aims to help people with disability achieve their goals, including independence, community involvement, education, employment, and health and wellbeing.</p>
        <ul>
            <li><strong>Funding:</strong> Funded by the Australian Government and state and territory governments. The Medicare levy was increased by 0.5% (to 2%) to help fund the NDIS.</li>
            <li><strong>Sustainability:</strong>
                <ul>
                    <li>Aims to provide long-term support, which can reduce reliance on other more costly services over time (e.g., acute healthcare, welfare).</li>
                    <li>Focuses on early intervention and capacity building.</li>
                    <li>Managed by the National Disability Insurance Agency (NDIA) which oversees individualised funding plans.</li>
                </ul>
            </li>
            <li><strong>Access:</strong>
                <ul>
                    <li>Provides access to reasonable and necessary supports based on individual needs and goals. This can include assistive technology, personal care, therapy services, help with household tasks, and support to participate in the community or find employment.</li>
                    <li>Eligibility is based on age, residency, and disability criteria.</li>
                </ul>
            </li>
            <li><strong>Equity:</strong>
                <ul>
                    <li>Aims to ensure people with permanent and significant disabilities receive the support they need to lead an ordinary life and participate as equal citizens.</li>
                    <li>Provides individualised plans tailored to specific needs, promoting fairness.</li>
                    <li>Moves away from a block-funded, crisis-driven system to one that gives individuals more choice and control.</li>
                </ul>
            </li>
        </ul>

    `;
    // Removed the final <hr> here as it's the end of aos2Content

    return `
        <section class="content-section">
            <h1>Unit 3: Australia's Health in a Globalised World</h1>
            <p>This unit explores health and wellbeing, disease, and illness as multidimensional, dynamic, and subject to different interpretations and contexts. It examines health and wellbeing as a global concept and highlights its importance as an individual and a collective resource.</p>
            
            ${aos1Content}
            
            ${aos2Content}
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
    // Updated AssessmentPrepComponent content
    return `
        <section class="content-section">
            <h1>Assessment Preparation</h1>
            <p>Understanding how you'll be assessed is key to success in VCE Health and Human Development. This section provides an overview of the assessment structure for Unit 3 and general tips for preparing for SACs and the end-of-year examination.</p>

            <h2>VCE HHD Assessment Overview</h2>
            <p>Your final study score for VCE Health and Human Development is determined by a combination of School-Assessed Coursework (SACs) and an external end-of-year examination.</p>
            <ul>
                <li><strong>Unit 3 School-Assessed Coursework (SACs):</strong> Contributes 25% to your final study score.</li>
                <li><strong>Unit 4 School-Assessed Coursework (SACs):</strong> Contributes 25% to your final study score.</li>
                <li><strong>End-of-Year Examination (covers Units 3 & 4):</strong> Contributes 50% to your final study score.</li>
            </ul>
            <p>To receive a study score, students must achieve an 'S' (Satisfactory) for both Units 3 and 4.</p>

            <h2>Unit 3 School-Assessed Coursework (SACs)</h2>
            <p>For Unit 3, "Australia's health in a globalised world," your performance on two outcomes will be assessed through SACs. Each outcome is typically allocated 50 marks, contributing to a total of 100 marks for the Unit 3 SACs.</p>
            <ul>
                <li><strong>Outcome 1 (Understanding health and wellbeing):</strong> On completion, students should be able to explain the complex, dynamic, and global nature of health and wellbeing, interpret and apply Australia's health status data, and analyse variations in health status.</li>
                <li><strong>Outcome 2 (Promoting health in Australia):</strong> On completion, students should be able to explain changes to public health approaches, analyse improvements in population health over time, and evaluate health promotion strategies and initiatives.</li>
            </ul>
            <p>SAC tasks are school-based and must be part of your regular teaching program, completed mainly in class within a limited timeframe. Work submitted must be your own.</p>

            <h4>Suitable SAC Tasks for Unit 3:</h4>
            <p>Your school will select tasks from the following list. Each task type can generally only be selected once across Outcome 1 and Outcome 2 in Unit 3.</p>
            <ul>
                <li>A written report (e.g., media analysis, research investigation, blog post, case study analysis).</li>
                <li>An extended response question analysing various stimuli (text, data, visuals).</li>
                <li>An oral presentation (e.g., debate, podcast).</li>
                <li>A visual presentation (e.g., concept map, annotated poster, digital presentation).</li>
                <li>Structured questions (including data analysis or case study analysis).</li>
            </ul>
            <p><em>(Specific details about your school's SAC tasks will be provided by your teacher.)</em></p>

            <h2>General Exam Preparation (Units 3 & 4)</h2>
            <p>The end-of-year examination is 2 hours long and assesses all Key Knowledge and Key Skills from both Unit 3 and Unit 4.</p>
            <h4>Key Tips for Preparation:</h4>
            <ul>
                <li><strong>Understand Command Words:</strong> Know what's expected for terms like 'explain', 'analyse', 'evaluate', 'discuss', 'identify', 'describe'.</li>
                <li><strong>Master Key Knowledge:</strong> Thoroughly review all content from the Study Design.</li>
                <li><strong>Practice Key Skills:</strong> Regularly practice applying your knowledge to different scenarios, data, and question types.</li>
                <li><strong>Data Analysis:</strong> Develop strong skills in interpreting tables, graphs, and other data related to health status.</li>
                <li><strong>Extended Responses:</strong> Practice structuring well-reasoned arguments, using evidence, and linking back to the question.</li>
                <li><strong>Past Papers:</strong> Work through VCAA past examination papers (keeping in mind any Study Design changes).</li>
                <li><strong>Time Management:</strong> Practice answering questions under timed conditions.</li>
            </ul>
            <p class="mt-6"><em>More detailed strategies, practice questions, and specific Unit 3 SAC guidance will be added here.</em></p>
        </section>
    `;
}

function GlossaryComponent() {
    // Updated GlossaryComponent content
    return `
        <section class="content-section">
            <h1>Glossary of Key Terms</h1>
            <p>A comprehensive list of important VCE HHD terminology. Understanding these terms is crucial for success.</p>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Access (to healthcare)</h3>
                    <p class="text-sm text-slate-300 mt-1">The ability of people to obtain healthcare at the right place and right time, irrespective of income, cultural background or physical location.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Australian Dietary Guidelines (ADGs)</h3>
                    <p class="text-sm text-slate-300 mt-1">Provide evidence-based advice on the types and amounts of foods that Australians should eat for health and wellbeing.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Australian Guide to Healthy Eating (AGHE)</h3>
                    <p class="text-sm text-slate-300 mt-1">A visual food selection guide reflecting the ADGs, showing proportions of the five food groups for daily consumption.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Biomedical Approach to Health</h3>
                    <p class="text-sm text-slate-300 mt-1">Focuses on the physical or biological aspects of disease and illness. It is a medical model of care practised by doctors and health professionals and is associated with the diagnosis, cure and treatment of disease.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Biological Factors</h3>
                    <p class="text-sm text-slate-300 mt-1">Factors relating to the body that impact on health and wellbeing, such as genetics, body weight, blood pressure, blood cholesterol, glucose regulation, and birth weight.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Burden of Disease (BoD)</h3>
                    <p class="text-sm text-slate-300 mt-1">A measure of the impact of diseases and injuries; it measures the gap between current health status and an ideal situation where everyone lives to an old age free of disease and disability.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">DALY (Disability-Adjusted Life Year)</h3>
                    <p class="text-sm text-slate-300 mt-1">A measure of burden of disease. One DALY equals one year of healthy life lost due to premature death and time lived with illness, disease or injury (DALY = YLL + YLD).</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Dimensions of Health and Wellbeing</h3>
                    <p class="text-sm text-slate-300 mt-1">The physical, social, emotional, mental, and spiritual aspects that make up an individual's overall health and wellbeing.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Disease</h3>
                    <p class="text-sm text-slate-300 mt-1">A physical or mental disturbance involving symptoms, dysfunction or tissue damage.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Dynamic Nature (of H&W)</h3>
                    <p class="text-sm text-slate-300 mt-1">Refers to health and wellbeing constantly changing. Changes can occur rapidly and fluctuate along a continuum.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Emotional Health and Wellbeing</h3>
                    <p class="text-sm text-slate-300 mt-1">The ability to express feelings in a positive way, manage emotional actions and reactions appropriately, and display resilience.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Environmental Factors</h3>
                    <p class="text-sm text-slate-300 mt-1">The physical surroundings in which we live, work and play, such as housing, work environment, urban design, air and water quality, and climate.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Equity (in health)</h3>
                    <p class="text-sm text-slate-300 mt-1">Relates to fairness and social justice, meaning all people achieve the same health outcomes. It requires targeting disadvantaged groups with resources to ensure they have the opportunity to achieve optimal health.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Health and Wellbeing</h3>
                    <p class="text-sm text-slate-300 mt-1">The overall state of a person's physical, social, emotional, mental, and spiritual existence, characterised by an equilibrium in which the individual feels happy, healthy, capable, and engaged.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Health-Adjusted Life Expectancy (HALE)</h3>
                    <p class="text-sm text-slate-300 mt-1">The average number of years a person can expect to live in full health, free from serious illness, injury, or disability.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Health Promotion</h3>
                    <p class="text-sm text-slate-300 mt-1">The process of enabling people to increase control over, and to improve, their health.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Health Status</h3>
                    <p class="text-sm text-slate-300 mt-1">An individual's or a population's overall health, taking into account various aspects such as life expectancy, amount of disability and levels of disease risk factors.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Healthy Eating Pyramid</h3>
                    <p class="text-sm text-slate-300 mt-1">A visual guide by Nutrition Australia layering foods according to the proportion they should be consumed, based on the ADGs.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Illness</h3>
                    <p class="text-sm text-slate-300 mt-1">A subjective concept related to personal experience of a disease or unhealthy condition.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Incidence</h3>
                    <p class="text-sm text-slate-300 mt-1">The number or rate of new cases of a particular condition during a specific period.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Life Expectancy</h3>
                    <p class="text-sm text-slate-300 mt-1">An indication of how long a person can expect to live; the number of years of life remaining to a person at a particular age if death rates do not change.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Medicare</h3>
                    <p class="text-sm text-slate-300 mt-1">Australia's universal health insurance scheme, providing access to affordable healthcare.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Mental Health and Wellbeing</h3>
                    <p class="text-sm text-slate-300 mt-1">Relates to the state of a person's mind or brain and the ability to think and process information, form opinions, make decisions, and use logic.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Morbidity</h3>
                    <p class="text-sm text-slate-300 mt-1">Refers to ill health in an individual and the levels of ill health in a population or group.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Mortality</h3>
                    <p class="text-sm text-slate-300 mt-1">Refers to death, particularly at a population level (includes maternal, infant, under-five mortality).</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">National Disability Insurance Scheme (NDIS)</h3>
                    <p class="text-sm text-slate-300 mt-1">Provides support to Australians under 65 with a permanent and significant disability.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">'Old' Public Health</h3>
                    <p class="text-sm text-slate-300 mt-1">Government actions from the early 20th century focused on improving the physical environment (e.g., sanitation, water, housing) to prevent infectious diseases.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Optimal Health as a Resource</h3>
                    <p class="text-sm text-slate-300 mt-1">The concept that good health and wellbeing is not just an outcome but a vital asset that enables individuals, nations, and the global community to achieve their potential and address challenges.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Ottawa Charter for Health Promotion</h3>
                    <p class="text-sm text-slate-300 mt-1">A framework for health promotion developed by the WHO, outlining five action areas: Build Healthy Public Policy, Create Supportive Environments, Strengthen Community Action, Develop Personal Skills, Reorient Health Services.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Pharmaceutical Benefits Scheme (PBS)</h3>
                    <p class="text-sm text-slate-300 mt-1">An Australian Government program that subsidises the cost of essential prescription medicines.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Physical Health and Wellbeing</h3>
                    <p class="text-sm text-slate-300 mt-1">Relates to the functioning of the body and its systems, including the physical capacity to perform daily activities.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Prevalence</h3>
                    <p class="text-sm text-slate-300 mt-1">The number or proportion of cases of a particular disease or condition present in a population at a given time.</p>
                 <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Prerequisites for Health (WHO)</h3>
                    <p class="text-sm text-slate-300 mt-1">Fundamental conditions and resources required for health gains (peace, shelter, education, food, income, stable ecosystem, sustainable resources, social justice, equity).</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Private Health Insurance (PHI)</h3>
                    <p class="text-sm text-slate-300 mt-1">Optional insurance for healthcare costs not covered by Medicare or for private hospital care.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Social Health and Wellbeing</h3>
                    <p class="text-sm text-slate-300 mt-1">The ability to form meaningful and satisfying relationships with others and the ability to manage or adapt appropriately to different social situations.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Social Justice (in health)</h3>
                    <p class="text-sm text-slate-300 mt-1">Means that all people have equal rights and opportunities, regardless of personal traits. It includes equity in health and addressing unfair social conditions.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Social Model of Health</h3>
                    <p class="text-sm text-slate-300 mt-1">A conceptual framework that addresses the broader determinants of health (social, cultural, environmental, economic) and aims to create social and physical environments that promote health.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Sociocultural Factors</h3>
                    <p class="text-sm text-slate-300 mt-1">Aspects of society and the social environment that impact on health and wellbeing, such as socioeconomic status, social connections, family, peers, culture, education, and income.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Spiritual Health and Wellbeing</h3>
                    <p class="text-sm text-slate-300 mt-1">Relates to ideas, beliefs, values, and ethics. It includes concepts of hope, peace, a guiding sense of meaning or value, and reflection on one's place in the world.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Subjective Nature (of H&W)</h3>
                    <p class="text-sm text-slate-300 mt-1">Refers to health and wellbeing being influenced by personal opinions, beliefs, feelings, and experiences. Perceptions can vary greatly between individuals.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Sustainability (of health system)</h3>
                    <p class="text-sm text-slate-300 mt-1">Meeting the health needs of the present without compromising the ability of future generations to meet their own health needs; relates to funding, resources, and workforce.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Years Lived with Disability (YLD)</h3>
                    <p class="text-sm text-slate-300 mt-1">The non-fatal component of DALYs; a measure of how many healthy years of life are lost due to illness, injury or disability.</p>
                </div>
                <div class="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="font-semibold text-lg text-purple-300">Years of Life Lost (YLL)</h3>
                    <p class="text-sm text-slate-300 mt-1">The fatal component of DALYs; a measure of how many years of expected life are lost due to premature death.</p>
                </div>
                </div>
            <p class="mt-6"><em>An interactive and searchable glossary is planned. More terms will be added as needed.</em></p>
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
