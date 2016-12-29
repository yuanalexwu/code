/**
 * Created by jack on 2016/12/29.
 */


/* =============== View ================= */
window.titleView = {
	init: function () {
	},
	render: function () {
		const { catList } = model;
		const titleList = document.body.querySelector('.titleList');
		const lines = [];
		for (const cat of catList) {
			const line = `
			<div catid="${cat.catId}" class="line">${cat.name}</div>
			`;
			lines.push(line);
		}
		// append to page
		titleList.innerHTML = lines.join('');

		// add event listener
		titleList.querySelectorAll('.line').forEach(function (line) {
			line.addEventListener('click', () => {
				const catId = line.getAttribute('catid');
				controller.setCurrentCat(catId);
				currentCatView.render();
			});
		})
	}
};

window.currentCatView = {
	init: function () {
	},
	render: function () {
		const { currentCat } = model;
		const catTitle = `<div class="catTitle" >${currentCat.name}</div>`;
		const catImg = `<img class="catImg" src="${currentCat.img}" catId="${currentCat.catId}" />`;
		const catNum = `<div class="catNum">${currentCat.number}</div>`;
		const catWrapper = `
			${catTitle}
			${catImg}
			${catNum}`;
		const cat = document.body.querySelector('.currentCat');
		cat.innerHTML = catWrapper;
		// add event listener
		cat.querySelector('.catImg').addEventListener('click', () => {
			controller.increaseCatNumber();
			this.render();
		})
	}
};


window.adminView = {
	init: function () {
		this.adminBtn = document.body.querySelector('.adminBtn');
		this.actionForm = document.body.querySelector('.adminForm');
		this.nameElem = this.actionForm.querySelector('.name');
		this.imgElem = this.actionForm.querySelector('.img');
		this.numberElem = this.actionForm.querySelector('.number');
		this.cancelBtn = this.actionForm.querySelector('.cancel');
		this.saveBtn = this.actionForm.querySelector('.save');

		this.bindEvent();
	},
	render: function () {
		const { currentCat } = model;
		this.nameElem.value = currentCat.name;
		this.imgElem.value = currentCat.img;
		this.numberElem.value = currentCat.number;
	},
	bindEvent: function () {
		this.adminBtn.addEventListener('click', () => {
			if (this.actionForm.hasAttribute('style')) {
				this.render();
				this.actionForm.removeAttribute('style');
			} else {
				this.actionForm.style = 'display:none;';
			}
		});
		this.cancelBtn.addEventListener('click', () => {
			this.actionForm.style = 'display:none;';
		});
		this.saveBtn.addEventListener('click', () => {
			const name = this.nameElem.value;
			const img = this.imgElem.value;
			const number = this.numberElem.value;
			controller.updateCurrentCat({ name, img, number });
			this.actionForm.style.display = 'none';
			currentCatView.render();
			titleView.render();
		});
	}
};
