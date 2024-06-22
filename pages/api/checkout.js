import paypal from "@paypal/checkout-server-sdk";
const clientId =
  "Abfv8kkW0QrUOwA_Yc0_zwxYqJAjW9wVbhHK1F5onkEH4xm1n5BJn01pifr-sMGB875gWv6hZWzQzl8i";
const clientSecret =
  "EJYqqoSSaADkU7rFJbCwrDG61asO_emjMWQxc_wxksVw8MwXjiDCFcr_c-db6zfAFG2UuBkSSx5FliUA";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export default async function Handler(req, res) {
  if (req.method != "POST") {
    return res.status(404).json({ success: false, message: "Not Found" });
  }
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: req.body.myTotal,
        },
      },
    ],
  });

  const response = await client.execute(request);
  console.log(response);
  if (!response) {
    return res
      .status(500)
      .json({ success: false, message: "Some Error Occured at backend" });
  }
  return res.status(200).json({
    id: response.result.id,
  });
}
