# SweetTreats - Premium Bakery E-Commerce

Welcome to the frontend repository of **SweetTreats**, a modern, highly interactive, and visually stunning e-commerce platform designed exclusively for premium bakeries, patisseries, and dessert shops. 

Built with a focus on seamless user experience (UX) and high-conversion UI, SweetTreats offers an expansive shopping environment encompassing categories like Cakes, Donuts, Pastries, Ice Creams, and Gifting.

## 🌟 Key Features

* **Advanced E-Commerce UI:** Implements mega-menus, Pinterest-style masonry product grids, and smooth hover micro-animations to create a top-tier visual experience.
* **Intelligent AI Assistant:** Features a built-in virtual assistant that provides smart product recommendations, fallback suggestions for unavailable items, and allows users to add items directly to their cart from the chat window.
* **Dynamic Global Cart:** Persistent, client-side shopping cart utilizing `localStorage`. Users can add, remove, and update quantities instantly without page reloads, complete with toast notifications and a slide-out cart sidebar.
* **Optimized Checkout Workflow:** A streamlined, modal-based cart and checkout process designed for high conversion rates.
* **Component Modularity:** Reusable modals, sidebars, and navigation injected globally via a centralized rendering engine (`dynamic_render.js`) ensuring maintainability across all HTML pages.
* **Fully Responsive:** Beautifully adapts to mobile, tablet, and desktop environments.

## 🛠️ Tech Stack

This project is built using a lightweight, lightning-fast stack to guarantee maximum performance and zero dependency overhead:

* **HTML5** - Semantic markup and structural components.
* **CSS3** - Custom properties (variables), Flexbox, CSS Grid, and custom keyframe animations. (No heavy CSS frameworks used, ensuring 100% bespoke design).
* **Vanilla JavaScript (ES6+)** - Powers all interactions, state management (Cart/Wishlist), AI chat logic, and dynamic DOM manipulation without the need for React or Vue.

## 📁 Project Structure

```
/frontend
│
├── index.html            # Main Landing Page
├── cakes.html            # Cakes Category & Masonry Grid
├── pastries.html         # Pastries & Croissants Collection
├── donuts.html           # Donuts & Custom Box builder
├── icecream.html         # Ice Cream & Gelatos
├── gifting.html          # Gifting & Hampers
├── cart.html             # Dedicated Shopping Bag & Checkout Page
│
├── styles.css            # Global Stylesheet & Design System Tokens
├── custom_features.css   # Mega Menu, Animations, and specialized components
│
├── dynamic_render.js     # Core JS: Global Cart State, AI Chatbot, Mega-Grids
└── apply_fixes.cjs       # Build tool for injecting shared components
```

## 🚀 Getting Started

To run this project locally, you don't need any complex build steps. 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sweettreats-frontend.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd sweettreats-frontend/frontend
   ```

3. **Run a local development server:**
   You can use any local server (like Live Server in VSCode or Python's HTTP server) to serve the files. 
   Using Node/NPM:
   ```bash
   npx serve .
   ```
   Or using Python:
   ```bash
   python -m http.server 3000
   ```

4. Open `http://localhost:3000` in your browser.

## 💡 Usage Notes

- **Database Simulation:** Currently, product data and user state (Cart, Wishlist, Orders) are maintained locally in the browser using `localStorage`. This allows for a fully functional frontend demo without requiring a backend server.
- **AI Chatbot:** The AI assistant uses keyword parsing and a local JSON array to recommend products instantly.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
