class Word {
    constructor(line){
        this.line = line;
        [
            this.traditional,
            this.simplified
        ] = line.split(" ");

        this.pinyin = (() => {
            var match = (line.match(/\[[A-Za-z1-5\s]*\]/) || {})[0];
            if (!match) return [];

            return match.slice(1,-1).split(" ");
        })();

        this.definition = (() => {
            var match = (line.match(/\/.*\//) || {})[0];
            if (!match) return "";
            return match.slice(1,-1).split("/");
        })();
    }

    get pinyinString(){
        return this.pinyin.join(" ");
    }
    get definitionString(){
        return this.definition.join("\n");
    }
}

class Dictionary{
    constructor(raw){
        this.raw = raw;
        this.lines = [];
        this.words = [];

        this.initDictionary();
    }

    initDictionary(){
        this.lines = this.raw.split("\n")
        this.lines.forEach((line) => {
            if (line.startsWith("#")) return;
            this.words.push(new Word(line));
        })
    }
}

async function getDictionaryContentsRaw(){
    var request = await fetch("./assets/cedict_ts.txt");
    return await request.text();
}

var dictionary = null;
export async function getDictionary(){
    return dictionary = dictionary || (async () => {
        return new Dictionary(
            await getDictionaryContentsRaw()
        );
    })();
}

