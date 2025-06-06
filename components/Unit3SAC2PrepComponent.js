import { getInteractiveAnnotationHTML, initInteractiveAnnotationTool } from './InteractiveAnnotationComponent.js'; 
import { getInteractiveMappingHTML, initInteractiveMappingTool } from './InteractiveMappingComponent.js';

const sampleSacMaterials = [ /* ... your sample materials array ... */ 
    {
        id: 'sample1',
        title: 'Sample 1: Youth Mental Health',
        question: "Analyse the impact of social media on the mental wellbeing of adolescents. Use Source A and your own knowledge.",
        stimulus: `<div><p><strong>Source A: The Digital Tightrope (Excerpt from a 2023 report)</strong></p><p>Adolescence is a period of significant brain development, making young people particularly susceptible to environmental influences, including the pervasive presence of social media. Platforms designed for constant engagement can foster comparison and anxiety, potentially impacting self-esteem. Furthermore, exposure to cyberbullying is a recognized risk factor for poor mental health outcomes.</p><p>However, social media can also provide avenues for connection and support, especially for marginalized youth. It allows for the formation of communities based on shared interests and experiences, which can be protective. The key challenge lies in promoting mindful usage and digital literacy.</p></div>`
    },
    {
        id: 'sample2',
        title: 'Sample 2: Healthy Eating Initiatives',
        question: "Evaluate the effectiveness of ONE government initiative and ONE non-government initiative aimed at promoting healthy eating in Australian youth. Use evidence to support your answer.",
        stimulus: `<div><p><strong>Exhibit 1: 'Go for 2&5' Campaign (Government Initiative)</strong></p><p>The 'Go for 2&5' campaign encourages Australians to consume two serves of fruit and five serves of vegetables daily...</p><p><strong>Exhibit 2: Stephanie Alexander Kitchen Garden Program (Non-Government Initiative)</strong></p><p>This program aims to introduce pleasurable food education in primary schools...</p></div>`
    },
    {
        id: 'sample3',
        title: 'Sample 3: Physical Activity Barriers',
        question: "Discuss the sociocultural factors that act as barriers to young people participating in regular physical activity in Australia. Refer to the provided data.",
        stimulus: `<div><p><strong>Figure 1: Physical Activity Levels in Australian Youth (13-17 years) by Socioeconomic Status (SES) Quintile (AIHW, 2022)</strong></p><p><em>Data indicates that young people in the lowest SES quintile (Q1) have a 45% participation rate...</em></p><p><strong>Quote from a youth focus group:</strong> "It's hard to play sports around here..."</p></div>`
    }
];

