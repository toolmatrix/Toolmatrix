/**
 * ToolMatrix Workflow Builder
 * iLovePDF-style drag & drop workflow builder
 */

// ========== TOOL DEFINITIONS ==========
const TOOLS = {
    // PDF Tools
    'pdf-compress': {
        name: 'Compress PDF',
        icon: 'fas fa-compress',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Reduce PDF file size while maintaining quality',
        settings: [
            { key: 'quality', label: 'Quality', type: 'range', min: 10, max: 100, default: 75, unit: '%' },
            { key: 'mode', label: 'Compression Mode', type: 'select', options: ['Recommended', 'Maximum', 'Minimum'], default: 'Recommended' }
        ]
    },
    'pdf-merge': {
        name: 'Merge PDF',
        icon: 'fas fa-object-group',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Combine multiple PDF files into one',
        settings: [
            { key: 'order', label: 'Merge Order', type: 'select', options: ['As uploaded', 'Alphabetical', 'Reverse'], default: 'As uploaded' }
        ]
    },
    'pdf-split': {
        name: 'Split PDF',
        icon: 'fas fa-cut',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Extract specific pages from PDF',
        settings: [
            { key: 'mode', label: 'Split Mode', type: 'select', options: ['All pages', 'Page ranges', 'Fixed range'], default: 'All pages' },
            { key: 'pages', label: 'Pages (e.g. 1-3, 5)', type: 'text', default: '' }
        ]
    },
    'pdf-to-jpg': {
        name: 'PDF to JPG',
        icon: 'fas fa-image',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Convert PDF pages to JPG images',
        settings: [
            { key: 'quality', label: 'Image Quality', type: 'range', min: 10, max: 100, default: 85, unit: '%' },
            { key: 'dpi', label: 'DPI', type: 'select', options: ['72', '150', '300'], default: '150' }
        ]
    },
    'jpg-to-pdf': {
        name: 'JPG to PDF',
        icon: 'fas fa-file-pdf',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Convert images to PDF document',
        settings: [
            { key: 'pageSize', label: 'Page Size', type: 'select', options: ['A4', 'Letter', 'Legal', 'Fit image'], default: 'A4' },
            { key: 'orientation', label: 'Orientation', type: 'select', options: ['Portrait', 'Landscape', 'Auto'], default: 'Auto' }
        ]
    },
    'pdf-protect': {
        name: 'Protect PDF',
        icon: 'fas fa-lock',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Add password protection to PDF',
        settings: [
            { key: 'password', label: 'Password', type: 'text', default: '' },
            { key: 'allowPrinting', label: 'Allow Printing', type: 'select', options: ['Yes', 'No'], default: 'Yes' }
        ]
    },
    'pdf-unlock': {
        name: 'Unlock PDF',
        icon: 'fas fa-unlock',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Remove password from PDF',
        settings: [
            { key: 'password', label: 'Current Password', type: 'text', default: '' }
        ]
    },
    'pdf-rotate': {
        name: 'Rotate PDF',
        icon: 'fas fa-sync-alt',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Rotate PDF pages',
        settings: [
            { key: 'angle', label: 'Rotation', type: 'select', options: ['90° Clockwise', '180°', '90° Counter-clockwise'], default: '90° Clockwise' },
            { key: 'pages', label: 'Apply to', type: 'select', options: ['All pages', 'Even pages', 'Odd pages'], default: 'All pages' }
        ]
    },
    'pdf-watermark': {
        name: 'Add Watermark',
        icon: 'fas fa-tint',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Add text or image watermark',
        settings: [
            { key: 'text', label: 'Watermark Text', type: 'text', default: 'CONFIDENTIAL' },
            { key: 'opacity', label: 'Opacity', type: 'range', min: 10, max: 100, default: 30, unit: '%' },
            { key: 'position', label: 'Position', type: 'select', options: ['Center', 'Diagonal', 'Top', 'Bottom'], default: 'Diagonal' }
        ]
    },
    'pdf-pagenumber': {
        name: 'Page Numbers',
        icon: 'fas fa-sort-numeric-down',
        color: '#e74c3c',
        category: 'pdf',
        description: 'Add page numbers to PDF',
        settings: [
            { key: 'position', label: 'Position', type: 'select', options: ['Bottom Center', 'Bottom Right', 'Top Center', 'Top Right'], default: 'Bottom Center' },
            { key: 'startFrom', label: 'Start From', type: 'text', default: '1' }
        ]
    },
    // Image Tools
    'img-compress': {
        name: 'Compress Image',
        icon: 'fas fa-compress-arrows-alt',
        color: '#3498db',
        category: 'image',
        description: 'Reduce image file size',
        settings: [
            { key: 'quality', label: 'Quality', type: 'range', min: 10, max: 100, default: 75, unit: '%' }
        ]
    },
    'img-resize': {
        name: 'Resize Image',
        icon: 'fas fa-expand-arrows-alt',
        color: '#3498db',
        category: 'image',
        description: 'Change image dimensions',
        settings: [
            { key: 'width', label: 'Width (px)', type: 'text', default: '800' },
            { key: 'height', label: 'Height (px)', type: 'text', default: '600' },
            { key: 'maintainRatio', label: 'Maintain Ratio', type: 'select', options: ['Yes', 'No'], default: 'Yes' }
        ]
    },
    'img-crop': {
        name: 'Crop Image',
        icon: 'fas fa-crop-alt',
        color: '#3498db',
        category: 'image',
        description: 'Crop your images',
        settings: [
            { key: 'ratio', label: 'Aspect Ratio', type: 'select', options: ['Free', '1:1', '4:3', '16:9', '3:2'], default: 'Free' }
        ]
    },
    'img-convert': {
        name: 'Convert Format',
        icon: 'fas fa-exchange-alt',
        color: '#3498db',
        category: 'image',
        description: 'Convert image format',
        settings: [
            { key: 'format', label: 'Output Format', type: 'select', options: ['PNG', 'JPG', 'WEBP', 'GIF', 'BMP'], default: 'PNG' }
        ]
    },
    'img-watermark': {
        name: 'Image Watermark',
        icon: 'fas fa-stamp',
        color: '#3498db',
        category: 'image',
        description: 'Add watermark to images',
        settings: [
            { key: 'text', label: 'Watermark Text', type: 'text', default: '© ToolMatrix' },
            { key: 'opacity', label: 'Opacity', type: 'range', min: 10, max: 100, default: 40, unit: '%' }
        ]
    },
    'img-rotate': {
        name: 'Rotate Image',
        icon: 'fas fa-redo',
        color: '#3498db',
        category: 'image',
        description: 'Rotate & flip images',
        settings: [
            { key: 'angle', label: 'Rotation', type: 'select', options: ['90° CW', '180°', '90° CCW', 'Flip H', 'Flip V'], default: '90° CW' }
        ]
    },
    // Convert Tools
    'word-to-pdf': {
        name: 'Word to PDF',
        icon: 'fas fa-file-word',
        color: '#2ecc71',
        category: 'convert',
        description: 'Convert DOCX to PDF',
        settings: []
    },
    'excel-to-pdf': {
        name: 'Excel to PDF',
        icon: 'fas fa-file-excel',
        color: '#2ecc71',
        category: 'convert',
        description: 'Convert XLSX to PDF',
        settings: []
    },
    'ppt-to-pdf': {
        name: 'PPT to PDF',
        icon: 'fas fa-file-powerpoint',
        color: '#2ecc71',
        category: 'convert',
        description: 'Convert PPTX to PDF',
        settings: []
    },
    'html-to-pdf': {
        name: 'HTML to PDF',
        icon: 'fas fa-code',
        color: '#2ecc71',
        category: 'convert',
        description: 'Convert HTML to PDF',
        settings: []
    },
    'pdf-to-word': {
        name: 'PDF to Word',
        icon: 'fas fa-file-alt',
        color: '#2ecc71',
        category: 'convert',
        description: 'Convert PDF to DOCX',
        settings: []
    },
    // Text Tools
    'text-case': {
        name: 'Change Case',
        icon: 'fas fa-text-height',
        color: '#9b59b6',
        category: 'text',
        description: 'Change text case',
        settings: [
            { key: 'caseType', label: 'Case Type', type: 'select', options: ['UPPERCASE', 'lowercase', 'Title Case', 'Sentence case'], default: 'UPPERCASE' }
        ]
    },
    'text-count': {
        name: 'Word Counter',
        icon: 'fas fa-calculator',
        color: '#9b59b6',
        category: 'text',
        description: 'Count words and characters',
        settings: []
    },
    'text-find-replace': {
        name: 'Find & Replace',
        icon: 'fas fa-search',
        color: '#9b59b6',
        category: 'text',
        description: 'Search and replace text',
        settings: [
            { key: 'find', label: 'Find', type: 'text', default: '' },
            { key: 'replace', label: 'Replace With', type: 'text', default: '' },
            { key: 'caseSensitive', label: 'Case Sensitive', type: 'select', options: ['No', 'Yes'], default: 'No' }
        ]
    }
};

