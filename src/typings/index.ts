type Theme = {
  name: string,
  class: string,
  iconColor: string,
  backgroundColor: string,
  selectedByDefault: true
}
type MultiThemeParams = {
  list?: Theme[],
  disabled?: boolean
}
