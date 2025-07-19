function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function calculateColorRules(r, g, b, rule) {
    const [h, s, l] = rgbToHsl(r, g, b);
    const colors = [];

    switch (rule) {
        case 'complementary':
            const compH = (h + 180) % 360;
            colors.push([r, g, b]); // Slot 1: Base color
            colors.push(hslToRgb(compH, s, l)); // Slot 2: Complementary
            colors.push([r, g, b]); // Slot 3: Base color
            colors.push(hslToRgb(compH, s, Math.max(l - 10, 0))); // Slot 4: Shade of complementary
            colors.push([r, g, b]); // Slot 5: Base color
            break;
        case 'analogous':
            colors.push(hslToRgb((h - 30 + 360) % 360, s, l));
            colors.push(hslToRgb((h - 15 + 360) % 360, s, l));
            colors.push([r, g, b]);
            colors.push(hslToRgb((h + 15) % 360, s, l));
            colors.push(hslToRgb((h + 30) % 360, s, l));
            break;
        case 'shades':
            colors.push(hslToRgb(h, s, Math.max(l - 20, 0)));
            colors.push(hslToRgb(h, s, Math.max(l - 10, 0)));
            colors.push([r, g, b]);
            colors.push(hslToRgb(h, s, Math.max(l - 5, 0)));
            colors.push(hslToRgb(h, s, Math.max(l - 2.5, 0)));
            break;
        case 'tints':
            colors.push(hslToRgb(h, s, Math.min(l + 20, 100)));
            colors.push(hslToRgb(h, s, Math.min(l + 10, 100)));
            colors.push([r, g, b]);
            colors.push(hslToRgb(h, s, Math.min(l + 5, 100)));
            colors.push(hslToRgb(h, s, Math.min(l + 2.5, 100)));
            break;
        case 'triadic':
            const triad1 = (h - 120 + 360) % 360;
            const triad2 = (h + 120) % 360;
            colors.push([r, g, b]); // Base color
            colors.push(hslToRgb(triad1, s, l)); // First triadic
            colors.push(hslToRgb(triad2, s, l)); // Second triadic
            colors.push(hslToRgb(triad1, s, Math.max(l - 10, 0))); // Shade of first triadic
            colors.push(hslToRgb(triad2, s, Math.min(l + 10, 100))); // Tint of second triadic
            break;
    }
    return colors;
}

function rgbToHex(r, g, b) {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0').toUpperCase();
}

function updateColorRuleDisplay(r, g, b) {
    const rule = document.getElementById('color-rule').value;
    const colors = calculateColorRules(r, g, b, rule);
    for (let i = 1; i <= 5; i++) {
        const box = document.getElementById(`color-rule-box-${i}`);
        const [cr, cg, cb] = colors[i - 1];
        box.style.backgroundColor = `rgb(${cr}, ${cg}, ${cb})`;
    }
}

function calculateChannelValue(switches) {
    let value = 0;
    switches.forEach(input => {
        if (input.checked) {
            value += Math.pow(2, parseInt(input.dataset.bit));
        }
    });
    return value;
}

function updateChannel(channel, switches, decimalSpan, hexSpan, byteColor) {
    const value = calculateChannelValue(switches);
    decimalSpan.textContent = value;
    hexSpan.textContent = value.toString(16).padStart(2, '0').toUpperCase();
    byteColor.style.backgroundColor = channel === 'red' ? `rgb(${value}, 0, 0)` :
                                    channel === 'green' ? `rgb(0, ${value}, 0)` :
                                    `rgb(0, 0, ${value})`;
    return value;
}

function updateBitStates(switches, bitStates) {
    switches.forEach((input, index) => {
        bitStates[index].textContent = input.checked ? '1' : '0';
    });
}

function randomizeColor() {
    const redSwitches = document.querySelectorAll('#red-switches input');
    const greenSwitches = document.querySelectorAll('#green-switches input');
    const blueSwitches = document.querySelectorAll('#blue-switches input');

    [redSwitches, greenSwitches, blueSwitches].forEach(switches => {
        switches.forEach(input => {
            input.checked = Math.random() > 0.5;
        });
    });

    updateColorDisplay();
}

