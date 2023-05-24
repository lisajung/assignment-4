
$(document).ready(function () {
  var flippedCards = [];
  var matchedCards = [];
  var totalPairs = $(".card").length / 2;
  var clickCount = 0;
  var pairsMatched = 0;
  var pairsLeft = totalPairs;
  var gameTimer;
  var gameTime = 0;
  var timerStarted = false; 

  function updateHeader() {
    $("#header").text(
      "Clicks: " + clickCount +
      " | Pairs Left: " + pairsLeft +
      " | Pairs Matched: " + pairsMatched +
      " | Total Pairs: " + totalPairs +
      " | Time: " + gameTime + "s"
    );
  }

  function startTimer() {
    gameTimer = setInterval(function () {
      gameTime++;
      updateHeader();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(gameTimer);
  }

  function showWinningMessage() {
    stopTimer();
    setTimeout(function () {
      alert("Congratulations! You have matched all the cards.");
    }, 500);
  }

  $(".card").click(function () {
    var $this = $(this);

    // Check if the clicked card is already flipped or matched
    if ($this.hasClass("flip") || $this.hasClass("matched")) {
      return;
    }

    // Flip card
    $this.addClass("flip");

    // Add the flipped card to array
    flippedCards.push($this);

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];

      // Get the image sources of the flipped cards
      var img1 = card1.find(".front_face img").attr("src");
      var img2 = card2.find(".front_face img").attr("src");

      // Check if the images match
      if (img1 === img2) {
        // Matched cards
        card1.addClass("matched");
        card2.addClass("matched");
        matchedCards.push(card1, card2);
        pairsMatched++;
        pairsLeft--;
      } else {
        // Not matched, flip back the cards after a delay
        clickCount++;
        updateHeader();
        setTimeout(function () {
          card1.removeClass("flip");
          card2.removeClass("flip");
        }, 1000);
      }

      // Clear the flipped cards array
      flippedCards = [];

      // Check if all cards are matched (game over)
      if (matchedCards.length === totalPairs * 2) {
        updateHeader();
        showWinningMessage();
      }
    } else {
      // Only one card is flipped
      clickCount++;
      updateHeader();
    }
  });

  function restartGame() {
    stopTimer();
    gameTime = 0;
    clickCount = 0;
    pairsMatched = 0;
    pairsLeft = totalPairs;
    matchedCards = [];
    flippedCards = [];

    $(".card").removeClass("flip matched");

    updateHeader();
    timerStarted = false; 
  }

  
  $("#start-btn").click(function () {
    if (!timerStarted) { 
      startTimer();
      timerStarted = true;
    }
  });

  $("#restart-btn").click(function () {
    restartGame();
    startTimer();
  });

  function toggleDarkTheme() {
    $('body').toggleClass('dark-theme');
  }

  $('#theme-toggle-btn').click(function () {
    toggleDarkTheme();
  });

  updateHeader();
});

