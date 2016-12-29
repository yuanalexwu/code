/**
 * Created by jack on 2016/12/29.
 */


/* =============== Controller ================= */
window.controller = {
	init: function () {
		model.currentCat = model.catList[ 0 ];

		titleView.init();
		currentCatView.init();
		adminView.init();

		this.render();
	},
	render: function () {
		titleView.render();
		currentCatView.render();
		adminView.render();
	},
	increaseCatNumber: function () {
		model.currentCat.number++;
	},
	setCurrentCat: function (catId) {
		for (let i = 0; i < model.catList.length; i++) {
			const cat = model.catList[ i ];
			if (cat.catId == catId) {
				model.currentCat = cat;
				break;
			}
		}
	},
	updateCurrentCat: function (data) {
		model.currentCat.name = data.name;
		model.currentCat.img = data.img;
		model.currentCat.number = data.number;
	}
};
