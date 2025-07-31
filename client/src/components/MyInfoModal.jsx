// src/components/MyInfoModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../MyInfoModal.css';

function MyInfoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <h2>👤 About the Developer</h2>
                <ul>
                    <li><strong>Name:</strong> Aman Jaiswal</li>
                    <li>
                        <strong>GitHub:</strong>{' '}
                        <a href="https://github.com/your-username" target="_blank" rel="noreferrer">
                            github.com/your-username
                        </a>
                    </li>
                    <li>
                        <strong>LinkedIn:</strong>{' '}
                        <a href="https://linkedin.com/in/your-name" target="_blank" rel="noreferrer">
                            linkedin.com/in/your-name
                        </a>
                    </li>
                    <li>
                        <strong>Resume:</strong>{' '}
                        <a href="/resume.pdf" target="_blank" rel="noreferrer">
                            Download PDF
                        </a>
                    </li>
                    <li><strong>Email:</strong> you@example.com</li>
                </ul>
                <button className="close-btn" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }} onClick={onClose}>Close</button>
            </motion.div>
        </div>
    );
}

export default MyInfoModal;
