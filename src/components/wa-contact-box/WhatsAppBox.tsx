import { useState } from "react";
import { useTimeTable } from "./useTimeTable";
import { useWhatsAppContactContext } from "../WhatsAppContact";
import { translations } from "@/translation";
import { CloseButton } from "./CloseButton";
import { WhatsAppIcon } from "../wa-contact-icon";
import "./WhatsAppBox.css";
import boxBg from "../../assets/background.png";

export function WhatsAppBox() {
  const { isOpenNow, getTimeTableString } = useTimeTable();
  const { setIsOpen, config } = useWhatsAppContactContext();
  const [isToBeClosed, setIsToBeClosed] = useState(false);

  const {
    alignLeft,
    businessPhone,
    businessName,
    businessImage,
    fillColor,
    fontFamily,
    iconFillColor,
    language,
    marginBottom,
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

    window.open(url, "_blank", "noreferrer");
  }

  const cssVars = {
    "--wac__font-family": fontFamily,
    "--wac__text-color": textColor,
    "--wac__box-title-color": titleTextColor,
    "--wac__box-bg-color": fillColor,
    "--wac__box-icon-bg-color": iconFillColor,
    "--wac__margin-bottom": marginBottom,
  } as React.CSSProperties;

  return (
    <section
      style={cssVars}
      className={`wac__box ${
        isToBeClosed ? "wac__box_closed" : "wac__box_opened"
      } ${alignLeft ? "wac__box_left" : "wac__box_right"}`}
    >
      <div className="wac__box_title">
        <img
          className="wac__box_title_image"
          src={businessImage}
          alt={businessName[0]}
        />
        <p className="wac__box_title_text" data-testid="wac-title">
          {businessName}
        </p>
        <CloseButton
          title={translations[language].closeButtonAlt}
          className="wac__close_button"
          onClick={handleBoxClose}
        />
      </div>
      <div
        className="wac__box_body"
        data-testid="wac-body"
        style={{ backgroundImage: `url(${boxBg})` }}
      >
        <div className="wac__box_body_dialog">
          {isOpenNow(timeTable) ? (
            <p className="phone" onClick={openWhatsApp}>
              <WhatsAppIcon className="icon" />
              {businessName}
            </p>
          ) : (
            <div className="wac__not_available">
              <p><strong>{title}</strong></p>
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
      </div>
    </section>
  );
}
