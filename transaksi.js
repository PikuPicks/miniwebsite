const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    produk: { type: mongoose.Schema.Types.ObjectId, ref: 'Produk', required: true },
    jumlah: { type: Number, required: true },
    totalHarga: { type: Number, required: true },
    tanggal: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaksi', transaksiSchema);