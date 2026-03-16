document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Typing Effect Logic
    const typingText = document.querySelector('.typing-text');
    const words = ['Aspiring AI Innovator', 'CS Undergrad Specializing in AI', 'Machine Learning Enthusiast', 'Creative Technologist'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Wait before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);

    // Dynamic Nodes animation in the Hero image
    const nodesContainer = document.querySelector('.nodes');
    if (nodesContainer) {
        for (let i = 0; i < 20; i++) {
            const node = document.createElement('div');
            node.style.position = 'absolute';
            node.style.width = Math.random() * 6 + 2 + 'px';
            node.style.height = node.style.width;
            node.style.background = `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '139, 92, 246'}, ${Math.random() * 0.5 + 0.3})`;
            node.style.borderRadius = '50%';
            node.style.top = Math.random() * 100 + '%';
            node.style.left = Math.random() * 100 + '%';
            node.style.boxShadow = `0 0 10px rgba(255,255,255,0.4)`;

            // Animation for floating nodes
            const animDuration = Math.random() * 10 + 5;
            const animDelay = Math.random() * 5;
            node.style.animation = `float ${animDuration}s ${animDelay}s infinite alternate ease-in-out`;

            nodesContainer.appendChild(node);
        }
    }

    // GitHub Fetch Logic
    const githubBtn = document.getElementById('fetch-repos-btn');
    const usernameInput = document.getElementById('github-username');
    const projectsGrid = document.getElementById('github-projects');
    const profileLink = document.getElementById('github-profile-link');

    async function fetchGitHubProjects(username) {
        projectsGrid.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-circle-notch fa-spin"></i> Fetching repositories for ${username}...
            </div>
        `;

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            if (!response.ok) {
                throw new Error('User  not found or API limit exceeded.');
            }

            const repos = await response.json();

            if (repos.length === 0) {
                projectsGrid.innerHTML = `<div class="loading-spinner">No public repositories found.</div>`;
                return;
            }

            projectsGrid.innerHTML = '';

            repos.forEach(repo => {
                // Determine tech string based on main language
                const language = repo.language || 'Code';
                const description = repo.description || 'No description provided for this repository. Checkout the code on GitHub!';

                const cardHtml = `
                    <div class="project-card glass-card">
                        <div class="project-header">
                            <i class="far fa-folder-open folder-icon"></i>
                            <div class="project-links">
                                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" title="Live Preview"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                <a href="${repo.html_url}" target="_blank" title="GitHub Repo"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                        <h3 class="project-title">${repo.name}</h3>
                        <p class="project-desc">${description}</p>
                        <div class="project-tech">
                            <span>${language}</span>
                            ${repo.topics ? repo.topics.slice(0, 3).map(t => `<span>${t}</span>`).join('') : ''}
                        </div>
                    </div>
                `;
                projectsGrid.insertAdjacentHTML('beforeend', cardHtml);
            });

            // Update profile link in hero
            profileLink.href = `https://github.com/${username}`;

        } catch (error) {
            projectsGrid.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>
                    Error: ${error.message}. Please check the username.
                </div>
                <div class="project-card glass-card">
                    <div class="project-header">
                        <i class="fas fa-robot folder-icon"></i>
                        <div class="project-links">
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <h3 class="project-title">AI Predictive Model</h3>
                    <p class="project-desc">A fallback demonstration project showcasing an advanced machine learning pipeline to predict user behavior.</p>
                    <div class="project-tech">
                        <span>Python</span><span>TensorFlow</span>
                    </div>
                </div>
                <div class="project-card glass-card">
                    <div class="project-header">
                        <i class="fas fa-language folder-icon"></i>
                        <div class="project-links">
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <h3 class="project-title">NLP Sentiment Analyzer</h3>
                    <p class="project-desc">A fallback project using transformers to analyze and categorize public sentiment from social media posts.</p>
                    <div class="project-tech">
                        <span>PyTorch</span><span>HuggingFace</span>
                    </div>
                </div>
            `;
        }
    }

    // Initial Fetch
    fetchGitHubProjects(usernameInput.value);

    githubBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchGitHubProjects(username);
        }
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const username = usernameInput.value.trim();
            if (username) {
                fetchGitHubProjects(username);
            }
        }
    });

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        btn.style.opacity = '0.7';

        // Mock successful send delay
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            btn.style.opacity = '1';
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
});
