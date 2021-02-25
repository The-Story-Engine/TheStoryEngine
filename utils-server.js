const graphqlUrl = "http://localhost:8080/v1/graphql";
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
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    }),
  });

  return await result.json();
}
export async function fetchUserGraphQL(
  operationsDoc,
  operationName,
  variables,
  jwt
) {
  const result = await fetch(graphqlUrl, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: new Headers({
      Authorization: `Bearer ${jwt}`,
    }),
  });

  return await result.json();
}

const waitlistQuery = `
    query Waitlist {
      waitlist {
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

export function fetchUserWaitlist(jwt) {
  return fetchUserGraphQL(waitlistQuery, "Waitlist", {}, jwt);
}

const waitlistEmailQuery = `
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

export function fetchEmailWaitlist(email) {
  return fetchAdminGraphQL(waitlistEmailQuery, "WaitlistByEmail", { email });
}

const insertWaitlistQuery = `
mutation InsertWaitlist($email: String!, $lists: _text, $donations:jsonb) {
    insert_waitlist_one(object: {email: $email, lists: $lists, donations: $donations}) {
      id
    }
  }
`;

const arrayToHasuraList = (strings) => `{${strings.join(",")}}`;

export function insertUnconfirmedWaitlist(email, lists = [], donations = []) {
  return fetchAdminGraphQL(insertWaitlistQuery, "InsertWaitlist", {
    email,
    lists: arrayToHasuraList(lists),
    donations,
  });
}

const deleteInsertWaitlistQuery = `
mutation DeleteInsertWaitlist($email: String!, $lists: _text, $donations: jsonb, $existingId: uuid!) {
    delete_waitlist_by_pk(id: $existingId) {
      id
    }
    insert_waitlist_one(object: {email: $email, lists: $lists, donations: $donations}) {
      id
    }
  }
`;

export function deleteExistingInsertNewWaitlist({
  existingId,
  email,
  lists,
  donations,
}) {
  return fetchAdminGraphQL(deleteInsertWaitlistQuery, "DeleteInsertWaitlist", {
    email,
    lists: arrayToHasuraList(lists),
    donations,
    existingId,
  });
}

const confirmWaitlistQuery = `
mutation ConfirmWaitlist ($id: uuid!) {
    update_waitlist_by_pk(pk_columns: {id: $id}, _set: {confirmed: true}) {
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

export function confirmUserWaitlist(jwt, id) {
  return fetchUserGraphQL(confirmWaitlistQuery, "ConfirmWaitlist", { id }, jwt);
}

var postmark = require("postmark");
var client = new postmark.ServerClient(process.env.POSTMARK_KEY);

export async function sendEmail(template, email, jwt) {
  const link = `http://localhost:3000/api/waitlist/confirm?token=${jwt}`;

  client.sendEmail({
    From: "hello@thestoryengine.co.uk",
    To: email,
    Subject: "Please Confirm your Address!",
    HtmlBody: `<strong>Template:</strong> ${template}, <a href="${link}" target="_blank">link!</a>`,
    TextBody: `template: ${template}, link: ${link}`,
    MessageStream: "outbound",
  });
}
