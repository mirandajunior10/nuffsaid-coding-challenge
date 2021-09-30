import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useCallback } from "react";

import { useMessages } from "../../hooks/messages";
import {
  Container,
  Header,
  MainButtonsContainer,
  MessagesContainer,
  ErrorCards,
  WarningCards,
  InfoCards,
  CustomCardActions,
} from "./styles";

const App: React.FC<{}> = () => {
  const {
    errorMessages,
    warningMessages,
    infoMessages,
    isSubscribed,
    removeMessage,
    clearMessages,
    unsubscribe,
    subscribe,
  } = useMessages();
  const toggleSubscription = useCallback(() => {
    isSubscribed ? unsubscribe() : subscribe();
  }, [isSubscribed, subscribe, unsubscribe]);

  return (
    <Container>
      <Header>nuffsaid.com Coding Challenge</Header>
      <MainButtonsContainer>
        <Button
          color="success"
          variant="contained"
          onClick={() => toggleSubscription()}
        >
          <Typography variant="button" fontWeight="bold" color="black">
            {isSubscribed ? "Stop" : "Start"}
          </Typography>
        </Button>
        <Button variant="contained" onClick={() => clearMessages()}>
          <Typography variant="button" fontWeight="bold" color="black">
            Clear
          </Typography>
        </Button>
      </MainButtonsContainer>

      <MessagesContainer>
        <ErrorCards>
          <Typography variant="h4">Error type 1</Typography>
          <Typography variant="subtitle1">
            Count {errorMessages.length}
          </Typography>
          {errorMessages.map((msg) => (
            <Card key={msg.id}>
              <CardContent>{msg.message}</CardContent>
              <CustomCardActions>
                <Button size="small" onClick={() => removeMessage(msg.id)}>
                  <Typography variant="subtitle2" color="black">
                    Clear
                  </Typography>
                </Button>
              </CustomCardActions>
            </Card>
          ))}
        </ErrorCards>

        <WarningCards>
          <Typography variant="h4">Warning type 2</Typography>
          <Typography variant="subtitle1">
            Count {warningMessages.length}
          </Typography>
          {warningMessages.map((msg) => (
            <Card key={msg.id}>
              <CardContent>{msg.message}</CardContent>
              <CustomCardActions>
                <Button size="small" onClick={() => removeMessage(msg.id)}>
                  <Typography variant="subtitle2" color="black">
                    Clear
                  </Typography>
                </Button>
              </CustomCardActions>
            </Card>
          ))}
        </WarningCards>

        <InfoCards>
          <Typography variant="h4">Info type 3</Typography>
          <Typography variant="subtitle1">
            Count {infoMessages.length}
          </Typography>

          {infoMessages.map((msg) => (
            <Card key={msg.id}>
              <CardContent>{msg.message}</CardContent>
              <CustomCardActions>
                <Button size="small" onClick={() => removeMessage(msg.id)}>
                  <Typography variant="subtitle2" color="black">
                    Clear
                  </Typography>
                </Button>
              </CustomCardActions>
            </Card>
          ))}
        </InfoCards>
      </MessagesContainer>
    </Container>
  );
};

export default App;
