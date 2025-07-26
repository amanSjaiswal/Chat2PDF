// give blank pdf
// const { default: PDFMerger } = require('pdf-merger-js'); // ✅ FIXED
// const path = require('path');
// const fs = require('fs');

// async function mergePDFs(pdfPaths, outputFile = 'combined_chat.pdf') {
//   const merger = new PDFMerger();
//   const validPDFs = [];

//   for (const file of pdfPaths) {
//     if (fs.existsSync(file)) {
//       console.log('📎 Adding to merge:', file);
//       merger.add(file);
//       validPDFs.push(file);
//     } else {
//       console.warn('⚠️ File not found (skipped):', file);
//     }
//   }

//   if (validPDFs.length === 0) {
//     throw new Error('❌ No valid PDFs found to merge.');
//   }

//   const outputPath = path.resolve(__dirname, `../downloads/${outputFile}`);
//   await merger.save(outputPath);
//   console.log(`✅ Merged PDF created at: ${outputPath}`);
//   return outputPath;
// }

// module.exports = { mergePDFs };







// const fs = require('fs');
// const path = require('path');
// const { PDFDocument } = require('pdf-lib');

// async function mergePDFs(pdfPaths, outputFile = 'combined_chat.pdf') {
//   const mergedPdf = await PDFDocument.create();

//   for (const filePath of pdfPaths) {
//     if (!fs.existsSync(filePath)) {
//       console.warn('⚠️ File not found:', filePath);
//       continue;
//     }

//     const fileBuffer = fs.readFileSync(filePath);
//     const pdf = await PDFDocument.load(fileBuffer);
//     const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

//     copiedPages.forEach(page => mergedPdf.addPage(page));
//   }

//   const outputPath = path.resolve(__dirname, `../downloads/${outputFile}`);
//   const mergedPdfBytes = await mergedPdf.save();
//   fs.writeFileSync(outputPath, mergedPdfBytes);

//   console.log(`✅ Merged PDF saved at: ${outputPath}`);
//   return outputPath;
// }

// module.exports = { mergePDFs };




const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function mergePDFs(pdfPaths, outputFile = 'combined_chat.pdf') {
  const mergedPdf = await PDFDocument.create();
  const font = await mergedPdf.embedFont(StandardFonts.HelveticaBold);

  for (let i = 0; i < pdfPaths.length; i++) {
    const filePath = pdfPaths[i];
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      continue;
    }

    const titlePage = mergedPdf.addPage([595, 842]); // A4
    titlePage.drawText(`Chat ${i + 1}`, {
      x: 220,
      y: 500,
      size: 28,
      font,
      color: rgb(0.2, 0.2, 0.7),
    });

    const fileBuffer = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(fileBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const outputPath = path.resolve(__dirname, `../downloads/${outputFile}`);
  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputPath, mergedPdfBytes);
  console.log(`✅ Merged PDF saved at: ${outputPath}`);

  // 🧹 DELETE TEMP PDFs
  for (const file of pdfPaths) {
    console.log(`🧹 Attempting to delete: ${file}`);  // 🔍 Add this to trace
    try {
      fs.unlinkSync(file);
      console.log(`🗑️ Deleted temp file: ${file}`);
    } catch (err) {
      console.warn(`⚠️ Could not delete ${file}: ${err.message}`);
    }
  }

  return outputPath;
}

module.exports = { mergePDFs };
