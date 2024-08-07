import React from 'react';
import { Head, usePage } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';

const Kehadiran = () => {
    const { props } = usePage();
    const { masuk, telat, cuti, alpha, presents, rank } = props;

    return (
        <>
            <Head title={`Kehadiran - ${props.appName}`} />
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-6">
                        <div className="card card-stats mb-4 mb-xl-0">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">Masuk</h5>
                                        <span className="h2 font-weight-bold mb-0">{masuk}</span>
                                    </div>
                                    <div className="col-auto">
                                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                            <i className="fas fa-check"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Repeat for other stats (Telat, Cuti, Alpha) */}
                </div>

                <div className="card shadow h-100">
                    <div className="card-header">
                        <h5 className="m-0 pt-1 font-weight-bold float-left">Kehadiran</h5>
                        <form className="float-right" action="/kehadiran/excel-users" method="get">
                            <input type="hidden" name="tanggal" value={props.tanggal} />
                            <button className="btn btn-sm btn-primary" type="submit" title="Download">
                                <i className="fas fa-download"></i>
                            </button>
                        </form>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 mb-1">
                                <form action="/kehadiran/search" method="get">
                                    <div className="form-group row">
                                        <label htmlFor="tanggal" className="col-form-label col-sm-3">Tanggal</label>
                                        <div className="input-group col-sm-9">
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="tanggal"
                                                id="tanggal"
                                                defaultValue={props.tanggal}
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-primary" type="submit">Cari</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6">
                                <div className="float-right">
                                    <Pagination links={presents.links} />
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NRP</th>
                                        <th>Nama</th>
                                        <th>Keterangan</th>
                                        <th>Jam Masuk</th>
                                        <th>Jam Keluar</th>
                                        <th>Total Jam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {presents.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">Tidak ada data yang tersedia</td>
                                        </tr>
                                    ) : (
                                        presents.data.map((present, index) => (
                                            <tr key={present.id}>
                                                <th>{rank + index}</th>
                                                <td><a href={`/siswa/${present.siswa.id}`}>{present.siswa.nrp}</a></td>
                                                <td>{present.siswa.nama}</td>
                                                <td>{present.keterangan}</td>
                                                <td>{present.jam_masuk ? new Date(present.jam_masuk).toLocaleTimeString() : '-'}</td>
                                                <td>{present.jam_keluar ? new Date(present.jam_keluar).toLocaleTimeString() : '-'}</td>
                                                <td>
                                                    {present.jam_keluar && present.jam_masuk ? (
                                                        (new Date(present.jam_keluar).getTime() - new Date(present.jam_masuk).getTime()) / (1000 * 60 * 60)
                                                    ) : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Kehadiran;
