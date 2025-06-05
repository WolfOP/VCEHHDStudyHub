let annotationSpanCounter = 0; 

export function InteractiveAnnotationComponent() {
    setTimeout(() => {
        // Get DOM elements specific to *this* annotation component instance
        const componentRoot = document.getElementById('annotation-interface');
        if (!componentRoot) {
            // console.error("Annotation component root 'annotation-interface' not found.");
            return; 
        }

        // CORRECTED: Declare all variables ONCE here
        const stimulusArea = componentRoot.querySelector('#stimulus-content-area');
        const highlightButton = componentRoot.querySelector('#highlight-btn');
        const underlineButton = componentRoot.querySelector('#underline-btn');
        const commentButton = componentRoot.querySelector('#comment-btn');
        const canvas = componentRoot.querySelector('#annotation-canvas');
        const stimulusWrapper = componentRoot.querySelector('#stimulus-wrapper');
        const toggleDrawingButton = componentRoot.querySelector('#toggle-drawing-btn');
        const drawConnectorButton = componentRoot.querySelector('#draw-connector-btn'); // Make sure ID in HTML is 'draw-connector-btn'
        const clearDrawingButton = componentRoot.querySelector('#clear-drawing-btn');
        
        const deconCommandWordsInput = document.getElementById('decon-command-words');
        const deconKeyConceptsInput = document.getElementById('decon-key-concepts');
        const deconContentAreasInput = document.getElementById('decon-content-areas');
        const deconConstraintsInput = document.getElementById('decon-constraints');

        let currentTooltip = null;
        let ctx = null;
        let drawingModeActive = false;
        let connectorModeActive = false; 
        let isDrawing = false;
        let lastX, lastY;
        let currentConnectorPoints = []; 

        if (!stimulusArea || !canvas || !stimulusWrapper || !toggleDrawingButton || !drawConnectorButton || !clearDrawingButton) {
            console.error("One or more required elements for annotation/drawing functionality not found within 'annotation-interface'.");
            // It's possible highlightButton, underlineButton, commentButton might also be null if the HTML isn't fully ready.
            // Consider checking them too if issues persist with those specific buttons.
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
            try { range.surroundContents(span); }
            catch (e) {
                span.appendChild(range.extractContents());
                range.insertNode(span);
                console.warn("Complex selection for annotation, used extract/insert fallback.", e);
            }
            selection.removeAllRanges();
        };

        const addCommentToSelection = () => {
            const selection = window.getSelection();
            if (!selection.rangeCount || selection.isCollapsed) { alert("Please select text to comment on."); return; }
            const range = selection.getRangeAt(0);
            if (!stimulusArea.contains(range.commonAncestorContainer)) {
                alert("Please select text within the stimulus content area only.");
                return;
            }
            const commentText = prompt("Enter your comment:");
            if (commentText && commentText.trim() !== "") {
                const span = document.createElement('span');
                span.id = `annotation-${annotationSpanCounter++}`;
                span.className = 'commented-text';
                span.dataset.comment = commentText;
                try { range.surroundContents(span); }
                catch (e) {
                    span.appendChild(range.extractContents());
                    range.insertNode(span);
                    console.warn("Complex selection for comment, used extract/insert fallback.", e);
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
            tooltip.className = 'annotation-tooltip'; // Ensure this class is defined in style.css
            tooltip.textContent = comment;
            document.body.appendChild(tooltip); // Append to body to avoid clipping issues
            currentTooltip = tooltip;
            const rect = targetSpan.getBoundingClientRect();
            // Position tooltip near the mouse/element more reliably
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        };

        const hideTooltip = () => {
            if (currentTooltip) { currentTooltip.remove(); currentTooltip = null; }
        };

        const addCommentEventListeners = (element) => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        };

        if (highlightButton) highlightButton.addEventListener('click', () => applyAnnotation('highlighted-text'));
        if (underlineButton) underlineButton.addEventListener('click', () => applyAnnotation('underlined-text'));
        if (commentButton) commentButton.addEventListener('click', addCommentToSelection);
        
        // Attach listeners to any pre-existing comments when component loads/re-renders
        stimulusArea.querySelectorAll('.commented-text').forEach(addCommentEventListeners);
        
        // Deconstruction input listeners are now handled by Unit3SAC2PrepComponent which has the save logic

        const initializeCanvas = () => {
            const contentHolder = stimulusArea.querySelector('div'); // Assuming stimulus is wrapped
            if (canvas && stimulusArea && contentHolder) {
                canvas.width = contentHolder.scrollWidth;
                canvas.height = contentHolder.scrollHeight;
                ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; 
                    ctx.lineWidth = 2; 
                    ctx.lineJoin = 'round'; 
                    ctx.lineCap = 'round';
                } else { console.error("Failed to get 2D context for annotation canvas."); }
            } else {
                // console.warn("Annotation canvas or stimulus content not fully ready for initCanvas.");
            }
        };
        
        const activateAnnotationDrawingMode = (activate) => {
            drawingModeActive = activate;
            if (canvas) canvas.style.pointerEvents = activate ? 'auto' : 'none';
            if (stimulusArea) stimulusArea.style.userSelect = activate ? 'none' : 'auto';
            if (toggleDrawingButton) {
                toggleDrawingButton.classList.toggle('bg-green-600', activate);
                toggleDrawingButton.classList.toggle('bg-red-500', !activate); 
                toggleDrawingButton.textContent = activate ? "Drawing ON" : "Toggle Drawing";
            }
            if (activate) {
                activateAnnotationConnectorMode(false); // Deactivate THIS component's connector mode
            }
        };

        const activateAnnotationConnectorMode = (activate) => {
            connectorModeActive = activate;
            currentConnectorPoints = []; 
            if (canvas) canvas.style.pointerEvents = activate ? 'auto' : 'none';
            if (stimulusArea) stimulusArea.style.userSelect = activate ? 'none' : 'auto';
            if (drawConnectorButton) {
                drawConnectorButton.classList.toggle('bg-green-600', activate);
                drawConnectorButton.classList.toggle('bg-blue-500', !activate); 
                drawConnectorButton.textContent = activate ? "Connecting..." : "Draw Connector";
            }
            if (activate) {
                activateAnnotationDrawingMode(false); // Deactivate THIS component's drawing mode
            }
        };
        
        const drawAnnotationLine = (e) => {
            if (!isDrawing || !drawingModeActive || !ctx) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            ctx.lineTo(x, y); ctx.stroke();
            [lastX, lastY] = [x, y];
        };

        const handleAnnotationCanvasClickForConnector = (e) => {
            if (!connectorModeActive || !ctx) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            currentConnectorPoints.push({ x, y });
            ctx.fillStyle = 'rgba(59, 130, 246, 0.9)'; // Blue for connector points
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
            if (currentConnectorPoints.length === 2) {
                ctx.beginPath(); 
                ctx.moveTo(currentConnectorPoints[0].x, currentConnectorPoints[0].y);
                ctx.lineTo(currentConnectorPoints[1].x, currentConnectorPoints[1].y);
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)'; // Blue for connector line
                ctx.lineWidth = 2; ctx.stroke();
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; // Reset to default drawing color
                currentConnectorPoints = [];
                // Optionally deactivate connector mode after one connection:
                // activateAnnotationConnectorMode(false); 
            }
        };
        
        const clearAnnotationCanvas = () => { 
            if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); 
            currentConnectorPoints = []; // Also clear connector points array
        };

        toggleDrawingButton.addEventListener('click', () => activateAnnotationDrawingMode(!drawingModeActive));
        drawConnectorButton.addEventListener('click', () => activateAnnotationConnectorMode(!connectorModeActive));
        clearDrawingButton.addEventListener('click', clearAnnotationCanvas);

        canvas.addEventListener('mousedown', (e) => {
            if (drawingModeActive && ctx) {
                isDrawing = true; 
                const rect = canvas.getBoundingClientRect();
                [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
                ctx.beginPath(); 
                ctx.moveTo(lastX, lastY);
            } else if (connectorModeActive) { 
                handleAnnotationCanvasClickForConnector(e); 
            }
        });
        canvas.addEventListener('mousemove', drawAnnotationLine);
        canvas.addEventListener('mouseup', () => { if(drawingModeActive) isDrawing = false; });
        canvas.addEventListener('mouseout', () => { if(drawingModeActive) isDrawing = false; });
        
        // Initialize canvas after a short delay to ensure stimulus content dimensions are stable
        setTimeout(initializeCanvas, 50); 

        // Resize observer for the stimulus content area
        const contentHolderForResize = stimulusArea.querySelector('div'); // Assuming content is in a direct child div
        if (contentHolderForResize) {
            const resizeObserver = new ResizeObserver(() => {
                // console.log("Annotation stimulus content resized, re-initializing canvas.");
                clearAnnotationCanvas();
                initializeCanvas();
            });
            resizeObserver.observe(contentHolderForResize);
        } else {
            // console.warn("Could not find content holder for resize observer in annotation tool.");
        }

     }, 200); // Keep the timeout

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
                <div id="sac-question-display" class="p-3 bg-slate-700 rounded min-h-[100px]">
                     <h4 class="text-lg font-medium text-purple-200 mb-1">Sample SAC Question:</h4>
                     <p class="text-slate-300 text-sm">Loading question...</p>
                </div>
                <div id="sac-question-deconstruction-area" class="p-3 bg-slate-700 rounded">
                    <h4 class="text-lg font-medium text-purple-200 mb-2">Deconstruct the Question:</h4>
                    <div class="space-y-3">
                        <div><label for="decon-command-words" class="block text-xs font-medium text-slate-300 mb-1">Command Word(s):</label><input type="text" id="decon-command-words" name="decon-command-words" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Analyse, Explain..."></div>
                        <div><label for="decon-key-concepts" class="block text-xs font-medium text-slate-300 mb-1">Key Concepts:</label><textarea id="decon-key-concepts" name="decon-key-concepts" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Health and wellbeing..."></textarea></div>
                        <div><label for="decon-content-areas" class="block text-xs font-medium text-slate-300 mb-1">Required Content Areas (from Study Design):</label><textarea id="decon-content-areas" name="decon-content-areas" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Factors influencing h&w..."></textarea></div>
                        <div><label for="decon-constraints" class="block text-xs font-medium text-slate-300 mb-1">Constraints/Specifics:</label><textarea id="decon-constraints" name="decon-constraints" rows="2" class="deconstruction-input w-full p-2 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 placeholder-slate-400 text-slate-200" placeholder="e.g., Use provided sources..."></textarea></div>
                    </div>
                </div>
            </div>
            <div id="stimulus-wrapper" class="relative border border-slate-600 rounded min-h-[250px]"> 
                <canvas id="annotation-canvas" class="absolute top-0 left-0 pointer-events-none z-10"></canvas>
                {/* The actual stimulus text will be loaded into a child div of stimulus-content-area by Unit3SAC2PrepComponent */}
                <div id="stimulus-content-area" class="p-3 bg-slate-700/80 rounded h-64 md:h-80 overflow-y-auto text-slate-300 text-sm relative z-0">
                     <h4 class="text-lg font-medium text-purple-200 mb-2">Stimulus Material:</h4>
                     <p class="text-slate-400 italic">Loading stimulus...</p>
                     {/* This initial p tag will be replaced by stimulus HTML */}
                </div>
            </div>
        </div>
   `;
}
