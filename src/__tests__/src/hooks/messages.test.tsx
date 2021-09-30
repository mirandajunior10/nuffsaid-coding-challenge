import { act, renderHook } from "@testing-library/react-hooks";
import { Priority } from "../../../@types";

import { MessageProvider, useMessages } from "../../../hooks/messages";

jest.setTimeout(8000);
describe("Messages Hook", () => {
  it("should be able to filter messages", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMessages(), {
      wrapper: MessageProvider,
    });
    await act(async () => {
      await waitForNextUpdate({ timeout: 3000 });
    });

    expect(
      result.current.errorMessages.every(
        (message) => message.priority === Priority.Error
      )
    ).toEqual(true);
    expect(
      result.current.warningMessages.every(
        (message) => message.priority === Priority.Warn
      )
    ).toEqual(true);
    expect(
      result.current.infoMessages.every(
        (message) => message.priority === Priority.Info
      )
    ).toEqual(true);
  });
  it("should be able to clear messages", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMessages(), {
      wrapper: MessageProvider,
    });

    await act(async () => {
      await waitForNextUpdate({ timeout: 3000 });
      result.current.clearMessages();
    });
    expect(result.current.errorMessages).toEqual([]);
    expect(result.current.warningMessages).toEqual([]);
    expect(result.current.infoMessages).toEqual([]);
  });
  it("should be able to clear one message", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMessages(), {
      wrapper: MessageProvider,
    });
    await act(async () => {
      await waitForNextUpdate({ timeout: 3000 });
      const fakeId =
        result.current.errorMessages[0]?.id ??
        result.current.warningMessages[0]?.id ??
        result.current.warningMessages[0]?.id;

      result.current.removeMessage(fakeId);
      await waitForNextUpdate({ timeout: 3000 });

      expect(result.current.errorMessages).toEqual(
        result.current.errorMessages.filter((message) => message.id !== fakeId)
      );
      expect(result.current.warningMessages).toEqual(
        result.current.warningMessages.filter(
          (message) => message.id !== fakeId
        )
      );
      expect(result.current.infoMessages).toEqual(
        result.current.infoMessages.filter((message) => message.id !== fakeId)
      );
    });
  });
  it("should be subscribed on first render", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMessages(), {
      wrapper: MessageProvider,
    });

    await act(async () => {
      await waitForNextUpdate({ timeout: 3000 });
      expect(result.current.isSubscribed).toBe(true);
    });
  });
  it("should be able to unsubscribe", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMessages(), {
      wrapper: MessageProvider,
    });

    await act(async () => {
      result.current.unsubscribe();
      await waitForNextUpdate({ timeout: 3000 });
      expect(result.current.isSubscribed).toBe(false);
    });
  });
});
