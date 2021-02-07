export const formatDate = (dateString: string = new Date().toISOString()): string => {
  try {
    const locale = "default"
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(locale, options)
  } catch (err) {
    // Fallback in case locales/options are not supported
    return new Date(dateString).toString()
  }
}
