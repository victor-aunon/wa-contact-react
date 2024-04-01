import { useState } from "react";
import { useTimeTable } from "./useTimeTable";
import { useWhatsAppContactContext } from "../WhatsAppContact";
import { translations } from "@/translation";
import { CloseButton } from "./CloseButton";
import { WhatsAppIcon } from "../wa-contact-icon";
import "./WhatsAppBox.css";

export function WhatsAppBox() {
  const { isOpenNow, getTimeTableString } = useTimeTable();
  const { setIsOpen, config } = useWhatsAppContactContext();
  const [isToBeClosed, setIsToBeClosed] = useState(false);

  const {
    businessPhone,
    businessName,
    fillColor,
    fontFamily,
    language,
    showAlwaysPhone,
    textColor,
    timeTable,
    titleTextColor,
  } = config;

  const { title, timeTableTitle, timeTableSubtitle } = getTimeTableString(
    timeTable,
    language
  );

  function handleBoxClose() {
    setIsToBeClosed(true);
    setTimeout(() => setIsOpen(false), 500);
  }

  function openWhatsApp() {
    let url = "";
    if (navigator.userAgent.toLowerCase().includes("win"))
      url = `whatsapp://send/?phone=${businessPhone}`;
    else url = `https://wa.me/${businessPhone}`;
    console.log(url);

    window.open(url, "_blank", "noreferrer");
  }

  const cssVars = {
    "--wac__font-family": fontFamily,
    "--wac__text-color": textColor,
    "--wac__box-title-color": titleTextColor,
    "--wac__box-bg-color": fillColor,
  } as React.CSSProperties;

  return (
    <section
      style={cssVars}
      className={`wac__box ${
        isToBeClosed ? "wac__box_closed" : "wac__box_opened"
      }`}
    >
      <div className="wac__box_title">
        <CloseButton
          title={translations[language].closeButtonAlt}
          className="wac__close_button"
          onClick={handleBoxClose}
        />
        <p className="wac__box_title_text">{title}</p>
      </div>
      <div className="wac__box_body">
        {isOpenNow(timeTable) ? (
          <p className="phone" onClick={openWhatsApp}>
            <WhatsAppIcon className="icon" />
            {businessName}
          </p>
        ) : (
          <div className="wac__not_available">
            <p>{timeTableTitle}</p>
            <p dangerouslySetInnerHTML={{ __html: timeTableSubtitle }} />
            {showAlwaysPhone && (
              <p className="phone" onClick={openWhatsApp}>
                <WhatsAppIcon className="icon" />
                {businessName}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
