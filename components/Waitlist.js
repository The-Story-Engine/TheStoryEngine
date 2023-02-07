import { useState, useRef } from "react";
import { useTranslation } from "next-i18next";

import { useCreateWaitlistMutation, useWaitlistErrorQuery } from "utils-client";
import Button from "@components/Button";
import ListCheckboxes from "@components/ListCheckboxes";

const translationSpaces = ["workspaces", "common"];

const Error = ({ message }) => <p className="text-mandy">{message}</p>;

export default function Waitlist() {
  const { t } = useTranslation(translationSpaces);
  const createWaitlistMutation = useCreateWaitlistMutation();

  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [lists, setLists] = useState(["launch"]);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const waitlistErrorQuery = useWaitlistErrorQuery();

  const handleWaitlist = async () => {
    const emailIsValid = emailRef?.current?.reportValidity();

    if (!emailIsValid) {
      return setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
    await createWaitlistMutation.mutate({ email, lists });
  };

  let result;

  if (createWaitlistMutation.isSuccess) {
    result = (
      <>
        <div className="text-center text-story">
          <p>We've sent a confirmation email to</p>
          <p className="py-4 font-mono text-base">{email}</p>
          <p className="font-semibold text-center text-story">
            <span className="animate-pulse">🚨</span> Please follow the link
            inside to join the list! <span className="animate-pulse">🚨</span>
          </p>
        </div>
      </>
    );
  } else if (createWaitlistMutation.isError) {
    result = (
      <h2 className="text-center text-h3">
        Looks like something might have gone wrong! Please check your email
        inbox for a confirmation email or reload the page to try again.
      </h2>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {result ? (
        result
      ) : (
        <>
          <div className="w-full sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {t("SUPPORT.EMAIL.LABEL")}
            </label>
            <div className="mt-2 mb-4 sm:mx-0 sm:col-span-3">
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
                disabled={
                  !!createWaitlistMutation.status &&
                  createWaitlistMutation.status !== "idle"
                }
                autoComplete="email"
                className="block w-full max-w-lg p-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <ListCheckboxes
            title="Emails"
            checked={lists}
            isDisabled={
              !!createWaitlistMutation.status &&
              createWaitlistMutation.status !== "idle"
            }
            onChange={setLists}
          />
          <Button
            onPress={handleWaitlist}
            isDisabled={
              !email || emailInvalid || createWaitlistMutation.isLoading
            }
            className={`mt-10 ${
              createWaitlistMutation.isLoading ? "animate-pulse" : ""
            }`}
          >
            {createWaitlistMutation.isLoading ? "Sending..." : "Submit"}
          </Button>
          {waitlistErrorQuery.data ? (
            <Error message={waitlistErrorQuery.data} />
          ) : null}
        </>
      )}
    </div>
  );
}
