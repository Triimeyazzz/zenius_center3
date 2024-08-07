import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Pagination = ({ links }) => {
    return (
        <nav>
            <ul className="pagination">
                {links.map((link) => (
                    <li key={link.label} className={`page-item ${link.active ? 'active' : ''}`}>
                        <Link href={link.url} className="page-link">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
