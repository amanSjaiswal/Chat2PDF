// // server/routes/pdfRoute.js

// const express = require('express');
// const router = express.Router();

// // Temporary test route
// router.get('/', (req, res) => {
//   res.send('📄 PDF generation route is live!');
// });

// module.exports = router;





////////////////////////////////////////////////
// //test case
// // server/routes/pdfRoute.js

// const express = require('express');
// const router = express.Router();

// // POST /generate-pdf
// router.post('/', async (req, res) => {
//   const { links, mode } = req.body;

//   if (!links || !Array.isArray(links) || links.length === 0) {
//     return res.status(400).json({ error: 'No valid links provided' });
//   }

//   // Log to verify input
//   console.log('Received Links:', links);
//   console.log('Selected Mode:', mode);

//   // TEMPORARY — Just send a success message for now
//   res.status(200).json({
//     message: 'Received links successfully! PDF generation will start soon.',
//     links,
//     mode,
//   });
// });

// module.exports = router;

// server/routes/pdfRoute.js


//// final logic
const express = require('express');
const router = express.Router();
const { generatePDFfromLink } = require('../utils/generatePDF');
const { mergePDFs } = require('../utils/mergePDFs');
const path = require('path');


// ✅ GET route to handle browser requests
router.get('/', (req, res) => {
  res.send('📝 Please send a POST request with ChatGPT links to generate a PDF.');
});

router.post('/', async (req, res) => {
  const { links, mode = 'full' } = req.body;

  if (!Array.isArray(links) || links.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of ChatGPT share links.' });
  }
  console.log('📥 Received links:', links);
  console.log('🧾 Mode:', mode);
  try {
    const generatedPDFs = [];

    for (let i = 0; i < links.length; i++) {
      const pdfPath = await generatePDFfromLink(links[i], mode, i);
      generatedPDFs.push(path.resolve(pdfPath)); // ✅ ensure absolute path for deletion

      console.log(`✅ PDF ${i + 1} generated:`, pdfPath);
    }

    //   // ✅ Ask user for merged filename
    // const mergedName = await getCustomFilename(); // returns e.g., 'custom_output.pdf'
    // 🧩 Merge all PDFs into one
    const mergedPath = await mergePDFs(generatedPDFs, 'combined_chat.pdf');
    console.log(`✅ Mergw PDF  generated:`, mergedPath);

    // ✅ Send final merged PDF as download
    res.download(mergedPath, 'combined_chat.pdf');

  } catch (err) {
    console.error('❌ PDF generation/merge failed:', err);
    res.status(500).json({ error: 'Failed to generate or merge PDFs.' });
  }
});



module.exports = router;


