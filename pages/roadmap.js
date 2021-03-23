import Layout from "@components/Layout";
import Waitlist from "@components/Waitlist";
import Button from "@components/Button";
import ButtonWarning from "@components/ButtonWarning";
import Donate from "@components/Donate";
import ListCheckboxes from "@components/ListCheckboxes";
import LinkButton from "@components/LinkButton";
import WriterSVG from "public/writer.svg";
import HomeSVG from "public/home.svg";
import CommunitySVG from "public/community.svg";
import JellyfishSVG from "public/jellyfish.svg";
import ArrowSVG from "public/big-arrow.svg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  useWaitlistQuery,
  useConfirmWaitlistMutation,
  useWaitlistEmailQuery,
  useWaitlistLogout,
  useUpdateListsMutation,
  useDeleteWaitlistMutation,
} from "utils-client";
import { useEffect, Fragment } from "react";

const translationSpaces = ["workspaces", "common"];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, translationSpaces)),
  },
});

const LaunchCreditTable = ({ joinDate, donations = [], className = "" }) => (
  <div role="group" aria-labelledby="label-credit-table" className={className}>
    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-baseline">
      <div>
        <div
          className="text-sm font-medium text-gray-900 sm:text-base sm:text-gray-700"
          id="label-credit-table"
        >
          Workspace launch credit
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:col-span-3">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Date Added
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        £5
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {joinDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        Joined workspaces waitlist.
                      </td>
                    </tr>
                    {donations
                      .filter((donation) => donation?.status === "succeeded")
                      .map((donation) => (
                        <tr key={donation.id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            £{(donation.amount / 100) * 2}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {new Intl.DateTimeFormat("en-GB", {
                              dateStyle: "long",
                            }).format(new Date(donation.created * 1000))}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            £{donation.amount / 100} Donation. Thankyou!{" "}
                            {donation?.receiptUrls ? (
                              <a
                                href={donation?.receiptUrls[0]}
                                className="font-semibold cursor-pointer hover:underline focus-visible:underline"
                                target="_blank"
                              >
                                View Receipt.
                              </a>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function WaitlistPage() {
  const { t } = useTranslation(translationSpaces);
  const waitlistQuery = useWaitlistQuery();
  const confirmWaitlistMutation = useConfirmWaitlistMutation();
  const waitlistEmailQuery = useWaitlistEmailQuery();
  const waitlistLogout = useWaitlistLogout();
  const updateListsMutation = useUpdateListsMutation(waitlistQuery?.data?.id);
  const deleteWaitlistMutation = useDeleteWaitlistMutation(
    waitlistQuery?.data?.id
  );

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Unsubscribe & delete all data for ${waitlistQuery?.data?.email}?`
    );
    if (confirmed) {
      deleteWaitlistMutation.mutate();
    }
  };

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
  const SVGs = {
    WRITER: WriterSVG,
    HOME: HomeSVG,
    COMMUNITY: CommunitySVG,
  };
  const roadMap = [
    {
      title: "The Story Engine",
      icon: JellyfishSVG,
      description:
        "A space to write, with the Inspirational Jellyfish cheering you on.",
    },
    {
      title: "Writer Accounts",
      icon: WriterSVG,
      description: "A space to save & iterate stories for writers of all ages.",
    },
    {
      title: "Home Workspaces",
      icon: HomeSVG,
      description:
        "A space for parents & guardians challenging writers to find inspiration.",
    },
    {
      title: "Group Workspaces",
      icon: CommunitySVG,
      description: "A space to mentor & develop writing groups safely.",
    },
  ];
  const TimelineDots = ({ isDone }) => (
    <div className="self-center py-2 space-y-4 opacity-60">
      <ArrowSVG
        className={`w-6 h-6 transform -rotate-90 ${
          isDone ? "text-malachite" : "text-dodger-blue"
        }`}
      />
      <ArrowSVG
        className={`w-6 h-6 transform -rotate-90 ${
          isDone ? "text-malachite" : "text-dodger-blue"
        }`}
      />
      <ArrowSVG
        className={`w-6 h-6 transform -rotate-90 ${
          isDone ? "text-malachite" : "text-dodger-blue"
        }`}
      />
    </div>
  );
  return (
    <Layout
      pageName={t("common:PAGE_NAMES.WORKSPACES")}
      headerButtons={<LinkButton href="/write">Write!</LinkButton>}
      growMainWidth={true}
      mainContent={
        <div className="flex justify-center flex-grow p-8 mt-2 mb-6 md:my-6">
          <div className="flex flex-col items-stretch flex-grow max-w-6xl space-y-10 divide-y-2 divide-silver-chalice">
            <div className="flex flex-col items-center">
              <h2 className="w-full font-bold text-center text-h1">Roadmap</h2>
            </div>
            <div className="flex flex-col items-stretch pt-6 space-y-6 text-center">
              <TimelineDots isDone={true} />
              {roadMap.map(
                ({ title, when, icon: Icon, description }, index) => (
                  <Fragment key={title}>
                    <div className="space-y-4">
                      <h3 className="relative z-10 text-h1">{when}</h3>
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div
                            className="absolute z-0 bg-no-repeat bg-contain bg-ink opacity-70"
                            style={{
                              height: "175%",
                              width: "175%",
                              top: "60%",
                              left: "45%",
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                          <Icon
                            className={`relative z-10 ${
                              index === 0 ? "w-36" : "w-24"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="relative z-10 font-bold text-h3">
                          {title}
                        </h3>
                        <p className="relative z-10 font-light text-story">
                          {description}
                        </p>
                      </div>
                    </div>
                    <TimelineDots isDone={false} />
                  </Fragment>
                )
              )}
            </div>
            <div className="flex flex-col items-center pt-8">
              <div className="flex flex-col items-center self-stretch">
                <h2
                  className="w-full font-semibold text-center text-h1"
                  id="waitlist"
                >
                  Waitlist
                </h2>
                <div className="flex flex-col items-center self-stretch pt-12 space-y-12">
                  {waitlistQuery.data ? (
                    <>
                      <div className="flex flex-col items-center space-y-3">
                        <h2 className="text-story">
                          <span className="font-mono">
                            {waitlistQuery.data.email}
                          </span>
                        </h2>
                        <Button onPress={waitlistLogout}>Logout</Button>
                      </div>
                      <ListCheckboxes
                        className="self-center w-full max-w-3xl"
                        title="Emails"
                        checked={waitlistQuery.data.lists}
                        isDisabled={updateListsMutation.isLoading}
                        onChange={updateListsMutation.mutate}
                      />
                      <LaunchCreditTable
                        className="self-center w-full max-w-3xl"
                        joinDate={new Intl.DateTimeFormat("en-GB", {
                          dateStyle: "long",
                        }).format(new Date(waitlistQuery.data.created_at))}
                        donations={waitlistQuery.data.donations}
                      />
                      <ButtonWarning
                        className="self-center"
                        onPress={handleDelete}
                        isDisabled={deleteWaitlistMutation.isLoading}
                      >
                        Delete
                      </ButtonWarning>
                    </>
                  ) : (
                    waitlist
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center pt-8 space-y-12">
              <h2 className="w-full font-semibold text-center text-h1">
                Donate
              </h2>
              <Donate />
            </div>
          </div>
        </div>
      }
    />
  );
}
