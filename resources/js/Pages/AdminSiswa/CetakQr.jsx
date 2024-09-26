const CetakQr = ({ qr }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold">QR Code</h1>
                <div dangerouslySetInnerHTML={{ __html: qr }} className="mt-4" />
                <button
                    onClick={() => window.print()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Print QR Code
                </button>
            </div>
        </div>
    );
};

export default CetakQr;
