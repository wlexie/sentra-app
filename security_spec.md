# Security Specification: Sentra RBAC

## Data Invariants

1. A user profile MUST match the Auth UID.
2. Only Admins can change a user's role.
3. Only Admins can approve or reject quotes.
4. Clients can only see their own quotes.

## The "Dirty Dozen" Payloads (Deny Cases)

1. Creating a user profile with `role: 'admin'` as a new user.
2. Updating another user's profile.
3. Reading all user profiles as a client.
4. Creating a quote with an ID longer than 128 chars.
5. Updating a quote's status from `pending` to `approved` as a client.
6. Deleting a quote that belongs to another client.
7. Injecting a 1MB string into the `fullName` field.
8. Listing quotes without a `clientId` filter (as a client).
9. Updating a user profile with empty `fullName`.
10. Creating a quote with a negative `totalAmount`.
11. Changing the `clientId` of an existing quote.
12. Accessing `/users/` collection as an unauthenticated guest.
