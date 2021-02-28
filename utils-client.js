import { useEffect, useMemo, useState } from "react";
import { Ulid } from "id128";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
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

/**
 *
 * Initialize story state from localStorage
 *
 * @return {[string, function]}
 *
 * @example
 *
 *  const [ story, setStory ] = useUserStory();
 *
 */
export const useUserStory = () => {
  const [story, setStory] = useState({
    title: "",
    text: "",
  });

  const setNewStory = () => {
    const newStory = {
      id: Ulid.generate(),
      title: "",
      text: "",
    };
    sessionStorage.setItem("tseStory", JSON.stringify(newStory));
    setStory(newStory);
  };

  // get story from localStorage, get new if none found
  useEffect(() => {
    const existingStory = JSON.parse(sessionStorage.getItem("tseStory"));
    if (!existingStory || !existingStory.id) {
      setNewStory();
    } else {
      setStory(existingStory);
    }
  }, []);
  return {
    story,
    updateStory: ({ title = story.title, text = story.text }) => {
      window.tseSafeUnload = false;
      const updatedStory = {
        id: story.id,
        title,
        text,
      };
      sessionStorage.setItem("tseStory", JSON.stringify(updatedStory));
      setStory(updatedStory);
    },
    resetStory: () => {
      sessionStorage.removeItem("tseStory");
      setNewStory();
    },
  };
};

const initInspiration = [
  "Hi, I'm the Inspirational Jellyfish.",
  "I've got lots of ideas to help with your writing, tap Inspire me to get one.",
];

const MAX_MESSAGES = 20;

export const useChatMessages = () => {
  const [messages, setStateMessages] = useState([]);
  const pushNewMessage = (newMessage, callback) => {
    setStateMessages((messages = []) => {
      let updatedMessages = [...messages, newMessage];
      updatedMessages = updatedMessages.slice(
        Math.max(updatedMessages.length - MAX_MESSAGES, 0)
      );
      updatedMessages = updatedMessages.sort((message1, message2) => {
        return message1.sentMs - message2.sentMs;
      });
      requestAnimationFrame(() =>
        sessionStorage.setItem("tseChat", JSON.stringify(updatedMessages))
      );
      return updatedMessages;
    }, callback);
  };
  useEffect(() => {
    migrate();
    let existingMessages = JSON.parse(
      sessionStorage.getItem("tseChat") || "false"
    );
    if (!existingMessages) {
      existingMessages = initInspiration.map((text, index) => ({
        message: { text },
        from: { name: "Jellyfish", id: "jellyfish" },
        sentMs: index,
      }));
    }
    existingMessages = existingMessages.slice(
      Math.max(existingMessages.length - MAX_MESSAGES, 0)
    );
    existingMessages = existingMessages.sort((message1, message2) => {
      return message1.sentMs - message2.sentMs;
    });
    sessionStorage.setItem("tseChat", JSON.stringify(existingMessages));
    setStateMessages(existingMessages);
  }, []);
  const pushWriterMessage = (messageText, callback) => {
    pushNewMessage(
      {
        message: { text: messageText },
        from: { name: "Writer", id: "writer" },
        sentMs: Date.now(),
      },
      callback
    );
  };
  const pushJellyMessage = (messageText, callback) => {
    pushNewMessage(
      {
        message: { text: messageText },
        from: { name: "Jellyfish", id: "jellyfish" },
        sentMs: Date.now(),
      },
      callback
    );
  };
  return { messages, pushJellyMessage, pushWriterMessage };
};