// ========== WORKFLOW STATE ==========
let workflowState = {
    id: null,
    name: 'Untitled Workflow',
    steps: [],
    files: [],
    activeStepIndex: null
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', async () => {
    await toolMatrixDB.init();

    setupCategoryToggles();
    setupDragAndDrop();
    setupFileUpload();
    setupToolSearch();
    setupEventListeners();

    // Check URL params
    const params = new URLSearchParams(window.location.search);

    if (params.has('load')) {
        const id = parseInt(params.get('load'));
        await loadWorkflowById(id);
    }

    if (params.has('tool')) {
        const toolId = params.get('tool');
        addStepToWorkflow(toolId);
    }
});

// ========== CATEGORY TOGGLES ==========
function setupCategoryToggles() {
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.dataset.toggle;
            const toolsDiv = document.getElementById(targetId);

            header.classList.toggle('open');
            toolsDiv.classList.toggle('open');
        });
    });

    // Open first category by default
    const firstHeader = document.querySelector('.category-header');
    const firstTools = document.querySelector('.category-tools');
    if (firstHeader && firstTools) {
        firstHeader.classList.add('open');
        firstTools.classList.add('open');
    }
}

// ========== TOOL SEARCH ==========
function setupToolSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        document.querySelectorAll('.palette-tool').forEach(tool => {
            const name = tool.querySelector('span').textContent.toLowerCase();
            tool.style.display = name.includes(query) ? 'flex' : 'none';
        });

        // Open all categories when searching
        if (query) {
            document.querySelectorAll('.category-tools').forEach(ct => ct.classList.add('open'));
            document.querySelectorAll('.category-header').forEach(ch => ch.classList.add('open'));
        }
    });
}

