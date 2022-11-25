import DTO from './DTO.js';

import ScoreInfoDTO from './ScoreInfoDTO';

class UserFlashCardDTO extends DTO {
    #user;
    #word;
    #traditional;
    #simplified;
    #pinyin;
    #definition;
    #scoreinfo;

    constructor(obj = {}) {
        super(obj);
        this.#user = obj.user;
        this.#word = obj.word;
        this.#traditional = obj.traditional;
        this.#simplified = obj.simplified;
        this.#pinyin = obj.pinyin;
        this.#definition = obj.definition;
        this.#scoreinfo = new ScoreInfoDTO(obj.scoreinfo);
    }

    get user() {
        return this.#user;
    }
    get word() {
        return this.#word;
    }
    get traditional() {
        return this.#traditional;
    }
    get simplified() {
        return this.#simplified;
    }
    get pinyin() {
        return this.#pinyin;
    }
    get definition() {
        return this.#definition;
    }
    get scoreinfo() {
        return this.#scoreinfo;
    }

    toJSON() {
        return {
            _id: this._id,
            user: this.user,
            word: this.word,
            traditional: this.traditional,
            simplified: this.simplified,
            pinyin: this.pinyin,
            definition: this.definition,
            scoreinfo: this.scoreinfo
        }
    }
}

Window.UserFlashCardDTO = UserFlashCardDTO; // TODO: Remove this... debug only

export default UserFlashCardDTO;