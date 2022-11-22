class Player {
    constructor(){
        this.name = "temp name";
        this.id = 0;
        this.chipAmount = 0;
    }

    getChips(chips){
        this.chipAmount = chips;
    }

    getId(id) {
        this.id = id;
    }
}