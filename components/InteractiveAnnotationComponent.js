let annotationSpanCounter = 0; // Counter for unique annotation span IDs

export function InteractiveAnnotationComponent() {
    setTimeout(() => {
let drawingModeActive = false;
let connectorModeActive = false;
const canvas = document.getElementById('annotation-canvas'); // Ensure this is correctly fetched after HTML is rendered
const stimulusArea = document.getElementById('stimulus-content-area'); // Ensure this is correctly fetched
 const toggleDrawingButton = document.getElementById('toggle-drawing-btn'); // Ensure this is correctly fetched
 const drawConnectorButton = document.getElementById('draw-connector-btn'); // Ensure this is correctly fetched
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

        const stimulusContentElement = stimulusArea.querySelector('div');

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

            try {
                range.surroundContents(span);
            } catch (e) {
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
            if (currentTooltip) currentTooltip.remove();
            const targetSpan = event.target.closest('.commented-text');
            if (!targetSpan || !targetSpan.dataset.comment) return;
            const comment = targetSpan.dataset.comment;
            const tooltip = document.createElement('div');
            tooltip.className = 'annotation-tooltip';
            tooltip.textContent = comment;
            document.body.appendChild(tooltip);
            currentTooltip = tooltip;
            const rect = targetSpan.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
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

        stimulusArea.querySelectorAll('.commented-text').forEach(addCommentEventListeners);

        const setupDeconstructionEventListeners = () => {
            if (deconCommandWordsInput) {
                deconCommandWordsInput.addEventListener('input', (e) => {
                    deconstructionDataStore.commandWords = e.target.value;
                });
            }
            if (deconKeyConceptsInput) {
                deconKeyConceptsInput.addEventListener('input', (e) => {
                    deconstructionDataStore.keyConcepts = e.target.value;
                });
            }
            if (deconContentAreasInput) {
                deconContentAreasInput.addEventListener('input', (e) => {
                    deconstructionDataStore.contentAreas = e.target.value;
                });
            }
            if (deconConstraintsInput) {
                deconConstraintsInput.addEventListener('input', (e) => {
                    deconstructionDataStore.constraints = e.target.value;
                });
            }
        };
        setupDeconstructionEventListeners();

        if (typeof window.reAttachAnnotationCommentListeners !== 'function') {
            window.reAttachAnnotationCommentListeners = () => {
                const newStimulusArea = document.getElementById('stimulus-content-area');
                if (newStimulusArea) {
                    newStimulusArea.querySelectorAll('.commented-text').forEach(addCommentEventListeners);
                }
            };
        }

        const initializeCanvas = () => {
            if (canvas && stimulusArea && stimulusArea.parentElement === stimulusWrapper) {
                const contentDiv = stimulusArea.querySelector('div > div') || stimulusArea.querySelector('div');
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
    }
    if (stimulusArea) { 
        stimulusArea.style.userSelect = activate ? 'none' : 'auto';
    }
    if (toggleDrawingButton) {
        toggleDrawingButton.classList.toggle('bg-green-600', activate);
        toggleDrawingButton.classList.toggle('bg-red-500', !activate); 
        toggleDrawingButton.textContent = activate ? "Drawing ON" : "Toggle Drawing";
    }
    if (activate && typeof activateConnectorMode === 'function') { // Check if function exists before calling
        activateConnectorMode(false); // Deactivate its own connector mode
    }
};
        const activateConnectorMode = (activate) => {
    connectorModeActive = activate;
    // connectorPoints = []; // This should be reset if it's part of your connector logic for this component
    if (canvas) {
        canvas.style.pointerEvents = activate ? 'auto' : 'none';
    }
    if (stimulusArea) { 
        stimulusArea.style.userSelect = activate ? 'none' : 'auto';
    }
    if (drawConnectorButton) { // This is the button within InteractiveAnnotationComponent
        drawConnectorButton.classList.toggle('bg-green-600', activate);
        drawConnectorButton.classList.toggle('bg-blue-500', !activate); // Default color
        drawConnectorButton.textContent = activate ? "Connecting..." : "Draw Connector";
    }
    if (activate && typeof activateDrawingMode === 'function') { // Check if function exists before calling
        activateDrawingMode(false); // Deactivate its own drawing mode
    }
};

                if (selectedNodeForConnection) {
                    document.getElementById(selectedNodeForConnection)?.classList.remove('ring-2', 'ring-green-500');
                    selectedNodeForConnection = null;
                }
            } else {
                // if (mappingToolMessage) mappingToolMessage.textContent = "";
            }
        };

        const draw = (e) => {
            if (!isDrawing || !drawingModeActive || !ctx) return;
            const rect = canvas.getBoundingClientRect();
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

            ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
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
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
                connectorPoints = [];
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
                } else if (connectorModeActive) {
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
        }

        requestAnimationFrame(initializeCanvas);

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === stimulusArea) {
                    if(canvas && stimulusArea) {
                         const oldWidth = canvas.width;
                         const oldHeight = canvas.height;
                         if (oldWidth !== stimulusArea.scrollWidth || oldHeight !== stimulusArea.scrollHeight) {
                            clearCanvas();
                            initializeCanvas();
                         }
                    }
                }
            }
        });
        if(stimulusArea) resizeObserver.observe(stimulusArea);

    }, 0);
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
                    <h4 class="text-lg font-medium text-purple-200 mb-2">Stimulus Material:</h4>
                    <p><strong>Source 1: Youth Mental Health Report Snippet (2023)</strong></p>
                <p>Recent studies indicate a growing concern regarding the mental health of young Australians. Approximately one in seven young people aged 12-17 years experience a mental disorder each year. The impact of social media, academic pressure, and societal expectations are frequently cited as significant contributors. <strong class="font-bold">Early intervention and accessible support services are crucial</strong>, yet many young individuals face barriers such as stigma, lack of awareness about available help, or long waiting lists for services.</p>
                <p>Furthermore, the transition from adolescence to adulthood presents unique challenges. Young people navigating changes in education, employment, and personal relationships may experience heightened stress and anxiety. <em class="italic">Community-based programs that foster resilience and coping skills have shown promising results</em> in mitigating some of these negative impacts.</p>
                <p><strong>Source 2: Physical Activity Guidelines Extract</strong></p>
                <p>National guidelines recommend that young people aged 13–17 years should accumulate at least 60 minutes of moderate to vigorous intensity physical activity every day. Regular physical activity is linked to improved physical health, better mental wellbeing, and enhanced cognitive function. However, current data suggests that <strong class="font-bold">only a small percentage of Australian youth are meeting these guidelines</strong>. Factors such as increased screen time, reliance on passive transport, and limited access to safe recreational spaces in some communities contribute to this trend. Encouraging participation in a variety of enjoyable physical activities is key.</p>
            </div>
            <div id="comment-display-area" class="mt-4"></div>
        </div>
    `;
}
