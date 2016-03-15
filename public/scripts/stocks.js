$("body").on("click", "#submitQuote", () => {
  var stockPick = $("#stockName").val();
  $("#quote").attr("action", "/getquote/" + stockPick);
});