export function Unit3SAC2PrepComponent() {
    const html = `
        <section id="unit3-sac2-prep-page" class="content-section">
            <h2 class="text-3xl font-bold text-purple-400 mb-6 text-center">Unit 3 SAC 2 Preparation</h2>
            <p class="text-center text-slate-400 mb-8">This section provides structured activities and tools to help you prepare for your Unit 3 SACs, particularly focusing on question deconstruction, stimulus annotation, planning, and applying concepts like the Ottawa Charter.</p>

            <article id="interactive-activity-1-wrapper" class="mb-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 1: SAC Annotation Practice</h3>
                <p class="mb-4 text-slate-300">Select a sample SAC material below, then use the annotation tools to practice deconstructing the question and annotating the stimulus. Your work for each sample is saved locally in your browser.</p>
                <div id="sample-loader-controls" class="mb-4 p-3 bg-slate-800 rounded-lg flex flex-wrap gap-3 items-center">
                    <div>
                        <label for="sample-material-select" class="block text-sm font-medium text-slate-200 mb-1">Select Sample Material:</label>
                        <select id="sample-material-select" class="w-full sm:w-auto p-2 bg-slate-600 border border-slate-500 rounded text-slate-200 focus:border-purple-500 focus:ring-purple-500">
                            <option value="" disabled selected>-- Select a Sample --</option>
                        </select>
                    </div>
                    <button id="clear-sample-annotations-btn" class="self-end px-3 py-2 bg-red-700 text-white rounded hover:bg-red-600 text-sm">Clear Saved Work for this Sample</button>
                </div>
                {/* Container for the annotation tool's HTML */}
                <div id="annotation-component-container">
                    <p class="text-slate-400 italic text-center py-4">Select a sample material to load the annotation tool.</p>
                </div>
            </article>

            <article id="interactive-activity-2-wrapper" class="mt-12 mb-12 p-6 bg-slate-700/50 rounded-xl shadow-xl border border-slate-700">
                <h3 class="text-2xl font-semibold text-purple-300 mb-3">Activity 2: Relationship Mapping & TEEL Planning</h3>
                <p class="mb-4 text-slate-300">Use the tools below to create visual maps of relationships between key concepts from the stimulus or your own knowledge, and then structure your arguments using the TEEL paragraph planner. Your work is saved locally.</p>
                {/* Container for the mapping tool's HTML */}
                <div id="mapping-component-container"> 
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
                            <label for="campaign-strengths" class="block text-sm font-medium text-slate-100 mb-1">Potential Strengths:</label>
                            <textarea id="campaign-strengths" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" rows="3" placeholder="e.g., Multi-faceted..."></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="campaign-limitations" class="block text-sm font-medium text-slate-100 mb-1">Potential Limitations:</label>
                            <textarea id="campaign-limitations" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" rows="3" placeholder="e.g., May not reach..."></textarea>
                        </div>
                        <div>
                            <label for="campaign-social-justice" class="block text-sm font-medium text-slate-100 mb-1">Social Justice Considerations:</label>
                            <textarea id="campaign-social-justice" class="w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" rows="3" placeholder="How does this campaign promote..."></textarea>
                        </div>
                        <button id="save-ottawa-analysis-btn" class="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">Save Ottawa Analysis</button>
                    </div>
                </div>
            </article>
        </section>
    `;

    // This function is called by the router AFTER the HTML above is in the DOM.
    // We use requestAnimationFrame to ensure the DOM is truly ready for manipulation.
    requestAnimationFrame(() => {
        const selectElement = document.getElementById('sample-material-select');
        const annotationContainer = document.getElementById('annotation-component-container');
        const mappingContainer = document.getElementById('mapping-component-container');
        const clearSampleAnnotationsButton = document.getElementById('clear-sample-annotations-btn');
        const ottawaActivityContainer = document.getElementById('ottawa-activity-container');
        const saveOttawaAnalysisBtn = document.getElementById('save-ottawa-analysis-btn');

        const ANNOTATION_STORAGE_KEY_PREFIX = 'annotationData_U3SAC2_v3_Refactored'; 
        const OTTAWA_ANALYSIS_STORAGE_KEY = 'ottawaAnalysisData_U3SAC2_v3_Refactored';

        // Populate dropdown for Annotation Tool
        if (selectElement && selectElement.options.length <= 1) {
             sampleSacMaterials.forEach(sample => {
                const option = document.createElement('option');
                option.value = sample.id;
                option.textContent = sample.title;
                selectElement.appendChild(option);
            });
        }
        
        const saveCurrentAnnotationData = () => {
            const currentSampleId = selectElement ? selectElement.value : null;
            if (!currentSampleId || currentSampleId === "") return;
            const deconstructionData = {};
            // IDs used here MUST match those in the HTML returned by getInteractiveAnnotationHTML()
            const deconInputsMap = {
                commandWords: 'decon-command-words-annot', 
                keyConcepts: 'decon-key-concepts-annot',
                contentAreas: 'decon-content-areas-annot',
                constraints: 'decon-constraints-annot'
            };
            for (const key in deconInputsMap) {
                const inputElement = document.getElementById(deconInputsMap[key]); // Global get is fine if IDs are unique
                if (inputElement) deconstructionData[key] = inputElement.value;
            }
            const stimulusContentArea = document.getElementById('stimulus-content-area-annot'); // Use annot-suffixed ID
            const stimulusHTMLHolder = stimulusContentArea ? stimulusContentArea.querySelector('#stimulus-text-holder-annot') : null; 
            const stimulusHTML = stimulusHTMLHolder ? stimulusHTMLHolder.innerHTML : "";
            const dataToSave = { deconstruction: deconstructionData, stimulusHTMLWithAnnotations: stimulusHTML };
            try { localStorage.setItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId, JSON.stringify(dataToSave)); } 
            catch (e) { console.error("Error saving annotation data:", e); }
        };

        const loadAnnotationToolWithContent = (sampleId) => {
            if (!sampleId) {
                if (annotationContainer) annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a sample material.</p>';
                return;
            }
            const selectedSample = sampleSacMaterials.find(s => s.id === sampleId);
            if (!selectedSample) return;
            
            if (annotationContainer) {
                annotationContainer.innerHTML = getInteractiveAnnotationHTML(); 
                requestAnimationFrame(() => { // Defer init call
                    initInteractiveAnnotationTool(); // Initialize its JS

                    const annotInterface = document.getElementById('annotation-interface');
                    if (!annotInterface) {console.error("loadAnnotation: 'annotation-interface' not found AFTER init."); return;}

                    const questionDisplayP = annotInterface.querySelector('#sac-question-display-annot p'); 
                    const stimulusTextHolder = annotInterface.querySelector('#stimulus-text-holder-annot');

                    if (questionDisplayP) questionDisplayP.textContent = selectedSample.question;
                    else { // Fallback if p tag isn't there, set HTML of parent
                        const qDisplayDiv = annotInterface.querySelector('#sac-question-display-annot');
                        if(qDisplayDiv) qDisplayDiv.innerHTML = `<h4 class="text-lg font-medium text-purple-200 mb-1">Sample SAC Question:</h4><p class="text-slate-300 text-sm">${selectedSample.question}</p>`;
                    }

                    if (stimulusTextHolder) stimulusTextHolder.innerHTML = selectedSample.stimulus;
                    else {
                        const stimulusContentArea = annotInterface.querySelector('#stimulus-content-area-annot');
                        if(stimulusContentArea) { // If holder div wasn't found, put into main area
                           const heading = stimulusContentArea.querySelector('h4'); // Preserve heading
                           stimulusContentArea.innerHTML = ''; // Clear
                           if(heading) stimulusContentArea.appendChild(heading);
                           const newHolder = document.createElement('div');
                           newHolder.id = 'stimulus-text-holder-annot';
                           newHolder.innerHTML = selectedSample.stimulus;
                           stimulusContentArea.appendChild(newHolder);
                        }
                    }
                    
                    const savedDataRaw = localStorage.getItem(ANNOTATION_STORAGE_KEY_PREFIX + sampleId);
                    let savedData;
                    if (savedDataRaw) { try { savedData = JSON.parse(savedDataRaw); } catch(e) { console.error("Error parsing saved annotation data for " + sampleId + ":", e); } }

                    if (savedData && savedData.stimulusHTMLWithAnnotations && stimulusTextHolder) {
                        stimulusTextHolder.innerHTML = savedData.stimulusHTMLWithAnnotations;
                    }
                    
                    const deconstructionInputsMap = {
                        commandWords: 'decon-command-words-annot', keyConcepts: 'decon-key-concepts-annot',
                        contentAreas: 'decon-content-areas-annot', constraints: 'decon-constraints-annot'
                    };
                    for (const key in deconstructionInputsMap) {
                        const inputElement = annotInterface.querySelector(`#${deconstructionInputsMap[key]}`);
                        if (inputElement) {
                            inputElement.value = (savedData && savedData.deconstruction && savedData.deconstruction[key]) ? savedData.deconstruction[key] : '';
                            // Re-attach save listeners specifically to these inputs after content load
                            inputElement.removeEventListener('input', saveCurrentAnnotationData); 
                            inputElement.addEventListener('input', saveCurrentAnnotationData);
                        }
                    }
                    if (typeof window.reAttachAnnotationCommentListeners === 'function') {
                        window.reAttachAnnotationCommentListeners();
                    }
                    ['highlight-btn', 'underline-btn', 'comment-btn'].forEach(btnId => {
                        const btn = annotInterface.querySelector(`#${btnId}`);
                        if (btn) { // Attach to newly created buttons
                            const newBtn = btn.cloneNode(true); 
                            btn.parentNode.replaceChild(newBtn, btn);
                            newBtn.addEventListener('click', () => setTimeout(saveCurrentAnnotationData, 150));
                        }
                    });
                    const event = new Event('annotationToolContentLoaded'); // Custom event if needed
                    document.dispatchEvent(event);
                });
            }
        };

        if (selectElement) {
            selectElement.addEventListener('change', (event) => {
                if (event.target.value) { 
                    sessionStorage.setItem('lastSelectedAnnotationSampleId_U3SAC2', event.target.value);
                    loadAnnotationToolWithContent(event.target.value);
                } else {
                     if (annotationContainer) annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a sample material.</p>';
                }
            });
            if (sampleSacMaterials.length > 0) {
                let initialSampleId = sessionStorage.getItem('lastSelectedAnnotationSampleId_U3SAC2');
                if (!initialSampleId || !sampleSacMaterials.find(s => s.id === initialSampleId)) {
                    initialSampleId = ""; 
                }
                selectElement.value = initialSampleId;
                if (initialSampleId) { 
                    loadAnnotationToolWithContent(initialSampleId);
                } else {
                    if (annotationContainer) annotationContainer.innerHTML = '<p class="text-slate-400 italic text-center py-4">Select a sample material to load the annotation tool.</p>';
                }
            }
        }
        
        if (clearSampleAnnotationsButton) {
            clearSampleAnnotationsButton.addEventListener('click', () => {
                const currentSampleId = selectElement ? selectElement.value : null;
                if (currentSampleId && currentSampleId !== "" && confirm(`Clear saved work for "${sampleSacMaterials.find(s=>s.id===currentSampleId)?.title}"?`)) {
                    localStorage.removeItem(ANNOTATION_STORAGE_KEY_PREFIX + currentSampleId);
                    loadAnnotationToolWithContent(currentSampleId); 
                }
            });
        }

        // Initialize Mapping Tool
        if (mappingContainer) {
            console.log("Unit3SAC2PrepComponent: Injecting Mapping Tool HTML into:", mappingContainer);
            mappingContainer.innerHTML = getInteractiveMappingHTML();
            requestAnimationFrame(() => { // Defer init call
                const actualMappingToolWrapper = document.getElementById('mapping-tool-wrapper');
                if (actualMappingToolWrapper) {
                    console.log("Unit3SAC2PrepComponent: 'mapping-tool-wrapper' found, calling initInteractiveMappingTool.");
                    initInteractiveMappingTool(actualMappingToolWrapper); // Pass the root element
                } else {
                    console.error("Unit3SAC2PrepComponent: CRITICAL - 'mapping-tool-wrapper' NOT found for mapping tool after injection. Init aborted.");
                    mappingContainer.innerHTML = '<p class="text-red-500 text-center p-4">Error: Failed to load mapping tool wrapper.</p>';
                }
            });
        } else {
            console.error("Unit3SAC2PrepComponent: ERROR - mapping-component-container NOT FOUND.");
        }
        
        // Ottawa Charter Activity Logic
        const loadOttawaAnalysis = () => { /* ... as before ... */ 
             const saved = localStorage.getItem(OTTAWA_ANALYSIS_STORAGE_KEY);
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    document.querySelectorAll('#ottawa-charter-analysis-tool input[type="checkbox"]').forEach(cb => {
                        cb.checked = data.actionAreasChecked?.[cb.value] || false;
                    });
                    const justificationTextareas = document.querySelectorAll('#ottawa-charter-analysis-tool textarea[id^="justify-"]');
                    justificationTextareas.forEach(ta => {
                        const areaValue = ta.id.substring(8); 
                        const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services']
                                                 .find(a => a.toLowerCase().replace(/\s+/g, '-') === areaValue);
                        if(originalAreaName && data.justifications) {
                             ta.value = data.justifications[originalAreaName] || '';
                        }
                    });
                    const campaignStrengthsEl = document.getElementById('campaign-strengths');
                    if (campaignStrengthsEl && data.strengths) campaignStrengthsEl.value = data.strengths;
                    const campaignLimitationsEl = document.getElementById('campaign-limitations');
                    if (campaignLimitationsEl && data.limitations) campaignLimitationsEl.value = data.limitations;
                    const campaignSocialJusticeEl = document.getElementById('campaign-social-justice');
                    if (campaignSocialJusticeEl && data.socialJustice) campaignSocialJusticeEl.value = data.socialJustice;
                } catch (e) { console.error("Error loading Ottawa analysis:", e); }
            }
        };
        const saveOttawaAnalysis = () => { /* ... as before ... */ 
             const data = {
                actionAreasChecked: {}, justifications: {},
                strengths: document.getElementById('campaign-strengths')?.value || '',
                limitations: document.getElementById('campaign-limitations')?.value || '',
                socialJustice: document.getElementById('campaign-social-justice')?.value || ''
            };
            document.querySelectorAll('#ottawa-charter-analysis-tool input[type="checkbox"]').forEach(cb => {
                data.actionAreasChecked[cb.value] = cb.checked;
            });
            document.querySelectorAll('#ottawa-charter-analysis-tool textarea[id^="justify-"]').forEach(ta => {
                 const areaValue = ta.id.substring(8);
                 const originalAreaName = ['Build Healthy Public Policy', 'Create Supportive Environments', 'Strengthen Community Action', 'Develop Personal Skills', 'Reorient Health Services']
                                                 .find(a => a.toLowerCase().replace(/\s+/g, '-') === areaValue);
                if(originalAreaName) data.justifications[originalAreaName] = ta.value;
            });
            localStorage.setItem(OTTAWA_ANALYSIS_STORAGE_KEY, JSON.stringify(data));
            alert("Ottawa Charter analysis saved!");
        };

        if (saveOttawaAnalysisBtn) {
            saveOttawaAnalysisBtn.addEventListener('click', saveOttawaAnalysis);
        }
        if (ottawaActivityContainer) { 
             loadOttawaAnalysis();
        }

    }); // End of main requestAnimationFrame for Unit3SAC2PrepComponent setup

    return html; // Return the main HTML structure of the page
}
