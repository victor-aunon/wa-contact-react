import { createContext, useContext, useState } from "react";
import { WhatsAppIcon } from "./wa-contact-icon";
import { WhatsAppBox } from "./wa-contact-box";
import { config } from "@/config";
import { translations } from "@/translation";
import type { WhatsAppContactProps } from "../types";
import "./index.css"

type WhatsAppContactContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  config: WhatsAppContactProps;
};

const WhatsAppContactContext = createContext<WhatsAppContactContextType | null>(
  null
);

export function WhatsAppContact({
  businessName,
  businessPhone,
  timeTable,
  language,
  availableText = translations[language].available,
  notAvailableText = translations[language].notAvailable,
  alignLeft = config.alignLeft,
  borderColor = config.borderColor,
  fillColor = config.fillColor,
  fontFamily = config.fontFamily,
  iconSize = config.iconSize,
  marginBottom = config.marginBottom,
  showAlwaysPhone = false,
  textColor = config.textColor,
  titleTextColor = config.titleTextColor,
}: WhatsAppContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contextConfig = {
    businessName,
    businessPhone,
    timeTable,
    language,
    availableText,
    notAvailableText,
    alignLeft,
    borderColor,
    fillColor,
    fontFamily,
    iconSize,
    marginBottom,
    showAlwaysPhone,
    textColor,
    titleTextColor,
  };

  return (
    <WhatsAppContactContext.Provider
      value={{ isOpen, setIsOpen, config: contextConfig }}
    >
      {isOpen ? (
        <WhatsAppBox />
      ) : (
        <WhatsAppIcon onClick={() => setIsOpen(true)} />
      )}
    </WhatsAppContactContext.Provider>
  );
}

export function useWhatsAppContactContext() {
  const context = useContext<WhatsAppContactContextType | null>(
    WhatsAppContactContext
  );
  if (!context)
    throw new Error(
      "useWhatsAppContactContext must be used within a WhatsAppContact"
    );

  return context;
}
