const colorPicker = document.querySelector(".color-picker");
const colorCheck = document.getElementById("colorCheck");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const copyHex = document.getElementById("copyHex");
const copyRGB = document.getElementById("copyRGB");
let btn = document.getElementById("btn");
let bgToggler = document.getElementById("bg-toggler");
const defaultBgColor = "#333333";
const color2 = "#FF4E88";

btn.addEventListener("click", () => {
  const hex = hexValue.value.trim();
  const rgb = rgbValue.value.trim();

  if (isValidHex(hex)) {
    rgbValue.value = hexToRgb(hex);
    colorCheck.style.backgroundColor = hex;
    colorCheck.textContent = "";
    colorPicker.style.borderColor = hex;
  } else if (isValidRgb(rgb)) {
    const rgbArray = rgb.match(/\d+/g).map(Number);
    hexValue.value = rgbToHex(...rgbArray);
    colorCheck.colorCheck.style.backgroundColor = hexValue.value;
    colorCheck.textContent = "";
    colorPicker.style.borderColor = hexValue.value;
  } else {
    alert(
      "Please input a valid HEX (#RRGGBB or #RGB) or RGB (rgb(r, g, b)) value."
    );
  }
});

bgToggler.addEventListener("click", () => {
  const hex = hexValue.value.trim();
  if (!isValidHex(hex)) {
    console.log("Invalid hex");
    return;
  }
  let colorInRGB = hexToRgb(hexValue.value);
  if (colorInRGB !== document.body.style.backgroundColor) {
    document.body.style.backgroundColor = hex;
    btn.style.backgroundColor = defaultBgColor;
    bgToggler.style.backgroundColor = defaultBgColor;
    document.querySelector(".color-picker").style.borderColor = defaultBgColor;
  } else {
    document.body.style.backgroundColor = defaultBgColor;
    btn.style.backgroundColor = color2;
    bgToggler.style.backgroundColor = color2;
    document.querySelector(".color-picker").style.borderColor = hex;
  }
});

// Function to validate the hex value
function isValidHex(hex) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

// Function to validate the rgb value
function isValidRgb(rgb) {
  return /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i.test(rgb);
}

// Function to convert hex value into rgb value
function hexToRgb(hex) {
  let r, g, b;
  if (hex.length === 4) {
    // #RGB format
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    // #RRGGBB format
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to convert rgb value to hex value
function rgbToHex(r, g, b) {
  const hexR = r.toString(16).padStart(2, "0").toUpperCase();
  const hexG = g.toString(16).padStart(2, "0").toUpperCase();
  const hexB = b.toString(16).padStart(2, "0").toUpperCase();

  return `#${hexR}${hexG}${hexB}`;
}


// Reusable function to handle copying and icon change
function handleCopy(inputElement, copyButton) {
  const copyValue = inputElement.value;
  navigator.clipboard.writeText(copyValue);

  const icon = copyButton.querySelector("i");
  // Change icon to checkmark
  icon.classList.remove("fa-regular", "fa-copy");
  icon.classList.add("fa-solid", "fa-check");

  copyButton.title = `${inputElement.id === 'hexValue' ? 'Hex' : 'RGB'} value copied`;

  // Revert the icon after 3 seconds
  setTimeout(() => {
    icon.classList.remove("fa-solid", "fa-check");
    icon.classList.add("fa-regular", "fa-copy");

    copyButton.title = "Copy To Clipboard";
  }, 3000);
}

// Event listeners for copying
copyHex.addEventListener("click", () => handleCopy(hexValue, copyHex));
copyRGB.addEventListener("click", () => handleCopy(rgbValue, copyRGB));