let annotationSpanCounter = 0; 

function getInteractiveAnnotationHTML() {
    // IDs within this HTML are now suffixed with '-annot' for uniqueness
    return `
        <div id="annotation-interface-annot" class="p-4 bg-slate-800 rounded-lg shadow-md my-4"> {/* Root ID */}
            <h2 class="text-2xl font-semibold text-purple-300 mb-4">Interactive Annotation Tool</h2>
            <div id="annotation-toolbar-annot" class="mb-4 p-2 bg-slate-700 rounded flex flex-wrap gap-2">
                <button id="highlight-btn-annot" class="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400 text-sm">Highlight</button>
                <button id="underline-btn-annot" class="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-400 text-sm">Underline</button>
                <button id="comment-btn-annot" class="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-400 text-sm">Comment</button>
                <button id="toggle-drawing-btn-annot" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 text-sm">Toggle Drawing</button>
                <button id="draw-connector-btn-annot" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 text-sm">Draw Connector</button>
                <button id="clear-drawing-btn-annot" class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm">Clear Drawings</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div id="sac-question-display-annot" class="p-3 bg-slate-700 rounded min-h-[100px]">
                     <h4 class="text-lg font-medium text-purple-200 mb-1">Sample SAC Question:</h4>
                     <p class="text-slate-300 text-sm">Loading question...</p>
                </div>
                <div id="sac-question-deconstruction-area-annot" class="p-3 bg-slate-700 rounded">
                    <h4 class="text-lg font-medium text-purple-200 mb-2">Deconstruct the Question:</h4>
                    <div class="space-y-3">
                        {/* These input IDs are referenced by the parent for saving/loading state */}
                        <div><label for="decon-command-words-annot" class="block text-xs font-medium text-slate-300 mb-1">Command Word(s):</label><input type="text" id="decon-command-words-annot" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Analyse..."></div>
                        <div><label for="decon-key-concepts-annot" class="block text-xs font-medium text-slate-300 mb-1">Key Concepts:</label><textarea id="decon-key-concepts-annot" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Health and wellbeing..."></textarea></div>
                        <div><label for="decon-content-areas-annot" class="block text-xs font-medium text-slate-300 mb-1">Content Areas:</label><textarea id="decon-content-areas-annot" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Factors influencing..."></textarea></div>
                        <div><label for="decon-constraints-annot" class="block text-xs font-medium text-slate-300 mb-1">Constraints:</label><textarea id="decon-constraints-annot" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded" placeholder="e.g., Use sources..."></textarea></div>
                    </div>
                </div>
            </div>
            <div id="stimulus-wrapper-annot" class="relative border border-slate-600 rounded min-h-[250px]"> 
                <canvas id="annotation-canvas-annot" class="absolute top-0 left-0 pointer-events-none z-10"></canvas>
                <div id="stimulus-content-area-annot" class="p-3 bg-slate-700/80 rounded h-64 md:h-80 overflow-y-auto text-slate-300 text-sm relative z-0">
                     <h4 class="text-lg font-medium text-purple-200 mb-2 sr-only">Stimulus Material:</h4>
                     <div id="stimulus-text-holder-annot"> {/* Actual stimulus HTML goes here */}
                        <p class="text-slate-400 italic">Loading stimulus content...</p>
                     </div>
                </div>
            </div>
        </div>
    `;
}

