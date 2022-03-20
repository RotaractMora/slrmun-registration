export const timeStampToString = (timestamp, type) => {
  if (timestamp) {
    const date = new Date(parseInt(timestamp));
    if (type === 0) {
      return (
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ", " +
        date.getDate().toString().padStart(2, "0") +
        "." +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "." +
        date.getFullYear()
      );
    } else if (type === 1) {
      return (
        date.getHours().toString().padStart(2, "0") +
        "." +
        date.getMinutes().toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0") +
        "." +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "." +
        date.getFullYear()
      );
    } else if (type === 2) {
      const utc_str = date.toUTCString();
      // let lst = utc_str.split(" ");
      // lst = lst.slice(0, lst.length - 1);
      // lst[4] = lst[4].split(":").slice(0, 2).join(":");
      // return lst.join(" ");
      return utc_str;
    } else {
      return "Invalid type definition";
    }
  } else {
    return "Unvailable";
  }
};

export const download_csv_file = (headings, csvArray, downloadName) => {
  //define the heading for each row of the data
  let csv = headings.join(",") + "\n";

  //merge the data with CSV
  csvArray.forEach((row) => {
    csv += row.join(",");
    csv += "\n";
  });

  // //display the created CSV data on the web browser
  // document.write(csv);

  const hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";

  //provide the name for the CSV file to be downloaded
  hiddenElement.download = downloadName;
  hiddenElement.click();
};
