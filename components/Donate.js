import { useState, useEffect } from "react";

import Waitlist from "@components/Waitlist";
import Button from "@components/Button";
import { useTranslation } from "next-i18next";
import { getStripeIntent, useWaitlistQuery } from "utils-client";
import StripeSVG from "public/stripe-badge.svg";
import SpinnerSVG from "public/spinner.svg";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

const translationSpaces = ["workspaces", "common"];

const Error = ({ message }) => <p className="text-mandy">{message}</p>;

const CheckoutInner = ({ intentSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const cardResult = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (cardResult?.error) {
      console.log("createPaymentMethod error");
      console.error(cardResult.error);
      setResult(cardResult);
    } else {
      const paymentResult = await stripe.confirmCardPayment(intentSecret, {
        payment_method: cardResult.paymentMethod.id,
      });
      if (paymentResult?.error) {
        console.log("confirmCardPayment error");
        console.error(paymentResult.error);
      }
      setResult(paymentResult);
    }
    setIsLoading(false);
  };

  let errorMessage;

  if (result?.error) {
    if (["card_error", "validation_error"].includes(result.error.type)) {
      errorMessage = result.error.message;
    } else {
      errorMessage = "Payment failed.";
    }
  }

  return (
    <>
      {result && !errorMessage ? (
        <code>{JSON.stringify(result, null, "  ")}</code>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center self-stretch space-y-6"
        >
          <div className="self-stretch sm:border-t sm:border-gray-200 sm:pt-5">
            <div>
              <CardElement
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
          </div>
          {errorMessage ? <Error message={result.error.message} /> : null}
          <Button
            isDisabled={!!result || !stripe}
            type="submit"
            isDisabled={!stripe || isLoading}
            className={isLoading ? "animate-pulse" : ""}
          >
            {isLoading ? "Loading..." : `Pay £${amount}`}
          </Button>
        </form>
      )}
    </>
  );
};

const Checkout = (props) => {
  const [stripePromise, setStripePromise] = useState();

  useEffect(() => {
    loadStripe.setLoadParameters({ advancedFraudSignals: false });
    setStripePromise(
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    );
  }, []);

  return stripePromise ? (
    <Elements stripe={stripePromise}>
      <CheckoutInner {...props} />
    </Elements>
  ) : null;
};

const AmountSelection = ({ setAmount: setOuterAmount }) => {
  const { t } = useTranslation(translationSpaces);
  const [amountSelection, setAmountSelection] = useState();
  const [otherAmount, setOtherAmount] = useState();
  const handleOtherChange = (newAmount) => {
    const cleanAmount = newAmount.replace(/\D/, "");
    setOtherAmount(cleanAmount);
    setOuterAmount(cleanAmount);
  };
  const handleAmountSelectionChange = (newAmount) => {
    if (newAmount === "other") {
      setOtherAmount(5);
      setOuterAmount(5);
    } else {
      setOtherAmount(-1);
      setOuterAmount(newAmount);
    }
    setAmountSelection(newAmount);
  };
  return (
    <div role="group" aria-labelledby="label-amount">
      <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-baseline">
        <div>
          <div
            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
            id="label-amount"
          >
            {t("SUPPORT.AMOUNT.LABEL")}
          </div>
        </div>
        <div className="sm:col-span-3">
          <div className="max-w-lg">
            <div className="flex flex-wrap mt-4 space-x-4">
              {t("SUPPORT.AMOUNT.AMOUNTS", { returnObjects: true }).map(
                (amount) => (
                  <div key={amount} className="flex items-center">
                    <input
                      id={`amount-${amount}`}
                      name="amount"
                      value={amount}
                      type="radio"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      onChange={(event) =>
                        handleAmountSelectionChange(event.target.value)
                      }
                    />
                    <label
                      htmlFor={`amount-${amount}`}
                      className="block ml-3 text-sm font-medium text-gray-700"
                    >
                      £ {amount}
                    </label>
                  </div>
                )
              )}
              <div className="flex items-center">
                <input
                  id="amount-other"
                  value="other"
                  name="amount"
                  type="radio"
                  onChange={(event) =>
                    handleAmountSelectionChange(event.target.value)
                  }
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor="amount-other"
                  className="block ml-3 text-sm font-medium text-gray-700"
                >
                  {t("SUPPORT.AMOUNT.OTHER")}
                </label>
                {amountSelection === "other" ? (
                  <input
                    className="ml-2 text-base font-semibold w-14"
                    type="number"
                    value={otherAmount}
                    onChange={(event) => handleOtherChange(event.target.value)}
                  ></input>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const boldMid = ([start, emphasize, end]) => (
  <>
    {start} <span className="font-semibold">{emphasize}</span> {end}
  </>
);

export default function Donate() {
  const [amount, setAmount] = useState();
  const [paymentIntent, setPaymentIntent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const waitlistQuery = useWaitlistQuery();
  const { t } = useTranslation(translationSpaces);

  const handleDonate = async () => {
    setIsLoading(true);
    const paymentIntent = await getStripeIntent({
      amount,
      email: waitlistQuery.data?.email,
    });
    setIsLoading(false);
    setPaymentIntent(paymentIntent);
  };
  return (
    <div className="max-w-2xl space-y-6">
      <div className="text-center text-story">
        <p>{t("SUPPORT.SUB_TITLE.0")}</p>
        <p className="pt-2">{t("SUPPORT.SUB_TITLE.1")}</p>
      </div>
      <p>
        {amount
          ? boldMid(
              t("SUPPORT.CREDIT", {
                amount: amount * 2 + 5,
                returnObjects: true,
              })
            )
          : boldMid(t("SUPPORT.CREDIT_BEFORE", { returnObjects: true }))}
      </p>
      <div className="flex flex-col mt-6 space-y-6 sm:space-y-5">
        {waitlistQuery.data ? (
          paymentIntent ? (
            <Checkout
              intentSecret={paymentIntent.intentSecret}
              amount={paymentIntent.amount}
            />
          ) : (
            <>
              <AmountSelection amount={amount} setAmount={setAmount} />
              <Button
                className="self-center"
                isDisabled={!amount || isLoading}
                onPress={handleDonate}
                className={
                  isLoading ? "self-center animate-pulse" : "self-center"
                }
              >
                {isLoading ? "Loading..." : t("SUPPORT.BUTTON_LABEL")}
              </Button>
            </>
          )
        ) : (
          <p className="font-semibold text-center text-malachite">
            Please join waitlist above and follow email confirmation link to
            donate.
          </p>
        )}
        <a href="https://stripe.com" target="_blank" className="self-center">
          <StripeSVG className="h-8" />
        </a>
      </div>
    </div>
  );
}
