const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create
};

async function getAll() {
    return await db.Customer.findAll();
}

async function getById(id) {
    return await getCustomer(id);
}

async function create(params) {
    // validate
    if (await db.Customer.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const customer = new db.Customer(params);

    // save customer
    await customer.save();
}

// helper functions

async function getCustomer(id) {
    const customer = await db.Customer.findByPk(id);
    if (!customer) throw 'Customer not found';
    return customer;
}