// ========== DRAG AND DROP ==========
function setupDragAndDrop() {
    // Make palette tools draggable
    document.querySelectorAll('.palette-tool').forEach(tool => {
        tool.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', tool.dataset.tool);
            tool.classList.add('dragging');
        });

        tool.addEventListener('dragend', () => {
            tool.classList.remove('dragging');
        });

        // Double click to add
        tool.addEventListener('dblclick', () => {
            addStepToWorkflow(tool.dataset.tool);
        });
    });

    // Drop zone
    const pipeline = document.getElementById('workflowPipeline');
    const placeholder = document.getElementById('pipelinePlaceholder');

    pipeline.addEventListener('dragover', (e) => {
        e.preventDefault();
        const indicator = pipeline.querySelector('.drop-zone-indicator');
        if (indicator) indicator.classList.add('drag-over');
    });

    pipeline.addEventListener('dragleave', () => {
        const indicator = pipeline.querySelector('.drop-zone-indicator');
        if (indicator) indicator.classList.remove('drag-over');
    });

    pipeline.addEventListener('drop', (e) => {
        e.preventDefault();
        const toolId = e.dataTransfer.getData('text/plain');
        if (toolId && TOOLS[toolId]) {
            addStepToWorkflow(toolId);
        }
        const indicator = pipeline.querySelector('.drop-zone-indicator');
        if (indicator) indicator.classList.remove('drag-over');
    });
}

