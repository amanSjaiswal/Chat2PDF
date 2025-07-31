import React from 'react';
import { motion } from 'framer-motion';
import '../PreviewItem.css'; // optional if you want to style it separately

const PreviewItem = ({ content }) => {
  return (
    <motion.div
      className="preview-item"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
};

export default PreviewItem;
