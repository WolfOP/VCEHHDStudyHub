// --- State variables scoped to this module ---
let nodes = [];
let connections = [];
let nodeIdCounter = 0;
let selectedNodeForConnection = null;
let connectingModeActive = false;
let teelPlanData = [];
const MAPPING_STORAGE_KEY = 'mappingToolData_U3SAC2_v2_Refactored'; // Changed key for fresh test

// This function returns the HTML structure for the mapping tool
export function getInteractiveMappingHTML() {
    // Added '-map' suffix to all IDs within this component's HTML to ensure uniqueness
    return `
        <div id="mapping-tool-wrapper" class="p-4 bg-slate-800 rounded-lg shadow-md my-4">
            <h2 class="text-2xl font-semibold text-purple-300 mb-4">Interactive Relationship Mapping & Planning Tool</h2>
            <div id="mapping-toolbar-map" class="mb-3 flex flex-wrap gap-2 items-center">
                <button id="add-node-btn-map" class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-500 text-sm">Add Node</button>
                <button id="connect-nodes-btn-map" class="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm">Connect Nodes</button>
                <button id="clear-mapping-data-btn-map" class="px-3 py-1.5 bg-red-700 text-white rounded hover:bg-red-600 text-sm">Clear All Mapping Data</button>
            </div>
            <p id="mapping-tool-message-map" class="text-sm text-purple-300 h-5 mb-2"></p>
            <div id="mapping-tool-container-map" class="relative w-full h-[400px] md:h-[500px] border border-slate-600 rounded-lg bg-slate-800/50 overflow-hidden mb-6 shadow-inner">
                <canvas id="mapping-canvas-map" class="absolute top-0 left-0 w-full h-full z-0"></canvas>
                <div id="mapping-nodes-container-map" class="absolute top-0 left-0 w-full h-full z-10">
                    {/* Nodes will be appended here */}
                </div>
            </div>
            <div id="teel-planner-section-map" class="p-4 bg-slate-800/70 rounded-lg shadow-inner mt-6 border border-slate-700">
                <h3 class="text-xl font-semibold text-purple-300 mb-3">TEEL Paragraph Planner</h3>
                <div id="teel-toolbar-map" class="mb-3 flex space-x-2">
                    <button id="add-teel-paragraph-btn-map" class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-500 text-sm">Add Paragraph</button>
                    <button id="remove-teel-paragraph-btn-map" class="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-500 text-sm">Remove Last Paragraph</button>
                </div>
                <div id="teel-paragraphs-container-map" class="space-y-4 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-2">
                    {/* TEEL paragraph blocks will be rendered here */}
                </div>
            </div>
        </div>
    `;
}

