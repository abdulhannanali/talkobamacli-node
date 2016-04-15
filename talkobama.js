const request = require("request")
const path = require("path")
const qs = require("qs")

const SITE_URL = "http://talkobamato.me/"

module.exports = function (text, cb) {
    var videoUrl = "http://talkobamato.me/synth/output/*/obama.mp4"
    
    if (!text) {
        throw new Error("No text provided to parse")
    }
    
    if (! typeof text == "string") {
        throw new Error("Invalid text provided")
    }
    
    request.post({
        url: SITE_URL,
        form: {
            input_text: text
        }
    }, function (error, response, body) {
       if (error) {
           cb(error)
       }
       else  {
           if (response &&
               response.headers &&
               response.headers.location) {
                var speech_key = qs.parse(path.parse(response.headers.location).base.substr(1)).speech_key
                videoUrl = videoUrl.replace("*", speech_key)

                cb(undefined, {
                    url: videoUrl,
                    id: speech_key
                })
            }
       }
    })
}