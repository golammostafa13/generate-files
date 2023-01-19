const invoice = {
  invoice_no: "47-606-0116",
  created_date: "08/12/2022",
  due_date: "09/05/2022",
  company_name: "Oyoba",
  address: "9th Floor",
  payment_methods: [
    {
      type: "Check",
      value: 500,
    },
    {
      type: "Card",
      value: 400,
    },
  ],
  items_description: [
    {
      name: "Website Design",
      price: 400,
    },
    {
      name: "Hosting(3 months)",
      price: 100,
    },
    {
      name: "Domain Name",
      price: 70,
    },
  ],
};

module.exports = invoice;
