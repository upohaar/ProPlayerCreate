// Sample player data
const players = [
    {
        id: 1, 
        name: "Shakib Al Hasan",
        position: "Carry",
        price: 850000,
        image:"image/image.jpg",
        stats: {
            kills: 8.2,
            assists: 4.5,
            kda: 3.2
        },
        bio: "Exceptional carry player with incredible mechanical skills. Known for clutch performances in high-pressure situations."
    },
    {
        id: 2,
        name: "Tamim Iqbal",
        position: "Mid Laner",
        price: 750000,
        image:"image/image2.jpg",
        stats: {
            kills: 7.8,
            assists: 5.1,
            kda: 2.9
        },
        bio: "Strategic mid laner with excellent map awareness and game knowledge. Consistently outperforms opponents in lane."
    },
    {
        id: 3,
        name: "Taskin Ahamed",
        position: "Offlaner",
        price: 650000,
        image:"image/image3.jpg",
        stats: {
            kills: 5.4,
            assists: 7.2,
            kda: 2.5
        },
        bio: "Resilient offlaner who excels at creating space for the team. Known for unbreakable mental fortitude."
    },
    {
        id: 4,
        name: "Maruf",
        position: "Support",
        price: 500000,
        image:"image/image4.jpg",
        stats: {
            kills: 2.1,
            assists: 12.3,
            kda: 2.8
        },
        bio: "Selfless support player with impeccable positioning and timing. Master of vision control and team coordination."
    },
    {
        id: 5,
        name: "Masrafi Bin Mortoza",
        position: "Jungler",
        price: 700000,
        image:"image/image5.jpg",
        stats: {
            kills: 6.5,
            assists: 8.7,
            kda: 3.1
        },
        bio: "Aggressive jungler with unpredictable pathing. Creates constant pressure across all lanes."
    },
    {
        id: 6,
        name: "Mustafizure Rahman",
        position: "Carry",
        price: 900000,
        image:"image/images6.jpg",
        stats: {
            kills: 9.1,
            assists: 3.8,
            kda: 3.5
        },
        bio: "Dominant carry player with exceptional farming efficiency. Consistently reaches critical item timings ahead of schedule."
    }
];



// Team and budget management
let myTeam = [];
let budget = 5000000;

// DOM elements
const playersContainer = document.getElementById('players-container');
const teamContainer = document.getElementById('team-container');
const budgetElement = document.getElementById('budget');
const teamCountElement = document.getElementById('team-count');
const playerModal = document.getElementById('playerModal');
const modalPlayerImg = document.getElementById('modal-player-img');
const modalPlayerName = document.getElementById('modal-player-name');
const modalPlayerPosition = document.getElementById('modal-player-position');
const modalPlayerBio = document.getElementById('modal-player-bio');
const modalPlayerPrice = document.getElementById('modal-player-price');
const modalBuyBtn = document.getElementById('modal-buy-btn');
const closeModalButtons = document.querySelectorAll('.close-modal');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing app");
    renderPlayers();
    updateTeamDisplay();
    updateBudgetDisplay();

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close modal when clicking X
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            playerModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === playerModal) {
            playerModal.style.display = 'none';
        }
    });

    // Add event listener to modal buy button
    modalBuyBtn.addEventListener('click', function() {
        const playerId = parseInt(this.getAttribute('data-id'));
        console.log("Modal buy button clicked for player:", playerId);
        addToTeam(playerId);
    });
});

