# Image & Video Common Format Converter 

A clean, minimal, modern web-based tool for converting images between different formats. This tool works entirely in your browser - no server uploads required!

## Supported Formats

Image Formats
- PNG
- JPG
- WEBP
- GIF
- BMP

Video Formats
- MP4
- MOV
- AVI
- WEBP
  

## Features

- Drag & drop interface with multi-file support
- Batch processing of multiple images at once
- Image preview and queue management
- Client-side conversion (your images never leave your computer)
- Individual and batch download options
- Responsive design works on mobile and desktop

## How to Use

1. Open `index.html` in any modern web browser
2. Drag & drop one or more images onto the upload area (or click to browse)
3. Manage your image queue (add more or remove unwanted images)
4. Select the desired output format
5. Click "Convert All" to process all images
6. Once conversion is complete, download individual images or all at once

## Technical Details

This tool uses HTML5 Canvas API to handle image conversion, which works entirely in the browser. No server-side processing or image uploads are required. Your images never leave your computer.

For batch downloads, the tool uses JSZip to create a zip file containing all the converted images.

## Browser Compatibility

Works in all modern browsers that support HTML5 Canvas:
- Chrome
- Firefox
- Safari
- Edge

## Limitations

- Some conversions may result in quality loss depending on the source and target formats (UPDATE Coming Soon)
- Very large images may cause browser performance issues (UNTESTED)
- GIF animations will be converted to static images (FIX WIP)
- Some browser-specific limitations may apply to certain format conversions (UNTESTED)
