let offset = 0;
let qOffset = 0;
let selectedCat = -1;
let currentQuestionAnswer;
const categoryTable = $("#categories");
const playButton = $("#play");
const backButton = $("#back");
const nextButton = $("#next");
const catsButton = $("#moreCats");
const container1 = $("#container1");
const container2 = $("#container2");
const question = $("#question");
const answer = $("#answer");
function getCategories() {
  $.post(`/api/categories?offset=${offset}`, function (data) {
    $("#categories thead").nextAll().remove();
    selectedCat = -1;
    data.forEach(function (item) {
      categoryTable.append(`
          <tr>
            <td>
                <button id="cat_${item.id}" class="catBtn" type="button">${item.title} (${item.clues_count} questions)</button>
            </td>
          </tr>
        `);
    });
  });
  offset += 5;
}
function getQuestion() {
  $.post(
    `/api/clues?category=${selectedCat}&offset=${qOffset}`,
    function (data) {
      if (data) {
        currentQuestionAnswer = data.answer;
        answer.text("Click to reveal answer.");
        if (nextButton.is(":hidden")) {
          nextButton.show();
        }
        if (answer.is(":hidden")) {
          answer.show();
        }
        question.text(data.question);
      } else {
        question.text("There are no more questions in this category!");
        nextButton.hide();
        answer.hide();
      }
    }
  );
  qOffset += 1;
}
getCategories();
catsButton.click(function () {
  getCategories();
});
categoryTable.on("click", ".catBtn", function () {
  $(".catBtn").removeClass("selectedCat");
  $("#" + this.id).addClass("selectedCat");
  selectedCat = Number(this.id.split("_")[1]);
});
playButton.click(function () {
  if (selectedCat > 0) {
    container1.hide();
    container2.show();
    getQuestion();
  }
});
backButton.click(function () {
  qOffset = 0;
  container2.hide();
  container1.show();
});
nextButton.click(function () {
  getQuestion();
});
answer.click(function () {
  answer.text(currentQuestionAnswer);
});
