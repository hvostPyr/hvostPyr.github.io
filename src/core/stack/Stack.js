import './Stack.css'


export default class Stack {
    constructor(config) {
        this.config = config
        this.checkSize = config.checkSize
        this.checkColor = config.checkColor
        this.pyramHeight = config.pyramHeight
        this.rootNode = config.rootNode
        this.render()
        this.start = config.startTime
        this.bindEvents()
        this.elems = []
        this.elemsC = []
    }


    render() {
        const el = document.createElement('div')
        el.classList.add('stack')
        
        const ba = document.createElement('div')
        ba.classList.add('basePyr')
        
        this.rootNode.appendChild(el)
        el.appendChild(ba)
        this.rootNode = el
    }

    bindEvents() {
        this.rootNode.addEventListener('dragover', (e) => {
            e.preventDefault()
            console.log('dragover')
        }, false)

        this.rootNode.addEventListener('drop', (e) => {
            e.preventDefault()
            const {size, color} = JSON.parse(
                this.config.dragged.getAttribute('data-config')
            )

            this.config.dragged.remove()
            this.addElem(size, color)
        })
    }

    addElem(size, color) {
        this.renderElement(size, color)

        if (this.checkSize && this.elems.length && size > this.elems[this.elems.length-1]) {
            console.log(size + " размер "+ this.elems[this.elems.length-1])
            this.handleEnd(false)
            return 
        }

        if (this.checkColor && this.elems.length && color === this.elemsC[this.elemsC.length-1]) {
            console.log(color + " цвет "+ this.elemsC[this.elemsC.length-1])
            this.handleEnd(false)
            return 
        }
        
        this.elems.push(size)
        this.elemsC.push(color)
        

        if (this.pyramHeight === this.elems.length) {
            this.handleEnd(true)
        }

        console.log([this.pyramHeight, this.elems.length])
        console.log(this)

        


        console.log(this.elems)
    } 

    renderElement(size, color) {
        const elem = document.createElement('div');
        elem.classList.add('stack-elem');


        elem.style.width = size+'px'
        elem.style['background-color'] = color

        this.rootNode.appendChild(elem)
    }

    openLangs() {
        var boxElement = document.getElementsByClassName('stack')

        boxElement[0].style.animationName = 'rotateOver'
        boxElement[0].style.animationDuration = 2300 + 'ms'
        
          
      }

    handleEnd(res) {
        if(res){this.openLangs()}
        var end = Date.now() - this.start 
        console.log(end)
        var poi = Math.floor((this.elems.length * 10) + (100000/end))

        setTimeout(()=>{
        if (res) {
            alert(`Вы молодец набрали целые ${poi} очков`);
            const scores = JSON.parse(localStorage.getItem('scores')) || {}
            scores[this.config.username] = scores[this.config.username] || new Array(3)
            scores[this.config.username][this.config.level-1] = poi
            localStorage.setItem('scores', JSON.stringify(scores));

        }
        else alert('Вы проиграли, попробуйте снова')
        window.location.href = './index.html'
        this.config.stop && this.config.stop()
        },1000)
    }

}