import * as XML from "fast-xml-parser"
import { Link } from "react-router-dom";
import { Convert, ContentTypes } from "../Utils/ChineseConverters";

Window.XML = XML;

class QCard {
    constructor(catassign, defn, headwordSimp, headwordTrad, pron) {
        this._catassign = catassign;
        this._defn = defn;
        this._headwordSimp = headwordSimp;
        this._headwordTrad = headwordTrad;
        this._pron = pron;
    }

    get catassign() {
        return this._catassign;
    }
    get dictref() {
        return this._dictref;
    }
    get defn() {
        return this._defn;
    }
    get headwordSimp() {
        return this._headwordSimp;
    }
    get headwordTrad() {
        return Convert(this.headwordSimp, ContentTypes.SIMPLIFIED, ContentTypes.TRADITIONAL, 5, this._headwordTrad);
    }
    get pron() {
        return Convert(this.headwordSimp, ContentTypes.SIMPLIFIED, ContentTypes.PINYIN, 5, this._pron);
    }

    async ToJSON() {
        return {
            'card': {
                '@_created': `${new Date().getTime().toString().substring(0, 10)}`,
                '@_language': 'chinese',
                '@_modified': `${new Date().getTime().toString().substring(0, 10)}`,
                'catassign': {
                    '@_category': this.catassign
                },
                'dictref': {
                    '@_dictid': '',
                    '@_entryid': '',
                },
                'entry': {
                    defn: this.defn,
                    headword: [
                        {
                            '@_charset': 'sc',
                            '#text': this.headwordSimp
                        },
                        {
                            '@_charset': 'tc',
                            '#text': await this.headwordTrad
                        }],
                    pron: {
                        '#text': await this.pron,
                        '@_tones': 'numbers',
                        '@_type': 'hypy'
                    }
                },
                'scoreinfo': {
                    '@_correct': "0",
                    '@_difficulty': "0",
                    '@_firstreviewedtime': "0",
                    '@_history': "",
                    '@_incorrect': "0",
                    '@_lastreviewedtime': "0",
                    '@_reviewed': "0",
                    '@_score': "0",
                    '@_scorefile': "Default",
                    '@_sincelast': "0"
                }
            }
        }
    }

    async ToXML() {
        return new XML.XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        }).build(await this.ToJSON());
    }
}

function extract(content, pattern) {
    return content.split("")
        .filter(char => pattern.test(char))
        .join("")
}

export function flip(content, delimiter) {
    return content.split("\n")
        .filter(a => a)
        .map(line => line.split(delimiter)
            .map(a => a.trim())
        )
        .map(a => a.reverse().join(delimiter))
        .join("\n")
}

export function ConvertToXML(content, delimiter) {

    var timeString = new Date().getTime().toString().substring(0, 10);
    var categoryName = `Flashcard Import ${timeString}`;
    return new Promise((success, failure) => {
        // generate q cards from raw input string
        var words = content.split("\n")
            .filter(a => a)
            .map(line => line.split(delimiter)
                .map(a => a.trim())
            )
            .map(pair => new QCard(categoryName, pair[1], pair[0], "", "", ""))

        // convert to XML
        var xmlBuff = []
        words.forEach((word, i) => {
            word.ToXML().then((result) => {
                xmlBuff[i] = result;
                if (i == words.length - 1) {
                    success(xmlBuff)
                }
            })
        })
    }).then((xmlBuff) => {
        // generate xmlString
        return `<?xml version="1.0" encoding="UTF-8"?>
        <plecoflash formatversion="2" creator="Matthew Coulter" generator="Matthew Coulter Importer" platform="iPhone OS" created="${timeString}">
            <categories>
                <category name="${categoryName}"/>    
            </categories>
            <words>
                ${xmlBuff.join("\n")}
            </words>
        </plecoflash>`
    })
}