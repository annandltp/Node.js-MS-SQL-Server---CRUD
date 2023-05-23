const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create
};

async function getAll() {
    return await db.Item.findAll();
}

async function getById(id) {
    return await getCustomer(id);
}

async function create(params) {
    // validate
    if (await db.Item.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.name + '" is already registered';
    }

    const item = new db.Item(params);

    // save item
    await item.save();
}

// helper functions

async function getCustomer(id) {
    const item = await db.Item.findByPk(id);
    if (!item) throw 'Item not found';
    return item;
}
