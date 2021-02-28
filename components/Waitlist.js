import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState, useRef } from "react";
import { useTranslation } from "next-i18next";

import { useWaitlistQuery, useCreateWaitlistMutation } from "utils-client";
import Button from "@components/Button";

const translationSpaces = ["workspaces", "common"];

export default function Waitlist() {
  const { t } = useTranslation(translationSpaces);

  const waitlistQuery = useWaitlistQuery();
  const createWaitlistMutation = useCreateWaitlistMutation();

  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);

  const handleWaitlist = async () => {
    const emailIsValid = emailRef?.current?.reportValidity();

    if (!emailIsValid) {
      return setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
    await createWaitlistMutation.mutate({ email });
  };

  if (waitlistQuery.data) {
    return (
      <p>
        Please check your <span className="italic font-semibold">{email}</span>{" "}
        inbox, and follow the link to finish joining the list.
      </p>
    );
  }

  return (
    <>
      <div className="w-full sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:p-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {t("SUPPORT.EMAIL.LABEL")}
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-3">
          <input
            id="email"
            name="email"
            ref={emailRef}
            type="email"
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value);
              setEmailInvalid(false);
            }}
            autoComplete="email"
            className="block w-full max-w-lg p-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <p className="text-center">
          You'll get a confirmation email now, and an email for each of the 2
          launches later this year.
        </p>
        <p className="text-center">
          Your email will then be stored for 12 months so we know it's you when
          you sign up.
        </p>
      </div>
      <div className="flex mt-6 space-x-12">
        {createWaitlistMutation.isLoading ? (
          "Loading..."
        ) : (
          <Button onPress={handleWaitlist} isDisabled={emailInvalid}>
            Join List
          </Button>
        )}
      </div>
    </>
  );
}
