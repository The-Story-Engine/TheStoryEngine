import Layout from "@components/Layout";
import Waitlist from "@components/Waitlist";
import Button from "@components/Button";
import ButtonWarning from "@components/ButtonWarning";
import Donate from "@components/Donate";
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
import { useEffect } from "react";

const translationSpaces = ["workspaces", "common"];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, translationSpaces)),
  },
});

const CheckboxField = ({
  lists,
  title,
  onChange,
  checked = [],
  isDisabled = false,
}) => {
  lists = lists || [
    {
      value: "launch",
      title: "Launches",
      description:
        "3 launch emails: Writer accounts, Home workspaces and Community workspaces",
    },
    {
      value: "news",
      title: "News",
      description:
        "Every 2-4 weeks: New Story Engine features and blog posts (blog coming soon!).",
    },
  ];

  const handleChange = (event) => {
    const targetValue = event.target.name;
    const isTargetChecked = event.target.checked;
    const newChecked = isTargetChecked
      ? [...checked, targetValue]
      : checked.filter((inner) => inner != targetValue);
    onChange(newChecked);
  };

  return (
    <div role="group" aria-labelledby="label-email">
      <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-baseline">
        <div>
          <div
            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
            id="label-email"
          >
            {title}
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:col-span-3">
          <div className="max-w-lg space-y-4">
            {lists.map(({ value, title, description }) => (
              <div key={value} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onChange={handleChange}
                    disabled={isDisabled}
                    id={value}
                    name={value}
                    checked={checked.includes(value)}
                    type="checkbox"
                    className={`w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:text-silver-chalice disabled:animate-pulse`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={value} className="font-medium text-gray-700">
                    {title}
                  </label>
                  <p className="text-gray-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LaunchCreditTable = ({ joinDate }) => (
  <div role="group" aria-labelledby="label-email">
    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-baseline">
      <div>
        <div
          className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
          id="label-email"
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
                        Date
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
                  <div className="flex flex-col items-center space-y-3">
                    <h2 className="text-story">
                      <span className="font-mono">
                        {waitlistQuery.data.email}
                      </span>
                    </h2>
                    <Button onPress={waitlistLogout}>Logout</Button>
                  </div>
                  <CheckboxField
                    title="Emails"
                    checked={waitlistQuery.data.lists}
                    isDisabled={updateListsMutation.isLoading}
                    onChange={updateListsMutation.mutate}
                  />
                  <LaunchCreditTable
                    joinDate={new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "long",
                    }).format(new Date(waitlistQuery.data.created_at))}
                  />
                  <ButtonWarning
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
            <div className="flex flex-col items-center pt-12">
              <Donate />
            </div>
          </div>
        </div>
      }
    />
  );
}
