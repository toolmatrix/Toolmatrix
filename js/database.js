/**
 * ToolMatrix Database - IndexedDB Wrapper
 * Handles all workflow storage operations
 */

class ToolMatrixDB {
    constructor() {
        this.dbName = 'ToolMatrixDB';
        this.dbVersion = 1;
        this.storeName = 'workflows';
        this.db = null;
    }

    // Initialize database
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create workflows store
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    store.createIndex('name', 'name', { unique: false });
                    store.createIndex('createdAt', 'createdAt', { unique: false });
                    store.createIndex('updatedAt', 'updatedAt', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('✅ ToolMatrix DB initialized');
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('❌ DB Error:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    // Save a new workflow
    async saveWorkflow(workflow) {
        await this._ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);

            const workflowData = {
                name: workflow.name || 'Untitled Workflow',
                steps: workflow.steps || [],
                settings: workflow.settings || {},
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const request = store.add(workflowData);

            request.onsuccess = () => {
                workflowData.id = request.result;
                console.log('✅ Workflow saved:', workflowData.id);
                resolve(workflowData);
            };

            request.onerror = () => reject(request.error);
        });
    }

    // Update existing workflow
    async updateWorkflow(id, workflow) {
        await this._ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);

            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const existing = getRequest.result;
                if (!existing) {
                    reject(new Error('Workflow not found'));
                    return;
                }

                const updated = {
                    ...existing,
                    name: workflow.name || existing.name,
                    steps: workflow.steps || existing.steps,
                    settings: workflow.settings || existing.settings,
                    updatedAt: new Date().toISOString()
                };

                const putRequest = store.put(updated);
                putRequest.onsuccess = () => {
                    console.log('✅ Workflow updated:', id);
                    resolve(updated);
                };
                putRequest.onerror = () => reject(putRequest.error);
            };

            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    // Get all workflows
    async getAllWorkflows() {
        await this._ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const workflows = request.result.sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                );
                resolve(workflows);
            };

            request.onerror = () => reject(request.error);
        });
    }

    // Get single workflow
    async getWorkflow(id) {
        await this._ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Delete workflow
    async deleteWorkflow(id) {
        await this._ensureDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = () => {
                console.log('✅ Workflow deleted:', id);
                resolve(true);
            };

            request.onerror = () => reject(request.error);
        });
    }

    // Ensure DB is ready
    async _ensureDB() {
        if (!this.db) {
            await this.init();
        }
    }
}

// Create global instance
const toolMatrixDB = new ToolMatrixDB();
