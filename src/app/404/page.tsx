import NotFound from "../not-found";

export const metadata = {
  title: "404 Not Found",
  description: "The requested route does not exist in the DSM design system registry.",
};

export default function Explicit404Page() {
  return <NotFound />;
}
