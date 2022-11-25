import DTO from './DTO.js';

class WordDTO extends DTO {
    #traditional;
    #simplified;
    #pinyin;
    #definition;

    constructor(obj = {}){
        super(obj);
        this.#traditional = obj.traditional;
        this.#simplified = obj.simplified;
        this.#pinyin = obj.pinyin;
        this.#definition = obj.definition;
    }

    get traditional() {
        return this.#traditional;
    }
    get traditionalArray(){
        return this.traditional.split("")
    }
    get simplified() {
        return this.#simplified;
    }
    get simplifiedArray(){
        return this.simplified.split("")
    }
    get pinyin() {
        return this.#pinyin;
    }
    get pinyinArray(){
        return this.pinyin.split(" ");
    }
    get definition() {
        return this.#definition;
    }
    get definitionArray(){
        return this.definition.split("\n");
    }

    toJSON(){
        return {
            _id:this._id,
            traditional:this.traditional,
            simplified:this.simplified,
            pinyin:this.pinyin,
            definition:this.definition
        }
    }
}

Window.WordDTO = WordDTO; // TODO: Remove this... debug only

export default WordDTO;