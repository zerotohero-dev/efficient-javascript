$("#list .countries").on("click", function() {
    $(".box").value = this.innerHTML;
});

//
$("#list").on("click", function() {
    if(!$(this).hasClass("countries")) {return;}

    $(".box").value = this.innerHTML;
});
