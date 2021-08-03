import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Digite o nome do produto"]},
    description: { type: String, required: [true, "Digite a descrição"]},
    category: { type: String, required: [true, "Digite a categoria"] },
    image: { type: String, required: [true, "selecione uma imagem"]},
    price: { type: Number, default: 0.0, required: [true, "Digite um preço"] }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