// This function initializes the JavaScript logic for the mapping tool.
// It now ACCEPTS the root element of the mapping tool as an argument.
export function initInteractiveMappingTool(componentWrapperElement) {
    console.log("initInteractiveMappingTool: Function CALLED, wrapper received:", componentWrapperElement);

    if (!componentWrapperElement || componentWrapperElement.id !== 'mapping-tool-wrapper') {
        console.error("initInteractiveMappingTool: ERROR - Valid 'mapping-tool-wrapper' (root of this component's HTML) not provided. Tool cannot initialize.");
        const parentMappingContainer = document.getElementById('mapping-component-container'); // Fallback for error display
        if(parentMappingContainer) {
            parentMappingContainer.innerHTML = '<p class="text-red-500 text-center p-4">Error: Mapping tool could not load (wrapper element issue).</p>';
        }
        return;
    }
    console.log("initInteractiveMappingTool: Correct 'mapping-tool-wrapper' FOUND.");

    // Select elements *within* the passed componentWrapperElement using their new unique IDs
    const mappingContainer = componentWrapperElement.querySelector('#mapping-tool-container-map');
    const nodesContainer = componentWrapperElement.querySelector('#mapping-nodes-container-map');
    const canvas = componentWrapperElement.querySelector('#mapping-canvas-map');
    const addNodeButton = componentWrapperElement.querySelector('#add-node-btn-map');
    const connectNodesButton = componentWrapperElement.querySelector('#connect-nodes-btn-map');
    const teelParagraphsContainer = componentWrapperElement.querySelector('#teel-paragraphs-container-map');
    const addTeelParagraphButton = componentWrapperElement.querySelector('#add-teel-paragraph-btn-map');
    const removeTeelParagraphButton = componentWrapperElement.querySelector('#remove-teel-paragraph-btn-map');
    const mappingToolMessageEl = componentWrapperElement.querySelector('#mapping-tool-message-map');
    const clearMappingDataButton = componentWrapperElement.querySelector('#clear-mapping-data-btn-map');

    if (!mappingContainer || !nodesContainer || !canvas || !addNodeButton || !connectNodesButton || !teelParagraphsContainer || !addTeelParagraphButton || !removeTeelParagraphButton || !clearMappingDataButton || !mappingToolMessageEl) {
        console.error("initInteractiveMappingTool: One or more essential child elements not found within 'mapping-tool-wrapper'. Check IDs. Elements found:", 
            {mappingContainer, nodesContainer, canvas, addNodeButton, connectNodesButton, teelParagraphsContainer, addTeelParagraphButton, removeTeelParagraphButton, clearMappingDataButton, mappingToolMessageEl });
        componentWrapperElement.innerHTML = '<p class="text-red-500 text-center p-4">Error: Mapping tool child elements missing.</p>';
        return;
    }
    console.log("initInteractiveMappingTool: All child elements FOUND successfully.");

    const showMappingMessage = (message, duration = 3000) => {
        mappingToolMessageEl.textContent = message;
        if (duration > 0) {
            setTimeout(() => {
                if (mappingToolMessageEl && mappingToolMessageEl.textContent === message) mappingToolMessageEl.textContent = '';
            }, duration);
        }
    };

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("initInteractiveMappingTool: Failed to get 2D context from canvas.");
        showMappingMessage("Error: Canvas rendering failed.", 0);
        return;
    }
    console.log("initInteractiveMappingTool: Canvas context obtained.");

    // Reset state variables for this instance
    nodes = []; connections = []; nodeIdCounter = 0;
    selectedNodeForConnection = null; connectingModeActive = false; teelPlanData = [];

    const resizeCanvas = () => {
        if (!mappingContainer || !canvas) return;
        canvas.width = mappingContainer.offsetWidth;
        canvas.height = mappingContainer.offsetHeight;
        drawConnections();
    };

    const drawConnections = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2; ctx.lineCap = "round";
        connections.forEach(conn => {
            const fromNodeData = nodes.find(n => n.id === conn.from);
            const toNodeData = nodes.find(n => n.id === conn.to);
            if (fromNodeData && toNodeData) {
                const fromElem = componentWrapperElement.querySelector(`#${fromNodeData.id}`);
                const toElem = componentWrapperElement.querySelector(`#${toNodeData.id}`);
                if(fromElem && toElem){
                    const fromX = fromNodeData.x + fromElem.offsetWidth / 2; const fromY = fromNodeData.y + fromElem.offsetHeight / 2;
                    const toX = toNodeData.x + toElem.offsetWidth / 2; const toY = toNodeData.y + toElem.offsetHeight / 2;
                    ctx.beginPath(); ctx.moveTo(fromX, fromY); ctx.lineTo(toX, toY); ctx.stroke();
                    const angle = Math.atan2(toY - fromY, toX - fromX); const headlen = 10; 
                    ctx.beginPath(); ctx.moveTo(toX, toY);
                    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
                    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
                    ctx.closePath(); ctx.fillStyle = '#a78bfa'; ctx.fill();
                }
            }
        });
    };
    
    const saveMappingData = () => {
         const dataToSave = { nodes, connections, teelPlan: teelPlanData, nodeIdCounter };
        try { localStorage.setItem(MAPPING_STORAGE_KEY, JSON.stringify(dataToSave)); } 
        catch (error) { console.error("Error saving mapping data:", error); showMappingMessage("Error saving data.", 5000); }
    };

    const renderTeelParagraphs = () => {
        if (!teelParagraphsContainer) return;
        teelParagraphsContainer.innerHTML = ''; 
        if (teelPlanData.length === 0) {
            teelParagraphsContainer.innerHTML = '<p class="text-slate-400 text-sm italic">No TEEL paragraphs added yet.</p>';
        }
        teelPlanData.forEach((paraData, index) => {
            const paraNumber = index + 1;
            const paraBlock = document.createElement('div');
            paraBlock.className = 'teel-paragraph-block mb-4 p-3 border border-slate-600 rounded-lg bg-slate-700/50';
            paraBlock.innerHTML = `
                <h4 class="text-lg font-semibold text-purple-200 mb-2">Paragraph ${paraNumber}</h4>
                <div class="space-y-2">
                    <div><label class="block text-xs font-medium text-slate-300">Topic Sentence:</label><textarea data-index="${index}" data-field="topicSentence" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 text-slate-200" rows="2">${paraData.topicSentence || ''}</textarea></div>
                    <div><label class="block text-xs font-medium text-slate-300">Evidence:</label><textarea data-index="${index}" data-field="evidence" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 text-slate-200" rows="3">${paraData.evidence || ''}</textarea></div>
                    <div><label class="block text-xs font-medium text-slate-300">Explanation:</label><textarea data-index="${index}" data-field="explanation" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 text-slate-200" rows="4">${paraData.explanation || ''}</textarea></div>
                    <div><label class="block text-xs font-medium text-slate-300">Link:</label><textarea data-index="${index}" data-field="link" class="teel-input w-full p-1 text-xs bg-slate-600 border border-slate-500 rounded focus:border-purple-500 focus:ring-purple-500 text-slate-200" rows="2">${paraData.link || ''}</textarea></div>
                </div>`;
            teelParagraphsContainer.appendChild(paraBlock);
        });
        teelParagraphsContainer.querySelectorAll('.teel-input').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                if (teelPlanData[index] !== undefined) { 
                    teelPlanData[index][field] = e.target.value;
                    saveMappingData(); 
                }
            });
        });
    };
    
    const attachNodeEventListeners = (nodeElement, nodeData, textElement) => {
        let isDragging = false; let dragOffsetX, dragOffsetY;
        nodeElement.addEventListener('mousedown', (e) => {
            if (e.target === textElement && !connectingModeActive) return;
            if (connectingModeActive) {
                e.stopPropagation(); const targetNodeId = nodeElement.id; 
                if (selectedNodeForConnection === null) {
                    selectedNodeForConnection = targetNodeId; nodeElement.classList.add('ring-2', 'ring-green-500');
                    showMappingMessage("Node 1 selected. Click another node to connect.", 0);
                } else if (selectedNodeForConnection !== targetNodeId) {
                    const connExists = connections.some(c => (c.from === selectedNodeForConnection && c.to === targetNodeId) || (c.from === targetNodeId && c.to === selectedNodeForConnection));
                    if (!connExists) connections.push({ from: selectedNodeForConnection, to: targetNodeId });
                    else showMappingMessage("Connection already exists.", 2000);
                    componentWrapperElement.querySelector(`#${selectedNodeForConnection}`)?.classList.remove('ring-2', 'ring-green-500');
                    selectedNodeForConnection = null; connectingModeActive = false;
                    if(connectNodesButton) { connectNodesButton.classList.remove('bg-green-600'); connectNodesButton.classList.add('bg-blue-600'); connectNodesButton.textContent = "Connect Nodes"; }
                    showMappingMessage(connExists ? "Connection already exists." : "Connection created. Connector mode off.", 2000);
                    drawConnections(); saveMappingData();
                } return;
            }
            isDragging = true; dragOffsetX = e.clientX - nodeElement.getBoundingClientRect().left; dragOffsetY = e.clientY - nodeElement.getBoundingClientRect().top;
            nodeElement.classList.add('shadow-xl', 'border-purple-300', 'z-20'); e.preventDefault();
        });
        // Mousemove and Mouseup listeners should be on 'document' or 'componentWrapperElement' to handle dragging outside the node.
        // Sticking to document for simplicity for now, but be mindful of event listener cleanup if component is removed.
        const onMouseMove = (e) => { 
            if (!isDragging || !mappingContainer || !nodeElement) return;
            let newX = e.clientX - mappingContainer.getBoundingClientRect().left - dragOffsetX;
            let newY = e.clientY - mappingContainer.getBoundingClientRect().top - dragOffsetY;
            newX = Math.max(0, Math.min(newX, mappingContainer.offsetWidth - nodeElement.offsetWidth));
            newY = Math.max(0, Math.min(newY, mappingContainer.offsetHeight - nodeElement.offsetHeight));
            nodeElement.style.left = `${newX}px`; nodeElement.style.top = `${newY}px`;
            nodeData.x = newX; nodeData.y = newY; drawConnections();
        };
        const onMouseUp = () => { 
            if (isDragging) { isDragging = false; nodeElement.classList.remove('shadow-xl', 'border-purple-300', 'z-20'); saveMappingData(); }
            document.removeEventListener('mousemove', onMouseMove); // Clean up
            document.removeEventListener('mouseup', onMouseUp);   // Clean up
        };
        if(isDragging) { // Add these only when dragging starts
             document.addEventListener('mousemove', onMouseMove);
             document.addEventListener('mouseup', onMouseUp);
        }


        textElement.addEventListener('blur', () => { nodeData.content = textElement.textContent; saveMappingData(); });
        textElement.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); textElement.blur(); }});
    };

    const internalCreateNodeSetup = (x = 50, y = 50, content = 'New Node', existingId = null) => {
        const newIdSuffix = ++nodeIdCounter; 
        const nodeId = existingId || `map-node-map-${newIdSuffix}`; 
        if (!existingId) {
            const numericIdFromSuffix = newIdSuffix;
            if (numericIdFromSuffix > nodeIdCounter) nodeIdCounter = numericIdFromSuffix;
        } else { 
            const parts = existingId.split('-');
            const num = parseInt(parts[parts.length - 1]);
            if (!isNaN(num) && num > nodeIdCounter) nodeIdCounter = num;
        }
        const nodeElement = document.createElement('div'); nodeElement.id = nodeId;
        nodeElement.className = 'p-3 bg-slate-700 border border-purple-500 rounded shadow-lg absolute cursor-move min-w-[120px] min-h-[60px] text-xs text-slate-200 flex flex-col justify-center items-center transition-all duration-100';
        nodeElement.style.left = `${x}px`; nodeElement.style.top = `${y}px`;
        const textElement = document.createElement('div'); textElement.contentEditable = "true";
        textElement.className = "w-full h-full outline-none focus:ring-1 focus:ring-purple-400 p-1";
        textElement.textContent = content; nodeElement.appendChild(textElement);
        if(nodesContainer) nodesContainer.appendChild(nodeElement);
        const newNodeData = { id: nodeId, x, y, content };
        const existingNodeIndex = nodes.findIndex(n => n.id === nodeId);
        if (existingNodeIndex === -1) { nodes.push(newNodeData); } 
        else { nodes[existingNodeIndex] = newNodeData; }
        attachNodeEventListeners(nodeElement, newNodeData, textElement); // Pass textElement
        return newNodeData;
    };
    
    const recreateNodeElement = (nodeData) => { 
        internalCreateNodeSetup(nodeData.x, nodeData.y, nodeData.content, nodeData.id);
    };

    const createNodeAndSave = (x = 50, y = 50, content = 'New Node') => {
        internalCreateNodeSetup(x,y,content);
        saveMappingData();
    };

    const loadMappingData = () => { 
        const savedData = localStorage.getItem(MAPPING_STORAGE_KEY);
        if (savedData) {
            try {
                const data = JSON.parse(savedData); nodes = data.nodes || []; 
                if(nodesContainer) nodesContainer.innerHTML = ''; 
                nodes.forEach(nodeData => { recreateNodeElement(nodeData); });
                connections = data.connections || []; teelPlanData = data.teelPlan || [];
                nodeIdCounter = data.nodeIdCounter || 0;
                drawConnections(); renderTeelParagraphs(); 
                showMappingMessage("Saved mapping data loaded.", 2000); return true;
            } catch (e) { console.error("Error parsing saved mapping data:", e); localStorage.removeItem(MAPPING_STORAGE_KEY); return false; }
        } return false;
    };

    const clearAllMappingData = () => { 
        if (confirm("Are you sure you want to clear all your saved mapping data?")) {
            localStorage.removeItem(MAPPING_STORAGE_KEY);
            nodes = []; connections = []; teelPlanData = []; nodeIdCounter = 0;
            if(nodesContainer) nodesContainer.innerHTML = '';
            drawConnections(); renderTeelParagraphs();
            createNodeAndSave(50, 50, "Central Idea"); 
            createNodeAndSave(250, 150, "Related Concept");
            showMappingMessage("All mapping data cleared.", 2000);
        }
    };

    // Event listeners
    if(addNodeButton) addNodeButton.addEventListener('click', () => createNodeAndSave(Math.random()*50 + 20, Math.random()*50 + 20));
    if(connectNodesButton) {
        connectNodesButton.addEventListener('click', () => {
            connectingModeActive = !connectingModeActive;
            connectNodesButton.classList.toggle('bg-green-600', connectingModeActive);
            connectNodesButton.classList.toggle('bg-blue-600', !connectingModeActive); 
            connectNodesButton.textContent = connectingModeActive ? "Connecting (Select Nodes)" : "Connect Nodes";
            showMappingMessage(connectingModeActive ? "Connector mode ON. Click first node." : "Connector mode OFF.", connectingModeActive ? 0 : 2000);
            if (!connectingModeActive && selectedNodeForConnection) { 
                componentWrapperElement.querySelector(`#${selectedNodeForConnection}`)?.classList.remove('ring-2', 'ring-green-500');
                selectedNodeForConnection = null;
            }
        });
    }
    if(clearMappingDataButton) clearMappingDataButton.addEventListener('click', clearAllMappingData);
    if (addTeelParagraphButton) { addTeelParagraphButton.addEventListener('click', () => { teelPlanData.push({ topicSentence: '', evidence: '', explanation: '', link: '' }); renderTeelParagraphs(); saveMappingData(); }); }
    if (removeTeelParagraphButton) { removeTeelParagraphButton.addEventListener('click', () => { if (teelPlanData.length > 0) { teelPlanData.pop(); renderTeelParagraphs(); saveMappingData(); } else { showMappingMessage("No paragraphs to remove.", 2000); } }); }

    // Initial Setup Calls
    resizeCanvas(); 
    window.addEventListener('resize', resizeCanvas);
    if (!loadMappingData()) { renderTeelParagraphs(); createNodeAndSave(50, 50, "Central Idea"); createNodeAndSave(250, 150, "Related Concept");} 
    else { requestAnimationFrame(resizeCanvas); } // Ensure canvas resizes after loaded nodes are placed
    console.log("initInteractiveMappingTool: Setup COMPLETE.");
}
