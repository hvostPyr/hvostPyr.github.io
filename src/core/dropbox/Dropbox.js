import './Dropbox.css'


export default class Dropbox {
    constructor(config) {
        this.config = config

        this.elSizes = [20, 30, 50, 100, 150, 300]
        this.elLefts = [10, 20, 22, 35, 15, 2]
        this.elColors = ['#DC143C', '#FF8C00', '#90EE90', '#4169E1']
        this.dropInterval = config.dropInterval*1000
        this.dropSpeed = config.dropSpeed

        this.rootNode = config.rootNode
        this.render()
        this.createRandomElement.call(this)
        this.start()
        this.config.stop = this.stop
    }


    render() {
        const el = document.createElement('div')
        el.classList.add('dropbox')
        this.rootNode.appendChild(el)
        this.rootNode = el
    }

    start() {
        this.interval = setInterval(this.createRandomElement.bind(this), this.dropInterval);
    }

    stop() {
        clearInterval(this.interval)
    }

    createRandomElement() {
        const elSize = this.elSizes.sort(() => Math.random()-0.5)[0]
        const elcolor = this.elColors.sort(() => Math.random() - 0.5)[0]

        const elem = document.createElement('div')
        elem.setAttribute('draggable', true)
        elem.setAttribute('data-config', JSON.stringify({
            size: elSize,
            color: elcolor
        }))
        elem.classList.add('elem')
        elem.style['background-color'] = elcolor
        elem.style.width = elSize+'px'
        elem.style.height = '40px'
        elem.style.left = this.elLefts.sort(() => Math.random()-0.5)[0]
        document.body.style.setProperty('--drop-speed', `${this.dropSpeed}s`)

        const remover = () => {elem && this.rootNode.removeChild(elem)}

        elem.addEventListener('dragstart', (e) => {
            console.log('dragstart')
            this.config.dragged = elem
        })

        this.rootNode.appendChild(elem)

        setTimeout(remover, this.dropSpeed*1000)
    }
}



