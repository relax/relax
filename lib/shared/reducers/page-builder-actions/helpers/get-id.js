let ID_COUNTER = 0;
export default function getLastId (data) {
  while (data[ID_COUNTER]) {
    ID_COUNTER++;
  }
  return (ID_COUNTER++).toString();
}