// Render player cards
function renderPlayers() {
    console.log("Rendering players");
    playersContainer.innerHTML = '';
    
    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-img">
                <img src="${player.image}" alt="${player.name}" onerror="handleImageError(this)">
            </div>
            <div class="player-info">
                <h3 class="player-name">${player.name}</h3>
                <p class="player-position">${player.position}</p>
                <div class="player-stats">
                    <div class="stat">
                        <div class="stat-value">${player.stats.kills}</div>
                        <div class="stat-label">KILLS</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${player.stats.assists}</div>
                        <div class="stat-label">ASSISTS</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${player.stats.kda}</div>
                        <div class="stat-label">KDA</div>
                    </div>
                </div>
                <div class="player-price">$${player.price.toLocaleString()}</div>
                <div class="player-actions">
                    <button class="btn-buy" data-id="${player.id}">Add to Team</button>
                    <button class="btn-details" data-id="${player.id}">View Details</button>
                </div>
            </div>
        `;
        
        playersContainer.appendChild(playerCard);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function() {
            const playerId = parseInt(this.getAttribute('data-id'));
            console.log("Add to team button clicked for player:", playerId);
            addToTeam(playerId);
        });
    });

    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const playerId = parseInt(this.getAttribute('data-id'));
            console.log("View details button clicked for player:", playerId);
            showPlayerDetails(playerId);
        });
    });
}

// Handle image loading errors
function handleImageError(img) {
    img.style.display = 'none';
    img.parentNode.innerHTML = 'Image not available';
    img.parentNode.style.display = 'flex';
    img.parentNode.style.alignItems = 'center';
    img.parentNode.style.justifyContent = 'center';
    img.parentNode.style.color = 'var(--gray)';
    img.parentNode.style.fontWeight = '500';
}

// Show player details in modal
function showPlayerDetails(playerId) {
    console.log("Showing details for player:", playerId);
    const player = players.find(p => p.id === playerId);
    
    if (player) {
        modalPlayerName.textContent = player.name;
        modalPlayerPosition.textContent = player.position;
        modalPlayerBio.textContent = player.bio;
        modalPlayerPrice.textContent = `$${player.price.toLocaleString()}`;
        
        // Update modal image
        modalPlayerImg.innerHTML = `<img src="${player.image}" alt="${player.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" onerror="handleImageError(this)">`;
        
        // Check if player is already in team
        const inTeam = myTeam.some(p => p.id === playerId);
        modalBuyBtn.textContent = inTeam ? 'Already in Team' : 'Add to Team';
        modalBuyBtn.disabled = inTeam;
        modalBuyBtn.setAttribute('data-id', playerId);
        
        playerModal.style.display = 'flex';
    }
}

// Add player to team - FIXED VERSION
function addToTeam(playerId) {
    console.log("Attempting to add player to team:", playerId);
    const player = players.find(p => p.id === playerId);
    
    if (!player) {
        console.error("Player not found:", playerId);
        return;
    }
    
    // Check if player is already in team
    if (myTeam.some(p => p.id === playerId)) {
        alert('This player is already in your team!');
        return;
    }
    
    // Check if budget is sufficient
    if (budget < player.price) {
        alert('Insufficient budget to hire this player!');
        return;
    }
    
    // Add player to team and deduct from budget
    myTeam.push(player);
    budget -= player.price;
    
    console.log("Player added to team. Current team:", myTeam);
    console.log("Remaining budget:", budget);
    
    updateTeamDisplay();
    updateBudgetDisplay();
    renderPlayers(); // Re-render to update button states
    
    // Close modal if open
    playerModal.style.display = 'none';
    
    // Show success message
    alert(`${player.name} has been added to your team!`);
}

// Remove player from team
function removeFromTeam(playerId) {
    console.log("Removing player from team:", playerId);
    const playerIndex = myTeam.findIndex(p => p.id === playerId);
    
    if (playerIndex !== -1) {
        const player = myTeam[playerIndex];
        myTeam.splice(playerIndex, 1);
        budget += player.price;
        
        console.log("Player removed. Current team:", myTeam);
        console.log("Updated budget:", budget);
        
        updateTeamDisplay();
        updateBudgetDisplay();
        renderPlayers(); // Re-render to update button states
        
        alert(`${player.name} has been removed from your team.`);
    }
}

// Update team display
function updateTeamDisplay() {
    console.log("Updating team display. Team members:", myTeam.length);
    teamContainer.innerHTML = '';
    
    if (myTeam.length === 0) {
        teamContainer.innerHTML = `
            <div class="empty-team">
                <p>Your team is empty. Start hiring players to build your dream team!</p>
                <a href="#players" class="btn">Browse Players</a>
            </div>
        `;
    } else {
        myTeam.forEach(player => {
            const teamPlayer = document.createElement('div');
            teamPlayer.className = 'team-player';
            teamPlayer.innerHTML = `
                <div class="team-player-img">
                    <img src="${player.image}" alt="${player.name}" onerror="handleImageError(this)">
                </div>
                <div class="team-player-info">
                    <div class="team-player-name">${player.name}</div>
                    <div class="team-player-position">${player.position}</div>
                    <div class="team-player-price">$${player.price.toLocaleString()}</div>
                </div>
                <button class="btn-remove" data-id="${player.id}">Remove</button>
            `;
            
            teamContainer.appendChild(teamPlayer);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', function() {
                const playerId = parseInt(this.getAttribute('data-id'));
                console.log("Remove button clicked for player:", playerId);
                removeFromTeam(playerId);
            });
        });
    }
    
    teamCountElement.textContent = myTeam.length;
}

// Update budget display
function updateBudgetDisplay() {
    console.log("Updating budget display:", budget);
    budgetElement.textContent = budget.toLocaleString();
}



// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(formObject)) {
                // Simulate form submission
                simulateFormSubmission(formObject);
            }
        });
    }
});

function validateForm(data) {
    // Reset previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
        el.classList.remove('error');
    });
    
    let isValid = true;
    
    // Name validation
    if (!data.name.trim()) {
        showError('name', 'Please enter your full name');
        isValid = false;
    }
    
    // Email validation
    if (!data.email.trim()) {
        showError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject) {
        showError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Message validation
    if (!data.message.trim()) {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (data.message.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'var(--danger)';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(data) {
    const submitBtn = document.querySelector('#contactForm .btn-primary');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Add error styling to CSS
const errorStyles = `
.form-group input.error,
.form-group select.error,
.form-group textarea.error {
    border-color: var(--danger) !important;
    box-shadow: 0 0 0 3px rgba(234, 67, 53, 0.1) !important;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Tournaments Data
const tournaments = [
    {
        id: 1,
        title: "Valorant Champions Series 2024",
        game: "valorant",
        status: "upcoming",
        prizePool: 100000,
        startDate: "2024-03-15",
        endDate: "2024-03-22",
        participants: 32,
        registered: 24,
        banner: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=200&fit=crop",
        description: "The biggest Valorant tournament of the year featuring top professional teams from around the world.",
        rules: "Double elimination bracket, Best of 3 matches, Grand Finals Best of 5",
        prizeBreakdown: [
            { place: "1st", amount: 50000 },
            { place: "2nd", amount: 25000 },
            { place: "3rd", amount: 15000 },
            { place: "4th", amount: 10000 }
        ]
    },
    {
        id: 2,
        title: "CS:GO Global Championship",
        game: "csgo",
        status: "ongoing",
        prizePool: 250000,
        startDate: "2024-02-01",
        endDate: "2024-02-28",
        participants: 64,
        registered: 64,
        banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop",
        description: "International CS:GO championship with teams competing for the grand prize.",
        rules: "Group stage + Playoffs, Best of 1 group matches, Best of 3 playoffs",
        prizeBreakdown: [
            { place: "1st", amount: 125000 },
            { place: "2nd", amount: 75000 },
            { place: "3rd-4th", amount: 25000 }
        ]
    },
    {
        id: 3,
        title: "League of Legends Spring Split",
        game: "lol",
        status: "upcoming",
        prizePool: 150000,
        startDate: "2024-04-01",
        endDate: "2024-04-30",
        participants: 16,
        registered: 8,
        banner: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=200&fit=crop",
        description: "Spring split tournament for League of Legends teams looking to qualify for international events.",
        rules: "Round robin group stage, Single elimination playoffs",
        prizeBreakdown: [
            { place: "1st", amount: 75000 },
            { place: "2nd", amount: 45000 },
            { place: "3rd", amount: 30000 }
        ]
    },
    {
        id: 4,
        title: "Dota 2 International Qualifiers",
        game: "dota2",
        status: "completed",
        prizePool: 50000,
        startDate: "2024-01-15",
        endDate: "2024-01-25",
        participants: 32,
        registered: 32,
        banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
        description: "Regional qualifiers for the upcoming Dota 2 International championship.",
        rules: "Double elimination bracket, Best of 3 all matches",
        prizeBreakdown: [
            { place: "1st", amount: 25000 },
            { place: "2nd", amount: 15000 },
            { place: "3rd", amount: 10000 }
        ]
    },
    {
        id: 5,
        title: "Overwatch 2 Pro-Am",
        game: "overwatch",
        status: "upcoming",
        prizePool: 75000,
        startDate: "2024-03-20",
        endDate: "2024-03-27",
        participants: 24,
        registered: 12,
        banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
        description: "Professional-Amateur tournament featuring mix of pro teams and rising amateur squads.",
        rules: "Swiss system group stage, Single elimination playoffs",
        prizeBreakdown: [
            { place: "1st", amount: 35000 },
            { place: "2nd", amount: 20000 },
            { place: "3rd", amount: 15000 },
            { place: "4th", amount: 5000 }
        ]
    },
    {
        id: 6,
        title: "Valorant Rising Stars",
        game: "valorant",
        status: "upcoming",
        prizePool: 25000,
        startDate: "2024-04-10",
        endDate: "2024-04-15",
        participants: 16,
        registered: 6,
        banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
        description: "Tournament dedicated to up-and-coming Valorant teams and players.",
        rules: "Single elimination bracket, Best of 3 matches",
        prizeBreakdown: [
            { place: "1st", amount: 12500 },
            { place: "2nd", amount: 7500 },
            { place: "3rd", amount: 5000 }
        ]
    }
];

// Tournaments Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.tournaments-main')) {
        initializeTournamentsPage();
    }
});

