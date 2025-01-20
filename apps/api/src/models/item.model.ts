import { Schema, model } from 'mongoose';

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    wholeSaleId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    expirationDate: {
      type: Date,
     
    },
  },
  { timestamps: true },
);
inventorySchema.index({ expirationDate: 1, wholesaleId: 1 });
export const Inventory = model('Inventory', inventorySchema);
