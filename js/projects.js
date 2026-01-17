// Projects management - load projects from API and display
class ProjectsManager {
  constructor() {
    this.projects = [];
    this.isInitialized = false;
  }

  // Initialize and load projects
  async init() {
    if (this.isInitialized) return;
    
    try {
      await this.loadProjects();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize projects:', error);
    }
  }

  // Load projects from API
  async loadProjects() {
    try {
      if (!window.API || !window.API.projects) {
        console.warn('API not available, using static projects');
        return;
      }

      const response = await window.API.projects.getAll();
      if (response && response.success && response.data) {
        this.projects = response.data || [];
        this.updateUI();
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Continue with static projects if API fails
    }
  }

  // Update UI with projects
  updateUI() {
    // Projects are already in the HTML, so we just need to ensure they display correctly
    // If we want to dynamically load projects, we can do it here
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (!portfolioContainer) return;

    // If we have projects from API, we could update the container here
    // For now, we'll keep the existing static projects
  }

  // Refresh projects
  async refresh() {
    await this.loadProjects();
  }
}

// Initialize projects manager on page load
const projectsManager = new ProjectsManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (window.API) projectsManager.init();
    }, 1000);
  });
} else {
  setTimeout(() => {
    if (window.API) projectsManager.init();
  }, 1000);
}

// Export for global access
window.ProjectsManager = ProjectsManager;
window.projectsManager = projectsManager;