function initializeTournamentsPage() {
    renderTournaments();
    setupEventListeners();
}

function renderTournaments(filteredTournaments = tournaments) {
    const container = document.getElementById('tournaments-container');
    const isListView = container.classList.contains('list-view');
    
    container.innerHTML = '';
    
    filteredTournaments.forEach(tournament => {
        const tournamentCard = createTournamentCard(tournament, isListView);
        container.appendChild(tournamentCard);
    });
    
    if (filteredTournaments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No tournaments found</h3>
                <p>Try adjusting your filters to see more results.</p>
            </div>
        `;
    }
}

function createTournamentCard(tournament, isListView) {
    const card = document.createElement('div');
    card.className = `tournament-card ${isListView ? 'list-view' : ''}`;
    card.innerHTML = `
        <div class="tournament-banner" style="background: linear-gradient(135deg, ${getGameColor(tournament.game)}, ${getGameColor(tournament.game, true)})">
            <div class="tournament-status status-${tournament.status}">${tournament.status}</div>
        </div>
        <div class="tournament-info">
            <div class="tournament-game">
                <div class="game-icon">${getGameAbbreviation(tournament.game)}</div>
                <div class="game-name">${getGameName(tournament.game)}</div>
            </div>
            <h3 class="tournament-title">${tournament.title}</h3>
            <div class="tournament-meta">
                <div class="meta-item">
                    <div class="meta-label">Date</div>
                    <div class="meta-value">${formatDate(tournament.startDate)}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Teams</div>
                    <div class="meta-value">${tournament.registered}/${tournament.participants}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Format</div>
                    <div class="meta-value">${getTournamentFormat(tournament.participants)}</div>
                </div>
            </div>
            <div class="tournament-prize">
                <div class="prize-label">Total Prize Pool</div>
                <div class="prize-amount">$${tournament.prizePool.toLocaleString()}</div>
            </div>
            <div class="tournament-actions">
                <button class="btn-register" data-id="${tournament.id}" ${tournament.status !== 'upcoming' ? 'disabled' : ''}>
                    ${tournament.status === 'upcoming' ? 'Register Now' : tournament.status === 'ongoing' ? 'Tournament Live' : 'Completed'}
                </button>
                <button class="btn-details" data-id="${tournament.id}">Details</button>
            </div>
        </div>
    `;
    
    return card;
}

function getGameColor(game, isLight = false) {
    const colors = {
        valorant: isLight ? '#ff4655' : '#fa4454',
        csgo: isLight ? '#e68c3a' : '#de8642',
        lol: isLight ? '#0099ff' : '#007acc',
        dota2: isLight ? '#f7504e' : '#e03c3a',
        overwatch: isLight ? '#f99e1a' : '#f6921e'
    };
    return colors[game] || (isLight ? '#667eea' : '#764ba2');
}

function getGameAbbreviation(game) {
    const abbreviations = {
        valorant: 'VAL',
        csgo: 'CS',
        lol: 'LOL',
        dota2: 'D2',
        overwatch: 'OW'
    };
    return abbreviations[game] || 'ES';
}

function getGameName(game) {
    const names = {
        valorant: 'Valorant',
        csgo: 'CS:GO',
        lol: 'League of Legends',
        dota2: 'Dota 2',
        overwatch: 'Overwatch 2'
    };
    return names[game] || 'Esports';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getTournamentFormat(participants) {
    if (participants <= 8) return '8 Teams';
    if (participants <= 16) return '16 Teams';
    if (participants <= 32) return '32 Teams';
    return '64 Teams';
}

function setupEventListeners() {
    // Filter functionality
    const gameFilter = document.getElementById('game-filter');
    const statusFilter = document.getElementById('status-filter');
    const prizeFilter = document.getElementById('prize-filter');
    const resetFilters = document.getElementById('reset-filters');
    
    [gameFilter, statusFilter, prizeFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    resetFilters.addEventListener('click', () => {
        gameFilter.value = 'all';
        statusFilter.value = 'all';
        prizeFilter.value = 'all';
        applyFilters();
    });
    
    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const container = document.getElementById('tournaments-container');
            container.classList.toggle('list-view', e.target.dataset.view === 'list');
        });
    });
    
    // Tournament actions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-register')) {
            const tournamentId = parseInt(e.target.dataset.id);
            openRegistrationModal(tournamentId);
        }
        
        if (e.target.classList.contains('btn-details')) {
            const tournamentId = parseInt(e.target.dataset.id);
            openTournamentDetails(tournamentId);
        }
    });
}

function applyFilters() {
    const gameFilter = document.getElementById('game-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const prizeFilter = document.getElementById('prize-filter').value;
    
    const filtered = tournaments.filter(tournament => {
        const gameMatch = gameFilter === 'all' || tournament.game === gameFilter;
        const statusMatch = statusFilter === 'all' || tournament.status === statusFilter;
        const prizeMatch = prizeFilter === 'all' || tournament.prizePool >= parseInt(prizeFilter);
        
        return gameMatch && statusMatch && prizeMatch;
    });
    
    renderTournaments(filtered);
}

function openRegistrationModal(tournamentId) {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return;
    
    const modal = document.getElementById('registrationModal');
    const content = document.getElementById('registration-content');
    
    content.innerHTML = `
        <div class="registration-form">
            <h3>Register for ${tournament.title}</h3>
            <p>Fill out the form below to register your team for this tournament.</p>
            
            <div class="form-group">
                <label for="team-name">Team Name *</label>
                <input type="text" id="team-name" name="team-name" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="captain-name">Captain Name *</label>
                    <input type="text" id="captain-name" name="captain-name" required>
                </div>
                <div class="form-group">
                    <label for="captain-email">Captain Email *</label>
                    <input type="email" id="captain-email" name="captain-email" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="team-members">Team Members (5-7 players) *</label>
                <textarea id="team-members" name="team-members" rows="4" required placeholder="List all team members with their in-game IDs"></textarea>
            </div>
            
            <div class="form-group">
                <label for="experience">Team Experience Level</label>
                <select id="experience" name="experience">
                    <option value="amateur">Amateur</option>
                    <option value="semi-pro">Semi-Professional</option>
                    <option value="professional">Professional</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" name="agree-rules" required>
                    I agree to the tournament rules and code of conduct
                </label>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit Registration</button>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Handle form submission
    const form = content.querySelector('.registration-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Successfully registered for ${tournament.title}! You will receive a confirmation email shortly.`);
        modal.style.display = 'none';
    });
}

