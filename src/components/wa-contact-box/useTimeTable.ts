import { translations } from "@/translation";
import type { WhatsAppContactProps } from "../../types";

export function useTimeTable() {
  function isOpenToday(timeTable: WhatsAppContactProps["timeTable"]) {
    const now = new Date();

    const businessToday = new Date(
      now.toLocaleString("en-US", { timeZone: timeTable.timeZone })
    ).getDay();

    if (timeTable.type === "everyDay") return true;
    if (timeTable.type === "businessDays" && ![0, 6].includes(businessToday))
      return true;
    if (
      timeTable.type === "specificDays" &&
      timeTable.days.includes(businessToday)
    )
      return true;
    return false;
  }

  function isOpenNow(timeTable: WhatsAppContactProps["timeTable"]) {
    if (!isOpenToday(timeTable)) return false;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: userTimeZone })
    );

    let isOpen = false;
    getBusinessOpenTimes(timeTable).forEach(time => {
      if (userDate.getTime() >= time.start && userDate.getTime() <= time.end)
        isOpen = true;
    });
    return isOpen;
  }

  function getBusinessOpenTimes(timeTable: WhatsAppContactProps["timeTable"]) {
    const businessDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: timeTable.timeZone })
    );
    return timeTable.schedule.map(schedule => ({
      start: new Date(businessDate).setHours(
        schedule.start.hour,
        schedule.start.minute
      ),
      end: new Date(businessDate).setHours(
        schedule.end.hour,
        schedule.end.minute
      ),
    }));
  }

  function getTimeTableString(
    timeTable: WhatsAppContactProps["timeTable"],
    locale: WhatsAppContactProps["language"] = "en-US"
  ) {
    return {
      title: isOpenNow(timeTable)
        ? translations[locale].available
        : translations[locale].notAvailable,
      timeTableTitle: `${translations[locale].ourTimeTable}`,
      timeTableSubtitle: `${getOpenDays(timeTable, locale)} ${getOpenHours(
        timeTable,
        locale
      )}`,
    };
  }

  function getOpenDays(
    timeTable: WhatsAppContactProps["timeTable"],
    locale: WhatsAppContactProps["language"] = "en-US"
  ) {
    if (timeTable.type === "everyDay") return translations[locale].everyDay;
    if (timeTable.type === "businessDays")
      return translations[locale].businessDays;
    if (timeTable.type === "specificDays") {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return `<span class="strong">${timeTable.days
        .map(day =>
          new Intl.DateTimeFormat(locale, {
            timeZone: userTimeZone,
            weekday: "long",
          }).format(new Date().setDate(day))
        )
        .join(", ")}</span>`;
    }
  }

  function getOpenHours(
    timeTable: WhatsAppContactProps["timeTable"],
    locale: WhatsAppContactProps["language"] = "en-US"
  ) {
    return getBusinessOpenTimes(timeTable)
      .map(time => {
        return `${
          translations[locale].from
        } <span class="strong">${new Intl.DateTimeFormat(locale, {
          timeZone: timeTable.timeZone,
          timeStyle: "short",
        }).format(new Date(time.start))}</span> ${
          translations[locale].to
        } <span class="strong">${new Intl.DateTimeFormat(locale, {
          timeZone: timeTable.timeZone,
          timeStyle: "short",
        }).format(new Date(time.end))}</span>`;
      })
      .join(", ");
  }

  return {
    isOpenToday,
    isOpenNow,
    getTimeTableString,
  };
}
