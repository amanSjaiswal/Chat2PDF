const express = require('express');           // Import Express web framework
const cors = require('cors');                 // Allow frontend to connect (Cross-Origin)
const pdfRoute = require('./routes/pdfRoute'); // Import your PDF route logic

const app = express();                        // Create Express app instance
const PORT = 5000;                            // Server runs on port 5000

// Middleware (always runs before route handlers)
app.use(cors());                              // Allow requests from other domains (like React)
app.use(express.json());                      // Parse JSON request body

// Route middleware
app.use('/generate-pdf', pdfRoute);           // Delegate requests to /generate-pdf to a separate file

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
