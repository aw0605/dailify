import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import ModalContainer from "@/components/common/ui/Modal/Modal";

export const metadata: Metadata = {
  title: "Dailify",
  description: "Dailify에서 매일을 간단하고 명확하게 계획하세요.",
  icons: {
    icon: "/Dailify.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ModalContainer />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
