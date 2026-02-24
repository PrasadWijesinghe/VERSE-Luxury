import AccountSectionPlaceholderClient from "@/components/account/AccountSectionPlaceholderClient";

export const metadata = {
  title: "My Orders | VERSE",
};

export default function OrdersPage() {
  return (
    <AccountSectionPlaceholderClient
      title="My Orders"
      subtitle="Track and manage your orders"
      emptyMessage="No orders found for this account yet."
    />
  );
}