function initInteractiveAnnotationTool(componentRootElement) {
    console.log("initInteractiveAnnotationTool: CALLED with root:", componentRootElement);
    if (!componentRootElement || componentRootElement.id !== 'annotation-interface-annot') {
        console.error("initInteractiveAnnotationTool: ERROR - Valid 'annotation-interface-annot' root element not provided.");
        return; 
    }

    const stimulusArea = componentRootElement.querySelector('#stimulus-content-area-annot');
    const highlightButton = componentRootElement.querySelector('#highlight-btn-annot');
    const underlineButton = componentRootElement.querySelector('#underline-btn-annot');
    const commentButton = componentRootElement.querySelector('#comment-btn-annot');
    const canvas = componentRootElement.querySelector('#annotation-canvas-annot');
    const stimulusWrapper = componentRootElement.querySelector('#stimulus-wrapper-annot');
    const toggleDrawingButton = componentRootElement.querySelector('#toggle-drawing-btn-annot');
    const drawConnectorButton = componentRootElement.querySelector('#draw-connector-btn-annot'); 
    const clearDrawingButton = componentRootElement.querySelector('#clear-drawing-btn-annot');
    const stimulusTextHolder = componentRootElement.querySelector('#stimulus-text-holder-annot');


    let currentTooltip = null;
    let ctx = null;
    let drawingModeActive = false;
    let connectorModeActive = false; 
    let isDrawing = false;
    let lastX, lastY;
    let currentConnectorPoints = []; 

    if (!stimulusArea || !canvas || !stimulusWrapper || !toggleDrawingButton || !drawConnectorButton || !clearDrawingButton || !highlightButton || !underlineButton || !commentButton || !stimulusTextHolder) {
        console.warn("initInteractiveAnnotationTool: One or more child elements missing. Functionality may be limited.", {stimulusArea, canvas, highlightButton});
    }
    
    // Ensure this is available globally if parent needs to call it after updating stimulus HTML
    window.reAttachAnnotationCommentListeners = () => {
        const currentStimulusTextHolder = document.getElementById('stimulus-text-holder-annot'); // Re-fetch in case of re-render
        if (currentStimulusTextHolder) {
            currentStimulusTextHolder.querySelectorAll('.commented-text').forEach(addCommentEventListeners);
        }
    };

    const applyAnnotation = (styleClass) => {
        if (!stimulusTextHolder) return;
        const selection = window.getSelection();
        if (!selection.rangeCount || selection.isCollapsed) return;
        const range = selection.getRangeAt(0);
        if (!stimulusTextHolder.contains(range.commonAncestorContainer)) {
            alert("Please select text within the stimulus material only."); return;
        }
        const span = document.createElement('span');
        span.id = `annot-span-${annotationSpanCounter++}`;
        span.className = styleClass;
        try { range.surroundContents(span); }
        catch (e) {
            try { span.appendChild(range.extractContents()); range.insertNode(span); }
            catch (e2) { console.error("Failed to apply annotation:", e2); alert("Could not apply annotation."); }
        }
        selection.removeAllRanges();
    };

    const addCommentToSelection = () => {
        if (!stimulusTextHolder) return;
        const selection = window.getSelection();
        if (!selection.rangeCount || selection.isCollapsed) { alert("Please select text to comment on."); return; }
        const range = selection.getRangeAt(0);
        if (!stimulusTextHolder.contains(range.commonAncestorContainer)) {
            alert("Please select text within the stimulus material to comment."); return;
        }
        const commentText = prompt("Enter your comment:");
        if (commentText && commentText.trim() !== "") {
            const span = document.createElement('span');
            span.id = `comment-span-${annotationSpanCounter++}`;
            span.className = 'commented-text'; span.dataset.comment = commentText;
            try { range.surroundContents(span); }
            catch (e) { 
                try { span.appendChild(range.extractContents()); range.insertNode(span); }
                catch (e2) { console.error("Failed to apply comment:", e2); alert("Could not apply comment.");}
            }
            selection.removeAllRanges(); addCommentEventListeners(span);
        }
    };

    const showTooltip = (event) => { /* ... */ 
        if (currentTooltip) currentTooltip.remove();
        const targetSpan = event.target.closest('.commented-text');
        if (!targetSpan || !targetSpan.dataset.comment) return;
        const comment = targetSpan.dataset.comment;
        const tooltip = document.createElement('div');
        tooltip.className = 'annotation-tooltip'; tooltip.textContent = comment;
        document.body.appendChild(tooltip); currentTooltip = tooltip;
        tooltip.style.left = `${event.pageX + 10}px`; tooltip.style.top = `${event.pageY + 10}px`;
    };
    const hideTooltip = () => { /* ... */ if (currentTooltip) { currentTooltip.remove(); currentTooltip = null; } };
    const addCommentEventListeners = (element) => { /* ... */ element.addEventListener('mouseenter', showTooltip); element.addEventListener('mouseleave', hideTooltip); };

    if (highlightButton) highlightButton.addEventListener('click', () => applyAnnotation('highlighted-text'));
    if (underlineButton) underlineButton.addEventListener('click', () => applyAnnotation('underlined-text'));
    if (commentButton) commentButton.addEventListener('click', addCommentToSelection);
    
    if (stimulusTextHolder) stimulusTextHolder.querySelectorAll('.commented-text').forEach(addCommentEventListeners);
    
    const initializeCanvas = () => {
        if (!canvas || !stimulusTextHolder) { console.warn("Annotation canvas or stimulus text holder not ready for initCanvas."); return; }
        canvas.width = stimulusTextHolder.offsetWidth; 
        canvas.height = stimulusTextHolder.offsetHeight; 
        ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        } else { console.error("Annotation tool: Failed to get 2D context."); }
    };
    
    const activateAnnotationDrawingMode = (activate) => { /* ... */ 
        drawingModeActive = activate;
        if (canvas) canvas.style.pointerEvents = activate ? 'auto' : 'none';
        if (stimulusTextHolder) stimulusTextHolder.style.userSelect = activate ? 'none' : 'auto'; 
        if (toggleDrawingButton) {
            toggleDrawingButton.classList.toggle('bg-green-600', activate);
            toggleDrawingButton.classList.toggle('bg-red-500', !activate); 
            toggleDrawingButton.textContent = activate ? "Drawing ON" : "Toggle Drawing";
        }
        if (activate && typeof activateAnnotationConnectorMode === 'function') activateAnnotationConnectorMode(false); 
    };
    const activateAnnotationConnectorMode = (activate) => { /* ... */ 
        connectorModeActive = activate; currentConnectorPoints = []; 
        if (canvas) canvas.style.pointerEvents = activate ? 'auto' : 'none';
        if (stimulusTextHolder) stimulusTextHolder.style.userSelect = activate ? 'none' : 'auto';
        if (drawConnectorButton) {
            drawConnectorButton.classList.toggle('bg-green-600', activate);
            drawConnectorButton.classList.toggle('bg-blue-500', !activate); 
            drawConnectorButton.textContent = activate ? "Connecting..." : "Draw Connector";
        }
        if (activate && typeof activateAnnotationDrawingMode === 'function') activateAnnotationDrawingMode(false); 
    };
    
    const drawAnnotationLine = (e) => { /* ... */ 
        if (!isDrawing || !drawingModeActive || !ctx || !canvas) return;
        const rect = canvas.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        ctx.lineTo(x, y); ctx.stroke(); [lastX, lastY] = [x, y];
    };
    const handleAnnotationCanvasClickForConnector = (e) => { /* ... */ 
        if (!connectorModeActive || !ctx || !canvas) return;
        const rect = canvas.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        currentConnectorPoints.push({ x, y });
        ctx.fillStyle = 'rgba(59, 130, 246, 0.9)'; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
        if (currentConnectorPoints.length === 2) {
            ctx.beginPath(); ctx.moveTo(currentConnectorPoints[0].x, currentConnectorPoints[0].y);
            ctx.lineTo(currentConnectorPoints[1].x, currentConnectorPoints[1].y);
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)'; ctx.lineWidth = 2; ctx.stroke();
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; currentConnectorPoints = [];
        }
    };
    const clearAnnotationCanvas = () => { /* ... */ if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); currentConnectorPoints = []; };

    if (toggleDrawingButton) toggleDrawingButton.addEventListener('click', () => activateAnnotationDrawingMode(!drawingModeActive));
    if (drawConnectorButton) drawConnectorButton.addEventListener('click', () => activateAnnotationConnectorMode(!connectorModeActive));
    if (clearDrawingButton) clearDrawingButton.addEventListener('click', clearAnnotationCanvas);

    if (canvas){
        canvas.addEventListener('mousedown', (e) => {
            if (drawingModeActive && ctx) {
                isDrawing = true; const rect = canvas.getBoundingClientRect();
                [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
                ctx.beginPath(); ctx.moveTo(lastX, lastY);
            } else if (connectorModeActive) { handleAnnotationCanvasClickForConnector(e); }
        });
        canvas.addEventListener('mousemove', drawAnnotationLine);
        canvas.addEventListener('mouseup', () => { if(drawingModeActive) isDrawing = false; });
        canvas.addEventListener('mouseout', () => { if(drawingModeActive) isDrawing = false; });
    }
    
    initializeCanvas(); // Call once after elements are fetched

    if (stimulusTextHolder) { // Observe the actual text holder for resize
        const resizeObserver = new ResizeObserver(() => {
            // console.log("Annotation stimulus TEXT HOLDER resized, re-initializing canvas.");
            clearAnnotationCanvas();
            initializeCanvas();
        });
        resizeObserver.observe(stimulusTextHolder);
    }
    console.log("initInteractiveAnnotationTool: Setup COMPLETE.");
}

export { getInteractiveAnnotationHTML, initInteractiveAnnotationTool };
