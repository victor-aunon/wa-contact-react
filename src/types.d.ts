type Schedule = {
  start: { hour: number; minute: number };
  end: { hour: number; minute: number };
};

export type SpecificDays = {
  type: "specificDays";
  days: number[]; // 0 = Sunday, 6 = Saturday
  schedule: Schedule[];
  timeZone: string;
};

export type BusinessDays = {
  type: "businessDays";
  schedule: Schedule[];
  timeZone: string;
};

export type EveryDay = {
  type: "everyDay";
  schedule: Schedule[];
  timeZone: string;
};

export type WhatsAppContactProps = {
  businessName: string;
  businessPhone: string;
  timeTable: SpecificDays | BusinessDays | EveryDay;
  language: "es-ES" | "en-US";
  availableText?: string;
  notAvailableText?: string;
  showAlwaysPhone?: boolean;
  fontFamily?: string;
  iconSize?: string;
  fillColor?: string;
  borderColor?: string;
  titleTextColor?: string;
  textColor?: string;
};

