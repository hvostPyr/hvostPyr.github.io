import Dropbox from "./dropbox/Dropbox"
import Stack from "./stack/Stack"

import './general.css'
import './common.css'
import './table.css'

export default class Game {
    constructor(config) {
        this.config = config
        new Stack(config)
        new Dropbox(config)
    }
}