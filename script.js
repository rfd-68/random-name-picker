class NamePicker {
    constructor() {
        this.names = [];
        this.picksMade = 0;
        this.selectedNameElement = document.getElementById('selectedName');
        this.nameListElement = document.getElementById('nameList');
        this.nameCountElement = document.getElementById('nameCount');
        this.pickCountElement = document.getElementById('pickCount');
        
        this.loadNames();
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Pick name button
        document.getElementById('pickBtn').addEventListener('click', () => {
            this.pickRandomName();
        });

        // Clear all names button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearAllNames();
        });

        // Add name button
        document.getElementById('addBtn').addEventListener('click', () => {
            this.addName();
        });

        // Enter key in input field
        document.getElementById('newName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addName();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Spacebar to pick name
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                this.pickRandomName();
            }
            
            // C key to clear all names
            if (e.code === 'KeyC' && e.target === document.body) {
                e.preventDefault();
                document.getElementById('clearBtn').click();
            }
        });
    }

    addName() {
        const input = document.getElementById('newName');
        const name = input.value.trim();
        
        if (name === '') {
            this.showNotification('Please enter a name!', 'warning');
            return;
        }
        
        if (this.names.includes(name)) {
            this.showNotification('This name is already in the list!', 'warning');
            return;
        }
        
        this.names.push(name);
        this.saveNames();
        this.updateDisplay();
        input.value = '';
        
        this.showNotification(`Added "${name}" to the list!`, 'success');
    }

    removeName(nameToRemove) {
        this.names = this.names.filter(name => name !== nameToRemove);
        this.saveNames();
        this.updateDisplay();
        this.showNotification(`Removed "${nameToRemove}" from the list!`, 'success');
    }

    pickRandomName() {
        if (this.names.length === 0) {
            this.showNotification('No names in the list! Add some names first.', 'warning');
            return;
        }

        // Remove previous winner class
        this.selectedNameElement.classList.remove('winner');

        // Pick random name
        const randomIndex = Math.floor(Math.random() * this.names.length);
        const selectedName = this.names[randomIndex];

        // Update display
        this.selectedNameElement.innerHTML = `<h2>${selectedName}</h2>`;
        this.selectedNameElement.classList.add('winner');

        // Update stats
        this.picksMade++;
        this.saveNames();

        // Highlight selected name in the list
        this.highlightSelectedName(selectedName);

        // Ask user whether to keep or remove the name
        this.askUserChoice(selectedName, randomIndex);
    }

    highlightSelectedName(selectedName) {
        // Remove previous highlights
        const nameItems = this.nameListElement.querySelectorAll('.name-item');
        nameItems.forEach(item => item.classList.remove('selected'));
        
        // Highlight the selected name
        const selectedItem = Array.from(nameItems).find(item => 
            item.querySelector('.name-text').textContent === selectedName
        );
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }

    resetSelection() {
        this.selectedNameElement.innerHTML = '<h2>Click "Pick Name" to start!</h2>';
        this.selectedNameElement.classList.remove('winner');
        
        // Remove highlights from name list
        const nameItems = this.nameListElement.querySelectorAll('.name-item');
        nameItems.forEach(item => item.classList.remove('selected'));
        
        this.showNotification('Selection reset!', 'success');
    }

    clearAllNames() {
        if (this.names.length === 0) {
            this.showNotification('No names to clear!', 'warning');
            return;
        }

        this.names = [];
        this.saveNames();
        this.updateDisplay();
        this.resetSelection();
        this.showNotification('All names cleared! You can now add your own names.', 'success');
    }

    askUserChoice(selectedName, nameIndex) {
        // Create confirmation dialog
        const dialog = document.createElement('div');
        dialog.className = 'choice-dialog';
        dialog.innerHTML = `
            <div class="choice-content">
                <h3>🎉 ${selectedName} was selected!</h3>
                <p>What would you like to do with this name?</p>
                <div class="choice-buttons">
                    <button class="btn btn-success" id="keepBtn">✅ Keep Name (Enter)</button>
                    <button class="btn btn-danger" id="removeBtn">🗑️ Remove Name (Esc)</button>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(dialog);

        // Focus the keep button for better accessibility
        setTimeout(() => {
            document.getElementById('keepBtn').focus();
        }, 100);

        // Add event listeners
        const handleKeydown = (e) => {
            if (e.code === 'Enter') {
                e.preventDefault();
                this.handleUserChoice(selectedName, nameIndex, 'keep');
                dialog.remove();
                document.removeEventListener('keydown', handleKeydown);
                dialog.removeEventListener('click', handleClickOutside);
            } else if (e.code === 'Escape') {
                e.preventDefault();
                this.handleUserChoice(selectedName, nameIndex, 'remove');
                dialog.remove();
                document.removeEventListener('keydown', handleKeydown);
                dialog.removeEventListener('click', handleClickOutside);
            }
        };
        document.addEventListener('keydown', handleKeydown);

        const handleClickOutside = (e) => {
            if (e.target === dialog) {
                this.handleUserChoice(selectedName, nameIndex, 'keep'); // Default to keeping
                dialog.remove();
                document.removeEventListener('keydown', handleKeydown);
                dialog.removeEventListener('click', handleClickOutside);
            }
        };
        dialog.addEventListener('click', handleClickOutside);

        document.getElementById('keepBtn').addEventListener('click', () => {
            this.handleUserChoice(selectedName, nameIndex, 'keep');
            dialog.remove();
            document.removeEventListener('keydown', handleKeydown);
            dialog.removeEventListener('click', handleClickOutside);
        });

        document.getElementById('removeBtn').addEventListener('click', () => {
            this.handleUserChoice(selectedName, nameIndex, 'remove');
            dialog.remove();
            document.removeEventListener('keydown', handleKeydown);
            dialog.removeEventListener('click', handleClickOutside);
        });

        // Auto-remove dialog after 10 seconds if no choice made
        setTimeout(() => {
            if (dialog.parentNode) {
                this.handleUserChoice(selectedName, nameIndex, 'keep'); // Default to keeping
                dialog.remove();
                document.removeEventListener('keydown', handleKeydown);
                dialog.removeEventListener('click', handleClickOutside);
            }
        }, 10000);
    }

    handleUserChoice(selectedName, nameIndex, choice) {
        if (choice === 'remove') {
            // Remove the selected name from the list
            this.names.splice(nameIndex, 1);
            this.showNotification(`Removed "${selectedName}" from the list!`, 'success');
        } else {
            // Keep the name (do nothing, it's already in the list)
            this.showNotification(`Kept "${selectedName}" in the list!`, 'success');
        }

        // Update display and save
        this.updateDisplay();
        this.saveNames();
    }

    updateDisplay() {
        // Update name count
        this.nameCountElement.textContent = this.names.length;
        
        // Update pick count
        this.pickCountElement.textContent = this.picksMade;
        
        // Update name list
        this.renderNameList();
    }

    renderNameList() {
        if (this.names.length === 0) {
            this.nameListElement.innerHTML = '<p style="text-align: center; color: #b0b0b0; grid-column: 1 / -1;">No names added yet. Add some names to get started!</p>';
            return;
        }

        this.nameListElement.innerHTML = this.names.map(name => `
            <div class="name-item">
                <span class="name-text">${name}</span>
                <button class="remove-btn" onclick="namePicker.removeName('${name}')">×</button>
            </div>
        `).join('');
    }

    loadNames() {
        // Always load sample names on page reload
        this.loadSampleNames();
        
        // Load saved picks if they exist
        const savedPicks = localStorage.getItem('randomNamePicker_picks');
        if (savedPicks) {
            this.picksMade = parseInt(savedPicks);
        }
    }

    loadSampleNames() {
        const sampleNames = [
            'Ahmad', 'Budi', 'Citra', 'Dewi', 'Eko',
            'Fitri', 'Gunawan', 'Hani', 'Indra', 'Joko',
            'Kartika', 'Lina', 'Maya', 'Nugraha', 'Oktavia',
            'Putra', 'Rina', 'Sari', 'Tono', 'Udin'
        ];
        this.names = sampleNames;
        this.saveNames();
    }

    saveNames() {
        localStorage.setItem('randomNamePicker_names', JSON.stringify(this.names));
        localStorage.setItem('randomNamePicker_picks', this.picksMade.toString());
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize the app
const namePicker = new NamePicker();
