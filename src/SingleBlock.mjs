export class SingleBlock {
    #character;

    constructor(character) {
        this.#character = character;
    }

    toString() {
        return this.#character + "\n";
    }

    to2DArray() {
        return [this.#character];
    }
}
