export const contactCategories = [
  "General enquiry",
  "Student concern",
  "Event suggestion",
  "Outreach collaboration",
  "Opportunities",
  "Privacy or photo request",
] as const;

export type ContactCategory = (typeof contactCategories)[number];

export function isContactCategory(value: unknown): value is ContactCategory {
  return typeof value === "string" && contactCategories.some(category => category === value);
}
