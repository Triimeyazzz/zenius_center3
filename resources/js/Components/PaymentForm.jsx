// // src/components/PaymentForm.jsx
// import React, { useState } from 'react';
// import { Inertia } from '@inertiajs/inertia';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     user_id: '',
//     total_amount: '',
//     payment_type: '',
//     // ... field lainnya
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Inertia.post('/pembayaran', formData); // Sesuaikan rute sesuai kebutuhan
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Render field-form di sini */}
//       {/* Contoh: */}
//       <input
//         type="text"
//         name="user_id"
//         value={formData.user_id}
//         onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
//       />
//       {/* ... field lainnya */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PaymentForm;
