import React, { useState, useRef } from "react";
import { TextField, Button, Grid } from "@mui/material";

const initialFormState = {
  qty: "",
  price: "",
  discountPercentage: "",
  discount: "",
  taxPercentage: "",
  tax: "",
  totalPrice: "",
};

const App = () => {
  const discountRef = useRef(null);
  const [invoices, setInvoices] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvoice = {
      ...formState,
      tax: tax,
      discount: discount,
      totalPrice: totalPrice,
    };
    setInvoices((prevState) => [...prevState, newInvoice]);
    setFormState(initialFormState);
    setDiscount(0);
    setTax(0);
    setTotalPrice(0);
  };

  function calculateTotalPrice(
    quantity,
    price,
    discountPercentage,
    taxPercentage
  ) {
    // Calculate the discount amount
    var discountAmount = (quantity * price * discountPercentage) / 100;

    // Calculate the subtotal (price after discount)
    var subtotal = price - discountAmount;

    // Calculate the tax amount
    var taxAmount = (subtotal * taxPercentage) / 100;

    // Calculate the total price
    var totalPrice = subtotal + taxAmount;
    setTotalPrice(totalPrice);
    return totalPrice;
  }
  function calculateDiscount(quantity, price, discountPercentage) {
    // Calculate the discount amount
    var discountAmount = (quantity * price * discountPercentage) / 100;

    // Calculate the subtotal (price after discount)
    setDiscount(discountAmount);
    return discountAmount;
  }
  function calculateTax(quantity, price, discountPercentage, taxPercentage) {
    // Calculate the discount amount
    var discountAmount = (quantity * price * discountPercentage) / 100;

    // Calculate the subtotal (price after discount)
    var subtotal = price - discountAmount;

    // Calculate the tax amount
    var taxAmount = (subtotal * taxPercentage) / 100;

    // Calculate the total price
    setTax(taxAmount);
    return taxAmount;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="qty"
          label="Qty"
          type="number"
          value={formState.qty}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formState.price}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="discountPercentage"
          label="Discount %"
          type="number"
          value={formState.discountPercentage}
          onChange={(e) => {
            handleInputChange(e);
            let discount = calculateDiscount(
              formState.qty,
              formState.price,
              e.target.value
            );
            formState.discount = discount;
            console.log(discount);
            discountRef.current.value = discount;
          }}
        />
        <TextField
          name="discount"
          label="Discount"
          type="number"
          ref={discountRef}
          value={discount}
          disabled
        />
        <TextField
          name="taxPercentage"
          label="Tax %"
          type="number"
          value={formState.taxPercentage}
          onChange={(e) => {
            handleInputChange(e);
            let tx = calculateTax(
              formState.qty,
              formState.price,
              formState.discountPercentage,
              e.target.value
            );
            formState.tax = tx;
            let tprice = calculateTotalPrice(
              formState.qty,
              formState.price,
              formState.discountPercentage,
              e.target.value
            );
            formState.totalPrice = tprice;
          }}
        />
        <TextField name="tax" label="Tax" value={tax} disabled />
        <TextField
          name="totalPrice"
          label="Total Price"
          type="number"
          value={totalPrice}
          disabled
        />
        <Button type="submit" variant="contained" color="primary">
          Add Invoice
        </Button>
      </form>
      <Grid container spacing={2}>
        {invoices.map((invoice, index) => (
          <Grid item key={index} xs={12}>
            <form>
              <TextField
                name="qty"
                label="Qty"
                defaultValue={invoice.qty}
                required
              />
              <TextField
                name="price"
                label="Price"
                defaultValue={invoice.price}
                required
              />
              <TextField
                name="discountPercentage"
                label="Discount %"
                defaultValue={invoice.discountPercentage}
              />
              <TextField
                name="discount"
                label="Discount"
                defaultValue={invoice.discount}
                disabled
              />
              <TextField
                name="taxPercentage"
                label="Tax %"
                defaultValue={invoice.taxPercentage}
              />
              <TextField
                name="tax"
                label="Tax"
                defaultValue={invoice.tax}
                disabled
              />
              <TextField
                name="totalPrice"
                label="Total Price"
                defaultValue={invoice.totalPrice}
                disabled
              />
              <Button variant="contained" color="primary">
                Save
              </Button>
            </form>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
