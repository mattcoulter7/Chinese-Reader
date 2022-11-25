import DTO from './DTO.js';

class ScoreInfoDTO extends DTO {
    #scorefile;
    #score;
    #difficulty;
    #history;
    #correct;
    #incorrect;
    #reviewed;
    #sincelast;
    #firstreviewedtime;
    #lastreviewedtime;

    constructor(obj = {}){
        super(obj);
        this.#scorefile = obj.scorefile;
        this.#score = obj.score;
        this.#difficulty = obj.difficulty;
        this.#history = obj.history;
        this.#correct = obj.correct;
        this.#incorrect = obj.incorrect;
        this.#reviewed = obj.reviewed;
        this.#sincelast = obj.sincelast;
        this.#firstreviewedtime = obj.firstreviewedtime;
        this.#lastreviewedtime = obj.lastreviewedtime;
    }

    get scorefile() {
        return this.#scorefile;
    }
    get score(){
        return this.#score;
    }
    get difficulty() {
        return this.#difficulty;
    }
    get history(){
        return this.#history;
    }
    get correct() {
        return this.#correct;
    }
    get incorrect(){
        return this.#incorrect;
    }
    get reviewed() {
        return this.#reviewed;
    }
    get sincelast(){
        return this.#sincelast;
    }
    get firstreviewedtime(){
        return this.#firstreviewedtime;
    }
    get lastreviewedtime(){
        return this.#lastreviewedtime;
    }

    toJSON(){
        return {
            _id:this._id,
            scorefile: this.scorefile,
            score: this.score,
            difficulty: this.difficulty,
            history: this.history,
            correct: this.correct,
            incorrect: this.incorrect,
            reviewed: this.reviewed,
            sincelast: this.sincelast,
            firstreviewedtime: this.firstreviewedtime,
            lastreviewedtime: this.lastreviewedtime,
        }
    }
}

Window.ScoreInfoDTO = ScoreInfoDTO; // TODO: Remove this... debug only

export default ScoreInfoDTO;