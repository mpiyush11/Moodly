import { BRAND } from "../data/products";

const WA_BASE = `https://wa.me/${BRAND.whatsappNumber}`;

export function waLink(text: string): string {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

export function productOrderText(name: string, color: string, size: string, price: number): string {
  return [
    "Hi Moodly — I'd like to order:",
    `• Product: ${name}`,
    `• Color: ${color}`,
    `• Size: ${size}`,
    `• Price: ₹${price}`,
    "Delivery: Jaipur pickup / Ship pan-India (tell me cost)",
    "Please confirm availability and payment (UPI).",
  ].join("\n");
}

export const headerChatText = ["Hi Moodly", "I have a question about the drop."].join("\n");

export function printYourMoodText(color: string, size: string, placement: string): string {
  return [
    "Hi Moodly — Print Your Mood",
    `Size: ${size}`,
    `Color: ${color}`,
    `Placement: ${placement}`,
    "(I will send the file next.)",
  ].join("\n");
}
