import type { WhatsAppContactProps } from "./types";

type TranslationKeys = 'available' | 'businessDays' | 'closeButtonAlt' | 'everyDay' | 'from' | 'notAvailable' | 'ourTimeTable' | 'to';

export const translations: Record<WhatsAppContactProps["language"], Record<TranslationKeys, string>> = {
  'es-ES' : {
    available: "Hola, estamos disponibles en WhatsApp para ayudarte",
    businessDays: "Días laborables",
    closeButtonAlt: 'Cerrar',
    everyDay: "Todos los días",
    from: 'de',
    notAvailable: "Ahora no estamos disponibles",
    ourTimeTable: "Nuestro horario de atención es:",
    to: 'a',
  },
  'en-US': {
    available: 'Hi, we are available on WhatsApp to help you',
    businessDays: "Weekdays",
    closeButtonAlt: 'Close',
    everyDay: "Every day",
    from: 'from',
    notAvailable: 'Now we are not available',
    ourTimeTable: "Our opening hours are:",
    to: 'to',
  }
}