function updateColorDisplay() {
    const redSwitches = document.querySelectorAll('#red-switches input');
    const greenSwitches = document.querySelectorAll('#green-switches input');
    const blueSwitches = document.querySelectorAll('#blue-switches input');

    const red = updateChannel('red', redSwitches, document.getElementById('red-decimal'), document.getElementById('red-hex'), document.getElementById('red-byte-color'));
    const green = updateChannel('green', greenSwitches, document.getElementById('green-decimal'), document.getElementById('green-hex'), document.getElementById('green-byte-color'));
    const blue = updateChannel('blue', blueSwitches, document.getElementById('blue-decimal'), document.getElementById('blue-hex'), document.getElementById('blue-byte-color'));

    updateBitStates(redSwitches, document.querySelectorAll('#red-switches ~ .bit-states span'));
    updateBitStates(greenSwitches, document.querySelectorAll('#green-switches ~ .bit-states span'));
    updateBitStates(blueSwitches, document.querySelectorAll('#blue-switches ~ .bit-states span'));

    const hex = `${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`.toUpperCase();
    document.getElementById('mixed-hex').textContent = hex;
    document.getElementById('mixed-rgb').textContent = `${red}, ${green}, ${blue}`;
    document.getElementById('color-box').style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    const [h, s, l] = rgbToHsl(red, green, blue);
    document.getElementById('mixed-hsl').textContent = `${Math.round(h)}°, ${Math.round(s)}%, ${Math.round(l)}%`;

    const colorTemperature = h < 90 || h > 270 ? 'Warm' : h < 180 ? 'Cool' : 'Neutral';
    document.getElementById('color-temperature').textContent = colorTemperature;

    const colorName = ntc.name(`#${hex}`)[1];
    document.getElementById('color-name').textContent = colorName;

    const complementary = hslToRgb((h + 180) % 360, s, l);
    document.getElementById('complementary-rgb').textContent = complementary.map(Math.round).join(', ');
    document.getElementById('complementary-swatch').style.backgroundColor = `rgb(${complementary.join(', ')})`;

    const analogous1 = hslToRgb((h - 30 + 360) % 360, s, l);
    const analogous2 = hslToRgb((h + 30) % 360, s, l);
    document.getElementById('analogous-swatch-1').style.backgroundColor = `rgb(${analogous1.join(', ')})`;
    document.getElementById('analogous-swatch-2').style.backgroundColor = `rgb(${analogous2.join(', ')})`;

    updateColorRuleDisplay(red, green, blue);
}

document.addEventListener('DOMContentLoaded', () => {
    const redSwitches = document.querySelectorAll('#red-switches input');
    const greenSwitches = document.querySelectorAll('#green-switches input');
    const blueSwitches = document.querySelectorAll('#blue-switches input');

    [redSwitches, greenSwitches, blueSwitches].forEach((switchGroup, index) => {
        switchGroup.forEach(switchInput => {
            switchInput.addEventListener('change', () => {
                console.log(`Switch changed in ${['red', 'green', 'blue'][index]}: bit ${switchInput.dataset.bit}`);
                updateColorDisplay();
            });
        });
    });

    document.getElementById('color-rule').addEventListener('change', () => {
        const red = calculateChannelValue(document.querySelectorAll('#red-switches input'));
        const green = calculateChannelValue(document.querySelectorAll('#green-switches input'));
        const blue = calculateChannelValue(document.querySelectorAll('#blue-switches input'));
        updateColorRuleDisplay(red, green, blue);
    });

    document.getElementById('copy-rgb-btn').addEventListener('click', () => {
        const rgb = document.getElementById('mixed-rgb').textContent;
        navigator.clipboard.writeText(rgb);
        alert('RGB value copied to clipboard!');
    });

    document.getElementById('copy-hex-btn').addEventListener('click', () => {
        const hex = document.getElementById('mixed-hex').textContent;
        navigator.clipboard.writeText(hex);
        alert('HEX value copied to clipboard!');
    });

    document.getElementById('copy-all-hex-btn').addEventListener('click', () => {
        const hexValues = [];
        for (let i = 1; i <= 5; i++) {
            const box = document.getElementById(`color-rule-box-${i}`);
            const rgb = box.style.backgroundColor.match(/\d+/g).map(Number);
            const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
            hexValues.push(hex);
        }
        const hexString = hexValues.join(', ');
        navigator.clipboard.writeText(hexString);
        alert('All HEX values copied to clipboard!');
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        [redSwitches, greenSwitches, blueSwitches].forEach(switchGroup => {
            switchGroup.forEach(switchInput => {
                switchInput.checked = false;
            });
        });
        updateColorDisplay();
    });

    document.getElementById('randomize-btn').addEventListener('click', randomizeColor);

    // Randomize color on page load
    randomizeColor();
});
