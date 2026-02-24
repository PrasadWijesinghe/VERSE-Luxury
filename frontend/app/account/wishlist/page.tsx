import AccountSectionPlaceholderClient from "@/components/account/AccountSectionPlaceholderClient";

export const metadata = {
  title: "Wishlist | VERSE",
};

export default function WishlistPage() {
  return (
    <AccountSectionPlaceholderClient
      title="My Wishlist"
      subtitle="Your saved favorites"
      emptyMessage="No wishlist items found for this account yet."
    />
  );
}
