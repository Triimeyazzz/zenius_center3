import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Index({ tryOuts }) {
    return (
        <div>
            <h1>Try Out List</h1>
            <a href="/try-out/create" className="btn btn-primary">Add New Try Out</a>
            <table>
                <thead>
                    <tr>
                        <th>Mata Pelajaran</th>
                        <th>Skor</th>
                        <th>Tanggal Pelaksanaan</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tryOuts.map(tryOut => (
                        <tr key={tryOut.id}>
                            <td>{tryOut.mata_pelajaran}</td>
                            <td>{tryOut.skor}</td>
                            <td>{tryOut.tanggal_pelaksanaan}</td>
                            <td>
                                <Link href={`/try-out/${tryOut.id}/edit`} className="btn btn-warning">Edit</Link>
                                <Link href={`/try-out/${tryOut.id}`} method="DELETE" as="button" className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
