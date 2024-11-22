const imageInput = document.querySelector("#image-input");
const displayImageContainer = document.querySelector("#image-section>div");
const displayImage = document.querySelector("#display-image");
const allInputs = document.querySelectorAll(".filters-input");
const minMaxBtn = document.querySelector("#image-section button");
const minMaxBtnIcon = document.querySelector("#image-section button i");
const borderRadiusInput = document.querySelector("#border-radius");
const toggleBtn = document.querySelector(".toggle input");
const resetBtn = document.querySelector("#reset-btn");
const filters = {}; // Store current filter values
let isMinimized = true;

displayImage.style.maxHeight = '100%';
displayImage.style.maxWidth = '100%';
displayImageContainer.style.overflow = 'hidden';

let inputListeners = [];
let borderRadiusListener = null;
let minMaxBtnListener = null;

function updateFilters() {
    let filterString = '';
    for (const filter in filters) {
        filterString += `${filter}(${filters[filter]}) `;
    }
    displayImage.style.filter = filterString.trim();
}

function activateOnImageLoad() {
    allInputs.forEach((input) => {
        const inputListener = (e) => {
            filters[e.target.id] = e.target.value + e.target.dataset.sizing;
            updateFilters();
        };
        input.addEventListener("input", inputListener);
        inputListeners.push({ element: input, listener: inputListener });
    });

    borderRadiusListener = (e) => {
        if (toggleBtn.checked) {
            e.target.dataset.sizing = '%';
            e.target.max = 50;
        } else {
            e.target.dataset.sizing = 'px';
            e.target.max = 250;
        }
        displayImage.style.borderRadius = `${e.target.value}${e.target.dataset.sizing}`;
    };
    borderRadiusInput.addEventListener("input", borderRadiusListener);

    minMaxBtnListener = () => {
        isMinimized = !isMinimized;
        if (isMinimized) {
            displayImage.style.maxHeight = '100%';
            displayImage.style.maxWidth = '100%';
            displayImageContainer.style.overflow = 'hidden';
            displayImageContainer.style.justifyContent = 'center';
            displayImageContainer.style.alignItems = 'center';
        } else {
            displayImage.style.maxHeight = '';
            displayImage.style.maxWidth = '';
            displayImageContainer.style.overflow = 'auto';
            displayImageContainer.style.justifyContent = 'flex-start';
            displayImageContainer.style.alignItems = 'flex-start';
        }
        minMaxBtnIcon.classList.toggle('fa-expand');
        minMaxBtnIcon.classList.toggle('fa-compress');
    };
    minMaxBtn.addEventListener("click", minMaxBtnListener);
}

function removeAllListeners() {
    inputListeners.forEach(({ element, listener }) => {
        element.removeEventListener("input", listener);
    });
    inputListeners = [];

    if (borderRadiusListener) {
        borderRadiusInput.removeEventListener("input", borderRadiusListener);
        borderRadiusListener = null;
    }

    if (minMaxBtnListener) {
        minMaxBtn.removeEventListener("click", minMaxBtnListener);
        minMaxBtnListener = null;
    }
}

function reset() {
    removeAllListeners();
    displayImage.style.filter = 'none';
    displayImage.style.cursor = 'move';
    displayImage.style.borderRadius = 0;
    borderRadiusInput.value = borderRadiusInput.defaultValue;
    allInputs.forEach((input) => {
        input.value = input.defaultValue;
    });
}

resetBtn.addEventListener("click", reset);

resetBtn.addEventListener("dblclick", () => {
    imageInput.value = '';
    displayImage.src = '';
    displayImageContainer.style.border = '4px dashed lightgrey';
    displayImageContainer.style.background = "transparent url('design1.png') center / 25% no-repeat";
});

imageInput.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        displayImage.src = uploaded_image;
        displayImage.style.cursor = 'move';
        displayImageContainer.style.border = '4px dotted lightgrey';
        displayImageContainer.style.background = 'transparent';
        reset();
        setTimeout(() => { console.log(displayImage.width, displayImage.height) }, 1);
        activateOnImageLoad();
    });

    reader.readAsDataURL(e.target.files[0]);
});


const downloadNowBtn = document.querySelector("#download-now-btn");
const closeBtn = document.querySelector("#close-btn");
const popup = document.getElementById('popup');
const imgContainer = document.querySelector('#img-container');
const downloadBtn = document.querySelector('#download-btn');
const shareBtn = document.getElementById("share-btn");

const convertDivToPNG = async () => {
    const node = displayImage;
    const dataUrl = await domtoimage.toPng(node);
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], 'edited.png', { type: 'image/png' });
}

downloadNowBtn.addEventListener('click', () => {
    convertDivToPNG().then(file => {
        popup.style.display = 'block';
        if (imgContainer.firstChild) imgContainer.removeChild(imgContainer.firstChild);
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.repeat = 'no-repeat';
        imgContainer.appendChild(img);

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            shareBtn.style.display = "block";
            shareBtn.addEventListener('click', () => {
                navigator.share({
                    title: 'edited.png',
                    text: 'Check out my edited image!',
                    files: [file]
                }).then(() => {
                    console.log('Thanks for sharing!');
                }).catch((error) => {
                    console.error('Error sharing:', error);
                });
            });
        } else {
            shareBtn.style.display = "none";
        }
    }).catch(error => {
        console.error('Oops, something went wrong!', error);
    });
});

