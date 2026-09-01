export function cleanVisibleCopy(value: string): string {
  return value.replace(/\s*[—–]\s*/g, " - ");
}
