"use client";

import { useAuthSession } from "./session";

export default function PersonalInfoClient() {
  const { user } = useAuthSession();

  return (
    <div key={user?.id ?? "anon"}>
      <h1 className="text-xl text-stone-900">Personal Information</h1>
      <p className="mt-1 text-sm text-stone-500">Update your account details</p>

      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              defaultValue={user?.firstName ?? ""}
              className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
            >
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              defaultValue={user?.lastName ?? ""}
              className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            defaultValue={user?.email ?? ""}
            className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
          >
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            placeholder=""
            className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
          />
        </div>

        <div>
          <label
            htmlFor="dob"
            className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
          >
            Date of birth
          </label>
          <input
            id="dob"
            name="dob"
            placeholder=""
            className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
          />
        </div>

        <div>
          <div className="text-sm text-stone-700">Change Password</div>
          <div className="mt-3 space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
              >
                Current password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
              >
                New password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
              >
                Confirm new password
              </label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm new password"
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="rounded-md bg-amber-200/70 px-5 py-2.5 text-xs text-stone-900 hover:bg-amber-200 transition"
        >
          Edit Information
        </button>
      </div>
    </div>
  );
}
