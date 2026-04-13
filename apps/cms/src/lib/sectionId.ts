const SLUG_ID_REGEX = /^[a-zA-Z0-9-]+$/

export const sanitizeSlugId = (value: string): string =>
  value.replace(/[^a-zA-Z0-9]/g, '-')

export const validateSlugId = (value: string | string[] | null | undefined): true | string => {
  if (!value || Array.isArray(value)) return true
  return SLUG_ID_REGEX.test(value) || 'ID may only contain letters, numbers, and hyphens'
}
