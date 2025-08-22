export const metadata = {
  title: {
    template: "%s | IPlayMusic",
    default: "IPlayMusic"
  },
  description: "Musica Musica Musica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}