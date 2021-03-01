import Layout from "@components/Layout";
import Waitlist from "@components/Waitlist";
import Button from "@components/Button";
import Donate from "@components/Donate";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  useWaitlistQuery,
  useConfirmWaitlistMutation,
  useWaitlistEmailQuery,
  waitlistLogout,
  useWaitlistLogout,
} from "utils-client";
import { useEffect } from "react";

const translationSpaces = ["workspaces", "common"];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, translationSpaces)),
  },
});

export default function WaitlistPage() {
  const { t } = useTranslation(translationSpaces);
  const waitlistQuery = useWaitlistQuery();
  const confirmWaitlistMutation = useConfirmWaitlistMutation();
  const waitlistEmailQuery = useWaitlistEmailQuery();
  const waitlistLogout = useWaitlistLogout();

  useEffect(() => {
    if (waitlistQuery.data && !waitlistQuery.data.confirmed) {
      confirmWaitlistMutation.mutate(waitlistQuery.data.id);
    }
  }, [waitlistQuery.data]);

  const waitlist = (
    <div className="flex flex-col items-center max-w-2xl space-y-4">
      {waitlistEmailQuery.data ? null : (
        <p className="text-story">
          Join the waitlist to get{" "}
          <span className="font-semibold">£5 of workspace credit</span> when we
          launch.
        </p>
      )}
      <div className="self-stretch">
        <Waitlist />
      </div>
    </div>
  );
  return (
    <Layout
      pageName={t("common:PAGE_NAMES.WORKSPACES")}
      growMainWidth={true}
      mainContent={
        <div className="flex justify-center flex-grow p-8 mt-2 mb-6 md:mt-6">
          <div className="flex flex-col items-stretch flex-grow max-w-6xl space-y-10 divide-y-2 divide-silver-chalice">
            <div className="flex flex-col items-center">
              <h2 className="w-full font-bold text-center text-h1">Waitlist</h2>
            </div>
            <div className="flex flex-col items-center pt-12 space-y-6">
              {waitlistQuery.data ? (
                <>
                  <h2 className="text-h3">
                    Welcome back! You can manage your waitlist and launch credit
                    here.
                  </h2>
                  <p>{JSON.stringify(waitlistQuery.data, null, "  ")}</p>
                  <Button onPress={waitlistLogout}>Logout</Button>
                </>
              ) : (
                waitlist
              )}
            </div>
            <div className="flex flex-col items-center pt-12">
              <Donate />
            </div>
          </div>
        </div>
      }
    />
  );
}
