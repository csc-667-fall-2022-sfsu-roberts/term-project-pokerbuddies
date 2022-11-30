class Deck {
  constructor() {
    this.deck = [];
    this.reset();
    this.shuffle();
  }

  shuffle() {
    let num_cards = this.deck.length;
    for (let i = 0; i < num_cards; i++) {
      let random = Math.floor(Math.random() * num_cards);
      let holder = this.deck[i];
      this.deck[i] = this.deck[random];
      this.deck[random] = holder;
    }
  }

  reset() {
    this.deck = [];
    const nums = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

    for (let suit in suits) {
      for (let value in nums) {
        this.deck.push(nums[value] + " of " + suits[suit]);
      }
    }
  }

  isEmpty() {
    return this.deck.length == 0;
  }

  deal() {
    return this.deck.pop();
  }

  length() {
    return this.deck.length;
  }
}
