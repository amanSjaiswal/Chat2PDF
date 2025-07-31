import React from 'react';
import { motion } from 'framer-motion';
import '../LeftPanel.css';
import { toast } from 'react-toastify';

function LeftPanel({
    chatLinks,
    setChatLinks,
    customFilename,
    setCustomFilename,
    status,
    setStatus,
    onLoadChats,
    resetAllFields,
    onGeneratePDF,
    downloadUrl
}) {
    const normalizeLinks = (linksArray) => {
        return linksArray
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
        setChatLinks(normalized); // 🔄 Store normalized links
        onLoadChats(normalized);
    };

    const handleGeneratePDF = () => {
        const normalized = normalizeLinks(chatLinks);
        if (normalized.length === 0) {
            toast.warn('Please paste at least one valid link.');
            return;
        }
        onGeneratePDF(normalized); // ✅ Pass normalized links to backend
    };

    const handleLinkChange = (index, value) => {
        const updatedLinks = [...chatLinks];
        updatedLinks[index] = value;
        setChatLinks(updatedLinks);
    };

    const handleAddLink = () => {
        setChatLinks([...chatLinks, '']);
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = chatLinks.filter((_, i) => i !== index);
        setChatLinks(updatedLinks);
    };

    return (
        <motion.div
            className="left-panel"
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="links-container">
                {chatLinks.map((link, index) => (
                    <div key={index} className="link-row">
                        <input
                            type="text"
                            placeholder={`Paste ChatGPT link #${index + 1}`}
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                        />
                        <button className="remove-link" onClick={() => handleRemoveLink(index)}>✖</button>
                    </div>
                ))}
                <motion.button
                    className="add-link-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddLink}
                >
                    + Add Link
                </motion.button>
            </div>

            <div className="button-group">
                <motion.button className="btn1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLoadChats}>
                    Load Chat(s)
                </motion.button>
                <motion.button className="clear-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetAllFields}>
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
                    className="btn1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGeneratePDF} // ✅ uses normalized links
                >
                    Generate PDF
                </motion.button>
                {downloadUrl ? (
                    <a href={downloadUrl} download>
                        <motion.button className="btn1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Download PDF
                        </motion.button>
                    </a>
                ) : (
                    <motion.button disabled style={{ opacity: 0.6 }}>
                        Download PDF
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

export default LeftPanel;
