$(document).ready(function() {
		let currentExteriorColor = 0;
		let currentInteriorColor = 0;
		const colors = [
			{ name: 'Black', url: './out/black/car_black_1.png', color: 'to bottom,#3b3b3b,#000000', colorUrl: 'black' },
			{ name: 'Green', url: './out/green/car_green_1.png', color: 'to bottom,#899f9c,#25403e', colorUrl: 'green' },
			{ name: 'Silver', url: './out/silver/car_silver_1.png', color: 'to bottom,#b0b9b9,#4a4f52', colorUrl: 'silver' },
			{ name: 'White', url: './out/white/car_white_1.png', color: 'to bottom,#fbfbfc,#dadada', colorUrl: 'white' },
			{ name: 'Blue', url: './out/blue/car_blue_1.png', color: 'to bottom,#455381,#181f36', colorUrl: 'blue' },
			{ name: 'Grey', url: './out/grey/car_grey_1.png', color: ' to bottom,#6b6b77,#41454e', colorUrl: 'grey' }
		];
		const inColors = [
			{ name: 'Black', url: './in/black.jpg', color: 'to bottom,#3b3b3b,#000000', colorUrl: 'black' },
			{ name: 'White', url: './in/white.jpg', color: 'to bottom,#dfd8c8,#a9a192', colorUrl: 'white' },
			{ name: 'Brown', url: './in/brown.jpg', color: 'to bottom,#7b6258,#382521', colorUrl: 'brown' },
		];
		let html = '';
		colors.map(function(v, i) {
		    html += '<div class="' + (currentExteriorColor == i ? 'color active' : 'color') + '" style="background-image:linear-gradient(' + v.color + ')" data-index="' + i + '"></div>';
		});
		$('.colors').html(html);
		$('.color-name').text(colors[currentExteriorColor].name);

		$('.colors .color').click(function () {
			const index = $(this).data('index');
			currentExteriorColor = index;
			$('.color').removeClass('active');
			$(this).addClass('active');
			$('.color-name').text(colors[index].name);
			currentImageIndex = 1; // 重置图片索引为1
			preloadImagesAndUpdate();
		});

		const carContainer = document.getElementById('car-container');
		const carImage = document.getElementById('car-image');
		const interior = document.getElementById('interior');
		let currentImageIndex = 1;
		const totalImages = 72; // 这里设置图片总数
		let isDragging = false;
		let startX = 0;
		const sensitivity = 2; // 灵敏度，值越小速度越快

		carContainer.addEventListener('mousedown', startDragging);
		carContainer.addEventListener('touchstart', startDragging, { passive: true });

		function startDragging(event) {
			event.preventDefault(); // 阻止默认行为，如文本选择
			isDragging = true;
			startX = event.clientX || event.touches[0].clientX;
			document.addEventListener('mousemove', drag);
			document.addEventListener('touchmove', drag, { passive: true });
			document.addEventListener('mouseup', stopDragging);
			document.addEventListener('mouseleave', stopDragging);
			document.addEventListener('touchend', stopDragging);
			document.addEventListener('touchcancel', stopDragging);
		}

		function drag(event) {
			if (!isDragging) return;

			const x = event.clientX || event.touches[0].clientX;
			const deltaX = x - startX;
			if (Math.abs(deltaX) > sensitivity) {
				if (deltaX > 0) {
					currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages || totalImages;
				} else {
					currentImageIndex = (currentImageIndex + 1 - 1) % totalImages + 1;
				}
				startX = x;
				updateImage();
			}
		}

		function stopDragging() {
			isDragging = false;
			document.removeEventListener('mousemove', drag);
			document.removeEventListener('touchmove', drag);
			document.removeEventListener('mouseup', stopDragging);
			document.removeEventListener('mouseleave', stopDragging);
			document.removeEventListener('touchend', stopDragging);
			document.removeEventListener('touchcancel', stopDragging);
		}

		function showLoading() {
			document.getElementById('loading-overlay').style.display = 'flex';
		}

		function hideLoading() {
			document.getElementById('loading-overlay').style.display = 'none';
		}

		function updateImage() {
			const currentColorObject = colors[currentExteriorColor];
			const baseUrl = currentColorObject.url.replace(`car_${colors[currentExteriorColor].colorUrl}_1.png`, `car_${currentColorObject.name.toLowerCase()}_`);
			const newImageSrc = `${baseUrl}${currentImageIndex}.png`;
			const img = new Image();
			img.src = newImageSrc;
			img.onload = function () {
				carImage.src = newImageSrc;
			};
		}

		function preloadImagesAndUpdate() {
			showLoading();
			const currentColorObject = colors[currentExteriorColor];
			const baseUrl = currentColorObject.url.replace(`car_${colors[currentExteriorColor].colorUrl}_1.png`, `car_${currentColorObject.name.toLowerCase()}_`);
			const promises = [];
			for (let i = 1; i <= totalImages; i++) {
				const imgSrc = `${baseUrl}${i}.png`;
				promises.push(loadImage(imgSrc));
			}
			Promise.all(promises).then(() => {
				hideLoading();
				updateImage();
			});
		}

		function loadImage(src) {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = resolve;
				img.onerror = reject;
			});
		}

		function setViewer(color) {
			showLoading();
			const panoramaUrl = inColors.find(c => c.name === color).url;
			interior.innerHTML = ''; // 清空内饰视图容器
			let panorama = new PANOLENS.ImagePanorama(panoramaUrl);
			let viewer = new PANOLENS.Viewer({
				container: interior,
				controlButtons: [], // 删除全屏按钮
				initialLookAt: new THREE.Vector3(80000, 0, 0),
				autoRotate: false, //自动播放
				autoRotateActivationDuration: 2000, //时长
				autoRotateSpeed: 0.3, //速度
			});
			panorama.addEventListener('load', function () {
				hideLoading();
			});
			viewer.add(panorama);
		}

		$('.tab').click(function () {
			$('.tab').removeClass('active');
			$(this).addClass('active');
			const view = $(this).data('view');
			if (view === 'exterior') {
				$('#car-container').show();
				$('#interior').hide();
				let exteriorHtml = '';
				colors.map(function(v, i) {
				    exteriorHtml += '<div class="' + (currentExteriorColor == i ? 'color active' : 'color') + '" style="background-image:linear-gradient(' + v.color + ')" data-index="' + i + '"></div>';
				});
				$('.colors').html(exteriorHtml);
				$('.color-name').text(colors[currentExteriorColor].name);
				// 重新绑定外观颜色选择事件
				$('.colors .color').click(function () {
					const index = $(this).data('index');
					currentExteriorColor = index;
					$('.color').removeClass('active');
					$(this).addClass('active');
					$('.color-name').text(colors[index].name);
					currentImageIndex = 1; // 重置图片索引为1
					preloadImagesAndUpdate();
				});
			} else {
				$('#car-container').hide();
				$('#interior').show();
				let interiorHtml = '';
				inColors.map(function(v, i) {
				    interiorHtml += '<div class="' + (currentInteriorColor == i ? 'color active' : 'color') + '" style="background-image:linear-gradient(' + v.color + ')" data-index="' + i + '"></div>';
				});
				$('.colors').html(interiorHtml);
				$('.color-name').text(inColors[currentInteriorColor].name);
				setViewer(inColors[currentInteriorColor].name);
				// 重新绑定内饰颜色选择事件
				$('.colors .color').off('click').on('click', function () {
					const index = $(this).data('index');
					currentInteriorColor = index;
					$('.color').removeClass('active');
					$(this).addClass('active');
					$('.color-name').text(inColors[index].name);
					setViewer(inColors[index].name);
				});
			}
		});

		showLoading();
		$('#car-container').show();
		$('#interior').hide();
		preloadImagesAndUpdate(); // 预加载图片并更新
		
})