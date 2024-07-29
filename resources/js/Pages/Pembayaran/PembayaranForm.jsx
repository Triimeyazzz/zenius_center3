import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const PembayaranForm = () => {
  const { data, setData, post, errors } = useForm({
    jumlah: ''
  });
  

  const handleSubmit = (event) => {
    event.preventDefault();
    post('/pembayaran');
  };

  return (
    <div>
      <h1>Buat Pembayaran</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Jumlah:
          <input
            type="number"
            value={data.jumlah}
            onChange={(e) => setData('jumlah', e.target.value)}
            required
          />
        </label>
        {errors.jumlah && <div>{errors.jumlah}</div>}
        <button type="submit">Bayar</button>
      </form>
    </div>
  );
}
export default PembayaranForm;
