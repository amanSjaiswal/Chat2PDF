// src/components/RightPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../RightPanel.css';
import PreviewItem from './Previewitem'; // ✅ Corrected path

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function RightPanel({ previews }) {
  return (
    <motion.div
      className="right-panel"
      initial={{ x: 30 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Chat Previews</h3>

      <motion.div
        className="preview-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {previews.map((preview, idx) => (
          <PreviewItem key={idx} content={preview} />
        ))}
      </motion.div>

      <div className="enter-hint">
        ✅ All chats visible? Hit <b>Enter</b> to proceed with PDF generation.
      </div>
    </motion.div>
  );
}

export default RightPanel;
