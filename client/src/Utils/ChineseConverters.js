import WordDAO from "../DAOs/WordDAO"
import WordDTO from "../DTOs/WordDTO"

var _words = null;
const GetAllWords = () => {
    return new Promise((success,reject) => {
        if (_words != null) return success(_words);
        WordDAO.select()
            .then((words) => {
                _words = words;
                success(_words);
            })
            .catch((e) => {
                reject(e);
            });
    })
}
export const ContentTypes = {
    SIMPLIFIED:'simplified',
    TRADITIONAL:'traditional',
    PINYIN:'pinyin',
    DEFINITION:'definition'
}

const FindBiggerWord = (content,contentType,words,tolerance) => {
    var match = null;

    // find biggest match first
    var i = tolerance; //longest possible word
    while (!match) {
        if (i == 0) break;
        var testMatch = content.substring(0, i);
        match = words.filter(w => w[contentType] == testMatch)[0];
        i--;
    }

    return match || content[0];
}

export const ExtractWords = (content,contentType,tolerance) => {
    return GetAllWords()
        .then((words) => {
            var broken = [];
            var remainder = content;

            while (remainder.length > 0) {
                var word = FindBiggerWord(remainder,contentType,words,tolerance);
                if (!word) {
                    remainder = remainder.substring(1)
                    continue;
                }
                broken.push(word);
                remainder = remainder.substring(word instanceof WordDTO ? word[contentType].length : word.length)
            }

            return broken;
        })
}

// tolerance handles how deep the search goes to find a word that matches
export const Convert = (content,contentType,resultType,tolerance = 5,cachedValue = "") => {
    return cachedValue ? 
        new Promise((success,failure) => {
            return success(cachedValue)
        }) : 
        ExtractWords(content,contentType,tolerance).then((words) => {
            return words.map(word => word instanceof WordDTO ? word[resultType] : word).join("");
        })
}