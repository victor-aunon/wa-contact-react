import type { WhatsAppContactProps } from "@/types";

export const minimalConfigTest: WhatsAppContactProps = {
  businessName: "Test",
  businessPhone: "123456789",
  timeTable: {
    type: "everyDay",
    schedule: [
      {
        start: {hour: 9, minute: 0},
        end: {hour: 17, minute: 0},
      },
    ],
    timeZone: "America/New_York",
  },
  language: "en-US",
}