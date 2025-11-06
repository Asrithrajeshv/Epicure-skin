export const ROLES = {
  ADMIN: 'admin',
  PATIENT: 'patient',
  DOCTOR: 'doctor'
} as const;

export const ALL_ROLES: RoleValues[] = Object.values(ROLES);

export type RoleValues = typeof ROLES[keyof typeof ROLES];
