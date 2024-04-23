import type { WhatsAppContactProps } from "./types";

type TranslationKeys = 'available' | 'businessDays' | 'closeButtonAlt' | 'everyDay' | 'from' | 'notAvailable' | 'openButtonAlt' | 'ourTimeTable' | 'to';

export const translations: Record<WhatsAppContactProps["language"], Record<TranslationKeys, string>> = {
  'es-ES' : {
    available: "Hola, estamos disponibles en WhatsApp para ayudarte",
    businessDays: "Días laborables",
    closeButtonAlt: 'Cerrar ventana de WhatsApp',
    everyDay: "Todos los días",
    from: 'de',
    notAvailable: "Ahora no estamos disponibles",
    openButtonAlt: 'Abrir ventana de WhatsApp',
    ourTimeTable: "Nuestro horario de atención es:",
    to: 'a',
  },
  'en-US': {
    available: 'Hi, we are available on WhatsApp to help you',
    businessDays: "Weekdays",
    closeButtonAlt: 'Close WhatsApp window',
    everyDay: "Every day",
    from: 'from',
    notAvailable: 'Now we are not available',
    openButtonAlt: 'Open WhatsApp window',
    ourTimeTable: "Our opening hours are:",
    to: 'to',
  }
}