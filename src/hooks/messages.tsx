import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Subscription } from "rxjs";
import { Message, Priority } from "../@types";
import generateMessage from "../services/Api";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

interface MessageContextData {
  errorMessages: Message[];
  warningMessages: Message[];
  infoMessages: Message[];
  isSubscribed: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
  removeMessage: (messageID: string) => void;
  clearMessages: () => void;
  subscribe: () => void;
  unsubscribe: () => void;
}

const MessageContext = createContext<MessageContextData>(
  {} as MessageContextData
);

const MessageProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [snackbarMessage, setSnackBarMessage] = useState<Message>();
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [subscription, setSubscription] = useState<Subscription>(
    {} as Subscription
  );

  const errorMessages = useMemo(
    () => messages.filter((message) => message.priority === Priority.Error),
    [messages]
  );

  const warningMessages = useMemo(
    () => messages.filter((message) => message.priority === Priority.Warn),
    [messages]
  );

  const infoMessages = useMemo(
    () => messages.filter((message) => message.priority === Priority.Info),
    [messages]
  );

  const removeMessage = useCallback((messageID: string) => {
    setMessages((oldMessages) =>
      oldMessages.filter((message) => message.id !== messageID)
    );
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const unsubscribe = useCallback(() => {
    subscription.unsubscribe();
    setIsSubscribed(false);
  }, [subscription]);

  const subscribe = useCallback(() => {
    const newSubscription = generateMessage((message: Message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
      message.priority === Priority.Error && setSnackBarMessage(message);
    });

    setSubscription(newSubscription);
    setIsSubscribed(true);
  }, []);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarMessage(undefined);
  };

  const handleExited = () => {
    setSnackBarMessage(undefined);
  };

  useEffect(() => {
    subscribe();
  }, [subscribe]);

  return (
    <MessageContext.Provider
      value={{
        errorMessages,
        warningMessages,
        infoMessages,
        isSubscribed,
        setMessages,
        removeMessage,
        clearMessages,
        setIsSubscribed,
        subscribe,
        unsubscribe,
      }}
    >
      {snackbarMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          key={snackbarMessage.id}
          open={!!snackbarMessage}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          TransitionProps={{ onExited: handleExited }}
          message={snackbarMessage.message}
          action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={handleCloseSnackbar}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert
            icon={false}
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%", color: "#000", background: "#F56236" }}
          >
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      )}

      {children}
    </MessageContext.Provider>
  );
};

function useMessages(): MessageContextData {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
}

export { MessageProvider, useMessages };
