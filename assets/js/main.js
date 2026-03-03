/**
 * ToolMatrix.space - Main Website JavaScript
 */

// ========== TOOLS DATA ==========
const toolsData = [
    { id: 'pdf-compress', name: 'Compress PDF', desc: 'Reduce PDF file size', icon: 'fas fa-compress', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-merge', name: 'Merge PDF', desc: 'Combine multiple PDFs', icon: 'fas fa-object-group', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-split', name: 'Split PDF', desc: 'Extract pages from PDF', icon: 'fas fa-cut', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-to-jpg', name: 'PDF to JPG', desc: 'Convert PDF to images', icon: 'fas fa-image', color: '#e74c3c', category: 'pdf' },
    { id: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Convert images to PDF', icon: 'fas fa-file-pdf', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-protect', name: 'Protect PDF', desc: 'Add password protection', icon: 'fas fa-lock', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-unlock', name: 'Unlock PDF', desc: 'Remove PDF password', icon: 'fas fa-unlock', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-rotate', name: 'Rotate PDF', desc: 'Rotate PDF pages', icon: 'fas fa-sync-alt', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-watermark', name: 'Watermark PDF', desc: 'Add watermark to PDF', icon: 'fas fa-tint', color: '#e74c3c', category: 'pdf' },
    { id: 'pdf-pagenumber', name: 'Page Numbers', desc: 'Add page numbers', icon: 'fas fa-sort-numeric-down', color: '#e74c3c', category: 'pdf' },
    { id: 'img-compress', name: 'Compress Image', desc: 'Reduce image size', icon: 'fas fa-compress-arrows-alt', color: '#3498db', category: 'image' },
    { id: 'img-resize', name: 'Resize Image', desc: 'Change dimensions', icon: 'fas fa-expand-arrows-alt', color: '#3498db', category: 'image' },
    { id: 'img-crop', name: 'Crop Image', desc: 'Crop your images', icon: 'fas fa-crop-alt', color: '#3498db', category: 'image' },
    { id: 'img-convert', name: 'Convert Image', desc: 'Change image format', icon: 'fas fa-exchange-alt', color: '#3498db', category: 'image' },
    { id: 'img-watermark', name: 'Image Watermark', desc: 'Add watermark', icon: 'fas fa-stamp', color: '#3498db', category: 'image' },
    { id: 'img-rotate', name: 'Rotate Image', desc: 'Rotate & flip', icon: 'fas fa-redo', color: '#3498db', category: 'image' },
    { id: 'word-to-pdf', name: 'Word to PDF', desc: 'Convert DOCX to PDF', icon: 'fas fa-file-word', color: '#2ecc71', category: 'convert' },
    { id: 'excel-to-pdf', name: 'Excel to PDF', desc: 'Convert XLSX to PDF', icon: 'fas fa-file-excel', color: '#2ecc71', category: 'convert' },
    { id: 'ppt-to-pdf', name: 'PPT to PDF', desc: 'Convert PPTX to PDF', icon: 'fas fa-file-powerpoint', color: '#2ecc71', category: 'convert' },
    { id: 'html-to-pdf', name: 'HTML to PDF', desc: 'Convert webpage to PDF', icon: 'fas fa-code', color: '#2ecc71', category: 'convert' },
    { id: 'pdf-to-word', name: 'PDF to Word', desc: 'Convert PDF to DOCX', icon: 'fas fa-file-alt', color: '#2ecc71', category: 'convert' },
    { id: 'text-case', name: 'Change Case', desc: 'Upper, lower, title case', icon: 'fas fa-text-height', color: '#9b59b6', category: 'text' },
    { id: 'text-count', name: 'Word Counter', desc: 'Count words & chars', icon: 'fas fa-calculator', color: '#9b59b6', category: 'text' },
    { id: 'text-find-replace', name: 'Find & Replace', desc: 'Search and replace text', icon: 'fas fa-search', color: '#9b59b6', category: 'text' },
];

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', async () => {
    // Init database
    await toolMatrixDB.init();
    
    // Render tools
    renderTools('all');
    
    // Setup category filters
    setupCategoryFilters();
    
    // Animate stats
    animateStats();
    
    // Load saved workflows
    loadSavedWorkflows();
    
    // Hamburger menu
    setupHamburger();
});

// ========== RENDER TOOLS ==========
function renderTools(category) {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    
    const filtered = category === 'all' 
        ? toolsData 
        : toolsData.filter(t => t.category === category);

    grid.innerHTML = filtered.map(tool => `
        <div class="tool-card" data-tool="${tool.id}" data-category="${tool.category}">
            <div class="tool-icon" style="background: ${tool.color}">
                <i class="${tool.icon}"></i>
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
        </div>
    `).join('');

    // Add click handlers
    grid.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            // Navigate to workflow builder with this tool pre-selected
            const toolId = card.dataset.tool;
            window.location.href = `workflow-builder.html?tool=${toolId}`;
        });
    });
}

// ========== CATEGORY FILTERS ==========
function setupCategoryFilters() {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTools(btn.dataset.category);
        });
    });
}

// ========== ANIMATE STATS ==========
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateNumber(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        element.textContent = Math.floor(eased * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// ========== LOAD SAVED WORKFLOWS ==========
async function loadSavedWorkflows() {
    const grid = document.getElementById('workflowsGrid');
    const empty = document.getElementById('workflowEmpty');
    if (!grid) return;

    try {
        const workflows = await toolMatrixDB.getAllWorkflows();

        if (workflows.length === 0) {
            if (empty) empty.style.display = 'block';
            return;
        }

        if (empty) empty.style.display = 'none';

        // Clear existing cards (keep empty state)
        grid.querySelectorAll('.workflow-card').forEach(c => c.remove());

        workflows.forEach(wf => {
            const card = document.createElement('div');
            card.className = 'workflow-card';
            card.innerHTML = `
                <div class="card-actions">
                    <button class="card-action-btn" onclick="openWorkflow(${wf.id})" title="Open">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button class="card-action-btn delete" onclick="event.stopPropagation(); deleteWorkflowFromHome(${wf.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <h4>${wf.name}</h4>
                <div class="card-steps">
                    ${wf.steps.map(s => `<span class="card-step-badge">${getToolName(s.tool)}</span>`).join('')}
                </div>
                <div class="card-date">
                    <i class="fas fa-clock"></i> ${formatDate(wf.updatedAt)}
                </div>
            `;
            card.addEventListener('click', () => openWorkflow(wf.id));
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading workflows:', error);
    }
}

function openWorkflow(id) {
    window.location.href = `workflow-builder.html?load=${id}`;
}

async function deleteWorkflowFromHome(id) {
    if (confirm('Are you sure you want to delete this workflow?')) {
        await toolMatrixDB.deleteWorkflow(id);
        loadSavedWorkflows();
    }
}

function getToolName(toolId) {
    const tool = toolsData.find(t => t.id === toolId);
    return tool ? tool.name : toolId;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// ========== HAMBURGER MENU ==========
function setupHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}
