const mongoose = require("mongoose");

const ProdukSchema = new mongoose.Schema({
    nama: String, 
    harga: Number, 
});

module.exports = mongoose.model("Produk", ProdukSchema);
