document.addEventListener('DOMContentLoaded', () => {
    console.log("Filechemy - File Format Converter initialized");
    
    // Title letter animation setup
    setupTitleAnimation();
    
    // Trigger startup animation
    startupTitleAnimation();
    
    // DOM Elements - Image Section
    const imageDropArea = document.getElementById('imageDropArea');
    const imageInput = document.getElementById('imageInput');
    const imageQueue = document.getElementById('imageQueue');
    const imageQueueList = document.getElementById('imageQueueList');
    const imageQueueCount = document.getElementById('imageQueueCount');
    const addMoreImagesBtn = document.getElementById('addMoreImagesBtn');
    const clearImageQueueBtn = document.getElementById('clearImageQueueBtn');
    const imageConversionOptions = document.getElementById('imageConversionOptions');
    const imageFormatOptions = document.getElementById('imageFormatOptions');
    
    // DOM Elements - Video Section
    const videoDropArea = document.getElementById('videoDropArea');
    const videoInput = document.getElementById('videoInput');
    const videoQueue = document.getElementById('videoQueue');
    const videoQueueList = document.getElementById('videoQueueList');
    const videoQueueCount = document.getElementById('videoQueueCount');
    const addMoreVideosBtn = document.getElementById('addMoreVideosBtn');
    const clearVideoQueueBtn = document.getElementById('clearVideoQueueBtn');
    const videoConversionOptions = document.getElementById('videoConversionOptions');
    const videoFormatOptions = document.getElementById('videoFormatOptions');
    
    // DOM Elements - Common
    const conversionActions = document.getElementById('conversionActions');
    const convertBtn = document.getElementById('convertBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultTabs = document.getElementById('resultTabs');
    const resultContent = document.getElementById('resultContent');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const newConversionBtn = document.getElementById('newConversionBtn');
    
    // Variables
    let imageFiles = [];
    let videoFiles = [];
    let selectedImageFormats = [];
    let selectedVideoFormats = [];
    let convertedResults = {}; // Format -> array of converted files
    let activeTab = null;
    let isDragging = false;
    let lastToggleState = false;

    // Title animation function
    function setupTitleAnimation() {
        const titleLetters = document.querySelectorAll('.title-letter');
        const originalLetters = Array.from(titleLetters).map(el => el.textContent);
        const originalWidths = Array.from(titleLetters).map(el => el.offsetWidth);
        const originalFont = window.getComputedStyle(titleLetters[0]).fontFamily;
        const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';
        const animationIntervals = {};
        
        // Array of 30 different fonts to cycle through, including 15 wacky/decorative ones
        const fontOptions = [
            // Original 15 fonts
            "'Montserrat', sans-serif",
            "'Arial Black', sans-serif",
            "'Impact', sans-serif",
            "'Verdana', sans-serif",
            "'Georgia', serif",
            "'Courier New', monospace",
            "'Trebuchet MS', sans-serif",
            "'Palatino Linotype', serif",
            "'Lucida Console', monospace",
            "'Tahoma', sans-serif",
            "'Segoe UI', sans-serif",
            "'Times New Roman', serif",
            "'Century Gothic', sans-serif",
            "'Copperplate', fantasy",
            "'Helvetica', sans-serif",
            
            // 15 more wacky/decorative fonts
            "'Comic Sans MS', cursive",
            "'Brush Script MT', cursive",
            "'Papyrus', fantasy",
            "'Chiller', fantasy",
            "'Jokerman', fantasy",
            "'Stencil', fantasy",
            "'Broadway', fantasy",
            "'Ravie', fantasy",
            "'Showcard Gothic', fantasy",
            "'Harrington', fantasy",
            "'Curlz MT', cursive",
            "'Lucida Handwriting', cursive",
            "'Kristen ITC', cursive",
            "'Freestyle Script', cursive",
            "'Gigi', fantasy"
        ];
        
        // Create a measurement div for calculating letter widths
        const measureDiv = document.createElement('div');
        measureDiv.style.cssText = `
            position: absolute;
            visibility: hidden;
            height: auto;
            width: auto;
            white-space: nowrap;
            font-family: ${window.getComputedStyle(titleLetters[0]).fontFamily};
            font-size: ${window.getComputedStyle(titleLetters[0]).fontSize};
            font-weight: ${window.getComputedStyle(titleLetters[0]).fontWeight};
        `;
        document.body.appendChild(measureDiv);
        
        titleLetters.forEach((letter, index) => {
            // Store original width and font
            letter.dataset.originalWidth = originalWidths[index];
            letter.dataset.originalFont = originalFont;
            
            letter.addEventListener('mouseenter', () => {
                startLetterAnimation(letter, index);
            });
            
            letter.addEventListener('mouseleave', () => {
                stopLetterAnimation(letter, index, originalLetters[index]);
            });
        });
        
        function startLetterAnimation(letterElement, index) {
            // Add the animating class
            letterElement.classList.add('title-letter-animating');
            
            // Stop any existing animation for this letter
            if (animationIntervals[index]) {
                clearInterval(animationIntervals[index]);
            }
            
            // Get the current letter text
            const currentLetter = letterElement.textContent;
            
            // Add an initial random color to prevent flicker
            const initialRandomColorNum = Math.floor(Math.random() * 30) + 1;
            letterElement.classList.add(`letter-color-${initialRandomColorNum}`);
            
            // Set an interval to change the font randomly
            animationIntervals[index] = setInterval(() => {
                // Select a random font
                const newFont = fontOptions[Math.floor(Math.random() * fontOptions.length)];
                
                // Measure the width of the current letter with the new font
                measureDiv.style.fontFamily = newFont;
                measureDiv.textContent = currentLetter;
                const newWidth = measureDiv.offsetWidth;
                
                // Apply the new font to the letter
                letterElement.style.fontFamily = newFont;
                
                // Adjust the element's width to accommodate the new font
                letterElement.style.width = `${newWidth}px`;
                
                // Add a subtle transition effect
                letterElement.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    letterElement.style.transform = 'translateY(0)';
                }, 100);
                
                // Change color every time the font changes
                // Add the new color class BEFORE removing the old ones
                const randomColorNum = Math.floor(Math.random() * 30) + 1;
                letterElement.classList.add(`letter-color-${randomColorNum}`);
                
                // Then remove any other color classes
                for (let i = 1; i <= 30; i++) {
                    if (i !== randomColorNum) {
                        letterElement.classList.remove(`letter-color-${i}`);
                    }
                }
                
            }, 150); // Change every 150ms for a rapid but visible effect
        }
        
        function stopLetterAnimation(letterElement, index, originalChar) {
            // Clear the animation interval
            if (animationIntervals[index]) {
                clearInterval(animationIntervals[index]);
                animationIntervals[index] = null;
            }
            
            // Add a bounce effect when settling
            letterElement.animate([
                { transform: 'translateY(-5px)' },
                { transform: 'translateY(0)' }
            ], {
                duration: 200,
                easing: 'ease-in-out'
            });
            
            // Reset the letter after animation completes
            setTimeout(() => {
                // Reset the letter
                letterElement.textContent = originalChar;
                letterElement.style.fontFamily = '';
                letterElement.style.width = '';
                letterElement.style.transform = '';
                letterElement.classList.remove('title-letter-animating');
                
                // Remove all color classes
                for (let i = 1; i <= 30; i++) {
                    letterElement.classList.remove(`letter-color-${i}`);
                }
            }, 200);
        }
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            // Remove measurement div
            if (measureDiv && measureDiv.parentNode) {
                measureDiv.parentNode.removeChild(measureDiv);
            }
            
            // Clear all animation intervals
            Object.keys(animationIntervals).forEach(key => {
                if (animationIntervals[key]) {
                    clearInterval(animationIntervals[key]);
                }
            });
        });
        
        // Make these functions available globally within the closure
        window.startLetterAnimation = startLetterAnimation;
        window.stopLetterAnimation = stopLetterAnimation;
        window.animationIntervals = animationIntervals;
        window.titleLetters = titleLetters;
        window.originalLetters = originalLetters;
        window.possibleLetters = possibleLetters;
        window.fontOptions = fontOptions;
    }

    // Startup title animation that plays when the page loads
    function startupTitleAnimation() {
        const titleLetters = document.querySelectorAll('.title-letter');
        const originalLetters = Array.from(titleLetters).map(el => el.textContent);
        const originalFont = window.getComputedStyle(titleLetters[0]).fontFamily;
        const fontOptions = [
            // Original 15 fonts
            "'Montserrat', sans-serif",
            "'Arial Black', sans-serif",
            "'Impact', sans-serif",
            "'Verdana', sans-serif",
            "'Georgia', serif",
            "'Courier New', monospace",
            "'Trebuchet MS', sans-serif",
            "'Palatino Linotype', serif",
            "'Lucida Console', monospace",
            "'Tahoma', sans-serif",
            "'Segoe UI', sans-serif",
            "'Times New Roman', serif",
            "'Century Gothic', sans-serif",
            "'Copperplate', fantasy",
            "'Helvetica', sans-serif",
            
            // 15 more wacky/decorative fonts
            "'Comic Sans MS', cursive",
            "'Brush Script MT', cursive",
            "'Papyrus', fantasy",
            "'Chiller', fantasy",
            "'Jokerman', fantasy",
            "'Stencil', fantasy",
            "'Broadway', fantasy",
            "'Ravie', fantasy",
            "'Showcard Gothic', fantasy",
            "'Harrington', fantasy",
            "'Curlz MT', cursive",
            "'Lucida Handwriting', cursive",
            "'Kristen ITC', cursive",
            "'Freestyle Script', cursive",
            "'Gigi', fantasy"
        ];
        let animating = true;
        
        // Create a measurement div for calculating widths with different fonts
        const measureDiv = document.createElement('div');
        measureDiv.style.cssText = `
            position: absolute;
            visibility: hidden;
            height: auto;
            width: auto;
            white-space: nowrap;
            font-size: ${window.getComputedStyle(titleLetters[0]).fontSize};
            font-weight: ${window.getComputedStyle(titleLetters[0]).fontWeight};
        `;
        document.body.appendChild(measureDiv);
        
        // Start with all letters animating
        titleLetters.forEach((letter, index) => {
            letter.classList.add('title-letter-animating');
            
            // Add an initial random color to prevent flicker
            const initialRandomColorNum = Math.floor(Math.random() * 30) + 1;
            letter.classList.add(`letter-color-${initialRandomColorNum}`);
            
            // Set an interval for each letter
            const interval = setInterval(() => {
                if (!animating) {
                    clearInterval(interval);
                    return;
                }
                
                // Select a random font
                const newFont = fontOptions[Math.floor(Math.random() * fontOptions.length)];
                
                // Measure the width with the new font
                measureDiv.style.fontFamily = newFont;
                measureDiv.textContent = originalLetters[index];
                const newWidth = measureDiv.offsetWidth;
                
                // Apply the new font
                letter.style.fontFamily = newFont;
                letter.style.width = `${newWidth}px`;
                
                // Add a subtle movement
                letter.style.transform = 'translateY(-3px)';
                setTimeout(() => {
                    letter.style.transform = 'translateY(0)';
                }, 50);
                
                // Change color with every font change
                // Add new color before removing old ones
                const randomColorNum = Math.floor(Math.random() * 30) + 1;
                letter.classList.add(`letter-color-${randomColorNum}`);
                
                // Then remove any other color classes
                for (let i = 1; i <= 30; i++) {
                    if (i !== randomColorNum) {
                        letter.classList.remove(`letter-color-${i}`);
                    }
                }
                
            }, 100); // Fast animation
            
            // Store the interval for later cleanup
            window.animationIntervals[index] = interval;
        });
        
        // Random stop timing for each letter between 2-4 seconds
        titleLetters.forEach((letter, index) => {
            const stopTime = 2000 + Math.random() * 2000; // Random time between 2-4 seconds
            
            setTimeout(() => {
                // Clear the animation interval
                if (window.animationIntervals[index]) {
                    clearInterval(window.animationIntervals[index]);
                    window.animationIntervals[index] = null;
                }
                
                // Add a little bounce effect when settling
                letter.animate([
                    { transform: 'translateY(-10px)' },
                    { transform: 'translateY(0)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                });
                
                // Transition to final state and remove classes after animation completes
                setTimeout(() => {
                    letter.style.transform = 'translateY(0)';
                    letter.style.fontFamily = originalFont;
                    letter.classList.remove('title-letter-animating');
                    letter.style.width = '';
                    
                    // Remove color classes at the very end
                    for (let i = 1; i <= 30; i++) {
                        letter.classList.remove(`letter-color-${i}`);
                    }
                }, 300);
                
            }, stopTime);
        });
        
        // Ensure animation stops completely after 4.5 seconds
        setTimeout(() => {
            animating = false;
            
            // Wait a tiny bit for any ongoing animations to settle
            setTimeout(() => {
                // Make sure all letters are in their final state
                titleLetters.forEach((letter, index) => {
                    letter.style.fontFamily = originalFont;
                    letter.classList.remove('title-letter-animating');
                    letter.style.width = '';
                    
                    // Remove any color classes
                    for (let i = 1; i <= 30; i++) {
                        letter.classList.remove(`letter-color-${i}`);
                    }
                });
                
                // Clean up measurement div
                if (measureDiv && measureDiv.parentNode) {
                    measureDiv.parentNode.removeChild(measureDiv);
                }
                
                // Clear any remaining intervals
                Object.keys(window.animationIntervals).forEach(key => {
                    if (window.animationIntervals[key]) {
                        clearInterval(window.animationIntervals[key]);
                        window.animationIntervals[key] = null;
                    }
                });
            }, 100);
        }, 4500);
    }

    // Apply drag and drop events to a specific drop area
    function setupDropArea(dropArea, fileType, fileInput, handleFunc) {
        // Prevent default behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop area when dragging over
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.add('highlight');
            }, false);
        });
        
        // Remove highlight when leaving drop area or after drop
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.remove('highlight');
            }, false);
        });
        
        // Handle file drop
        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files && files.length) {
                console.log(`Processing ${files.length} dropped ${fileType}s`);
                handleFunc(files);
            }
        }, false);
        
        // Handle file selection via browse button
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length) {
                handleFunc(this.files);
            }
        });
        
        // Handle clicking on the drop area to open file dialog
        dropArea.addEventListener('click', () => {
            fileInput.click();
        });
    }
    
    // Prevent default behaviors for drag and drop
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Check file type
    function getFileType(file) {
        return file.type.split('/')[0]; // "image" or "video"
    }

    // Process image files
    function handleImageFiles(files) {
        processFiles(files, 'image', imageFiles, updateImageQueue);
    }
    
    // Process video files
    function handleVideoFiles(files) {
        processFiles(files, 'video', videoFiles, updateVideoQueue);
    }
    
    // Generic file processing function
    function processFiles(files, expectedType, fileArray, updateQueueFunc) {
        try {
            let validFileCount = 0;
            let invalidTypeCount = 0;
            
            // Process each file
            Array.from(files).forEach(file => {
                // Check if file type matches expected type
                const fileType = getFileType(file);
                if (fileType !== expectedType) {
                    console.error(`Not a ${expectedType} file:`, file.type);
                    invalidTypeCount++;
                    return;
                }
                
                console.log(`Processing ${expectedType}:`, file.name, file.type);
                validFileCount++;
                
                // Get original format
                let format = file.type.split('/')[1].toUpperCase();
                if (format === 'JPEG') format = 'JPG';
                
                // Add to queue
                fileArray.push({
                    file: file,
                    name: file.name,
                    size: formatFileSize(file.size),
                    originalFormat: format,
                    dataUrl: null,  // Will be populated when we need to render the file
                    type: expectedType
                });
            });
            
            if (validFileCount === 0) {
                if (invalidTypeCount > 0) {
                    console.error(`Invalid file types. Please select only ${expectedType} files.`);
                } else {
                    console.error(`No valid ${expectedType}s found. Please select ${expectedType} files.`);
                }
                return;
            }
            
            // Update the queue display
            updateQueueFunc();
            
            // Update convert button state
            updateConvertButton();
        } catch (error) {
            console.error(`Error handling ${expectedType} files:`, error);
        }
    }

    // Update the image queue display
    function updateImageQueue() {
        updateQueueDisplay(
            imageFiles, 
            imageQueueList, 
            imageQueueCount, 
            imageQueue, 
            imageDropArea, 
            imageConversionOptions, 
            'image'
        );
    }
    
    // Update the video queue display
    function updateVideoQueue() {
        updateQueueDisplay(
            videoFiles, 
            videoQueueList, 
            videoQueueCount, 
            videoQueue, 
            videoDropArea, 
            videoConversionOptions, 
            'video'
        );
    }
    
    // Generic queue display update function
    function updateQueueDisplay(fileArray, queueListElement, queueCountElement, queueElement, dropAreaElement, conversionOptionsElement, fileType) {
        queueListElement.innerHTML = '';
        queueCountElement.textContent = `(${fileArray.length})`;
        
        if (fileArray.length === 0) {
            queueElement.style.display = 'none';
            dropAreaElement.style.display = 'block';
            conversionOptionsElement.style.display = 'none';
            return;
        }
        
        dropAreaElement.style.display = 'none';
        queueElement.style.display = 'block';
        conversionOptionsElement.style.display = 'block';
        
        fileArray.forEach((item, index) => {
            // Create a queue item element
            const queueItem = document.createElement('div');
            queueItem.className = 'queue-item';
            
            // Lazy load the file data URL if it's not already loaded
            if (!item.dataUrl) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    item.dataUrl = e.target.result;
                    const imgElement = queueItem.querySelector('.queue-item-img');
                    if (imgElement) {
                        imgElement.src = e.target.result;
                    }
                    const videoElement = queueItem.querySelector('video');
                    if (videoElement) {
                        videoElement.src = e.target.result;
                    }
                };
                reader.readAsDataURL(item.file);
            }

            // Create appropriate thumbnail based on file type
            let thumbnailHtml = '';
            if (fileType === 'image') {
                thumbnailHtml = `<img class="queue-item-img" src="${item.dataUrl || ''}" alt="${item.name}">`;
            } else {
                thumbnailHtml = `
                <div class="video-thumbnail">
                    <video src="${item.dataUrl || ''}" muted></video>
                </div>
                `;
            }
            
            queueItem.innerHTML = `
                ${thumbnailHtml}
                <div class="queue-item-info">
                    <div class="queue-item-name">${item.name}</div>
                    <div class="queue-item-details">${item.size}, ${item.originalFormat}</div>
                </div>
                <button class="queue-item-remove" data-index="${index}" title="Remove from queue">×</button>
            `;
            
            queueListElement.appendChild(queueItem);
            
            // Add event listener to remove button
            queueItem.querySelector('.queue-item-remove').addEventListener('click', function() {
                const indexToRemove = parseInt(this.dataset.index);
                fileArray.splice(indexToRemove, 1);
                
                // Update the queue display
                if (fileType === 'image') {
                    updateImageQueue();
                } else {
                    updateVideoQueue();
                }
                
                // Update convert button state
                updateConvertButton();
            });
        });
        
        // Show convert button if any files are in either queue
        conversionActions.style.display = (imageFiles.length > 0 || videoFiles.length > 0) ? 'block' : 'none';
    }

    // Add format toggle functionality
    function setupFormatToggles(formatOptionsElement, selectedFormatsArray) {
        const toggleButtons = formatOptionsElement.querySelectorAll('.format-toggle');
        
        toggleButtons.forEach(toggle => {
            toggle.addEventListener('mousedown', (e) => {
                lastToggleState = !toggle.classList.contains('active');
                isDragging = true;
                
                // Toggle on initial click
                if (lastToggleState) {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
                
                updateSelectedFormats();
            });
            
            toggle.addEventListener('mouseenter', (e) => {
                if (isDragging) {
                    // Apply the same toggle state as the initial button
                    if (lastToggleState) {
                        toggle.classList.add('active');
                    } else {
                        toggle.classList.remove('active');
                    }
                    
                    updateSelectedFormats();
                }
            });
        });
    }

    // Update selected formats for both image and video
    function updateSelectedFormats() {
        // Update image formats
        selectedImageFormats = [];
        document.querySelectorAll('#imageFormatOptions .format-toggle.active').forEach(active => {
            selectedImageFormats.push(active.dataset.format);
        });
        
        // Update video formats
        selectedVideoFormats = [];
        document.querySelectorAll('#videoFormatOptions .format-toggle.active').forEach(active => {
            selectedVideoFormats.push(active.dataset.format);
        });
        
        // Update convert button state
        updateConvertButton();
    }

    // Update convert button state
    function updateConvertButton() {
        const hasImageFiles = imageFiles.length > 0;
        const hasVideoFiles = videoFiles.length > 0;
        const hasImageFormats = selectedImageFormats.length > 0;
        const hasVideoFormats = selectedVideoFormats.length > 0;
        
        const canConvertImages = hasImageFiles && hasImageFormats;
        const canConvertVideos = hasVideoFiles && hasVideoFormats;
        
        // Enable button if we can convert either images or videos
        convertBtn.disabled = !(canConvertImages || canConvertVideos);
        
        // Update button text based on what can be converted
        if (canConvertImages && canConvertVideos) {
            convertBtn.textContent = 'Convert All Files';
        } else if (canConvertImages) {
            convertBtn.textContent = 'Convert Images';
        } else if (canConvertVideos) {
            convertBtn.textContent = 'Convert Videos';
        } else {
            convertBtn.textContent = 'Select Files & Formats';
        }
        
        // Show convert actions if we have any files
        conversionActions.style.display = (hasImageFiles || hasVideoFiles) ? 'block' : 'none';
    }

    // Convert button click
    convertBtn.addEventListener('click', startConversion);

    // Process conversion for all files in queues
    async function startConversion() {
        // Validate that we have something to convert
        const hasImageConversions = imageFiles.length > 0 && selectedImageFormats.length > 0;
        const hasVideoConversions = videoFiles.length > 0 && selectedVideoFormats.length > 0;
        
        if (!hasImageConversions && !hasVideoConversions) {
            return;
        }
        
        try {
            // Reset conversion results
            convertedResults = {};
            
            // Initialize results for image formats
            selectedImageFormats.forEach(format => {
                convertedResults[format] = [];
            });
            
            // Initialize results for video formats
            selectedVideoFormats.forEach(format => {
                convertedResults[format] = [];
            });
            
            // Hide queues and options, show results container 
            document.querySelectorAll('.bento-cell').forEach(cell => {
                cell.style.display = 'none';
            });
            conversionActions.style.display = 'none';
            resultContainer.style.display = 'block';
            
            // Setup progress tracking
            const totalImageConversions = imageFiles.length * selectedImageFormats.length;
            const totalVideoConversions = videoFiles.length * selectedVideoFormats.length;
            const totalConversions = totalImageConversions + totalVideoConversions;
            let completedConversions = 0;
            
            // Create progress indicator
            const progressElement = document.createElement('div');
            progressElement.className = 'conversion-progress';
            progressElement.innerHTML = '<div class="progress-bar"></div>';
            resultContainer.insertBefore(progressElement, resultContainer.firstChild);
            
            const progressBar = progressElement.querySelector('.progress-bar');
            
            // Process each image file if needed
            if (hasImageConversions) {
                for (const fileItem of imageFiles) {
                    for (const format of selectedImageFormats) {
                        try {
                            // Convert to the selected format
                            console.log(`Converting ${fileItem.name} to ${format.toUpperCase()}...`);
                            
                            const result = await convertImage(fileItem.file, format);
                            
                            if (result) {
                                convertedResults[format].push({
                                    original: fileItem.name,
                                    dataUrl: result.dataUrl,
                                    name: result.fileName,
                                    size: formatFileSize(result.size),
                                    type: 'image'
                                });
                            }
                        } catch (error) {
                            console.error(`Error converting ${fileItem.name} to ${format}:`, error);
                            // Add error placeholder
                            convertedResults[format].push({
                                original: fileItem.name,
                                error: true,
                                errorMessage: `Failed to convert to ${format.toUpperCase()}`,
                                type: 'image'
                            });
                        } finally {
                            // Update progress
                            completedConversions++;
                            const progress = (completedConversions / totalConversions) * 100;
                            progressBar.style.width = `${progress}%`;
                        }
                    }
                }
            }
            
            // Process each video file if needed
            if (hasVideoConversions) {
                for (const fileItem of videoFiles) {
                    for (const format of selectedVideoFormats) {
                        try {
                            // Convert to the selected format
                            console.log(`Converting ${fileItem.name} to ${format.toUpperCase()}...`);
                            
                            const result = await convertVideo(fileItem.file, format);
                            
                            if (result) {
                                convertedResults[format].push({
                                    original: fileItem.name,
                                    dataUrl: result.dataUrl,
                                    name: result.fileName,
                                    size: formatFileSize(result.size),
                                    type: 'video'
                                });
                            }
                        } catch (error) {
                            console.error(`Error converting ${fileItem.name} to ${format}:`, error);
                            // Add error placeholder
                            convertedResults[format].push({
                                original: fileItem.name,
                                error: true,
                                errorMessage: `Failed to convert to ${format.toUpperCase()}`,
                                type: 'video'
                            });
                        } finally {
                            // Update progress
                            completedConversions++;
                            const progress = (completedConversions / totalConversions) * 100;
                            progressBar.style.width = `${progress}%`;
                        }
                    }
                }
            }
            
            // Remove progress bar when done
            setTimeout(() => {
                progressElement.remove();
            }, 500);
            
            // Display the results
            displayConversionResults();
            
            console.log('Conversion complete!');
            
        } catch (error) {
            console.error("Conversion error:", error);
        }
    }

    // Display the conversion results with tabs for each format
    function displayConversionResults() {
        resultTabs.innerHTML = '';
        resultContent.innerHTML = '';
        
        // Create a tab for each format
        Object.keys(convertedResults).forEach((format, index) => {
            const results = convertedResults[format];
            if (results.length === 0) return;
            
            // Determine if this is an image or video format
            const isVideoFormat = ['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(format.toLowerCase());
            const formatType = isVideoFormat ? 'video' : 'image';
            
            // Create the tab
            const tab = document.createElement('div');
            tab.className = 'result-tab';
            tab.dataset.format = format;
            tab.dataset.type = formatType;
            tab.textContent = format.toUpperCase();
            
            // First tab is active by default
            if (index === 0) {
                tab.classList.add('active');
                activeTab = format;
            }
            
            // Create the content panel
            const panel = document.createElement('div');
            panel.className = 'result-content-panel';
            panel.dataset.format = format;
            
            // First panel is active by default
            if (index === 0) {
                panel.classList.add('active');
            }
            
            // Add header with info and download button
            const header = document.createElement('div');
            header.className = 'result-info';
            header.innerHTML = `
                <span class="result-info-format">${format.toUpperCase()} ${formatType === 'video' ? '(Video)' : '(Image)'}</span>
                <span class="result-info-count">${results.length} file(s)</span>
                <button class="download-format-btn" data-format="${format}">Download All ${format.toUpperCase()}</button>
            `;
            panel.appendChild(header);
            
            // Create result grid
            const resultGrid = document.createElement('div');
            resultGrid.className = 'batch-results';
            
            // Add each result item
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                
                if (result.error) {
                    // Show error state
                    resultItem.innerHTML = `
                        <div class="result-item-error">
                            <div class="error-icon">⚠️</div>
                            <div class="result-item-name">${result.original}</div>
                        </div>
                        <div class="result-item-info">
                            <div class="result-item-name">${result.original}</div>
                            <div class="result-item-format error">${result.errorMessage}</div>
                        </div>
                        <div class="result-item-status error"></div>
                    `;
                } else {
                    // Check if result is a video or image
                    let thumbnailHtml = '';
                    if (result.type === 'image') {
                        thumbnailHtml = `<img class="result-item-img" src="${result.dataUrl}" alt="${result.name}">`;
                    } else {
                        thumbnailHtml = `
                        <div class="video-thumbnail">
                            <video src="${result.dataUrl}" muted></video>
                        </div>
                        `;
                    }
                    
                    // Show success state with download button
                    resultItem.innerHTML = `
                        ${thumbnailHtml}
                        <div class="result-item-info">
                            <div class="result-item-name">${result.name}</div>
                            <div class="result-item-format">${format.toUpperCase()}, ${result.size}</div>
                        </div>
                        <button class="result-item-download" title="Download">⬇️</button>
                        <div class="result-item-status success"></div>
                    `;
                    
                    // Add download functionality
                    const downloadBtn = resultItem.querySelector('.result-item-download');
                    if (downloadBtn) {
                        downloadBtn.addEventListener('click', () => {
                            downloadFile(result.dataUrl, result.name);
                        });
                    }
                }
                
                resultGrid.appendChild(resultItem);
            });
            
            panel.appendChild(resultGrid);
            resultContent.appendChild(panel);
            
            // Add tab events
            tab.addEventListener('click', () => {
                document.querySelectorAll('.result-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.result-content-panel').forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                panel.classList.add('active');
                
                activeTab = format;
            });
            
            // Add to tabs
            resultTabs.appendChild(tab);
            
            // Add download all handler for this format
            header.querySelector('.download-format-btn').addEventListener('click', () => {
                downloadFormatResults(format);
            });
        });
    }

    // Download all results for a specific format
    function downloadFormatResults(format) {
        const results = convertedResults[format];
        if (!results || results.length === 0) return;
        
        console.log(`Preparing ${format.toUpperCase()} files for download...`);
        
        try {
            // If only one file, download it directly
            if (results.length === 1 && !results[0].error) {
                downloadFile(results[0].dataUrl, results[0].name);
                return;
            }
            
            // Multiple files - create a ZIP archive
            const zip = new JSZip();
            
            // Add each file to the zip
            results.forEach(result => {
                if (result.error) return; // Skip errors
                
                // Convert data URL to blob
                const blob = dataUrlToBlob(result.dataUrl);
                zip.file(result.name, blob);
            });
            
            // Generate the ZIP file
            zip.generateAsync({ type: 'blob' }).then(blob => {
                // Create a download link
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `filechemy_${format}_${new Date().getTime()}.zip`;
                link.click();
                
                // Clean up
                setTimeout(() => {
                    URL.revokeObjectURL(link.href);
                }, 100);
                
                console.log(`${format.toUpperCase()} files downloaded as ZIP`);
            });
        } catch (error) {
            console.error("Error creating ZIP:", error);
        }
    }

    // Download all button
    downloadAllBtn.addEventListener('click', () => {
        if (Object.keys(convertedResults).length === 0) return;
        
        // Create a ZIP with folders for each format
        try {
            console.log('Preparing ZIP file with all conversions...');
            
            const zip = new JSZip();
            
            // Create separate folders for images and videos
            const imagesFolder = zip.folder('images');
            const videosFolder = zip.folder('videos');
            
            // Add files to appropriate folders
            Object.keys(convertedResults).forEach(format => {
                const results = convertedResults[format];
                if (!results || results.length === 0) return;
                
                // Determine if this is an image or video format
                const isVideoFormat = ['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(format.toLowerCase());
                const targetFolder = isVideoFormat ? videosFolder : imagesFolder;
                
                // Create format subfolder
                const formatFolder = targetFolder.folder(format);
                
                // Add each file
                results.forEach(result => {
                    if (result.error) return; // Skip errors
                    
                    // Convert data URL to blob
                    const blob = dataUrlToBlob(result.dataUrl);
                    formatFolder.file(result.name, blob);
                });
            });
            
            // Generate the ZIP file
            zip.generateAsync({ type: 'blob' }).then(blob => {
                // Create a download link
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `filechemy_all_${new Date().getTime()}.zip`;
                link.click();
                
                // Clean up
                setTimeout(() => {
                    URL.revokeObjectURL(link.href);
                }, 100);
                
                console.log('All converted files downloaded as ZIP');
            });
        } catch (error) {
            console.error("Error creating ZIP:", error);
        }
    });

    // New conversion button
    newConversionBtn.addEventListener('click', () => {
        // Reset everything
        imageFiles = [];
        videoFiles = [];
        selectedImageFormats = [];
        selectedVideoFormats = [];
        convertedResults = {};
        
        // Reset UI
        resultContainer.style.display = 'none';
        document.querySelectorAll('.bento-cell').forEach(cell => {
            cell.style.display = 'block';
        });
        
        // Reset image section
        updateImageQueue();
        document.querySelectorAll('#imageFormatOptions .format-toggle').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Reset video section
        updateVideoQueue();
        document.querySelectorAll('#videoFormatOptions .format-toggle').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Hide convert button
        conversionActions.style.display = 'none';
        convertBtn.disabled = true;
    });

    // Image conversion function
    async function convertImage(file, format) {
        return new Promise((resolve, reject) => {
            try {
                // Create an image element to load the file
                const img = new Image();
                
                // Create canvas to perform the conversion
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Handle image load
                img.onload = () => {
                    // Set canvas size to match image
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0);
                    
                    // Get base file name without extension
                    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    const fileName = `${baseName}.${format}`;
                    
                    try {
                        // Convert to requested format
                        let dataUrl;
                        let mimeType;
                        
                        switch (format.toLowerCase()) {
                            case 'png':
                                mimeType = 'image/png';
                                break;
                            case 'jpg':
                            case 'jpeg':
                                mimeType = 'image/jpeg';
                                break;
                            case 'webp':
                                mimeType = 'image/webp';
                                break;
                            case 'gif':
                                mimeType = 'image/gif';
                                break;
                            case 'bmp':
                                mimeType = 'image/bmp';
                                break;
                            default:
                                mimeType = 'image/png'; // Default to PNG
                        }
                        
                        dataUrl = canvas.toDataURL(mimeType);
                        
                        // Get blob for size calculation
                        const blob = dataUrlToBlob(dataUrl);
                        
                        resolve({
                            dataUrl,
                            fileName,
                            size: blob.size
                        });
                    } catch (error) {
                        console.error('Canvas export error:', error);
                        reject(error);
                    }
                };
                
                // Handle errors
                img.onerror = (error) => {
                    reject(error);
                };
                
                // Load the image from file
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result;
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
                
            } catch (error) {
                reject(error);
            }
        });
    }

    // Video conversion function (placeholder - real implementation would use ffmpeg.js)
    async function convertVideo(file, format) {
        // For demo, we'll simulate conversion by just changing the extension
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Get base file name without extension
                    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    const fileName = `${baseName}.${format}`;
                    
                    // In a real implementation, we would convert using ffmpeg.js here
                    // For now, we'll just pretend we converted by returning the original data
                    // with a new file name
                    
                    resolve({
                        dataUrl: e.target.result,
                        fileName,
                        size: file.size
                    });
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Download a file
    function downloadFile(dataUrl, fileName) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        link.click();
    }

    // Convert Data URL to Blob
    function dataUrlToBlob(dataUrl) {
        const parts = dataUrl.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        
        return new Blob([uInt8Array], { type: contentType });
    }

    // Stop dragging on mouse up
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Set up the drop areas
    setupDropArea(imageDropArea, 'image', imageInput, handleImageFiles);
    setupDropArea(videoDropArea, 'video', videoInput, handleVideoFiles);
    
    // Set up format toggle functionality
    setupFormatToggles(imageFormatOptions, selectedImageFormats);
    setupFormatToggles(videoFormatOptions, selectedVideoFormats);
    
    // Add event listeners for add more and clear buttons
    addMoreImagesBtn.addEventListener('click', () => imageInput.click());
    clearImageQueueBtn.addEventListener('click', () => {
        imageFiles = [];
        updateImageQueue();
        updateConvertButton();
    });
    
    addMoreVideosBtn.addEventListener('click', () => videoInput.click());
    clearVideoQueueBtn.addEventListener('click', () => {
        videoFiles = [];
        updateVideoQueue();
        updateConvertButton();
    });
    
    // Initialize the UI
    updateImageQueue();
    updateVideoQueue();
    updateConvertButton();
}); 