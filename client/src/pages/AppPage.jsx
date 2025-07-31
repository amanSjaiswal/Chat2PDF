// src/pages/AppPage.jsx
import React, { useState } from 'react';
import '../AppPage.css';

import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

function AppPage() {
    const [chatLinks, setChatLinks] = useState(['']);  // Start with 1 empty field
    const [status, setStatus] = useState('');
    const [customFilename, setCustomFilename] = useState('merged_chat.pdf');
    const [previews, setPreviews] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState('');

    const resetAllFields = () => {
        setChatLinks(['']); // fix: should be an array
        setCustomFilename('merged_chat.pdf');
        setStatus('Status: Waiting...');
        setPreviews([]);
        setDownloadUrl('');
    };

    // // ✅ MAIN FIX: Accept normalized links here
    // const handleGeneratePDF = async (normalizedLinks) => {
    //     setStatus('⏳ Generating PDF...');
    //     toast.info('Generating PDF...');

    //     try {
    //         const response = await fetch('http://localhost:5000/generate-pdf', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 links: normalizedLinks,
    //                 filename: customFilename,
    //             }),
    //         });

    //         const data = await response.json();

    //         if (data.status === 'success') {
    //             setStatus('✅ PDF generated!');
    //             setDownloadUrl(data.downloadUrl);
    //             toast.success('✅ PDF generated!');
    //         } else {
    //             setStatus('❌ Failed to generate PDF');
    //             toast.error('❌ Failed to generate PDF');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setStatus('❌ Error generating PDF');
    //         toast.error('❌ Error while generating PDF');
    //     }
    // };

    const handleGeneratePDF = async (normalizedLinks) => {
    setStatus('⏳ Generating PDF...');
    setDownloadUrl(''); // Reset previous result
    toast.info('Generating PDF...');

    try {
        const response = await fetch('http://localhost:5000/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                links: normalizedLinks,
                filename: customFilename,
            }),
        });

        // If server crashes or response is not JSON
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
            setStatus('✅ PDF generated!');
            setDownloadUrl(data.downloadUrl);
            toast.success('✅ PDF generated!');
        } else {
            setStatus('❌ Failed to generate PDF');
            setDownloadUrl('');
            toast.error(data.message || '❌ Failed to generate PDF');
        }
    } catch (error) {
        console.error('[PDF Generation Error]', error);
        setStatus('❌ Error generating PDF');
        setDownloadUrl('');
        toast.error('❌ Error while generating PDF');
    }
   };


    const handleLoadChats = (normalizedLinks) => {
        console.log('✅ Normalized Links:', normalizedLinks);
        // Simulate preview display
        setPreviews(normalizedLinks);
    };

    return (
        <div className="app-wrapper">
            <Header />

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
                    onGeneratePDF={handleGeneratePDF} // ✅ now accepts normalized links
                    downloadUrl={downloadUrl}
                />

                <RightPanel previews={previews} />
            </div>

            <Footer />
        </div>
    );
}

export default AppPage;
