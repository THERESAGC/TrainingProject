const express = require("express");
const fs = require("fs");
const path = require("path");
const pdf = require("pdfkit");
const Invoice = require("../models/Invoice"); // Import the Invoice model

const router = express.Router();

// Route to generate the invoice
router.post("/create-invoice", async (req, res) => {
  console.log("=====================================================")
  console.log("Received cart data:", req.body.cartData);
  const cartData = req.body.cartData;
  const invoiceId = Date.now().toString();  // Use timestamp as invoice ID

  // Calculate total amount
  let totalAmount = 0;
  cartData.forEach((product) => {
    totalAmount += product.price;
  });

  // Ensure the invoices directory exists
  const invoicesDir = path.join(__dirname, "..", "invoices");
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir);
  }

  const invoicePath = path.join(invoicesDir, `invoice-${invoiceId}.pdf`);

  // Generate the PDF invoice
  try {
    generateInvoice(cartData, invoicePath);
  } catch (err) {
    console.error("Error generating PDF invoice:", err);
    return res.status(500).send("Error generating PDF invoice");
  }

  // Create and save the invoice to the database
  const newInvoice = new Invoice({
    invoiceId,
    cartData,
    totalAmount,
    invoicePath: `invoice-${invoiceId}.pdf`,  // Store filename in DB
  });

  try {
    // Save the invoice in the database
    await newInvoice.save();
    res.json({ invoicePath: `invoice-${invoiceId}.pdf` });
  } catch (err) {
    console.error("Error saving invoice to DB:", err);
    res.status(500).send("Error generating invoice");
  }
});

// Function to generate the invoice as PDF
function generateInvoice(cartData, invoicePath) {
  const doc = new pdf();

  // Create a write stream to save the PDF to the file system
  const writeStream = fs.createWriteStream(invoicePath);
  doc.pipe(writeStream);

  // Add invoice details
  doc.fontSize(25).text("Invoice", { align: "center" });
  doc.fontSize(15).text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  let total = 0;
  // List items in the cart and calculate total price
  cartData.forEach((product, index) => {
    doc.fontSize(12).text(`${index + 1}. ${product.name} - $${product.price}`);
    total += product.price;
  });

  doc.moveDown();
  doc.fontSize(15).text(`Total: $${total}`, { align: "right" });

  // Finalize and end the document
  doc.end();
}

// Route to fetch the generated invoice
router.get("/get-invoice/:invoiceId", async (req, res) => {
  const { invoiceId } = req.params;
  const filePath = path.join(__dirname, "..", "invoices", invoiceId);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Invoice not found");
  }
});

module.exports = router;
