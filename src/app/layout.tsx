import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dailify",
  description: "Dailify에서 매일을 간단하고 명확하게 계획하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