function openTournamentDetails(tournamentId) {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return;
    
    const modal = document.getElementById('tournamentModal');
    const content = document.getElementById('tournament-details');
    
    content.innerHTML = `
        <div class="details-header">
            <div class="details-banner" style="background: linear-gradient(135deg, ${getGameColor(tournament.game)}, ${getGameColor(tournament.game, true)})"></div>
            <div class="details-title">
                <h3>${tournament.title}</h3>
                <div class="details-meta">
                    <div class="meta-item">
                        <div class="meta-label">Game</div>
                        <div class="meta-value">${getGameName(tournament.game)}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Status</div>
                        <div class="meta-value">${tournament.status}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Dates</div>
                        <div class="meta-value">${formatDate(tournament.startDate)} - ${formatDate(tournament.endDate)}</div>
                    </div>
                </div>
                <div class="tournament-actions">
                    <button class="btn-register" ${tournament.status !== 'upcoming' ? 'disabled' : ''}>
                        ${tournament.status === 'upcoming' ? 'Register Now' : tournament.status === 'ongoing' ? 'Tournament Live' : 'Completed'}
                    </button>
                </div>
            </div>
        </div>
        
        <div class="details-section">
            <h4>Tournament Description</h4>
            <p>${tournament.description}</p>
        </div>
        
        <div class="details-section">
            <h4>Tournament Rules</h4>
            <p>${tournament.rules}</p>
        </div>
        
        <div class="details-section">
            <h4>Prize Breakdown</h4>
            <div class="prize-breakdown">
                ${tournament.prizeBreakdown.map(prize => `
                    <div class="prize-tier">
                        <div class="tier-place">${prize.place} Place</div>
                        <div class="tier-amount">$${prize.amount.toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="details-section">
            <h4>Tournament Information</h4>
            <div class="tournament-meta">
                <div class="meta-item">
                    <div class="meta-label">Total Prize Pool</div>
                    <div class="meta-value">$${tournament.prizePool.toLocaleString()}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Team Slots</div>
                    <div class="meta-value">${tournament.participants}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Registered Teams</div>
                    <div class="meta-value">${tournament.registered}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Available Slots</div>
                    <div class="meta-value">${tournament.participants - tournament.registered}</div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Add register button functionality in details modal
    const registerBtn = content.querySelector('.btn-register');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            openRegistrationModal(tournamentId);
        });
    }
}