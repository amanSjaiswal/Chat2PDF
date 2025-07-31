// src/pages/AppPage.jsx
import React, { useState } from 'react';
import '../AppPage.css';
import "../App.css"
import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';



function AppPage() {
    const [chatLinks, setChatLinks] = useState('');
    
    const [status, setStatus] = useState('');
    const [customFilename, setCustomFilename] = useState('merged_chat.pdf');
   
    const [previews, setPreviews] = useState(['Preview 1', 'Preview 2', 'Preview 3']);
    const [downloadUrl, setDownloadUrl] = useState('');

    const resetAllFields = () => {
        setChatLinks('');
        setCustomFilename('merged_chat.pdf');
        setStatus('Status: Waiting...');
        setPreviews([]);
    };
    const handleGeneratePDF = async () => {
        setStatus('⏳ Generating PDF...');
        toast.info('Generating PDF...');

        try {
            const response = await fetch('http://localhost:5000/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    links: previews,
                    filename: customFilename,
                }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setStatus('✅ PDF generated!');
                setDownloadUrl(data.downloadUrl);
                toast.success('✅ PDF generated!');
            } else {
                setStatus('❌ Failed to generate PDF');
                toast.error('❌ Failed to generate PDF');
            }
        } catch (error) {
            console.error(error);
            setStatus('❌ Error generating PDF');
            toast.error('❌ Error while generating PDF');
        }
    };
    const handleLoadChats = (normalizedLinks) => {
        console.log('Normalized Links:', normalizedLinks);

        // For now: simulate setting previews
        setPreviews(normalizedLinks.map((link, index) => `Preview ${index + 1}`));
    };

    return (
        <div className="app-wrapper">
            {/* Header */}
            <Header />

            {/* Main Panel (Split Layout) */}
            <div className="app-main">
                <LeftPanel
                    chatLinks={chatLinks}
                    setChatLinks={setChatLinks}
                    customFilename={customFilename}
                    setCustomFilename={setCustomFilename}
                    status={status}
                    setStatus={setStatus}
                    onLoadChats={handleLoadChats}
                    resetAllFields={resetAllFields}
                    onGeneratePDF={handleGeneratePDF}
                    downloadUrl={downloadUrl}// ✅ new
                />

                <RightPanel previews={previews} />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default AppPage;
