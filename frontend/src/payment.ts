import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";
import { Chain } from "@circle-fin/circle-sdk/dist/generated/models/chain";
import { CryptoPaymentsMoneyCurrencyEnum } from "@circle-fin/circle-sdk/dist/generated/models/crypto-payments-money";
import { PaymentIntentCreationRequestSettlementCurrencyEnum } from "@circle-fin/circle-sdk/dist/generated/models/payment-intent-creation-request";
import { PaymentMethodBlockchainTypeEnum } from "@circle-fin/circle-sdk/dist/generated/models/payment-method-blockchain";
import { v4 as uuid } from "uuid";

console.log(process.env.NEXT_PUBLIC_CIRCLE_API_KEY);
const circle = new Circle(
  process.env.NEXT_PUBLIC_CIRCLE_API_KEY!,
  CircleEnvironments.sandbox
);

export async function createUSDCPayment() {
  const reqBody = {
    amount: {
      amount: "1",
      currency: CryptoPaymentsMoneyCurrencyEnum.Usd,
    },
    settlementCurrency: PaymentIntentCreationRequestSettlementCurrencyEnum.Usd,
    paymentMethods: [
      {
        type: PaymentMethodBlockchainTypeEnum.Blockchain,
        chain: Chain.Arb,
      },
    ],
    idempotencyKey: uuid(),
  };

  const resp = await circle.cryptoPaymentIntents.createPaymentIntent(reqBody);
  return resp.data;
}
export async function getPaymentIntent(id: string) {
  const resp = await circle.cryptoPaymentIntents.getPaymentIntent(id);
  return resp.data;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Poll payment id to get payment intent every 500ms
export async function pollPaymentIntent(id: string) {
  let paymentIntent;
  while (!paymentIntent) {
    paymentIntent = await getPaymentIntent(id);
    let depositAddress = paymentIntent.data?.paymentMethods[0]?.address;

    if (depositAddress) break;
    await delay(500);
  }
  return paymentIntent.data;
}

export async function createWalletAddress() {
  const paymentIntent = await createUSDCPayment();
  const paymentIntentId = paymentIntent.data?.id;
  const payment = await pollPaymentIntent(paymentIntentId!);
  const address = payment?.paymentMethods[0].address;

  console.log("payment id:", paymentIntentId);

  return [paymentIntentId, address];
}

export async function checkPaymentStatus(paymentIntentId: string) {
  const paymentIntent = await circle.cryptoPaymentIntents.getPaymentIntent(
    paymentIntentId
  );

  const paymentIds = paymentIntent.data.data?.paymentIds;
  let paymentId;

  if (paymentIds && paymentIds.length > 0) {
    paymentId = paymentIds[0];
    return true;
  }

  console.log("Payment hasn't been made yet!");
  return false;
}
