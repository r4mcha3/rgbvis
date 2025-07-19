# RGB Color Visualizer

The **RGB Color Visualizer** is an interactive web application designed to help users understand and explore 24-bit RGB color composition. By manipulating individual bits for the Red, Green, and Blue channels, users can visualize how colors are formed, view their decimal and hexadecimal values, and explore color theory concepts like complementary, analogous, and other color relationships. Built with HTML, CSS, and JavaScript, this tool is ideal for students, designers, and developers learning about digital color systems.

## Features

- **Interactive RGB Bit Switches**: Toggle individual bits (0-255) for each RGB channel to create custom colors, with real-time updates to decimal and hexadecimal values.
- **Color Previews**: Visualize the selected color in a preview box and see individual channel contributions (Red, Green, Blue).
- **Mixed Color Values**: Display the combined RGB, HEX, and HSL values, along with the color’s name (via ntc.js) and temperature (Warm, Cool, Neutral).
- **Color Theory Reference**:
  - View the complementary color (opposite hue) with its RGB values and swatch.
  - Display two analogous colors (±30° hues) with swatches.
  - Explore additional color rules via a dropdown, showing five linear color boxes (center box is the selected color) for:
    - **Complementary**: Opposite hue (180° shift).
    - **Analogous**: Hues ±15° and ±30° from the selected color.
    - **Shades**: Darker versions (reduced lightness by 10%, 20%, etc.).
    - **Tints**: Lighter versions (increased lightness by 10%, 20%, etc.).
    - **Triadic**: Hues ±120° from the selected color.
- **Copy RGB Value**: Copy the mixed RGB value to the clipboard with a single click.
- **Reset Functionality**: Reset all switches to zero for a fresh start.
- **Responsive Design**: Adapts to various screen sizes with a clean, modern interface themed in light and dark modes (CSS variables).

## Demo

Try the app live: [RGB Color Visualizer Demo](https://r4mcha3.github.io/rgbcolorvis/) (Add your GitHub Pages link or hosting URL here).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/r4mcha3/rgbcolorvis.git
   cd rgbcolorvis
   ```

2. **Install Dependencies**:
   No server-side dependencies are required. The app uses the following external libraries, included via CDN in `index.html`:
   - [XLSX](https://cdnjs.com/libraries/xlsx) (for potential file handling, if enabled).
   - [ntc.js](https://github.com/moertel/ntc-js) (for color name matching).

   Ensure you have a local copy of `ntc.js` in the project directory or update `index.html` to use a CDN if preferred.

3. **Serve the App**:
   Open `index.html` in a web browser directly, or use a local server for better testing:
   ```bash
   npx http-server
   ```
   Then navigate to `http://localhost:8080`.

## Usage

1. **Toggle RGB Switches**: Use the bit switches (128 to 1) for each channel (Red, Green, Blue) to set values from 0 to 255.
2. **View Color Output**:
   - The color preview box updates instantly to show the mixed color.
   - Decimal and HEX values for each channel and the mixed color are displayed.
   - HSL values, color name, and temperature provide additional context.
3. **Explore Color Theory**:
   - Check the complementary and analogous colors in the Color Reference section.
   - Select a color rule (Complementary, Analogous, Shades, Tints, Triadic) from the dropdown to see five related colors, with the center box showing the current color.
4. **Copy or Reset**:
   - Click "Copy RGB Value" to copy the mixed RGB value.
   - Click "Reset" to clear all switches and start over.

## Project Structure

- `index.html`: Main HTML file containing the app’s structure.
- `styles.css`: CSS file with light/dark theme support using CSS variables.
- `script.js`: JavaScript logic for RGB calculations, color updates, and color rule displays.
- `ntc.js`: External library for color name matching.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Please include tests and update documentation as needed.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [ntc.js](https://github.com/moertel/ntc-js) for color name matching.
- [SheetJS](https://sheetjs.com/) for XLSX file handling (if enabled).

## Contact

For questions or feedback, open an issue on GitHub or contact [r4mcha3](https://github.com/r4mcha3).
