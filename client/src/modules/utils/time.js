const toFixed = number => `0${number}`.slice(-2)

export const getTimestamp = () => {
  const time = new Date()
  const hours = toFixed(time.getHours())
  const minutes = toFixed(time.getMinutes())
  const seconds = toFixed(time.getSeconds())
  return `${hours}:${minutes}:${seconds}`
}