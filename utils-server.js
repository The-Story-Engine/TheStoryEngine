import * as postmark from "postmark";

import { arrayToHasuraList } from "utils-common";

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_API;
const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET;
const postmarkSecretKey = process.env.POSTMARK_KEY;

var postmarkClient = new postmark.ServerClient(postmarkSecretKey);

export const waitlistEmailQuery = `
query WaitlistByEmail($email: String!) {
  waitlist (where: {email: {_eq: $email}}) {
    id
    created_at
    email
    lists
    confirmed
    updated_at
    donations
  }
}
`;

export const insertWaitlistQuery = `
mutation InsertWaitlist($email: String!, $lists: _text, $donations:jsonb) {
    insert_waitlist_one(object: {email: $email, lists: $lists, donations: $donations}) {
      id
      email
      lists
      confirmed
      donations
    }
  }
`;

export const deleteInsertWaitlistQuery = `
mutation DeleteInsertWaitlist($email: String!, $lists: _text, $donations: jsonb, $existingId: uuid!) {
    delete_waitlist_by_pk(id: $existingId) {
      id
    }
    insert_waitlist_one(object: {email: $email, lists: $lists, donations: $donations}) {
      id
    }
  }
`;

export const appendDonationWaitlistQuery = `
mutation AppendWaitlistDonation($id: uuid!, $donation: jsonb) {
  update_waitlist_by_pk(pk_columns: {id: $id}, _append: {donations: $donation}) {
    id
  }
}
`;

export const updateDonationsWaitlistQuery = `
mutation UpdateWaitlistDonations($id: uuid!, $donations: jsonb) {
  update_waitlist_by_pk(pk_columns: {id: $id}, _set: {donations: $donations}) {
    id
    created_at
    updated_at
    confirmed
    donations
    email
    lists
  }
}
`;

export async function fetchAdminGraphQL(
  operationsDoc,
  operationName,
  variables
) {
  const result = await fetch(graphqlUrl, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: new Headers({
      "x-hasura-admin-secret": hasuraAdminSecret,
    }),
  });

  return await result.json();
}

export function fetchEmailWaitlist(email) {
  return fetchAdminGraphQL(waitlistEmailQuery, "WaitlistByEmail", { email });
}

export function insertUnconfirmedWaitlist(email, lists = [], donations = []) {
  return fetchAdminGraphQL(insertWaitlistQuery, "InsertWaitlist", {
    email,
    lists: arrayToHasuraList(lists),
    donations,
  });
}

export function deleteExistingInsertNewWaitlist({
  existingId,
  email,
  lists,
  donations = [],
}) {
  return fetchAdminGraphQL(deleteInsertWaitlistQuery, "DeleteInsertWaitlist", {
    email,
    lists: arrayToHasuraList(lists),
    donations,
    existingId,
  });
}

export function appendWaitlistDonation({ id, donation }) {
  return fetchAdminGraphQL(
    appendDonationWaitlistQuery,
    "AppendWaitlistDonation",
    {
      id,
      donation,
    }
  );
}

export function updateWaitlistDonations({ id, donations }) {
  return fetchAdminGraphQL(
    updateDonationsWaitlistQuery,
    "UpdateWaitlistDonations",
    {
      id,
      donations,
    }
  );
}

export async function sendEmail(template, email, jwt, linkDomain) {
  if (linkDomain.includes("localhost")) {
    const link = `http://${linkDomain}/roadmap#waitlist?token=${jwt}`;
    console.log({ link, template, email });
    return { ok: true };
  } else {
    const link = `https://${linkDomain}/roadmap#waitlist?token=${jwt}`;
    return await postmarkClient.sendEmail({
      From: "hello@thestoryengine.co.uk",
      To: email,
      Subject: "Please Confirm your Address!",
      HtmlBody: `<strong>Template:</strong> ${template}, <a href="${link}" target="_blank">link!</a>`,
      TextBody: `template: ${template}, link: ${link}`,
      MessageStream: "outbound",
    });
  }
}

export async function sendTemplateEmail(
  template,
  email,
  jwt,
  linkDomain,
  templateModel
) {
  const link = `http://${linkDomain}/roadmap#waitlist?token=${jwt}`;
  if (linkDomain.includes("localhost")) {
    console.log({ link, template, email });
    return { ok: true };
  } else {
    return await postmarkClient.sendEmailWithTemplate({
      TemplateAlias: template,
      TemplateModel: {
        action_url: link,
        ...templateModel,
      },
      From: "hello@thestoryengine.co.uk",
      To: email,
      MessageStream: "outbound",
    });
  }
}
