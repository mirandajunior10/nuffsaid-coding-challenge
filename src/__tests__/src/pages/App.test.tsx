import React from "react";
import { fireEvent, getByText, render, waitFor } from "@testing-library/react";
import App from "../../../pages/App";

let mockSubscription = true;

jest.mock("../../../hooks/messages", () => {
  return {
    useMessages: () => ({
      isSubscribed: mockSubscription,
      unsubscribe: () => (mockSubscription = false),
      subscribe: () => (mockSubscription = true),
      errorMessages: [],
      warningMessages: [],
      infoMessages: [],
    }),
  };
});

describe("Main page", () => {
  beforeEach(() => {
    mockSubscription = true;
  });
  it("should be able to unsubscribe", async () => {
    const { getByText, rerender } = render(<App />);
    const stopSubscriptionButton = getByText("Stop");
    fireEvent.click(stopSubscriptionButton);
    rerender(<App />);
    const startSubscriptionButton = getByText("Start");
    await waitFor(() =>
      expect(startSubscriptionButton.innerHTML).toBe("Start")
    );
  });
  it("should be able to subscribe", async () => {
    const { getByText, rerender } = render(<App />);
    const stopSubscriptionButton = getByText("Stop");
    fireEvent.click(stopSubscriptionButton);
    rerender(<App />);

    const startSubscriptionButton = getByText("Start");
    fireEvent.click(startSubscriptionButton);
    rerender(<App />);

    const reRenderedSubscriptionButton = getByText("Stop");
    await waitFor(() =>
      expect(reRenderedSubscriptionButton.innerHTML).toBe("Stop")
    );
  });
});
