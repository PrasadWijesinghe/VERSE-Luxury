export const mockUser = {
  firstName: "Sophia",
  lastName: "Chen",
  email: "sophia.chen@gmail.com",
  membership: "Gold Member",
  stats: {
    orders: 24,
    wishlistItems: 12,
    savedAddresses: 3,
    rewardPoints: 2840,
  },
} as const;

export function getInitials(firstName: string, lastName: string) {
  const first = firstName?.trim()?.[0] ?? "";
  const last = lastName?.trim()?.[0] ?? "";
  return (first + last).toUpperCase() || "U";
}
