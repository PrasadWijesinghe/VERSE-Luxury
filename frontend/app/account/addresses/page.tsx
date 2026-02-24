import AccountSectionPlaceholderClient from "@/components/account/AccountSectionPlaceholderClient";

export const metadata = {
  title: "Saved Addresses | VERSE",
};

export default function AddressesPage() {
  return (
    <AccountSectionPlaceholderClient
      title="Saved Addresses"
      subtitle="Manage your delivery addresses"
      emptyMessage="No saved addresses found for this account yet."
    />
  );
}
