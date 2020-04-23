const {findByInput, create} = require('./model');
const {totalToPersianNumber} = require('./presenter');
exports.index = async (req, res) => {
	const items = req.session.basket;
	const product = Object.keys(items).map((id) => {
		totalToPersianNumber(items[id]);

		return items[id];
	});

	res.render('basket', {layout: 'main', items: product});
};
exports.add = async (req, res) => {
	const slug = req.params.slug;
	const product = await findByInput('slug', slug);
	if (!product) {
		return res.status(404).render('errors/404', {layout: 'main'});
	}

	if (!('basket' in req.session)) {
		req.session.basket = {};
	}
	if (product.id in req.session.basket) {
		let {count} = req.session.basket[product.id];
		req.session.basket[product.id].count = ++count;
	} else {
		req.session.basket[product.id] = {
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			count: 1,
		};
	}
	res.redirect('/basket');
};

exports.checkout = async (req, res) => {
	const items = req.session.basket;
	const itemsCount = Object.keys(items).length;
	let sumTotalPrice = 0;
	let items_count = 0;

	Object.keys(items).map((id) => {
		const product = items[id];
		sumTotalPrice += product.price * product.count;
		items_count += product.count;
	});
	const order = {
		user_id: 0,
		total_price: sumTotalPrice,
		items_count,
		total_count: itemsCount,
		shipping_address: '',
		created_at: 0,
		status: 0,
	};
	const order_id = await create(order)
		.then((order) => {
			return res.render('orders/details', {layout: 'main', order});
		})
		.catch(() => {
			console.log('can not do that');
		});
};
