// resources/js/Pages/Pembayaran/FinancialSummary.jsx
import React from 'react';
import { Head } from '@inertiajs/inertia-react';

export default function FinancialSummary({ totalPemasukan, pemasukanPerBulan, totalTagihan, sisaTagihan }) {
    return (
        <>
            <Head title="Ringkasan Keuangan" />
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-semibold mb-6">Ringkasan Keuangan</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h2 className="text-xl font-semibold mb-4">Ringkasan Total</h2>
                        <p>Total Pemasukan: Rp {totalPemasukan.toLocaleString()}</p>
                        <p>Total Tagihan: Rp {totalTagihan.toLocaleString()}</p>
                        <p>Sisa Tagihan: Rp {sisaTagihan.toLocaleString()}</p>
                    </div>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h2 className="text-xl font-semibold mb-4">Pemasukan per Bulan</h2>
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Bulan
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pemasukanPerBulan.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {item.year}-{item.month.toString().padStart(2, '0')}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            Rp {item.total.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}