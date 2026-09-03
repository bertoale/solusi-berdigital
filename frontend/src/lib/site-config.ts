export const SITE_CONFIG = {
  whatsapp: process.env.WHATSAPP || process.env.NEXT_PUBLIC_WHATSAPP || "6285858089376",
  email: process.env.EMAIL || process.env.NEXT_PUBLIC_EMAIL || "bertoale.dev@gmail.com",

  getWhatsappUrl(message?: string) {
    const rawNumber = this.whatsapp.replace(/[^0-9]/g, "");
    if (!message) {
      return `https://wa.me/${rawNumber}`;
    }
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  },

  getMailtoUrl(subject?: string) {
    if (!subject) {
      return `mailto:${this.email}`;
    }
    return `mailto:${this.email}?subject=${encodeURIComponent(subject)}`;
  },
};
