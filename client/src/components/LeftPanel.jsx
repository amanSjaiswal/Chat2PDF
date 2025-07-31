// src/components/LeftPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../LeftPanel.css'; // optional custom styling
import { toast } from 'react-toastify';

function LeftPanel({
    chatLinks,
    setChatLinks,
    customFilename,
    setCustomFilename,
    status,
    setStatus,
    onLoadChats,  // 🔥 callback from AppPage
    resetAllFields, // 🆕
    onGeneratePDF,
    downloadUrl


}) {

    const normalizeLinks = (rawText) => {
        return rawText
            .split('\n')
            .map(link => link.trim())
            .filter(link => link.length > 0)
            .map(link =>
                link.startsWith('https://chatgpt.com/share/')
                    ? link.replace('https://chatgpt.com', 'https://chat.openai.com')
                    : link
            );
    };

    const handleLoadChats = () => {
        const normalized = normalizeLinks(chatLinks);
        if (normalized.length === 0) {
            toast.warn('Please paste at least one valid link.');
            return;
        }
        onLoadChats(normalized); // call back to AppPage
    };



    return (
        <motion.div
            className="left-panel"
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <textarea
                placeholder="Paste your ChatGPT links (one per line)"
                value={chatLinks}
                onChange={(e) => setChatLinks(e.target.value)}
            />

            <div className="button-group">
                <motion.button
                    className="btn1" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadChats}
                >
                    Load Chat(s)
                </motion.button>
                <motion.button
                    className="clear-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetAllFields}
                >
                    Clear
                </motion.button>

            </div>

            <div className="status-bar">
                {status ? status : 'Status: Waiting...'}
            </div>

            <div className="filename-group">
                <label>Filename:</label>
                <input
                    type="text"
                    value={customFilename}
                    onChange={(e) => setCustomFilename(e.target.value)}
                />
            </div>

            <div className="button-group">
                <motion.button
                    className="btn1" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onGeneratePDF}
                >
                    Generate PDF
                </motion.button>
                {downloadUrl ? (
                    <a href={downloadUrl} download>
                        <motion.button className="btn1" whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            Download PDF
                        </motion.button>
                    </a>
                ) : (
                    <motion.button disabled style={{ opacity: 0.6 }} >
                        Download PDF
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

export default LeftPanel;
