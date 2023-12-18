// URL to your PDF file
const pdfUrl = 'path/to/your/file.pdf';

// PDF.js initialization
const pdfjsLib = window['pdfjs-dist/build/pdf'];

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

// Function to load and display the PDF
async function loadPdf() {
    const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    const totalPages = pdfDoc.numPages;

    // Loop through each page
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size to PDF page size
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page to canvas
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;

        // Append canvas to the PDF container
        document.getElementById('pdf-container').appendChild(canvas);
    }
}

// Call the function to load the PDF when the page is loaded
document.addEventListener('DOMContentLoaded', loadPdf);
