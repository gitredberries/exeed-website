class RotateByDrag {
    constructor(imgUrls, selector) {
        if (!imgUrls || imgUrls.length === 0 || !selector) return;
        this.imgUrls = imgUrls;
        this.imgMap = new Map();
        this.idx = 0;
        this.el = document.querySelector(selector);
        this.canvas = null;
        this.ctx = null;
        this.isDragging = false;
        this.lastX = 0;
        this.totalFrames = imgUrls.length; // 总帧数
        this.degreesPerFrame = 360 / this.totalFrames; // 每帧对应的角度

        // 初始化画布
        this.initCanvas();
        // 预加载图片
        this.previewImages();
        // 绑定鼠标事件
        this.addEventListeners();
    }

    initCanvas() {
        const canvasWrap = document.createElement('div');
        canvasWrap.classList.add('canvas-wrap');
        this.el.append(canvasWrap);

        this.canvas = document.createElement('canvas');
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.ctx = this.canvas.getContext('2d');

        canvasWrap.append(this.canvas);
    }

    previewImages() {
        let loadedCount = 0;
        this.imgUrls.forEach((url, index) => {
            // console.log('imgUrls',url)
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.imgMap.set(index, img);
                loadedCount++;
                if (loadedCount === this.imgUrls.length) {
                    this.updateCanvas(); // 只有全部图片加载完才渲染
                }
            };
            img.onerror = () => {
                console.error(`图片加载失败: ${url}`);
            };
        });
    }

    addEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.startDrag(e));
        window.addEventListener('mousemove', (e) => this.handleDrag(e));
        window.addEventListener('mouseup', () => this.stopDrag());
    }

    startDrag(e) {
        this.isDragging = true;
        this.lastX = e.clientX;
    }

    handleDrag(e) {
        if (!this.isDragging) return;

        const movementX = e.clientX - this.lastX;
        this.lastX = e.clientX;

        const sensitivity = 1.5; // 拖动灵敏度 (越小越快)
        let degreesMoved = movementX * sensitivity; // 拖拽多少 px 转换成角度

        let newIndex = this.idx - Math.round(degreesMoved / this.degreesPerFrame);
        
        // 处理边界
        if (newIndex < 0) newIndex += this.totalFrames;
        if (newIndex >= this.totalFrames) newIndex -= this.totalFrames;

        if (newIndex !== this.idx) {
            this.idx = newIndex;
            this.updateCanvas();
        }
    }

    stopDrag() {
        this.isDragging = false;
    }

    updateCanvas() {
        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);

        const img = this.imgMap.get(this.idx);
        if (img) {
            // console.log(img)
            this.ctx.drawImage(img, 0, 0, width, height);
        }
    }
}