export function useIsTyping({ title, text }) {
  const testText = title + text;
  const debouncedText = useDebounce(testText, 500);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(
    () => {
      if (debouncedText != testText) {
        if (!isTyping) {
          setIsTyping(true);
        }
      } else {
        if (isTyping) {
          setIsTyping(false);
        }
      }
    },
    [testText, debouncedText] // Only call effect if debounced story changes
  );
  return isTyping;
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useInspirations() {
  const [inspirations, setInspirations] = useState(null);
  useEffect(() => {
    fetch("/jelly-inspirations.json")
      .then((response) => response.json())
      .then(setInspirations);
  }, []);
  return inspirations;
}

let shuffledJellyInspirations = [];

export function useGetInspiration() {
  const jellyInspirations = useInspirations();
  return jellyInspirations
    ? () => {
        if (!shuffledJellyInspirations.length) {
          shuffledJellyInspirations = shuffleArray([...jellyInspirations]);
        }

        return shuffledJellyInspirations.pop();
      }
    : null;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const modernCopy = ({ text = "", title = "" }) => {
  return navigator.clipboard.writeText(
    `${title}${title && "\n\n\n"}${
      text && text
    }\n\n\nWritten on thestoryengine.co.uk`
  );
};

export const legacyCopy = () => {
  var copyText = document.querySelector("#story-text");
  copyText.select();
  document.execCommand("copy");
};

export const copy = async (story) => {
  if (navigator.clipboard) {
    await modernCopy(story);
  } else {
    legacyCopy();
  }
};

export const useJellyfish = (pushJellyMessage, wiggleControls) => {
  const [isPendingInspiration, setIsPendingInspiration] = useState(false);
  const getInspiration = useGetInspiration();

  useEffect(() => {
    if (isPendingInspiration) {
      const wiggleTimeout = setTimeout(() => {
        wiggleControls.start("wiggle");
      }, 550);
      const timeout = setTimeout(() => {
        const newInspiration = getInspiration();
        pushJellyMessage(newInspiration.text);
        setIsPendingInspiration(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
        clearTimeout(wiggleTimeout);
      };
    }
  }, [isPendingInspiration]);

  return {
    isPendingInspiration,
    inspireMe: () => setIsPendingInspiration(true),
  };
};

const v1InspirationToV2ChatMessages = (inspiration) => {
  const existingMessages = initInspiration.map((text, index) => ({
    message: { text },
    from: { name: "Jellyfish", id: "jellyfish" },
    sentMs: Date.now() + index,
  }));
  existingMessages.push({
    message: { text: "Inspire me!" },
    from: { name: "Writer", id: "writer" },
    sentMs: Date.now() + 10,
  });
  existingMessages.push({
    message: { text: inspiration },
    from: { name: "Jellyfish", id: "jellyfish" },
    sentMs: Date.now() + 20,
  });
  return existingMessages;
};

const checkForV1Storage = () => {
  const story = JSON.parse(localStorage.getItem("tseStory"));
  return !!(
    (typeof story?.title === "string" && story?.title?.length) ||
    (typeof story?.text === "string" && story?.text?.length) ||
    (typeof story?.inspiration === "string" && story?.inspiration?.length)
  );
};

const popV1Story = () => {
  const story = JSON.parse(localStorage.getItem("tseStory"));
  localStorage.removeItem("tseStory");
  return story;
};

export const migrate = () => {
  const hasV1Storage = checkForV1Storage();
  if (hasV1Storage) {
    const existingStory = popV1Story();
    if (
      typeof existingStory?.inspiration === "string" &&
      existingStory?.inspiration?.length
    ) {
      const chatMessages = v1InspirationToV2ChatMessages(
        existingStory.inspiration
      );
      sessionStorage.setItem("tseChat", JSON.stringify(chatMessages));
    } else {
      if (localStorage.getItem("tseChat")) {
        sessionStorage.setItem("tseChat", localStorage.getItem("tseChat"));
        localStorage.removeItem("tseChat");
      }
    }
    if (
      (typeof existingStory?.title === "string" &&
        existingStory?.title?.length) ||
      (typeof existingStory?.text === "string" && existingStory?.text?.length)
    ) {
      delete existingStory.inspiration;
      sessionStorage.setItem("tseStory", JSON.stringify(existingStory));
    }
  }
};

export const getStripeIntent = async ({ amount, email }) => {
  const response = await fetch("/api/donate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      email,
    }),
  });
  return response.json();
};

export const joinWaitlist = async ({ email }) => {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lists: ["launch"],
      email,
    }),
  });
  return response.json();
};

export const useCreateWaitlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(joinWaitlist, {
    onSuccess: (result) => queryClient.setQueryData("waitlistEmail", result),
  });
};

const directGraphQLQuery = async (query, token, variables = {}) => {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return response.json();
};

export const useWaitlistToken = () => {
  const [token, setToken] = useState();
  let router = useRouter();
  useEffect(() => {
    let existingToken = router?.query?.token;
    if (typeof window !== "undefined") {
      if (existingToken) {
        window.sessionStorage.setItem("tseWaitlistToken", existingToken);
      } else {
        existingToken = window.sessionStorage.getItem("tseWaitlistToken");
      }
    }
    setToken(existingToken);
  }, []);
  return token;
};

const confirmWaitlist = async (id) => {
  const token = window.sessionStorage.getItem("tseWaitlistToken");
  const response = await directGraphQLQuery(confirmWaitlistQuery, token, {
    id,
  });
  return response?.data?.update_waitlist_by_pk;
};

export const useConfirmWaitlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation("confirmWaitlist", confirmWaitlist, {
    onSuccess: (result) => queryClient.setQueryData("waitlist", result),
  });
};

export const useWaitlistQuery = () => {
  const token = useWaitlistToken();
  return useQuery(
    "waitlist",
    async () => {
      const response = directGraphQLQuery(waitlistQuery, token);
      return response?.data?.waitlist[0];
    },
    { enabled: !!token }
  );
};

export const useWaitlistEmailQuery = () => {
  return useQuery("waitlistEmail", () => null, { enabled: false });
};
