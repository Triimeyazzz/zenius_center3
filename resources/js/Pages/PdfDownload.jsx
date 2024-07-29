import React, { useEffect, useState } from 'react';

const PdfDownload = ({ siswaId }) => {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const checkPdfStatus = async () => {
            const response = await fetch(`/get-pdf-url/${siswaId}`);
            const data = await response.json();
            if (data.url) {
                setPdfUrl(data.url);
            } else {
                // Poll again after a short delay
                setTimeout(checkPdfStatus, 5000);
            }
        };

        checkPdfStatus();
    }, [siswaId]);

    return (
        <div>
            {pdfUrl ? (
                <a href={pdfUrl} download>Unduh PDF</a>
            ) : (
                <p>Menunggu PDF selesai diproses...</p>
            )}
        </div>
    );
};

export default PdfDownload;
