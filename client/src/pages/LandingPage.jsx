// import { useNavigate } from 'react-router-dom';

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center px-6">

//       {/* 1. Wrapper div forces a 128×128 box */}
//       <div className="w-[128px] h-[128px] mb-6">
//         {/* 2. Image set to fill the box, preserve aspect ratio */}
//         <img
//           src="/logo.png"
//           alt="Chat2PDF Logo"
//           className="w-full h-full object-contain"
//         />
//       </div>

//       <h1 className="text-4xl sm:text-5xl font-bold mb-2">Chat2PDF</h1>
//       <p className="text-gray-400 text-center max-w-md mb-6 text-lg">
//         Convert your ChatGPT conversations into clean, beautiful PDFs with live preview, custom filename, and multi-chat merging.
//       </p>
//       <button
//         onClick={() => navigate('/app')}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg shadow transition"
//       >
//         Start Converting →
//       </button>
//     </div>
//   );
// }


// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
//       <div className="flex flex-col items-center justify-center text-center space-y-8 px-4">
//         {/* Animated Logo */}
//         <motion.img
//           src="/logo.png"
//           alt="Chat2PDF Logo"
//           className="w-36 h-36"
//           initial={{ scale: 1 }}
//           animate={{
//             scale: [1, 1.05, 1],
//             y: [0, 0, 0]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: 'easeInOut',
//           }}
//         />

//         {/* Heading */}
//         <h1 className="text-white text-5xl font-bold drop-shadow-lg">
//           Chat2PDF
//         </h1>

//         {/* Tagline */}
//         <p className="text-gray-300 max-w-xl text-lg sm:text-xl px-2">
//           Convert your ChatGPT conversations into elegant, merged PDFs—with live preview, custom filenames, and multi-chat support.
//         </p>

//         {/* Button */}
//         <motion.button
//           onClick={() => navigate('/app')}
//           className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-400 hover:to-teal-300 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Start Converting →
//         </motion.button>
//       </div>
//     </div>
//   );
// }


// import { useNavigate } from 'react-router-dom';
// import '../App.css'; // or wherever you place the styles

// export default function LandingPage() {
//     const navigate = useNavigate();

//     return (
//         <div className="landing-container">
//             <img
//                 src="/logo3.png"
//                 alt="Chat2PDF Logo"
//                 style={{ width: '290px', height: '320px', display: 'block', margin: '0 auto' }}
//             />
//             <p className="tagline">
//                 <span style={{ color: '#6abdabff', fontWeight: 'bold', fontSize: '1.3rem' }}>
//                     Convert
//                 </span>{' '}
//                 your <span style={{ color: '#fd0d21ff' }}>ChatGPT conversations</span> into
//                 <br />
//                 <span style={{ color: '#2957d8ff', fontStyle: 'italic' }}>elegant, merged PDFs</span>.
//             </p>

//             <button className="landing-button" onClick={() => navigate('/app')}>
//                 Start Converting →
//             </button>
//         </div>
//     );
// }


import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();
    const taglineWords = [
        { text: "Convert", color: "#6abdabff", fontWeight: "bold", fontSize: "1.3rem" },
        { text: "your" },
        { text: "ChatGPT", color: "#fd0d21ff" },
        { text: "conversations" },
        { text: "into" },
        { text: "elegant,", color: "#2957d8ff", fontStyle: "italic" },
        { text: "merged", color: "#2957d8ff", fontStyle: "italic" },
        { text: "PDFs.", color: "#2957d8ff", fontStyle: "italic" }
    ];

    // Animation variants for each letter
    const letterAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.22,
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        }),
    };


    return (
        <motion.div
            className="landing-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}>

            {/* Animated Logo */}
            <motion.img
                src="/logo3.png"
                alt="Chat2PDF Logo"
                className="landing-logo"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />



            {/* <p className="tagline">
                <span style={{ color: '#6abdabff', fontWeight: 'bold', fontSize: '1.3rem' }}>
                    Convert
                </span>{' '}
                your <span style={{ color: '#fd0d21ff' }}>ChatGPT conversations</span> into
                <br />
                <span style={{ color: '#2957d8ff', fontStyle: 'italic' }}>elegant, merged PDFs</span>.
            </p> */}
            {/* Tagline letter-by-letter animation */}
            <p className="tagline">
                {taglineWords.map((word, index) => (
                    <motion.span
                        key={index}
                        custom={index}
                        variants={letterAnimation}
                        initial="hidden"
                        animate="visible"
                        style={{
                            display: 'inline-block',
                            marginRight: '6px',
                            color: word.color,
                            fontWeight: word.fontWeight,
                            fontStyle: word.fontStyle,
                            fontSize: word.fontSize,
                        }}
                    >
                        {word.text}
                    </motion.span>
                ))}
            </p>

            {/* Button with hover/tap animation */}
            <motion.button
                className="landing-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/app')}
            >
                Start Converting →
            </motion.button>
        </motion.div>
    );
}
