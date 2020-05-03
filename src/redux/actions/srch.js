// disini yang nentuin apa yang dikirim ke global state
export const searchHandler = (searchData) => {
  return{
    type: "DATA_FOUND",
    payload: searchData
  }
}