// ========== FILE UPLOAD ==========
function setupFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const uploadZone = document.getElementById('uploadZone');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            handleFiles(Array.from(e.target.files));
        });
    }

    if (uploadZone) {
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('drag-over');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('drag-over');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
            if (e.dataTransfer.files.length > 0) {
                handleFiles(Array.from(e.dataTransfer.files));
            }
        });
    }
}

function handleFiles(files) {
    workflowState.files = [...workflowState.files, ...files];
    renderFileChips();
    showToast('success', `${files.length} file(s) added`);
}

function renderFileChips() {
    const fileInfoBar = document.getElementById('fileInfoBar');
    const fileChips = document.getElementById('fileChips');
    const uploadZone = document.getElementById('uploadZone');

    if (workflowState.files.length > 0) {
        fileInfoBar.style.display = 'flex';
        uploadZone.style.display = 'none';

        fileChips.innerHTML = workflowState.files.map((file, index) => {
            const ext = file.name.split('.').pop().toUpperCase();
            const size = formatFileSize(file.size);
            return `
                <div class="file-chip">
                    <i class="fas fa-file"></i>
                    <span>${file.name} (${size})</span>
                    <span class="remove-file" onclick="removeFile(${index})">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            `;
        }).join('');
    } else {
        fileInfoBar.style.display = 'none';
        uploadZone.style.display = 'flex';
    }
}

