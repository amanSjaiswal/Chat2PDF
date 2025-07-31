// src/components/Header.jsx
import React, { useState } from 'react';

import { motion } from 'framer-motion';

import '../Header.css'; // (optional styling override)

import MyInfoModal from './MyInfoModal'; // ✅ import





function Header() {
    const [showInfoModal, setShowInfoModal] = useState(false); // ✅ INSIDE component
    return (
        <motion.header
            className="app-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="header-left">
                <img src="/logoh.png" alt="logo" className="logo" />

            </div>

            <div className="header-right">
                <span className="download-count">📥 123 Downloads</span>
                <motion.button className="btn" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    🔄 New Merge
                </motion.button>
                <motion.button className="btn" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    ❓ Help
                </motion.button>
                <motion.button
                    className="btn" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowInfoModal(true)}
                >
                    👤 My Info
                </motion.button>
                <span className="version-tag">⚡ v1.0</span>
            </div>
            <MyInfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />

        </motion.header>
    );
}

export default Header;