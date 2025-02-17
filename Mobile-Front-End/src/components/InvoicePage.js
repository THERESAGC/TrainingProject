import { useParams } from "react-router-dom";

const InvoicePage = () => {
  const { invoicePath } = useParams(); // Access the dynamic invoicePath from the URL

  return (
    <div>
      <h1>Invoice</h1>
      <p>Your invoice path is: {invoicePath}</p>
      {/* You can render your invoice details based on the invoicePath */}
    </div>
  );
};

export default InvoicePage;