function removeFile(index) {
    workflowState.files.splice(index, 1);
    renderFileChips();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// ========== ADD STEP TO WORKFLOW ==========
function addStepToWorkflow(toolId, settings = null) {
    const tool = TOOLS[toolId];
    if (!tool) return;

    const step = {
        tool: toolId,
        name: tool.name,
        icon: tool.icon,
        color: tool.color,
        settings: {}
    };

    // Set default settings
    if (settings) {
        step.settings = settings;
    } else {
        tool.settings.forEach(s => {
            step.settings[s.key] = s.default;
        });
    }

    workflowState.steps.push(step);
    renderPipeline();
    updateRunBar();
    showToast('success', `${tool.name} added to workflow`);
}

// ========== RENDER PIPELINE ==========
function renderPipeline() {
    const pipeline = document.getElementById('workflowPipeline');

    if (workflowState.steps.length === 0) {
        pipeline.innerHTML = `
            <div class="pipeline-placeholder" id="pipelinePlaceholder">
                <div class="drop-zone-indicator">
                    <i class="fas fa-plus-circle"></i>
                    <p>Drag tools here to build your workflow</p>
                </div>
            </div>
        `;
        setupDragAndDrop();
        return;
    }

    let html = '<div class="pipeline-steps">';

    workflowState.steps.forEach((step, index) => {
        // Connector arrow (except first)
        if (index > 0) {
            html += `
                <div class="pipeline-connector">
                    <div class="connector-line"></div>
                    <i class="fas fa-chevron-down"></i>
                    <div class="connector-line"></div>
                </div>
            `;
        }

        const isActive = workflowState.activeStepIndex === index;

        html += `
            <div class="pipeline-step-card ${isActive ? 'active' : ''}" 
                 data-index="${index}" 
                 onclick="selectStep(${index})">
                <div class="step-number">${index + 1}</div>
                <div class="step-icon-small" style="color: ${step.color}">
                    <i class="${step.icon}"></i>
                </div>
                <div class="step-info">
                    <h4>${step.name}</h4>
                    <p>${getStepSummary(step)}</p>
                </div>
                <div class="step-actions">
                    <button class="step-action-btn" onclick="event.stopPropagation(); moveStep(${index}, -1)" title="Move Up" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="step-action-btn" onclick="event.stopPropagation(); moveStep(${index}, 1)" title="Move Down" ${index === workflowState.steps.length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button class="step-action-btn delete" onclick="event.stopPropagation(); removeStep(${index})" title="Remove">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    // Add "drop more" zone at the end
    html += `
        <div class="pipeline-connector">
            <div class="connector-line"></div>
            <i class="fas fa-plus" style="opacity:0.3"></i>
        </div>
        <div class="add-step-zone" id="addStepZone">
        </div>
    `;

    html += '</div>';
    pipeline.innerHTML = html;

    // Setup drop for add-step zone
    const addZone = document.getElementById('addStepZone');
    if (addZone) {
        addZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            addZone.classList.add('drag-over');
        });
        addZone.addEventListener('dragleave', () => {
            addZone.classList.remove('drag-over');
        });
        addZone.addEventListener('drop', (e) => {
            e.preventDefault();
            addZone.classList.remove('drag-over');
            const toolId = e.dataTransfer.getData('text/plain');
            if (toolId && TOOLS[toolId]) {
                addStepToWorkflow(toolId);
            }
        });
    }

    // Re-setup main pipeline drop
    pipeline.addEventListener('dragover', (e) => e.preventDefault());
    pipeline.addEventListener('drop', (e) => {
        e.preventDefault();
        const toolId = e.dataTransfer.getData('text/plain');
        if (toolId && TOOLS[toolId]) {
            addStepToWorkflow(toolId);
        }
    });
}

function getStepSummary(step) {
    const summaries = [];
    Object.entries(step.settings).forEach(([key, value]) => {
        if (value && value !== '') {
            summaries.push(`${value}`);
        }
    });
    return summaries.length > 0 ? summaries.join(' • ') : 'Default settings';
}

// ========== STEP OPERATIONS ==========
function selectStep(index) {
    workflowState.activeStepIndex = index;
    renderPipeline();
    showToolSettings(index);
}

function removeStep(index) {
    workflowState.steps.splice(index, 1);
    if (workflowState.activeStepIndex === index) {
        workflowState.activeStepIndex = null;
        hideToolSettings();
    }
    renderPipeline();
    updateRunBar();
    showToast('info', 'Step removed');
}

function moveStep(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= workflowState.steps.length) return;

    const temp = workflowState.steps[index];
    workflowState.steps[index] = workflowState.steps[newIndex];
    workflowState.steps[newIndex] = temp;

    if (workflowState.activeStepIndex === index) {
        workflowState.activeStepIndex = newIndex;
    }

    renderPipeline();
}

// ========== TOOL SETTINGS PANEL ==========
function showToolSettings(index) {
    const step = workflowState.steps[index];
    const tool = TOOLS[step.tool];
    const settingsPanel = document.getElementById('toolSettings');
    const settingsTitle = document.getElementById('settingsTitle');
    const settingsBody = document.getElementById('settingsBody');

    settingsTitle.textContent = step.name + ' Settings';
    settingsPanel.style.display = 'block';

    if (tool.settings.length === 0) {
        settingsBody.innerHTML = `
            <div style="text-align: center; padding: 30px; color: #666;">
                <i class="fas fa-cog" style="font-size: 2rem; margin-bottom: 15px;"></i>
                <p>No configurable settings for this tool.</p>
            </div>
        `;
        return;
    }

    let html = '';

    tool.settings.forEach(setting => {
        const currentValue = step.settings[setting.key] || setting.default;

        html += `<div class="setting-group">`;
        html += `<label>${setting.label}</label>`;

        switch (setting.type) {
            case 'range':
                html += `
                    <div class="setting-range">
                        <input type="range" 
                               min="${setting.min}" 
                               max="${setting.max}" 
                               value="${currentValue}" 
                               data-step-index="${index}" 
                               data-setting-key="${setting.key}"
                               oninput="updateSetting(${index}, '${setting.key}', this.value); this.nextElementSibling.textContent = this.value + '${setting.unit || ''}'">
                        <span>${currentValue}${setting.unit || ''}</span>
                    </div>
                `;
                break;

            case 'select':
                html += `
                    <select data-step-index="${index}" 
                            data-setting-key="${setting.key}"
                            onchange="updateSetting(${index}, '${setting.key}', this.value)">
                        ${setting.options.map(opt => 
                            `<option value="${opt}" ${opt === currentValue ? 'selected' : ''}>${opt}</option>`
                        ).join('')}
                    </select>
                `;
                break;

            case 'text':
                html += `
                    <input type="text" 
                           value="${currentValue}" 
                           placeholder="${setting.label}"
                           data-step-index="${index}" 
                           data-setting-key="${setting.key}"
                           oninput="updateSetting(${index}, '${setting.key}', this.value)">
                `;
                break;
        }

        html += `</div>`;
    });

    settingsBody.innerHTML = html;
}

function hideToolSettings() {
    const settingsPanel = document.getElementById('toolSettings');
    settingsPanel.style.display = 'none';
}

function updateSetting(stepIndex, key, value) {
    if (workflowState.steps[stepIndex]) {
        workflowState.steps[stepIndex].settings[key] = value;
        renderPipeline();
    }
}

// ========== RUN BAR ==========
function updateRunBar() {
    const runBar = document.getElementById('runBar');
    const stepCount = document.getElementById('stepCount');

    if (workflowState.steps.length > 0) {
        runBar.style.display = 'block';
        stepCount.textContent = `${workflowState.steps.length} step${workflowState.steps.length > 1 ? 's' : ''}`;
    } else {
        runBar.style.display = 'none';
    }
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Save workflow
    document.getElementById('btnSaveWorkflow').addEventListener('click', saveWorkflow);

    // Load workflows
    document.getElementById('btnLoadWorkflow').addEventListener('click', showLoadModal);

    // Run workflow
    document.getElementById('btnRunWorkflow').addEventListener('click', runWorkflow);
    document.getElementById('btnRunLarge')?.addEventListener('click', runWorkflow);

    // Close settings
    document.getElementById('btnCloseSettings').addEventListener('click', hideToolSettings);

    // Close modal
    document.getElementById('btnCloseModal').addEventListener('click', hideLoadModal);

    // Reset
    document.getElementById('btnReset')?.addEventListener('click', resetWorkflow);

    // Workflow name
    document.getElementById('workflowName').addEventListener('input', (e) => {
        workflowState.name = e.target.value;
    });

    // Click outside modal to close
    document.getElementById('loadModal').addEventListener('click', (e) => {
        if (e.target.id === 'loadModal') hideLoadModal();
    });
}

// ========== SAVE WORKFLOW ==========
async function saveWorkflow() {
    const nameInput = document.getElementById('workflowName');
    workflowState.name = nameInput.value || 'Untitled Workflow';

    if (workflowState.steps.length === 0) {
        showToast('error', 'Add at least one tool to save');
        return;
    }

    try {
        const workflowData = {
            name: workflowState.name,
            steps: workflowState.steps.map(s => ({
                tool: s.tool,
                settings: s.settings
            })),
            settings: {}
        };

        if (workflowState.id) {
            await toolMatrixDB.updateWorkflow(workflowState.id, workflowData);
            showToast('success', 'Workflow updated!');
        } else {
            const saved = await toolMatrixDB.saveWorkflow(workflowData);
            workflowState.id = saved.id;
            showToast('success', 'Workflow saved!');
        }
    } catch (error) {
        console.error('Save error:', error);
        showToast('error', 'Failed to save workflow');
    }
}

// ========== LOAD WORKFLOW ==========
async function loadWorkflowById(id) {
    try {
        const workflow = await toolMatrixDB.getWorkflow(id);
        if (!workflow) {
            showToast('error', 'Workflow not found');
            return;
        }

        workflowState.id = workflow.id;
        workflowState.name = workflow.name;
        workflowState.steps = workflow.steps.map(s => {
            const tool = TOOLS[s.tool];
            return {
                tool: s.tool,
                name: tool ? tool.name : s.tool,
                icon: tool ? tool.icon : 'fas fa-cog',
                color: tool ? tool.color : '#888',
                settings: s.settings || {}
            };
        });

        document.getElementById('workflowName').value = workflow.name;
        renderPipeline();
        updateRunBar();
        showToast('success', `Loaded: ${workflow.name}`);
    } catch (error) {
        console.error('Load error:', error);
        showToast('error', 'Failed to load workflow');
    }
}

// ========== LOAD MODAL ==========
async function showLoadModal() {
    const modal = document.getElementById('loadModal');
    const list = document.getElementById('modalWorkflowsList');
    modal.style.display = 'flex';

    try {
        const workflows = await toolMatrixDB.getAllWorkflows();

        if (workflows.length === 0) {
            list.innerHTML = `
                <div class="modal-empty">
                    <i class="fas fa-inbox"></i>
                    <p>No saved workflows yet.</p>
                </div>
            `;
            return;
        }

        list.innerHTML = workflows.map(wf => `
            <div class="modal-workflow-item" onclick="loadAndClose(${wf.id})">
                <div class="modal-workflow-icon">
                    <i class="fas fa-project-diagram"></i>
                </div>
                <div class="modal-workflow-info">
                    <h4>${wf.name}</h4>
                    <p>${wf.steps.length} steps • ${formatDate(wf.updatedAt)}</p>
                </div>
                <button class="modal-workflow-delete" onclick="event.stopPropagation(); deleteFromModal(${wf.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        list.innerHTML = '<p style="color:red; padding:20px;">Error loading workflows</p>';
    }
}

function hideLoadModal() {
    document.getElementById('loadModal').style.display = 'none';
}

async function loadAndClose(id) {
    hideLoadModal();
    await loadWorkflowById(id);
}

async function deleteFromModal(id) {
    if (confirm('Delete this workflow?')) {
        await toolMatrixDB.deleteWorkflow(id);
        showLoadModal(); // Refresh list
        showToast('info', 'Workflow deleted');
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// ========== RUN WORKFLOW ==========
async function runWorkflow() {
    if (workflowState.steps.length === 0) {
        showToast('error', 'Add tools to your workflow first');
        return;
    }

    if (workflowState.files.length === 0) {
        showToast('error', 'Please upload files first');
        return;
    }

    const overlay = document.getElementById('processingOverlay');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    overlay.style.display = 'flex';

    const totalSteps = workflowState.steps.length;

    for (let i = 0; i < totalSteps; i++) {
        const step = workflowState.steps[i];
        const progress = ((i + 1) / totalSteps) * 100;

        progressText.textContent = `Step ${i + 1} of ${totalSteps}: ${step.name}...`;
        progressFill.style.width = progress + '%';

        // Simulate processing time (in real app, actual processing would happen here)
        await simulateProcessing(800 + Math.random() * 1200);
    }

    progressFill.style.width = '100%';
    progressText.textContent = 'Finalizing...';
    await simulateProcessing(500);

    overlay.style.display = 'none';

    // Show result
    showResult();
}

function simulateProcessing(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showResult() {
    const resultZone = document.getElementById('resultZone');
    const resultSummary = document.getElementById('resultSummary');

    resultSummary.textContent = `Processed ${workflowState.files.length} file(s) through ${workflowState.steps.length} steps successfully.`;
    resultZone.style.display = 'flex';

    document.getElementById('btnDownload').addEventListener('click', () => {
        showToast('success', 'Download started! (Demo mode)');
        // In production, actual file download would happen here
    });

    document.getElementById('btnReset').addEventListener('click', resetWorkflow);
}

function resetWorkflow() {
    workflowState.steps = [];
    workflowState.files = [];
    workflowState.activeStepIndex = null;
    workflowState.id = null;
    workflowState.name = 'Untitled Workflow';

    document.getElementById('workflowName').value = 'Untitled Workflow';
    document.getElementById('resultZone').style.display = 'none';
    document.getElementById('processingOverlay').style.display = 'none';

    renderPipeline();
    renderFileChips();
    updateRunBar();
    hideToolSettings();
}

// ========== TOAST NOTIFICATIONS ==========
function showToast(type, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