closeBtn.addEventListener('click', () => popup.style.display = 'none');

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

downloadBtn.addEventListener('click', () => {
    const img = imgContainer.querySelector('img');
    if (!img) return;

    const imgUrl = img.src;
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = 'edited.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector("#preloader").style.transform = "translate(0, -105vh)";
        console.log("loaded");
    }, 1500);
});

//////

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.querySelector("#image-input");
    const displayImage = document.querySelector("#display-image");
    const allInputs = document.querySelectorAll(".filters-input");
    const borderRadiusInput = document.querySelector(".border-radius");
    const toggleBtn = document.querySelector(".toggle input");
    const filters = {}; // Store current filter values

    // Initialize image display
    function updateFilters() {
        let filterString = '';
        for (const filter in filters) {
            filterString += `${filter}(${filters[filter]}) `;
        }
        displayImage.style.filter = filterString.trim();
    }

    function updateBorderRadius() {
        const borderRadiusValue = borderRadiusInput.value;
        const borderRadiusUnit = toggleBtn.checked ? '%' : 'px';
        displayImage.style.borderRadius = `${borderRadiusValue}${borderRadiusUnit}`;
    }

    function activateOnImageLoad() {
        allInputs.forEach(input => {
            const inputListener = (e) => {
                filters[e.target.id] = e.target.value + e.target.dataset.sizing;
                updateFilters();
            };
            input.addEventListener("input", inputListener);
        });

        borderRadiusInput.addEventListener("input", updateBorderRadius);

        toggleBtn.addEventListener("change", () => {
            updateBorderRadius(); // Update border-radius on toggle change
        });
    }

    imageInput.addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            displayImage.src = reader.result;
            displayImage.style.cursor = 'move'; // Set cursor style for image manipulation
            displayImage.style.borderRadius = 0; // Reset border-radius on new image load
            allInputs.forEach(input => input.value = input.defaultValue); // Reset all input values
            filters['grayscale'] = '0%';
            filters['contrast'] = '100%';
            filters['blur'] = '0px';
            filters['brightness'] = '100%';
            filters['invert'] = '0%';
            filters['hue-rotate'] = '0deg';
            filters['saturate'] = '1';
            filters['opacity'] = '100%';
            filters['sepia'] = '0%';
            updateFilters();
            updateBorderRadius();
            activateOnImageLoad();
        });
        reader.readAsDataURL(e.target.files[0]);
    });

    // Set initial values for filters
    allInputs.forEach(input => {
        input.value = input.defaultValue; // Initialize input values
    });
});

///////
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme');

    // Set the initial theme based on localStorage
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️'; // Switch to light mode icon
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleBtn.textContent = '🌙'; // Switch to dark mode icon
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Save the current theme to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Update button text
        themeToggleBtn.textContent = isDarkMode ? '☀️' : '🌙'; // Switch icon
    });
});







document.addEventListener('DOMContentLoaded', () => {
    const displayImage = document.querySelector("#display-image");
    const expandBtn = document.querySelector("#expand-btn");
    const imageModal = document.querySelector("#image-modal");
    const modalImage = document.querySelector("#modal-image");
    const closeModalBtn = document.querySelector("#close-modal-btn");
    const allInputs = document.querySelectorAll(".filters-input");
    const filters = {}; // To store the filter values

    // Function to update the filters applied to the image
    function updateFilters() {
        let filterString = '';
        for (const filter in filters) {
            filterString += `${filter}(${filters[filter]}) `;
        }
        displayImage.style.filter = filterString.trim(); // Apply the filters to the image
    }

    // Function to handle image edits
    function applyFilter(e) {
        filters[e.target.id] = e.target.value + e.target.dataset.sizing;
        updateFilters();
    }

    // Add event listeners to filter controls
    allInputs.forEach((input) => {
        input.addEventListener("input", applyFilter);
    });

    // Function to show the modal with the enlarged image (edited or not)
    function openModal() {
        modalImage.src = displayImage.src; // Ensure the modal shows the current image (edited or not)
        imageModal.style.display = 'flex'; // Display the modal
    }

    // Event listener to open the modal when the expand button is clicked
    expandBtn.addEventListener('click', openModal);

    // Event listener to close the modal when the close button is clicked
    closeModalBtn.addEventListener('click', () => {
        imageModal.style.display = 'none'; // Close the modal
    });

    // Close the modal if the user clicks outside the modal content
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none'; // Close the modal if clicked outside of it
        }
    });

    // Handle image upload and reset filters
    const imageInput = document.querySelector("#image-input");

    imageInput.addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            displayImage.src = reader.result; // Load the new image
            displayImage.style.filter = 'none'; // Reset any applied filters
            allInputs.forEach((input) => {
                input.value = input.defaultValue; // Reset all filter inputs
            });
            filters['grayscale'] = '0%';
            filters['contrast'] = '100%';
            filters['blur'] = '0px';
            filters['brightness'] = '100%';
            filters['invert'] = '0%';
            filters['hue-rotate'] = '0deg';
            filters['saturate'] = '1';
            filters['opacity'] = '100%';
            filters['sepia'] = '0%';
            updateFilters(); // Apply the default (no filters) to the image
        });
        reader.readAsDataURL(e.target.files[0]);
    });
});
