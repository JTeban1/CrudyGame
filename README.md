# CRUDY: Route Protocol Game

**Author:** [Student Name]  
**Course:** [Course Name]  
**Institution:** [University Name]  
**Date:** [Submission Date]

## Project Description

CRUDY is an interactive science fiction web-based game that challenges users through a series of progressive cognitive tests. The application demonstrates advanced JavaScript programming concepts, responsive web design, and user experience principles through an engaging narrative-driven interface.

## Overview

The game presents players with three distinct paths:

- **Pure Logic**: A path focused on rational thinking and mental challenges
- **Infinite Simulation**: A route exploring endless possibilities and reality layers
- **Corrupt Path**: A chaotic journey through uncertainty and danger

Each path leads through multiple game phases, culminating in a final judgment that determines the player's destiny.

## Game Structure

### Phase 1: Route Selection
Players choose from three thematic paths, each with its own narrative tone and door options.

### Phase 2: Door Selection
Based on the chosen route, players encounter programming-themed doors (if/else, switch(), while(true), break;, hidden code, trap) that provide different narrative outcomes.

### Phase 3: Simon Says Memory Game
A sequence memorization challenge where players must repeat a pattern of colored circles in the correct order. Failure results in game termination with an "eternal loop" message.

### Phase 4: Fractal Logic Challenge
A series of boolean logic questions testing understanding of AND, OR, and NOT operations. Players have three attempts before the system corrupts and terminates the game.

### Phase 5: Final Judgment Quiz
Philosophical questions that determine the player's final destiny based on their responses about the simulation's purpose, CRUDY's role, and final decisions.

## Technical Implementation

### Technologies Used
- HTML5
- CSS3 with Bootstrap 5.3.2
- Vanilla JavaScript
- Google Fonts (Share Tech Mono for sci-fi aesthetic)

### File Structure
```
Project/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # Custom styling
└── js/
    ├── main.js        # Core game logic and flow control
    └── texts.js       # Game content, questions, and responses
```

### Key Features
- Responsive design using Bootstrap grid system
- Fade-in animations for smooth transitions
- Sci-fi themed interface with monospace typography
- Progressive difficulty across game phases
- Multiple ending scenarios based on player performance

## Game Mechanics

### Scoring System
- Simon Says: Pass/fail system (one attempt only)
- Fractal Logic: Three strikes system with progressive difficulty
- Final Judgment: Cumulative scoring determines final outcome

### Destiny Outcomes
- **Liberated**: High score - freedom from the simulation
- **Eternal Loop**: Medium score - trapped in endless cycle
- **Corrupted**: Low score - consciousness becomes system echo

## Installation and Usage

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. No additional setup or dependencies required
4. Internet connection needed for Bootstrap CDN and Google Fonts

## Browser Compatibility

The game is compatible with modern browsers supporting:
- ES6 JavaScript features
- CSS3 animations and transitions
- Bootstrap 5.3.2 components

## Academic Learning Objectives

This project demonstrates proficiency in:

- **DOM Manipulation**: Dynamic content generation and event handling
- **State Management**: Global variable management and game flow control  
- **Asynchronous Programming**: setTimeout functions and callback management
- **Object-Oriented Design**: Structured data organization and modular functions
- **Responsive Design**: Bootstrap framework integration and mobile compatibility
- **User Experience**: Progressive difficulty and engaging interface design

## Development Architecture

The codebase follows professional development standards with clear separation of concerns:
- **Game Logic** (`main.js`): Core functionality and flow control
- **Content Data** (`texts.js`): All text content and question databases  
- **Styling** (`style.css`): Visual design and animations
- **Structure** (`index.html`): Semantic HTML foundation

The application uses a state-based progression system where each phase must be completed successfully to advance, demonstrating understanding of conditional logic and user flow management.