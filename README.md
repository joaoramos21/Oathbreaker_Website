<<<<<<< HEAD
# Mustache Website - Static Site Generator

Use https://mustache.github.io/ 

A modern, responsive website built with Mustache.js templates and a custom static site generator. This project showcases a clean component-based architecture using reusable templates, JSON data files, and modern web technologies.
## Demo

Check out a live demo of the portfolio website:

[Live Demo](https://acspt.github.io/mustache-website/output)

---

## Screenshots

| Home Page | Projects Page | Contact Page |
|-----------|--------------|--------------|
| ![Home Screenshot](assets/screenshots/home.png) | ![Projects Screenshot](assets/screenshots/projects.png) | ![Contact Screenshot](assets/screenshots/contact.png) |

---

## Getting Started

To set up and customize your own portfolio:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/acspt/mustache-website.git
   cd mustache-website
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Build the website**  
   ```bash
   npm run build
   ```

4. **View the website**  
   Open the files in the `output/` directory in your browser, or serve them with a local server.

5. **Customize content**  
   - Edit data files in the `data/` directory to update content
   - Modify templates in the `templates/` directory to change layout and structure
   - Update assets in the `assets/` directory for styling and images

---

## Features

- **Mustache Template Engine**: Powerful templating with JSON data separation
- **Custom Build System**: Automated compilation from templates to static HTML
- **Component-Based Architecture**: Modular template structure with reusable partials
- **Data-Driven Content**: JSON files for easy content management
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive Elements**: JavaScript-powered navigation, gallery slider, and animations
- **Modern UI**: Clean, professional design with smooth transitions and hover effects
- **SEO Friendly**: Semantic HTML structure and proper meta tags
- **Static Output**: No server required - runs directly in any web browser
=======
# Portfolio Website - Static HTML

A modern, responsive portfolio website built with component-based HTML templates. This project showcases a clean architecture using reusable components and modern web technologies.

## Features

- **Component-Based Architecture**: Modular HTML structure with reusable components
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive Elements**: JavaScript-powered navigation, project filtering, and animations
- **Modern UI**: Clean, professional design with smooth transitions and hover effects
- **SEO Friendly**: Semantic HTML structure and proper meta tags
- **Static Files**: No server required - runs directly in any web browser
>>>>>>> fce0055 (Version 0.0.1)

## Project Structure

```
<<<<<<< HEAD
mustache-website/
├── assets/                         # Static assets (copied to output)
│   ├── css/
│   │   ├── styles.css              # Main stylesheet
│   │   └── gallery-slider.css      # Gallery slider styles
│   ├── images/                     # Image assets
│   └── js/
│       ├── main.js                 # Interactive JavaScript
│       └── gallery-slider.js       # Gallery functionality
├── data/                           # JSON data files
│   ├── global.json                 # Site-wide data
│   └── pages/                      # Page-specific data
│       ├── index.json              # Home page data
│       ├── about.json              # About page data
│       ├── projects.json           # Projects page data
│       ├── gallery.json            # Gallery page data
│       ├── contact.json            # Contact page data
│       └── blog/                   # Blog data structure
├── templates/                      # Mustache templates
│   ├── layouts/
│   │   ├── layout.mustache         # Base layout template
│   │   ├── parent.mustache         # Parent layout
│   │   └── products.mustache       # Products layout
│   ├── pages/                      # Page templates
│   │   ├── index.mustache          # Home page template
│   │   ├── about/
│   │   │   └── index.mustache      # About page template
│   │   ├── projects.mustache       # Projects page template
│   │   ├── gallery.mustache        # Gallery page template
│   │   ├── contact.mustache        # Contact page template
│   │   ├── blog/                   # Blog templates
│   │   └── products/               # Product templates
│   └── partials/                   # Reusable components
│       ├── header.mustache         # Navigation header
│       ├── footer.mustache         # Footer component
│       ├── metadata.mustache       # HTML head metadata
│       ├── styles.mustache         # CSS includes
│       ├── scripts.mustache        # JavaScript includes
│       ├── feature-card.mustache   # Feature card component
│       ├── skills-section.mustache # Skills section component
│       ├── timeline-item.mustache  # Timeline item component
│       ├── project-card.mustache   # Project card component
│       ├── contact-info-cards.mustache # Contact info cards
│       └── contact-form.mustache   # Contact form component
├── output/                         # Generated static files
│   ├── index.html                  # Compiled home page
│   ├── projects.html               # Compiled projects page
│   ├── gallery.html                # Compiled gallery page
│   ├── contact.html                # Compiled contact page
│   ├── about/
│   │   └── index.html              # Compiled about page
│   ├── blog/                       # Compiled blog pages
│   ├── products/                   # Compiled product pages
│   └── assets/                     # Copied static assets
├── compile.js                      # Custom Mustache compiler
├── package.json                    # Project dependencies and scripts
├── settings.json                   # Build configuration
=======
portfolio/
├── assets/
│   ├── css/
│   │   └── styles.css              # Main stylesheet
│   └── js/
│       └── main.js                 # Interactive JavaScript
├── templates/                      # Mustache templates (for reference)
│   ├── partials/
│   │   ├── header.mustache         # Navigation header component
│   │   ├── footer.mustache         # Footer component
│   │   ├── feature-card.mustache   # Feature card component
│   │   ├── skills-section.mustache # Skills section component
│   │   ├── timeline-item.mustache  # Timeline item component
│   │   ├── project-card.mustache   # Project card component
│   │   ├── contact-info-cards.mustache # Contact info cards component
│   │   └── contact-form.mustache   # Contact form component
│   ├── layout.mustache             # Base layout template
│   ├── index.mustache              # Home page template
│   ├── about.mustache              # About page template
│   ├── projects.mustache           # Projects page template
│   └── contact.mustache            # Contact page template
├── index.html                      # Compiled home page
├── about.html                      # Compiled about page
├── projects.html                   # Compiled projects page
├── contact.html                    # Compiled contact page
>>>>>>> fce0055 (Version 0.0.1)
└── README.md                       # This file
```

## Pages Overview

### Home Page (`index.html`)
- Hero section with call-to-action
- Features/services overview
- Call-to-action section

<<<<<<< HEAD
### About Page (`about/index.html`)
=======
### About Page (`about.html`)
>>>>>>> fce0055 (Version 0.0.1)
- Personal story and background
- Skills section organized by category
- Experience and education timeline

### Projects Page (`projects.html`)
- Project portfolio with filtering functionality
<<<<<<< HEAD
- Category-based project organization
- Interactive project cards with hover effects

### Gallery Page (`gallery.html`)
- Image gallery with slider functionality
- Interactive navigation controls
- Responsive image display

=======
- Category-based project organization (Web Apps, Mobile, APIs)
- Interactive project cards with hover effects

>>>>>>> fce0055 (Version 0.0.1)
### Contact Page (`contact.html`)
- Contact information with icons
- Functional contact form with validation
- Social media links

<<<<<<< HEAD
### Blog Section (`blog/`)
- Article listings and individual posts
- Nested directory structure for organization
- Dynamic content generation from JSON data

### Products Section (`products/`)
- Product showcase pages
- Individual product detail pages
- Flexible product catalog structure

## Technologies Used

- **Mustache.js**: Logic-less template engine
- **Node.js**: Custom build system and compilation
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality and gallery slider
- **JSON**: Data storage and content management
- **Font Awesome**: Icon library
=======
## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icon library
- **Mustache.js**: Template engine (for development)
>>>>>>> fce0055 (Version 0.0.1)

## Quick Start

1. **Download or clone the project**
<<<<<<< HEAD
   ```bash
   git clone https://github.com/acspt/mustache-website.git
   cd mustache-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the website**:
   ```bash
   npm run build
   ```

4. **View locally**:
   Open the generated files in the `output/` directory in your browser, or use a local server like Live Server in VS Code.

## Build System

This project uses a custom Mustache.js compiler (`compile.js`) that:

- Compiles Mustache templates with JSON data
- Supports layouts, partials, and nested page structures
- Automatically copies assets to the output directory
- Provides flexible configuration through `settings.json`
- Supports data inheritance and global variables

### Available Scripts

- `npm run build` - Compile templates and generate static files
- `npm run build:clean` - Clean build (same as build)
- `npm run dev` - Development build with output messages

=======

2. **Open in browser**:
   Simply open `index.html` in any modern web browser.

3. **View locally**:
   ```
   Open index.html directly in your browser
   or
   Use a local server like Live Server in VS Code
   ```

>>>>>>> fce0055 (Version 0.0.1)
## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Flexible grid layouts

### Interactive Elements
- Smooth scrolling navigation
- Project filtering by category
- Form validation and submission simulation
- Hover effects and animations
- Mobile menu toggle

### Navigation
- Portuguese labels: "Projectos" and "Contactos"
- Consistent navigation across all pages
- Mobile-responsive hamburger menu

### Performance Optimizations
- Efficient CSS with minimal dependencies
- Optimized JavaScript with event delegation
- Semantic HTML structure

## Customization

### Updating Content
<<<<<<< HEAD
- Edit JSON files in the `data/` directory to change page content
- Modify `data/global.json` for site-wide settings
- Update page-specific data in `data/pages/` directory

### Styling Changes
- Edit `assets/css/styles.css` for main styling modifications
- Edit `assets/css/gallery-slider.css` for gallery-specific styles
- The CSS is organized by sections (navigation, hero, features, etc.)

### Adding New Pages
1. Create a new template in `templates/pages/`
2. Add corresponding data file in `data/pages/`
3. Run the build process to generate the HTML
4. Follow the established component pattern

### Template Development
- Templates use Mustache.js syntax for logic-less templating
- Partials are stored in `templates/partials/` for reusability
- Layouts provide consistent page structure
- Data binding allows for dynamic content generation

## Configuration

The build system can be configured through `settings.json`:

```json
{
  "mustache.compiler": {
    "output": "output",
    "templates": "templates/pages",
    "layout": "templates/layouts/layout.mustache",
    "partials": "templates/partials",
    "data": "data",
    "assets": "assets",
    "siteUrl": "",
    "cleanOutput": false,
    "createDirectories": true,
    "validateOutput": true,
    "copyAssets": true
  }
}
```

## Deployment

The generated static files in the `output/` directory can be deployed to any static hosting service:

- **GitHub Pages**: Push the output directory or use GitHub Actions
- **Netlify**: Connect your repository and set build command to `npm run build`
- **Vercel**: Similar to Netlify with automatic deployment
- **Traditional hosting**: Upload the output directory contents via FTP
=======
- Edit the HTML files directly to change text content
- Replace placeholder icons and content with your own information
- Update social media links in the footer

### Styling Changes
- Edit `assets/css/styles.css` for styling modifications
- The CSS is organized by sections (navigation, hero, features, etc.)

### Adding New Sections
- Add new HTML sections to any page
- Use existing CSS classes or add new ones
- Follow the established component pattern
>>>>>>> fce0055 (Version 0.0.1)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

<<<<<<< HEAD
MIT License - feel free to use this project for your own website!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build process
5. Submit a pull request

## Author

**Arlindo Santos** - [acspt](https://github.com/acspt)

## AI Assistant Guidance

For AI-driven code contributions, consult the [Copilot instructions](./.github/copilot-instructions.md) to understand project architecture, workflows, and template conventions.
=======
MIT License - feel free to use this project for your own portfolio!

## Template Development

The `templates/` folder contains the original Mustache templates used to generate the static HTML files. These can be used for future updates or as a reference for the component structure.
>>>>>>> fce0055 (Version 0.0.1)
