export default interface Shape {
  id: string,
  geometry: object,
  state: {
    isHovered?: boolean,
    isSelected?: boolean,
    isEditing?: boolean
  }
}