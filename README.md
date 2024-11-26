# Image-Pixal-Editor

The code consists of two main files: index.html and index.js.

index.html:

This file is the main structure of the web application. It includes:
The document type declaration and basic HTML structure (head and body).
A header with a title, an image upload input, and a button to toggle between dark and light modes.
A main section that contains:
An area to display the uploaded image.
Controls for various image editing filters (grayscale, contrast, blur, brightness, etc.).
A modal that displays the image in a larger view when the user clicks the expand button.
A popup that allows users to download or share the edited image.
A footer with a link to the author's LinkedIn profile.
The file also includes links to external CSS and JavaScript libraries (like Font Awesome and dom-to-image) and a reference to the local JavaScript file index.js.
index.js:

This file contains the JavaScript logic for handling image uploads, applying filters, and managing the UI interactions.
Key functionalities include:
Listening for image uploads and displaying the image.
Applying various filters to the image based on user input.
Managing the border radius of the image with a toggle for percentage or pixel values.
Handling the modal display for the enlarged image.
Implementing a reset button to clear all filters and uploaded images.
Allowing users to download the edited image and share it using the Web Share API.
Saving the user's theme preference (dark/light mode) in local storage.

## Description

Image Pixel Editor is a web application that allows users to upload an image and apply various filters and effects to enhance their photos. Users can adjust properties such as grayscale, contrast, blur, brightness, and more. The application also features a dark/light mode toggle and the ability to download or share the edited image.

## Features

- Upload images in JPEG or PNG formats.
- Apply various filters including:
  - Grayscale
  - Contrast
  - Blur
  - Brightness
  - Invert
  - Hue Rotate
  - Saturation
  - Opacity
  - Sepia
  - Border Radius (in pixels or percentage)
- View the edited image in a larger modal.
- Reset all changes and clear the uploaded image.
- Download the edited image.
- Share the edited image via the Web Share API.
- Toggle between dark and light modes with theme persistence.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Font Awesome (for icons)
- dom-to-image (for downloading images)
