import { setRooms, setPartners, setReady, unsetReady } from "./actions"

export default {
  ROOM_LIST: msg => setRooms(msg),
  PARTNERS_LIST: list => setPartners(list),
  ACK_SET_READY: () => setReady(),
  ACK_UNSET_READY: () => unsetReady()
}