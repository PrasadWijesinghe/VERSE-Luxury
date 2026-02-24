import AccountSectionPlaceholderClient from "@/components/account/AccountSectionPlaceholderClient";

export const metadata = {
  title: "Payment Methods | VERSE",
};

export default function PaymentMethodsPage() {
  return (
    <AccountSectionPlaceholderClient
      title="Payment Methods"
      subtitle="Manage your saved payment methods"
      emptyMessage="No payment methods found for this account yet."
    />
  );
}
