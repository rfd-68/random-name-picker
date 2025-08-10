# 🎯 Random Name Picker

A beautiful, modern static website for randomly selecting names from a list. Perfect for classroom activities, team selections, raffles, or any situation where you need to pick a random name.

## ✨ Features

- **Random Name Selection**: Click the "Pick Name" button to randomly select a name from your list
- **Beautiful UI**: Modern, responsive design with smooth animations and gradients
- **Name Management**: Add new names, remove existing ones, and manage your list
- **Persistent Storage**: Your names and statistics are saved locally in your browser
- **Sample Names**: Comes with 20 sample names to get you started
- **Statistics**: Track total names and picks made
- **Keyboard Shortcuts**: Quick access to main functions
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The website comes with 20 sample names to get you started
3. Click "Pick Name" to randomly select a name
4. Use "Reset" to clear the current selection

### Adding Names
1. Type a name in the "Add a new name..." input field
2. Click the "+" button or press Enter
3. The name will be added to your list

### Removing Names
1. Hover over any name tag in the list
2. Click the red "×" button that appears
3. The name will be removed from your list

### Keyboard Shortcuts
- **Spacebar**: Pick a random name
- **R key**: Reset the current selection
- **A key**: Focus on the add name input field

## 🎨 Customization

The website is built with vanilla HTML, CSS, and JavaScript, making it easy to customize:

- **Colors**: Modify the CSS variables and gradients in `styles.css`
- **Sample Names**: Edit the `loadSampleNames()` function in `script.js`
- **Layout**: Adjust the grid and spacing in `styles.css`
- **Animations**: Modify the CSS keyframes and transitions

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- Names list
- Pick count
- No data is sent to external servers

## 🔧 Technical Details

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript ES6+**: Classes, arrow functions, and modern syntax
- **Local Storage**: Browser-based data persistence
- **No Dependencies**: Pure vanilla web technologies

## 📁 File Structure

```
random_pick/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🌟 Tips for Best Experience

1. **Use descriptive names** for easier identification
2. **Keep the list manageable** (recommended: 50 names or fewer)
3. **Use keyboard shortcuts** for faster operation
4. **Refresh the page** if you encounter any issues
5. **Clear browser data** if you want to start fresh

## 🎉 Use Cases

- **Classroom**: Random student selection for activities
- **Team Building**: Fair team member selection
- **Events**: Raffle or prize winner selection
- **Games**: Random player selection
- **Decision Making**: When you can't decide between options

## 📞 Support

This is a static website that runs entirely in your browser. If you encounter any issues:

1. Make sure JavaScript is enabled
2. Try refreshing the page
3. Clear your browser cache
4. Check that all files are in the same directory

Enjoy using your Random Name Picker! 🎯✨
