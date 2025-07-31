// // src/components/RightPanel.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import '../RightPanel.css';
// import PreviewItem from './Previewitem'; // ✅ Corrected path

// const containerVariants = {
//   visible: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// function RightPanel({ previews }) {
//   return (
//     <motion.div
//       className="right-panel"
//       initial={{ x: 30 }}
//       animate={{ x: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h3>Chat Previews</h3>

//       <motion.div
//         className="preview-grid"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {previews.map((preview, idx) => (
//           <PreviewItem key={idx} content={preview} />
//         ))}
//       </motion.div>

//       <div className="enter-hint">
//         ✅ All chats visible? Hit <b>Enter</b> to proceed with PDF generation.
//       </div>
//     </motion.div>
//   );
// }

// export default RightPanel;


// src/components/RightPanel.jsx
// src/components/RightPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../RightPanel.css';

function RightPanel({ status, downloadUrl }) {
  console.log('[RightPanel] status:', status);
  console.log('[RightPanel] downloadUrl:', downloadUrl);
  return (
    <motion.div
      className="right-panel"
      initial={{ x: 30 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Output Preview</h3>

      {status && status.includes('Generating') ? (
        <div>Loading...</div>
      ) : downloadUrl ? (
        <iframe
          title="Generated PDF"
          src={encodeURI(downloadUrl)}
          width="100%"
          height="600px"
          style={{ border: '1px solid #ccc', borderRadius: '10px' }}
          onError={() => console.error('❌ Error loading PDF preview')}
        />

      ) : (
        <div>Paste links to begin...</div>
      )}

    </motion.div>
  );
}

export default RightPanel;


