import { setRooms, setPartners } from "./actions"

export default {
  ROOM_LIST: msg => setRooms(msg),
  PARTNERS_LIST: list => setPartners(list)
}