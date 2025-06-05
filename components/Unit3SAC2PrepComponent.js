import { InteractiveAnnotationComponent } from './InteractiveAnnotationComponent.js';
import { getInteractiveMappingHTML, initInteractiveMappingTool } from './InteractiveMappingComponent.js'; // CORRECTED IMPORT
// Define sampleSacMaterials here or import from a data file
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
                   <p><em>Data indicates that young people in the lowest SES quintile (Q1) have a 45% participation rate in recommended daily physical activity, compared to 75% in the highest SES quintile (Q5). Participation rates for Q2, Q3, and Q4 are 55%, 60%, and 68% respectively.</em></p>
                   <p><strong>Quote from a youth focus group:</strong> "It's hard to play sports around here if your parents can't afford the fees or the gear. Plus, the good ovals are always booked out by clubs."</p>`
    }
];

// Ensure this global function is available for InteractiveAnnotationComponent if it needs to call it.
// Ideally, this kind of re-binding logic would be handled more internally by the component itself upon content change.
window.reAttachAnnotationCommentListeners = () => {
    const newStimulusArea = document.getElementById('stimulus-content-area');
    if (newStimulusArea) {
        // Define tooltip logic here if not globally available
        function showTooltip(event) {
            // Remove any existing tooltip
            document.querySelectorAll('.annotation-tooltip').forEach(t => t.remove());
            const targetSpan = event.target.closest('.commented-text');
            if (!targetSpan || !targetSpan.dataset.comment) return;
            const comment = targetSpan.dataset.comment;
            const tooltip = document.createElement('div');
            tooltip.className = 'annotation-tooltip';
            tooltip.textContent = comment;
            document.body.appendChild(tooltip);
            const rect = targetSpan.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        }
        function hideTooltip() {
            document.querySelectorAll('.annotation-tooltip').forEach(t => t.remove());
        }
        newStimulusArea.querySelectorAll('.commented-text').forEach(element => {
            element.removeEventListener('mouseenter', showTooltip);
            element.removeEventListener('mouseleave', hideTooltip);
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    }
};


export function Unit3SAC2PrepComponent() {
    // This function now primarily returns the HTML structure.
    // The complex JS logic for the interactive tools themselves is in their respective component files.
    // The event listeners and dynamic content loading for *this specific page* (like the dropdown)
    // will be set up in the setTimeout callback.

    setTimeout(() => {
        const selectElement = document.getElementById('sample-material-select');
        const annotationContainer = document.getElementById('annotation-component-container');
        const mappingContainer = document.getElementById('mapping-component-container');
        const clearSampleAnnotationsButton = document.getElementById('clear-sample-annotations-btn');
        const ottawaActivityContainer = document.getElementById('ottawa-activity-container');
        const saveOttawaAnalysisBtn = document.getElementById('save-ottawa-analysis-btn');

        if (!selectElement || !annotationContainer || !mappingContainer || !clearSampleAnnotationsButton || !ottawaActivityContainer || !saveOttawaAnalysisBtn) {
            console.warn("Some elements for Unit3SAC2PrepComponent might not be fully found yet, or are optional for this view.");
        }

        const ANNOTATION_STORAGE_KEY_PREFIX = 'annotationData_U3SAC2_'; // Added unique prefix
        const OTTAWA_ANALYSIS_STORAGE_KEY = 'ottawaAnalysisData_U3SAC2';

        // Populate dropdown
        if (selectElement && selectElement.options.length <= 1) { // Check if not already populated
             sampleSacMaterials.forEach(sample => {
                const option = document.createElement('option');
                option.value = sample.id;
                option.textContent = sample.title;
                selectElement.appendChild(option);
            });
        }
        
        const saveCurrentAnnotationData = () => {
            const currentSampleId = selectElement ? selectElement.value : null;
            if (!currentSampleId) return;

            const deconstructionData = {};
            const deconInputsMap = {
                commandWords: 'decon-command-words',
                keyConcepts: 'decon-key-concepts',
                contentAreas: 'decon-content-areas',
                constraints: 'decon-constraints'
            };
            for (const key in deconInputsMap) {
                const inputElement = document.getElementById(deconInputsMap[key]);
                if (inputElement) deconstructionData[key] = inputElement.value;
            }

            const stimulusContentArea = document.getElementById('stimulus-content-area');
            const stimulusHTMLHolder = stimulusContentArea ? stimulusContentArea.querySelector('div') : null; // Assuming stimulus is in a child div
            const stimulusHTML = stimulusHTMLHolder ? stimulusHTMLHolder.innerHTML : "";
            
            const dataToSave = {
                deconstruction: deconstructionData,
                stimulusHTMLWithAnnotations: stimulusHTML,
            };
            try {
                localStorage.setItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId, JSON.stringify(dataToSave));
                 console.log("Annotation data saved for " + currentSampleId);
            } catch (e) {
                console.error("Error saving annotation data:", e);
            }
        };


        const loadAnnotationToolWithContent = (sampleId) => {
            const selectedSample = sampleSacMaterials.find(s => s.id === sampleId);
            if (!selectedSample) {
                console.error("Selected sample not found for loading:", sampleId);
                return;
            }
            
            // Render the annotation component's base HTML structure
            if (annotationContainer) {
                 annotationContainer.innerHTML = InteractiveAnnotationComponent(); // This calls the function which returns HTML string
            }

            // The setTimeout within InteractiveAnnotationComponent will handle its internal JS setup.
            // We need to wait for that setup to complete before populating its content.
            setTimeout(() => {
                const questionDisplayP = document.querySelector('#sac-question-display p'); // More specific selector
                const stimulusContainer = document.getElementById('stimulus-content-area');

                if (questionDisplayP) {
                    questionDisplayP.textContent = selectedSample.question;
                } else {
                    const qd = document.getElementById('sac-question-display');
                    if(qd) qd.innerHTML = `<h4 class="text-lg font-medium text-purple-200 mb-1">Sample SAC Question:</h4><p class="text-slate-300 text-sm">${selectedSample.question}</p>`;
                }

                let stimulusHTMLHolder;
                if (stimulusContainer) {
                    let headingToPreserve = stimulusContainer.querySelector('h4');
                    stimulusContainer.innerHTML = ''; // Clear previous
                    if (headingToPreserve) {
                        stimulusContainer.appendChild(headingToPreserve);
                    } else {
                        const newHeading = document.createElement('h4');
                        newHeading.className = "text-lg font-medium text-purple-200 mb-2";
                        newHeading.textContent = "Stimulus Material:";
                        stimulusContainer.appendChild(newHeading);
                    }
                    stimulusHTMLHolder = document.createElement('div');
                    stimulusContainer.appendChild(stimulusHTMLHolder);
                } else {
                    console.error("Stimulus content area not found for sample loading.");
                    return;
                }

                const savedDataRaw = localStorage.getItem(ANNOTATION_STORAGE_KEY_PREFIX + sampleId);
                let savedData;
                if (savedDataRaw) {
                    try { savedData = JSON.parse(savedDataRaw); } catch(e) { console.error("Error parsing saved annotation data:", e); }
                }

                if (savedData && savedData.stimulusHTMLWithAnnotations) {
                    stimulusHTMLHolder.innerHTML = savedData.stimulusHTMLWithAnnotations;
                } else {
                    stimulusHTMLHolder.innerHTML = selectedSample.stimulus;
                }

                const deconstructionInputsMap = {
                    commandWords: 'decon-command-words',
                    keyConcepts: 'decon-key-concepts',
                    contentAreas: 'decon-content-areas',
                    constraints: 'decon-constraints'
                };
                for (const key in deconstructionInputsMap) {
                    const inputElement = document.getElementById(deconstructionInputsMap[key]);
                    if (inputElement) {
                        inputElement.value = (savedData && savedData.deconstruction && savedData.deconstruction[key]) ? savedData.deconstruction[key] : '';
                        inputElement.removeEventListener('input', saveCurrentAnnotationData); // Prevent multiple listeners
                        inputElement.addEventListener('input', saveCurrentAnnotationData);
                    }
                }
                
                if (typeof window.reAttachAnnotationCommentListeners === 'function') {
                    window.reAttachAnnotationCommentListeners();
                }

                ['highlight-btn', 'underline-btn', 'comment-btn'].forEach(btnId => {
                    const btn = document.getElementById(btnId);
                    if (btn) {
                        const newBtn = btn.cloneNode(true); // Re-clone to ensure fresh listeners
                        btn.parentNode.replaceChild(newBtn, btn);
                        newBtn.addEventListener('click', () => setTimeout(saveCurrentAnnotationData, 100)); // Delay to allow DOM update
                    }
                });
                 // Canvas re-initialization might be needed here if its size depends on stimulus content
                const canvas = document.getElementById('annotation-canvas');
                if (canvas && canvas.getContext) {
                    const ctx = canvas.getContext('2d');
                    if(ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Re-trigger canvas setup if necessary, or ensure InteractiveAnnotationComponent handles it
                }

            }, 100); // Further delay to ensure InteractiveAnnotationComponent's own setTimeout has run
        };

        if (selectElement) {
            selectElement.addEventListener('change', (event) => {
                sessionStorage.setItem('lastSelectedAnnotationSampleId_U3SAC2', event.target.value);
                loadAnnotationToolWithContent(event.target.value);
            });
            // Initial load for annotation tool
            if (sampleSacMaterials.length > 0) {
                let initialSampleId = sessionStorage.getItem('lastSelectedAnnotationSampleId_U3SAC2') || sampleSacMaterials[0].id;
                if (!sampleSacMaterials.find(s => s.id === initialSampleId)) {
                    initialSampleId = sampleSacMaterials[0].id;
                }
                selectElement.value = initialSampleId; // Set dropdown value
                loadAnnotationToolWithContent(initialSampleId); // Load content for the initial/stored sample
            }
        }
        
        if (clearSampleAnnotationsButton) {
            clearSampleAnnotationsButton.addEventListener('click', () => {
                const currentSampleId = selectElement ? selectElement.value : null;
                if (currentSampleId && confirm(`Are you sure you want to clear your saved annotations and deconstruction for "${sampleSacMaterials.find(s=>s.id===currentSampleId)?.title}"?`)) {
                    localStorage.removeItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId);
                    loadAnnotationToolWithContent(currentSampleId); 
                }
            });
        }

       if (mappingContainer && !mappingContainer.hasChildNodes()) { // Or however you check if it needs to be rendered
    mappingContainer.innerHTML = getInteractiveMappingHTML(); // Use the HTML-returning function
    initInteractiveMappingTool(); // Then call the function that sets up the JS logic
}     else if (mappingContainer && mappingContainer.hasChildNodes()) {
            // If content is already there (e.g., from a previous navigation that didn't fully clear/re-render the SAC prep page)
            // you might still want to re-initialize it to ensure event listeners are attached.
            // Or, ensure the parent component fully clears mappingContainer before re-adding.
            // For now, let's assume it's freshly rendered or we re-init.
            // This might need refinement based on how your router handles re-visiting pages.
            // A simple re-init might cause issues if the component isn't designed to be re-initialized on existing DOM.
            // For now, the `!mappingContainer.hasChildNodes()` check should prevent re-init if already loaded.
            // If it *is* re-rendered by the router clearing #app-content, then this flow is fine.
        }
        // Ottawa Charter Activity Logic
        const loadOttawaAnalysis = () => {
            const saved = localStorage.getItem(OTTAWA_ANALYSIS_STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                document.querySelectorAll('#ottawa-charter-analysis-tool input[type="checkbox"]').forEach(cb => {
                    cb.checked = data.actionAreasChecked?.[cb.value] || false;
                });
                document.querySelectorAll('#ottawa-charter-analysis-tool textarea').forEach(ta => {
                    const id = ta.id;
                    if (id.startsWith('justify-')) {
                        const area = id.substring(8).replace(/-/g, ' ');
                        // Need to reconstruct the original area name if it had spaces
                        const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services'].find(a => a.toLowerCase().replace(/\s+/g, '-') === area);
                        if(originalAreaName) ta.value = data.justifications?.[originalAreaName] || '';

                    } else if (data[id]) {
                        ta.value = data[id];
                    }
                });
            }
        };

        const saveOttawaAnalysis = () => {
            const data = {
                actionAreasChecked: {},
                justifications: {},
                strengths: document.getElementById('campaign-strengths')?.value || '',
                limitations: document.getElementById('campaign-limitations')?.value || '',
                socialJustice: document.getElementById('campaign-social-justice')?.value || ''
            };
            document.querySelectorAll('#ottawa-charter-analysis-tool input[type="checkbox"]').forEach(cb => {
                data.actionAreasChecked[cb.value] = cb.checked;
            });
            document.querySelectorAll('#ottawa-charter-analysis-tool textarea').forEach(ta => {
                const id = ta.id;
                 if (id.startsWith('justify-')) {
                    const area = id.substring(8).replace(/-/g, ' ');
                     const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services'].find(a => a.toLowerCase().replace(/\s+/g, '-') === area);
                    if(originalAreaName) data.justifications[originalAreaName] = ta.value;
                } else {
                    data[id] = ta.value;
                }
            });
            localStorage.setItem(OTTAWA_ANALYSIS_STORAGE_KEY, JSON.stringify(data));
            alert("Ottawa Charter analysis saved!");
        };

        if (saveOttawaAnalysisBtn) {
            saveOttawaAnalysisBtn.addEventListener('click', saveOttawaAnalysis);
        }
        loadOttawaAnalysis(); // Load any saved Ottawa analysis on component load

    }, 50); // Main setTimeout for Unit3SAC2PrepComponent

    return `
        <section id="unit3-sac2-prep-page" class="content-section">
            <h2 class="text-3xl font-bold text-purple-400 mb-6 text-center">Unit 3 SAC 2 Preparation</h2>
            <p class="text-center text-slate-400 mb-8">This section provides structured activities and tools to help you prepare for your Unit 3 SACs, particularly focusing on question deconstruction, stimulus annotation, planning, and applying concepts like the Ottawa Charter.</p>

            <article id="interactive-activity-1" class="mb-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 1: SAC Annotation Practice</h3>
                <p class="mb-4 text-slate-300">Select a sample SAC material below, then use the annotation tools to practice deconstructing the question and annotating the stimulus. Your work for each sample is saved locally in your browser.</p>
                <div id="sample-loader-controls" class="mb-4 p-3 bg-slate-800 rounded-lg flex flex-wrap gap-3 items-center">
                    <div>
                        <label for="sample-material-select" class="block text-sm font-medium text-slate-200 mb-1">Select Sample Material:</label>
                        <select id="sample-material-select" class="w-full sm:w-auto p-2 bg-slate-600 border border-slate-500 rounded text-slate-200 focus:border-purple-500 focus:ring-purple-500">
                            <option value="" disabled selected>-- Select a Sample --</option>
                            {/* Options populated by JS */}
                        </select>
                    </div>
                    <button id="clear-sample-annotations-btn" class="self-end px-3 py-2 bg-red-700 text-white rounded hover:bg-red-600 text-sm">Clear Saved Work for this Sample</button>
                </div>
                <div id="annotation-component-container">
                    {/* InteractiveAnnotationComponent will be rendered here by JS */}
                    <p class="text-slate-400 italic text-center py-4">Select a sample material to load the annotation tool.</p>
                </div>
            </article>

            <article id="interactive-activity-2" class="mt-12 mb-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 2: Relationship Mapping & TEEL Planning</h3>
                <p class="mb-4 text-slate-300">Use the tools below to create visual maps of relationships between key concepts from the stimulus or your own knowledge, and then structure your arguments using the TEEL paragraph planner. Your work is saved locally.</p>
                <div id="mapping-component-container">
                    {/* InteractiveMappingComponent will be rendered here by JS */}
                     <p class="text-slate-400 italic text-center py-4">Loading mapping tool...</p>
                </div>
            </article>

            <article id="interactive-activity-3-ottawa" class="mt-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 3: Ottawa Charter in Action - Campaign Analysis</h3>
                <p class="mb-4 text-slate-300">Analyse the following health promotion campaign. Identify the Ottawa Charter action areas used and justify your choices. Consider its potential strengths, limitations, and promotion of social justice. Your analysis is saved locally.</p>
                <div id="ottawa-activity-container">
                    <div class="mb-4 p-3 bg-slate-800 rounded-lg">
                        <h4 class="text-lg font-medium text-purple-200 mb-2">Campaign Scenario: "Active Youth, Healthy Future"</h4>
                        <p class="text-sm text-slate-300">The "Active Youth, Healthy Future" campaign is a state-wide initiative aimed at increasing physical activity levels among adolescents (13-17 years). Key components include:
                            <ul class="list-disc pl-5 mt-2 text-sm text-slate-300 space-y-1">
                                <li>TV and social media advertisements featuring young role models enjoying various sports and activities.</li>
                                <li>Grants provided to local councils to upgrade parks, build new skate parks, and install outdoor gym equipment.</li>
                                <li>A new curriculum module for schools focusing on the benefits of physical activity and fundamental movement skills.</li>
                                <li>Partnerships with local sports clubs to offer discounted memberships for teenagers.</li>
                                <li>A website with resources for parents on how to encourage an active lifestyle.</li>
                                <li>Lobbying for increased funding for school physical education programs.</li>
                            </ul>
                        </p>
                    </div>
                    <div id="ottawa-charter-analysis-tool" class="mt-4">
                        <h4 class="text-lg font-medium text-purple-200 mb-3">Identify & Justify Ottawa Charter Action Areas:</h4>
                        <div class="space-y-3 mb-4">
                            ${['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services'].map(area => `
                                <div class="p-2 border border-slate-600 rounded-md">
                                    <div class="flex items-start mb-1">
                                        <input type="checkbox" id="ottawa-${area.toLowerCase().replace(/\s+/g, '-')}" name="ottawa-action-areas" value="${area}" class="mt-1 h-4 w-4 text-purple-600 border-slate-500 rounded focus:ring-purple-500">
                                        <label for="ottawa-${area.toLowerCase().replace(/\s+/g, '-')}" class="ml-2 text-sm font-medium text-slate-100">${area}</label>
                                    </div>
                                    <textarea id="justify-${area.toLowerCase().replace(/\s+/g, '-')}" class="w-full mt-1 p-1.5 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200 placeholder-slate-400" rows="2" placeholder="Justify how this action area is present in the campaign..."></textarea>
                                </div>
                            `).join('')}
                        </div>
                        <div class="mb-4">
                            <label for="campaign-strengths" class="block text-sm font-medium text-slate-100 mb-1">Potential Strengths of the Campaign:</label>
                            <textarea id="campaign-strengths" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200 placeholder-slate-400" rows="3" placeholder="e.g., Multi-faceted approach, targets youth specifically..."></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="campaign-limitations" class="block text-sm font-medium text-slate-100 mb-1">Potential Limitations of the Campaign:</label>
                            <textarea id="campaign-limitations" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200 placeholder-slate-400" rows="3" placeholder="e.g., May not reach all SES groups, sustainability of funding..."></textarea>
                        </div>
                        <div>
                            <label for="campaign-social-justice" class="block text-sm font-medium text-slate-100 mb-1">Social Justice Considerations (Equity, Access, Participation):</label>
                            <textarea id="campaign-social-justice" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-400 focus:ring-purple-400 text-slate-200 placeholder-slate-400" rows="3" placeholder="How does this campaign promote or hinder social justice principles?"></textarea>
                        </div>
                        <button id="save-ottawa-analysis-btn" class="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">Save Ottawa Analysis</button>
                    </div>
                </div>
            </article>
        </section>
    `;
}
